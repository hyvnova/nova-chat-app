const chats = {};
const MAX_CHAT_MESSAGES = 40;

// cant believe js doesnt have a insert method
Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

// shortcut
const keys = (obj) => Object.keys(obj);


var express = require('express');
var app = express();
var server = require('http').createServer(app);

const io = require("socket.io")(server, {
    cors : {
        origin: "*"
    }
})

app.get('/', function(req, res) {
    res.send("Server running")
});

server.listen(3020);

console.log("Server running");

function saveChatItem(room, item) {
    if (chats[room] === undefined) {
        chats[room] = [];
    }
    chats[room].insert(0, item)

    if (chats[room].length > MAX_CHAT_MESSAGES) {
        chats[room] = chats[room].slice(0, chats[room].length - MAX_CHAT_MESSAGES);
    }
}

function getChatItems(room) {
    if (chats[room] === undefined) {
        chats[room] = [];
    }
    return chats[room];
}

// keeps count of active users in rooms
const usersCount = {}; //  {room : { ids: [socketsID],  count: count} }

// petitions to recieve a update when active users change in a room
const usersCountUpdateListeners = {} // {room: [sockedID]} 

// calculates 3 most active rooms
let lastPopularRooms = []
function updatePopularRooms() {
    let sortable = [];
    for (var room in usersCount) {
        sortable.push([room, usersCount[room].count ]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    let newPopularRooms = sortable.map( item => {

        // if active users in room is 0 skip it
        if (item[1] === 0) return null

        // if not, return room
        else return item[0]
    }).filter(item => item !== null)


    if (newPopularRooms !== lastPopularRooms) {
        lastPopularRooms = newPopularRooms

        io.emit("update-popular-rooms", newPopularRooms)
    }
}

function updateUsersCount(room) {
    if (usersCount[room] === undefined) return

    let count = usersCount[room].count

    // if nodoby is listening to this room user count changes
    if (usersCountUpdateListeners[room] === undefined || usersCountUpdateListeners[room].length === 0) return

    usersCountUpdateListeners[room].map((socketID) => {
        io.to(socketID).emit("update-users-count", count);
    })
        
    updatePopularRooms();
}

function onSocketLeave(socket) {
    // update room user count
    if (socket.room == undefined || ! socket.room in keys(usersCount)) return;
    if (! usersCount[socket.room].ids.includes(socket.id)) return;

    usersCount[socket.room].count --;
    usersCount[socket.room].ids = usersCount[socket.room].ids.filter(item => ( item !== socket.id) );

    updateUsersCount(socket.room);

    // remove socket from user count update listener if in
    if (usersCountUpdateListeners[socket.room] === undefined) return
    usersCountUpdateListeners[socket.room].filter(item => {item != socket.id})
}

io.on("connection", socket => {

    socket.on("disconnect", () => {
        onSocketLeave(socket)        
    })

    socket.on("leave", room => {
        onSocketLeave(socket)
    })

    socket.on("join-room", (room, username) => {
        // leave other rooms
        var rooms = io.sockets.adapter.sids[socket.id]; for(var room in rooms) { socket.leave(room); }

        socket.join(room);
        socket.room = room;
        socket.username = username;

        // if room exists and id alredy in then return
        if (usersCount[room] && usersCount[socket.room].ids.includes(socket.id) ) return;
        
        // if room doesnt exists created it
        if (usersCount[room] == undefined) {
            usersCount[room] = {count: 1, ids: [socket.id]};

        // if room exits just add the id and increment count
        } else {
            usersCount[room].count ++;
            usersCount[room].ids.push(socket.id);
        }

        updateUsersCount(room);

    })
    
    socket.on("send-message", (message, room) => {
        // save message
        saveChatItem(room, message)
        // message = {author: username, content: message}
        socket.to(room).emit("receive-message", message)
    })

    // recovering messages
    socket.on("request-messages", room => {
        io.to(socket.id).emit("get-messages", getChatItems(room));
    })

    // when popular rooms are requested -> activates update popular rooms
    socket.on("request-popular-rooms", () => {
        updatePopularRooms()
    })

    //  when user count is requested -> lists socketID into updateList so socket will update count when it changes
    socket.on("request-users-count", room => {
        if (usersCountUpdateListeners[room] === undefined) {
            usersCountUpdateListeners[room] = []
        }

        // if socket alredy in list
        if (usersCountUpdateListeners[room].includes(socket.id)) return

        // if not add socket to list
        usersCountUpdateListeners[room].push(socket.id)

        updateUsersCount(room)
    })

})


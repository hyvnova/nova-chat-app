const chats = {};
const MAX_CHAT_MESSAGES = 40;

// cant believe js doesnt have a insert method
Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};

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


// messages
function JOIN_ROOM_MESSAGE(room, username) { 
    let item = { type: "sysmessage", props: { content: `${username} joined the room` } } 
    saveChatItem(room, item)
    return item
}
function LEAVE_ROOM_MESSAGE(room, username) {
    let item  = { type: "sysmessage", props: {content: `${username} left the room`, color: "#ddd000" } }
    saveChatItem(room, item)
    return item
}


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

// keeps count of active users in rooms
// {room : [socketsID], count}
const activeUsers = {};

// shortcut
const keys = (obj) => Object.keys(obj);

io.on("connection", socket => {

    socket.on("disconnect", () => {
        if (socket.room == undefined || ! socket.room in keys(activeUsers)) return;
        if (! activeUsers[socket.room].ids.includes(socket.id)) return;

        activeUsers[socket.room].count --;
        activeUsers[socket.room].ids = activeUsers[socket.room].ids.filter(item => ( item !== socket.id) );

        io.to(socket.room).emit("update-active-users", activeUsers[socket.room].count);
        io.to(socket.room).emit("user-left-room", LEAVE_ROOM_MESSAGE(socket.room, socket.username))
    })

    socket.on("leave", room => {
        if (socket.room == undefined || ! socket.room in keys(activeUsers)) return;
        if (! activeUsers[socket.room].ids.includes(socket.id)) return;

        activeUsers[room].count --;
        activeUsers[room].ids = activeUsers[room].ids.filter(item => ( item !== socket.id) );

        io.to(room).emit("update-active-users", activeUsers[socket.room].count);
        io.to(room).emit("user-left-room", LEAVE_ROOM_MESSAGE(socket.room, socket.username))
    })

    socket.on("join-room", (room, username) => {
        // leave other rooms
        var rooms = io.sockets.adapter.sids[socket.id]; for(var room in rooms) { socket.leave(room); }

        socket.join(room);
        socket.room = room;
        socket.username = username;

        // if room exists and id alredy in then return
        if (activeUsers[room] && activeUsers[socket.room].ids.includes(socket.id) ) return;
        
        // if room doesnt exists created it
        if (activeUsers[room] == undefined) {
            activeUsers[room] = {count: 1, ids: [socket.id]};

        // if room exits just add the id and increment count
        } else {
            activeUsers[room].count ++;
            activeUsers[room].ids.push(socket.id);
        }

        io.to(room).emit("update-active-users", activeUsers[socket.room].count)
        io.to(room).emit("user-joined-room", JOIN_ROOM_MESSAGE(room, username))
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

})


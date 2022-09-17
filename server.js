

const chats = {};
const MAX_CHAT_MESSAGES = 40;

function saveMessage(room, message) {
    if (chats[room] === undefined) {
        chats[room] = [];
    }
    chats[room].push(message);

    if (chats[room].length > MAX_CHAT_MESSAGES) {
        chats[room] = chats[room].slice(0, message.length - MAX_CHAT_MESSAGES);
    }
}

function getMessages(room) {
    if (chats[room] === undefined) {
        chats[room] = [];
    }
    return chats[room];
}


const io = require("socket.io")(3020, {
    cors : {
        origin: "*"
    }
})
console.log("Server running");

// keeps count of active users in rooms
// {room : [socketsID], count}
const activeUsers = {};

// shortcut
const keys = (obj) => Object.keys(obj);

io.on("connection", socket => {

    socket.on("disconnect", () => {
        if (! socket.room in keys(activeUsers)) return;
        if (! activeUsers[socket.room].ids.includes(socket.id)) return;

        activeUsers[socket.room].count --;
        activeUsers[socket.room].ids = activeUsers[socket.room].ids.filter(item => ( item !== socket.id) );

        io.to(socket.room).emit("update-active-users", activeUsers[socket.room].count);
    })

    socket.on("leave", room => {
        if (! socket.room in keys(activeUsers)) return;
        if (! activeUsers[socket.room].ids.includes(socket.id)) return;

        activeUsers[room].count --;
        activeUsers[room].ids = activeUsers[room].ids.filter(item => ( item !== socket.id) );

        io.to(room).emit("update-active-users", activeUsers[socket.room].count);
    })

    socket.on("join-room", room => {
        // leave other rooms
        var rooms = io.sockets.adapter.sids[socket.id]; for(var room in rooms) { socket.leave(room); }

        socket.join(room);
        socket.room = room;

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
    })
    
    socket.on("send-message", (message, room) => {
        // save message
        saveMessage(room, message)

        // message = {author: username, content: message}
        socket.to(room).emit("receive-message", message)
    })

    // recovering messages
    socket.on("request-messages", room => {
        io.to(socket.id).emit("get-messages", getMessages(room));
    })

})


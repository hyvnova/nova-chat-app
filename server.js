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


io.on("connection", socket => {

    socket.on("send-message", (message, room) => {
        // save message
        saveMessage(room, message)

        // message = {author: username, content: message}
        socket.to(room).emit("receive-message", message)
    })

    socket.on("join-room", room => {
        // leave other rooms
        var rooms = io.sockets.adapter.sids[socket.id]; for(var room in rooms) { socket.leave(room); }
        
        socket.join(room);
    })

    // recovering messages
    socket.on("request-messages", room => {
        io.to(socket.id).emit("get-messages", getMessages(room));
    })

})


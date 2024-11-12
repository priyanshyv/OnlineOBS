const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const { Server: SocketIO } = require('socket.io');
const server = http.createServer(app);
const io = new SocketIO(server);

//middleware jismey hamari html files n all aayengi
app.use(express.static(path.resolve('./public')));

io.on('connection',socket=>{
    console.log('Socket Connected',socket.id);
    socket.on('binarystream',stream=>{
        console.log('Binary stream is comming');
    })
    //ab mujhe iss stream ko ffmpeg ke uper through karna hai
    //parr agar mujhe ffmpeg ke through send karna hai toh meri machine pei ffmpeg install karna hoga
    //parr issue is agar mei apni machine pei ffmpeg install karunga toh bahut jyada time lagg jayega coz it is not that simple and also bahut saari problems aati hai
    //so yaha parr best senario kya hai ki yaha pei hamm use karenege Docker
})
server.listen(3000,()=>{
    console.log(`http server is running at port`)
})
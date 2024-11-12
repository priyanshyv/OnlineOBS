
const userVideo = document.getElementById('user-video');
const startButton = document.getElementById('start-btn');

const state = {media:null};
const socket = io();


startButton.addEventListener('click',()=>{
//start pei click hotey hi we want to that to send it to server(backend)->send through socket.io->backend will pass through ffmpeg send to rtmp server

//issue is kya mai mediaStream ko tcp ke through send kar sakta hu ,nope & rtmp is tcp based protocol
//toh mujhe iss stream ko real time mei record karna hoga and usey binary mei convert karna hoga
//or jo binary data hoga usey mujhe through karna hoga socket server ke uper
const mediaRecorder = new MediaRecorder(state.media,{
    //yaha hamm options provide karenge
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    framerate: 25
    //agar yaha ham bitrate increse kar dete hain toh cpu pei load increase hoga 
    //if the bitrate is less ,video laggy hoga
    })

    mediaRecorder.ondataavailable = ev => {
        console.log('Binary stream available',ev.data);
        // ab mujhe iss binary data ko socket server ke uper send karna hoga
        socket.emit('binarystream',ev.data);
    }

    mediaRecorder.start(25);
})

//jab bhi window load hota hai mujhe user ki video ko load karna hai
window.addEventListener('load', async e=>{
    const media=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    //issey mujhe user ka media mil jaayega
    //after all that mujhe iss media ko kahi pei store karna hai
    state.media = media;
    userVideo.srcObject = media;
    //jo above line of code hai usse user ki video ko display usey kudh ko show hogi
})

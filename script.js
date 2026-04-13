const video = document.getElementById("video")

const statusBox = document.getElementById("status")

const tokenBox = document.getElementById("tokenBox")


async function startCamera(){

const stream = await navigator.mediaDevices.getUserMedia({video:{}})

video.srcObject = stream

}

startCamera()


Promise.all([

faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models"),

faceapi.nets.faceLandmark68Net.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models"),

faceapi.nets.faceRecognitionNet.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models")

]).then(startDetection)



function generateToken(vector){

const weights = []

for(let i=0;i<vector.length;i++){

weights.push(Math.random())

}

let E = 0

for(let i=0;i<vector.length;i++){

E += vector[i]*weights[i]

}

const token = btoa(E.toString())

return token

}


function startDetection(){

setInterval(async ()=>{

const detection = await faceapi.detectSingleFace(

video,

new faceapi.TinyFaceDetectorOptions()

).withFaceLandmarks().withFaceDescriptor()


if(detection){

statusBox.innerText = "User Present — Session Active"

const vector = Array.from(detection.descriptor)

const token = generateToken(vector)

tokenBox.innerText = "Token: "+token

}
else{

statusBox.innerText = "User Absent — Session Locked"

tokenBox.innerText = "Token: invalid"

}

},2000)

}

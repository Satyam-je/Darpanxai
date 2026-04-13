const video = document.getElementById("video")
const statusBox = document.getElementById("status")
const tokenBox = document.getElementById("tokenBox")

async function startCamera(){
    const stream = await navigator.mediaDevices.getUserMedia({video:{}})
    video.srcObject = stream
}

startCamera()

async function loadModels(){

statusBox.innerText = "Loading AI models..."

await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models")
await faceapi.nets.faceLandmark68Net.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models")
await faceapi.nets.faceRecognitionNet.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models")

statusBox.innerText = "Models loaded. Detecting face..."

startDetection()

}

loadModels()


function generateToken(vector){

const weights = Array(vector.length).fill(0).map(()=>Math.random())

let E = 0

for(let i=0;i<vector.length;i++){
    E += vector[i]*weights[i]
}

const token = btoa(E.toString() + Date.now())

return token

}


function startDetection(){

setInterval(async ()=>{

const detection = await faceapi.detectSingleFace(
video,
new faceapi.TinyFaceDetectorOptions()
).withFaceLandmarks().withFaceDescriptor()

if(detection){

statusBox.innerText = "User detected — generating token..."

const vector = Array.from(detection.descriptor)

const token = generateToken(vector)

tokenBox.innerText = "Token Assigned:\n" + token

statusBox.innerText = "Session Active"

}
else{

statusBox.innerText = "No user detected — session locked"

tokenBox.innerText = "Token: invalid"

}

},2000)

}

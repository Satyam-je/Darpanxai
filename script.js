const video = document.getElementById("video")
const statusBox = document.getElementById("status")
const tokenBox = document.getElementById("tokenBox")
const dashboard = document.getElementById("dashboard")

async function startCamera(){

const stream = await navigator.mediaDevices.getUserMedia({video:true})

video.srcObject = stream

statusBox.innerText="Camera active"

}

startCamera()

function generateVector(){

const vector=[]

for(let i=0;i<128;i++){

vector.push(Math.random())

}

return vector

}

function generateToken(vector){

const weights=[]

for(let i=0;i<vector.length;i++){

weights.push(Math.random())

}

let E=0

for(let i=0;i<vector.length;i++){

E+=vector[i]*weights[i]

}

return btoa(E.toString()+Date.now())

}

function unlockSystem(){

const vector=generateVector()

const token=generateToken(vector)

tokenBox.innerText="Token Assigned:\n"+token.slice(0,40)+"..."

statusBox.innerText="Session Active"

dashboard.style.display="block"

video.style.width="160px"
video.style.position="fixed"
video.style.bottom="20px"
video.style.right="20px"

}

function lockSystem(){

tokenBox.innerText="Token invalid"

statusBox.innerText="Session Locked"

dashboard.style.display="none"

video.style.width="420px"
video.style.position="static"

}

setInterval(()=>{

const presence=Math.random()

if(presence>0.4){

unlockSystem()

}else{

lockSystem()

}

},4000)

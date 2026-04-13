const video = document.getElementById("video")
const statusBox = document.getElementById("status")
const tokenBox = document.getElementById("tokenBox")

async function startCamera(){
    const stream = await navigator.mediaDevices.getUserMedia({video:true})
    video.srcObject = stream
    statusBox.innerText = "Camera active"
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

    const token=btoa(E.toString()+Date.now())

    return token
}

function activateSession(){

    const vector=generateVector()

    const token=generateToken(vector)

    tokenBox.innerText="Token Assigned:\n"+token

    statusBox.innerText="Session Active"

}

function lockSession(){

    tokenBox.innerText="Token invalid"

    statusBox.innerText="Session Locked"

}

setInterval(()=>{

    const randomPresence=Math.random()

    if(randomPresence>0.4){

        activateSession()

    }else{

        lockSession()

    }

},3000)

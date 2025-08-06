let vpHeight = document.documentElement.clientHeight;
let vpWidth = document.documentElement.clientWidth;
const body = document.body;
const h1 = document.getElementsByTagName("h1")

if (vpHeight < vpWidth) {
    body.style.fontSize = "5vh" 
    h1[0].style.fontSize = "5vh"
} else {
    body.style.fontSize = "4vw" 
}
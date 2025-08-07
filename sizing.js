let vp = document.documentElement;
const body = document.body;
const h1 = document.getElementsByTagName("h1")

function changeScale() {
    if (vp.clientHeight < vp.clientWidth) {
        body.style.fontSize = "5vw" 
        h1[0].style.fontSize = "5vw"
    } else {
        body.style.fontSize = "7vh" 
        h1[0].style.fontSize = "5vh"
    }
}

changeScale()
window.addEventListener("resize", function() {
    console.log("resize");
    changeScale();
});
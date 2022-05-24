

function addJs() {
    
    var file = chrome.runtime.getURL('html2canvas.min.js')
    var s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = file
    document.documentElement.appendChild(s)
}
addJs()
setTimeout(() => {
    html2canvas(document.querySelector("#app")).then((canvas) => {
        document.body.appendChild(canvas);
      });
}, 7000);
console.log("content.js loaded");

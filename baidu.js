console.log("baidu extension load");

function createBtns() {
  for (
    let i = 0;
    i < document.querySelectorAll(".c-title.t.tts-title").length;
    i++
  ) {
    let p = document.createElement("button");
    p.innerHTML = "添加";
    p.className = "btn";
    $(p).click(function () {
      // console.log($(this).parents(".c-container").find("a").text());
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        document.body.appendChild(canvas);
      });
    });

    document.querySelectorAll(".c-title.t.t.tts-title")[i].appendChild(p);
  }
}
createBtns();

// This line is new!
// chrome.runtime.sendMessage({
//   message: "open_new_tab",
//   url: "http://www.iapplus.com",
// });
// $(function () {
//   createBtns();

// setTimeout(() => {
//   createBtns();
// }, 1000);
// });
// });

chrome.storage.local.set({ userInfo: "wangpengyu" }, function () {
  console.log("存储成功");
});

chrome.storage.local.get(["userInfo"], function (result) {
  console.log("result: ", result);
});

// chrome.runtime.sendMessage({name:"wangpengyu"},function(){
//   alert("发送成功")
// })

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.greeting);
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "Hello")
    sendResponse({ farewell: document.querySelector("#bottom_layer > div > p:nth-child(1) > a").text });
})

// 在页面脚本 content script 建立长连接的信息通道
let port = chrome.runtime.connect({ name: "knockknock" });
// 通过该端口发送信息
port.postMessage({ joke: "Knock knock" });
// 设置事件监听器，通过该端口接收信息，将接收到的信息作为入参
port.onMessage.addListener(function (msg) {
  console.log(msg);
  if (msg.question === "Who's there?") port.postMessage({ answer: "Madame" });
  else if (msg.question === "Madame who?")
    port.postMessage({ answer: "Madame... Bovary" });
});

chrome.runtime.sendMessage(
  { message: "abcdef", data: "abcdef1111111111111" },
  function (response) {
    console.log(response);
  }
);

function injectCustomJs() {
  // let jsPath = 'test.js';

  let jsPath = "html2canvas.min.js";

  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.runtime.getURL(jsPath);
  temp.onload = function () {
    // 执行完后移除掉
    this.parentNode.removeChild(this);
  };
  // 挂载
  document.head.appendChild(temp);
}

injectCustomJs();

convertBlobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

// dom转换图片，给后台发送消息
domtoimage
  .toBlob(document.querySelector("#s_lg_img_new"))
  .then(async function (blob) {
    // console.log(blob)
    // var reader = new FileReader();
    // reader.readAsArrayBuffer(blob);
    // reader.onload = function () {
    //   console.log(JSON.stringify(this.result))
    //   chrome.runtime.sendMessage(
    //     { message: "imageBlob", data: JSON.stringify(this.result) },
    //     function (response) {
    //       console.log(response);
    //     }
    //   );
    // };

    const base64String = await convertBlobToBase64(blob);
    console.log(base64String);
    chrome.runtime.sendMessage(
      { message: "imageBlob", data: base64String },
      function (response) {
        console.log(response);
      }
    );
  });

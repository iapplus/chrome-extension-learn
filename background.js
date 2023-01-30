// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "open_new_tab") {
//     chrome.tabs.create({ url: request.url });
//   }
// });

const openId = "open-incognito";
const openAndCloseId = "open-incognito-close";

var amazonAsinList = []

function onClickHandler(info, tab) {
  chrome.windows.create({
    url: tab.url,
    incognito: !tab.incognito,
    focused: true,
    state: "maximized",
  });

  if (info.menuItemId == openAndCloseId) {
    chrome.tabs.remove(tab.id);
  }
}

// for toolbar button
chrome.action.onClicked.addListener(function (tab) {
  chrome.windows.create({
    url: tab.url,
    incognito: !tab.incognito,
    focused: true,
    state: "maximized",
  });
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.contextMenus.create({
  title: "无痕模式打开",
  contexts: ["page"],
  id: openId,
});

chrome.contextMenus.create({
  title: "无痕模式打开(同时关闭当前页)",
  contexts: ["page"],
  id: openAndCloseId,
});

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request); // 发送的消息
//     console.log(sender); // 发送者的信息，tabs相关信息
//     // console.log(sendResponse); // 回调函数，回调给发送者的
//     sendResponse(sender);// 这里将tab信息发送给发送者
// })


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("background 收到消息",request);
    //
    if (request.message === "requestAmazonRank") {
      sendResponse({ message: amazonAsinList });
    }

    if (request.message ==="imageBlob"){
      const formData = new FormData();
      
      // formData.append("image_file", Buffer.from(request.data, "base64"), "test.png");
      // formData.append("image_file", request.data, "test.png");
      formData.append("image_file",request.data)
      const url = "http://127.0.0.1:8000/blog/upload_file";
      const resp = fetch(url, {
        method: "POST",
        body: formData, // 自动修改请求头, formdata的默认请求头的格式是 multipart / form - data
      }).then((res) => {
        console.log(res);
      });
      sendResponse({ message: 'ok' })
    }

    if (request.message === "messageSent") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://127.0.0.1:8000/blog/create_customer?json_data=" +
          JSON.stringify(request.data),
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      sendResponse({ message: "hi to you" });
    }
    // 更新客户信息
    if (request.message === "sendCustomerInfo") {
      var formdata = new FormData();
      formdata.append("json_data", JSON.stringify(request.data));

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("http://127.0.0.1:8000/blog/update_customer", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      sendResponse({ message: "提交成功" });
    }

    // 亚马逊排名存储
    if (request.message === "amazonAsinList") {
      console.log(request.data,request.page)
      amazonAsinList.push([request.data,request.page,request.rankType])
      sendResponse({ message: "提交成功" });
    }
    // 亚马逊排名数组清空
    if (request.message === "amazonAsinListClean") {
      amazonAsinList=[]
      sendResponse({ message: "清空成功" });
    }
  }
);

// chrome.runtime.onConnect.addListener(function (port) {
//   console.log('port',port)
//   port.onMessage.addListener(function (msg) {
//     port.postMessage(result)
//     // if (msg.refresh === "refresh")
//       // var requestOptions = {
//       //   method: "GET",
//       //   redirect: "follow",
//       // };
//       // fetch("http://127.0.0.1:8000/blog/get_customer", requestOptions)
//       // .then((response) => response.text())
//       // .then((result) => port.postMessage(result))
//       // .catch((error) => console.log("error", error));
//   });
// });


function showStayHydratedNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'stay_hydrated.png',
    title: 'Time to Hydrate',
    message: 'Everyday I\'m Guzzlin\'!',
    buttons: [
      { title: 'Keep it Flowing.' }
    ],
    priority: 0
  });
}

// showStayHydratedNotification()



// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, postData, function (response) {
//       log('response: ', response)
//   })
// })

// chrome.tabs.query({}, tabs => {
//   log('当前浏览器打开的页面列表： ', tabs)
//   // let isExist = false
//   // let tabIndex = ''
//   // let highlighted = false
//   // for (let i = 0; i < tabs.length; i++) {
//   //     const tab = tabs[i]
//   //     if (tab.url && tab.url.indexOf(targetUrl) !== -1) {
//   //         isExist = true
//   //         tabIndex = tab.index
//   //         highlighted = tab.highlighted
//   //     }
//   // }
// })

// chrome.storage.local.set({ userInfo: "wangpengyu" }, function () {
//   console.log('存储成功')
//   sendResponse({ message: "提交成功" })
// })

// chrome.storage.local.get(['userInfo'], function (result) {
// 	console.log('result: ', result)
//   sendResponse({ message: result })
// })


// 定义颜色
let color = 'red';

// 首次安装插件、插件更新、chrome浏览器更新时触发
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('插件默认颜色为: %c #3aa757', `color: ${color}`);
});

chrome.storage.sync.set({ color });
console.log('插件默认颜色为: %c #3aa757', `color: ${color}`);

// chrome.runtime.onMessage.addListener((req,sender, sendResponse) => {
//   sendResponse('我收到了你的来信')
//   console.log('接收了来自 content.js的消息', req.info)
// })

// 通知创建
// chrome.notifications.create({
//   type: 'basic',
//   iconUrl: 'icon.png',
//   title: '温馨提示',
//   message: '太累了就休息会儿吧',
//   buttons: [
//     { title: '好的' }
//   ],
//   priority: 0
// })

function injectedFunction() {
  document.body.style.backgroundColor = 'orange';
}
// chrome.scripting.executeScript({
//   target: { tabId: tab.id },
//   func: injectedFunction
// })


// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     console.log(details)
//      return {cancel: true}; 
//     },
//   {urls: ["*://www.evil.com/*"]},
//   ["blocking"]
// );


chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log("background 收到消息",msg);
    if (msg.joke === "Knock knock")
      port.postMessage({ question: "Who's there?" });
    else if (msg.answer === "Madame")
      port.postMessage({ question: "Madame who?" });
    else if (msg.answer === "Madame... Bovary")
      port.postMessage({ question: "I don't get it." });
  });
});






chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
  console.log("页面刷新")
      // chrome.tabs.sendMessage(tabId,{type:\'tabUpdate\', tab:tab}, function(response)
});


// var views = chrome.extension.getViews({type:'popup'});
// if(views.length > 0) {
//     console.log("popup",views[0].location.href);
// }

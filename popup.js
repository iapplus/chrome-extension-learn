// chrome.storage.local存储功能
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
  console.log(color);
});
chrome.storage.local.set({ key: "value local" }, function () {
  console.log("Value is set to " + value);
});

chrome.storage.local.get(["key"], function (result) {
  console.log("Value currently is " + result.key);
});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   alert(JSON.stringify(message)) //这里获取消息
// })
function injectedFunction() {
  document.body.style.backgroundColor = "orange";
}
// const bg = chrome.extension.getBackgroundPage()
document.getElementById("changeColor").onclick = async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  console.log(tab);

  // const url = new URL(tab[0].url)
  // chrome.cookies.getAll({
  //     domain: url.host,
  //   },(cookies) => {
  //     console.log(cookies)
  //     cookies.map((c) => {})
  //   })

  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "Hello" });
  console.log(response.farewell);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectedFunction,
  });
  // popup执行脚本到网页
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"]
  });
};

document.getElementById("search").onclick = async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  // 执行注入脚本可以传递参数
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: keyword => {
      document.getElementById("twotabsearchtextbox").value = keyword
      document.getElementById("nav-search-submit-button").click()
    },
    args: [document.getElementById("keyword").value]
  })

  chrome.storage.local.set({ amazon_crawler_status: 'start' }, function () {
    console.log("存储成功")
  });
}



chrome.action.setBadgeText({ text: "14" });
chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("收到来自content-script的消息：");
  console.log(request, sender, sendResponse);
  sendResponse("我是popup后台，我已收到你的消息：" + JSON.stringify(request));
});

// 拓展的页面popup页面显示后的事件
window.onload = async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, { greeting: "Hello" });
  console.log(response.farewell);
  document.querySelector("#abcdef").innerText = response.farewell;
};
// 向后台请求数据
document.querySelector("#requestAmazonRank").onclick = function () {
  chrome.runtime.sendMessage(
    { message: "requestAmazonRank"},
    function (response) {
      console.log("popupjs打印消息",response)
      for(let i=0;i<response.length;i++){
        document.getElementById("rankList").appendChild(()=>{
          let li_ele = document.createElement("li")
          li_ele.innerText = nodeValue
          return li_ele
        })
      }
    }
  )
}

// 点击按钮导出文件的功能
document.querySelector("#exportExcel").onclick = function () {

  var elink = document.createElement("a");
  var blob = new Blob(["abcdef"]);
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  elink.setAttribute("download", "文件名" + ".csv"); // 设置下载文件名称
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href);
  elink.remove();

  // 导出Excel
  // const workbook = new ExcelJS.Workbook();
  // let worksheet = workbook.addWorksheet("My Sheet");
  // worksheet.columns = [
  //   { header: "A", key: "id" },
  //   { header: "B", key: "dob" },
  //   { header: "B", key: "name" },
  // ];
  // worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });

  // // iterate over all current cells in this column including empty cells
  // const dobCol = worksheet.getColumn(2);
  // dobCol.eachCell({ includeEmpty: true }, function (cell /*rowNumber*/) {
  //   cell.font = {
  //     name: "Arial Black",
  //     color: { argb: "FF00FF00" },
  //     family: 2,
  //     size: 14,
  //     italic: true,
  //   };
  // });

  // workbook.xlsx
  //   .writeBuffer()
  //   .then((buffer) => {
  //     // saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`)
  //     var elink = document.createElement("a");
  //     var blob = new Blob([buffer]);
  //     elink.style.display = "none";
  //     elink.href = URL.createObjectURL(blob);
  //     elink.setAttribute("download", "文件名" + ".csv"); // 设置下载文件名称
  //     document.body.appendChild(elink);
  //     elink.click();
  //     URL.revokeObjectURL(elink.href);
  //   })
  //   .catch((err) => console.log("Error writing excel export", err));
}
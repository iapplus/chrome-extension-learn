// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "open_new_tab") {
//     chrome.tabs.create({ url: request.url });
//   }
// });

const openId = "open-incognito";
const openAndCloseId = "open-incognito-close";

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


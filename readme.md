{
  "manifest_version": 3,
  "name": "阿里巴巴客户导出工具",
  "description": "导出客户",
  "icons": {
    "16": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  "version": "0.1",
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "run-at":"document_end",
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    },
    {
      "matches": ["https://blog.csdn.net/*"],
      "js": ["csdn.js"]
    },
    {
      "matches": ["https://www.baidu.com/*"],
      "js": ["html2canvas.min.js","jquery.min.js", "baidu.js"],
      "css": ["style.css"]
    }
  ],
  "permissions": ["contextMenus", "tabs", "notifications", "activeTab"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "web_accessible_resources": [{
    "resources": ["html2canvas.min.js"],
    "matches": ["<all_urls>"]
  }]
}

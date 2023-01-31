// function addJs() {

//     var file = chrome.runtime.getURL('html2canvas.min.js')
//     var s = document.createElement('script')
//     s.type = 'text/javascript'
//     s.src = file
//     document.documentElement.appendChild(s)
// }
// addJs()
// setTimeout(() => {
//     html2canvas(document.querySelector("#app")).then((canvas) => {
//         document.body.appendChild(canvas);
//       });
// }, 7000);
console.log("content.js loaded");

function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
let taobaoToken = getCookie("_tb_token_");

function crawler_customer_list(page_num,sales_id) {
  fetch(
    "https://alicrm.alibaba.com/eggCrmQn/crm/customerQueryServiceI/queryCustomerList.json?_tb_token_=" +
      taobaoToken,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "bx-v": "2.2.3",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer:
        "https://alicrm.alibaba.com/?spm=a2700.7756200.0.0.739371d2FNvGIt",
      referrerPolicy: "strict-origin-when-cross-origin",
      // body:
      //   '{"jsonArray":"[]","orderDescs":[{"col":"opp_gmt_modified","asc":false}],"pageNum":' +
      //   page_num +
      //   ',"pageSize":10}',
      body:JSON.stringify({
        // "jsonArray": sales_id,
        "orderDescs": [
            {
                "col": "opp_gmt_modified",
                "asc": false
            }
        ],
        "pageNum": page_num,
        "pageSize": 10
    }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      chrome.runtime.sendMessage(
        { message: "messageSent", data: myJson.data.data },
        function (response) {
          console.log(response);
        }
      );
      console.log(myJson);
    });
}

let sales = [
  // "[{\"id\":\"669\",\"sales_id\":\"CRMc94fe64bd7db473086b9e7f2bea27\"}]",
  // "[{\"id\":\"669\",\"sales_id\":\"CRM2ab79305623d44998aea3e11c4d58\"}]",
  // "[{\"id\":\"669\",\"sales_id\":\"CRM37d33a6ba6af40048180a7e5e4d15\"}]",
  // "[{\"id\":\"669\",\"sales_id\":\"CRM0f1fb5ca9ecb41b795324b5ad6f21\"}]",
  // "[{\"id\":\"669\",\"sales_id\":\"CRM680094a00a40409e95f6a103ff9a2\"}]",
  // "[{\"id\":\"669\",\"sales_id\":\"CRM21693a0b9b4543f69a35cb2f19f83\"}]"
]
// for (let page = 0; page <= 330; page++) {
//   (function (a) {
//     setTimeout(() => {
//       crawler_customer_list(page,sales[0])
//     }, 1500 * page);
//   })(page)
// }

// var info1
// var info2
// setTimeout(() => {
//   info1 = document.evaluate("//div[@class='customer-detail-last-behavior']",document).iterateNext().innerText.split('\n')
//   info2 = document.evaluate("//div[@class='customer-profile']",document).iterateNext().innerText.split('\n')
// }, 2000);
// console.log(info1,info2)
var customerDetails = {
  customerId: "",
  产品浏览数: "",
  有效询盘: "0",
  有效RFQ数: "0",
  登录天数: "0",
  垃圾询盘数: "0",
  被加为黑名单数: "0",
  最常采购行业: "",
  采购品类: "",
  商业类型: "",
  年采购额: "",
  注册时间: "",
  建档时间: "",
  公司名称: "",
  官方网站: "",
  传真: "",
  经营地址: "",
  姓名: "",
  邮箱: "",
  邮箱验证: "",
  手机: "-",
  座机: "",
  社交账号: "",
  职位: "",
  性别: "",
  备注: "",
  国家: "",
  买家ID:"",
  客户来源:"",
  客户阶段:""
};

function getCustomerId() {
  return window.location.href.split("?")[2].split("&")[0].split("=")[1];
}

function getCustomer() {
  setTimeout(() => {
    var x = document
      .evaluate("//div[@class='crm-app-main']", document)
      .iterateNext()
      .innerText.split("\n");
    var info2 = document
      .evaluate("//div[@class='customer-profile']", document)
      .iterateNext()
      .innerText.split("\n");

    customerDetails["customerId"] = getCustomerId();
    console.log(info2);

    for (let index = 0; index < x.length; index++) {
      if (x[index].indexOf("产品浏览数") != -1) {
        customerDetails["产品浏览数"] = x[index - 1];
      }
      if (x[index].indexOf("有效询盘") != -1) {
        customerDetails["有效询盘"] = x[index - 1];
      }
      if (x[index].indexOf("有效RFQ数") != -1) {
        customerDetails["有效RFQ数"] = x[index - 1];
      }
      if (x[index].indexOf("登录天数") != -1) {
        customerDetails["登录天数"] = x[index - 1];
      }
      if (x[index].indexOf("垃圾询盘数") != -1) {
        customerDetails["垃圾询盘数"] = x[index - 1];
      }
      if (x[index].indexOf("被加为黑名单数") != -1) {
        customerDetails["被加为黑名单数"] = x[index - 1];
      }
      if (x[index].indexOf("最常采购行业") != -1) {
        customerDetails["最常采购行业"] = x[index + 1];
      }
      if (x[index].indexOf("客户阶段") != -1) {
        customerDetails["客户阶段"] = x[index + 1]
      }
      if (x[index].indexOf("有效询盘") != -1) {
        customerDetails["有效询盘"] = x[index - 1];
      }
      if (x[index].indexOf("有效询盘") != -1) {
        customerDetails["有效询盘"] = x[index - 1];
      }
    }
    for (let index = 0; index < info2.length; index++) {
      if (info2[index].indexOf("注册时间") != -1) {
        customerDetails["注册时间"] = info2[index].replace("注册时间", "");
      }
      if (info2[index].indexOf("建档时间") != -1) {
        customerDetails["建档时间"] = info2[index].replace("建档时间", "");
      }
      if (info2[index].indexOf("年采购额") != -1) {
        customerDetails["年采购额"] = info2[index].replace("年采购额", "");
      }
      if (info2[index].indexOf("商业类型") != -1) {
        customerDetails["商业类型"] = info2[index].replace("商业类型", "");
      }
      if (info2[index].indexOf("采购品类") != -1) {
        customerDetails["采购品类"] = info2[index].replace("采购品类", "");
      }
      if (info2[index].indexOf("公司名称") != -1) {
        customerDetails["公司名称"] = info2[index].replace("公司名称", "");
      }
      if (info2[index].indexOf("官方网站") != -1) {
        customerDetails["官方网站"] = info2[index].replace("官方网站", "");
      }
      if (info2[index].indexOf("传真") != -1) {
        customerDetails["传真"] = info2[index].replace("传真", "");
      }
      if (info2[index].indexOf("经营地址") != -1) {
        customerDetails["经营地址"] = info2[index + 1];
      }
      if (info2[index].indexOf("客户来源") != -1) {
        customerDetails["客户来源"] = info2[index].replace("客户来源", "")
      }
      

      let field = [
        "姓名",
        "邮箱",
        "邮箱验证",
        "手机",
        "座机",
        "社交账号",
        "职位",
        "性别",
        "备注",
      ];
      for (let filed_index = 0; filed_index < field.length; filed_index++) {
        if (info2[index] == field[filed_index]) {
          customerDetails[field[filed_index]] = info2[index + 1];
        }
      }
    }
    // 获取国家代码
    fetch(
      "https://alicrm.alibaba.com/eggCrmQn/crm/customerQueryServiceI/queryCustomerAndContacts.json?customerId=" +
        getCustomerId() +
        "&_tb_token_=" +
        taobaoToken,
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "zh-CN,zh;q=0.9",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "upgrade-insecure-requests": "1",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson.data.customerDetailCO.country);
        customerDetails["国家"] = myJson.data.customerDetailCO.country;


        fetch(
          "https://alicrm.alibaba.com/eggCrmQn/crm/customerQueryServiceI/queryCustomerAndContacts.json?customerId=" +
            getCustomerId() +
            "&_tb_token_=" +
            taobaoToken,
          {
            headers: {
              accept: "*/*",
              "accept-language": "zh-CN,zh;q=0.9",
              "bx-v": "2.2.3",
              "cache-control": "no-cache",
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              pragma: "no-cache",
              "sec-ch-ua":
                '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"macOS"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrer: "https://alicrm.alibaba.com/?spm=a278r.12126321.0.0",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            let id = myJson.data.contactQueryCOList[0].loginId
            customerDetails["用户ID"] = id;
            chrome.runtime.sendMessage(
              { message: "sendCustomerInfo", data: customerDetails },
              function (response) {
                console.log(response);
              }
            );
          });


        // console.log(myJson.data.data.customerDetailCO.country);
      });
    console.log(customerDetails);
    //获取客户ID
  }, 2300);
}

// getCustomer();

// let port = chrome.runtime.connect({name: "refresh"});

// setInterval(() => {
//   console.log('已经发送')
//   port.postMessage({refresh: "refresh"});
// }, 3000);
// // 设置事件监听器，通过该端口接收信息，将接收到的信息作为入参
// port.onMessage.addListener(function(msg) {
//   console.log(msg)
//   // if (msg.question === "Who's there?")
//   //   port.postMessage({answer: "Madame"});
//   // else if (msg.question === "Madame who?")
//   //   port.postMessage({answer: "Madame... Bovary"});
// });

if ("WebSocket" in window) {
  const ws = new WebSocket("ws://127.0.0.1:8003");
  ws.onopen = function () {
    ws.send("发送数据");
    console.log("数据发送中...");
  };

  ws.onmessage = function (evt) {
    let data = evt.data;
    let url =
      "https://alicrm.alibaba.com/?spm=a278r.12126321.0.0#customer-detail?customerId=" +
      data;
    console.log(">>", url);
    console.log("数据已接收...", data);
    window.location.href = url;
    getCustomer();
  };
  ws.onclose = function () {
    console.log("连接已关闭...");
  };
} else {
  alert("browser 不支持 WebSocket!");
}


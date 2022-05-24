console.log("baidu extension load")


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
        html2canvas(document.querySelector("#capture")).then(canvas => {
          document.body.appendChild(canvas)
        });
      });
  
      document.querySelectorAll(".c-title.t.t.tts-title")[i].appendChild(p);
    }
  }
  createBtns()
  
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
console.log("csdn extension loaded!");
alert(1)
document.designMode="On"
function createBtns() {
  for (
    let i = 0;
    i < document.querySelectorAll(".c-title.t.tts-title").length;
    i++
  ) {
    let p = document.createElement("button");
    p.innerHTML = "添加a";
    p.className = "btn";
    $(p).click(function () {
      console.log($(this).parents(".c-container").find("a").text());
    });

    document.querySelectorAll(".c-title.t.t.tts-title")[i].appendChild(p);
  }
}

// This line is new!
// chrome.runtime.sendMessage({
//   message: "open_new_tab",
//   url: "http://www.iapplus.com",
// });

$(function () {
  createBtns();
  $("#su").click(function () {
    setTimeout(() => {
      createBtns();
    }, 1000);
  });
});

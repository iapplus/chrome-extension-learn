

setInterval(() => {
    chrome.storage.local.get(["amazon_crawler_status"], function (result) {
        if (result.amazon_crawler_status == 'start') {
            let currentPage = document.querySelector(".s-pagination-selected").innerText;
            if (parseInt(currentPage) <= 5) {
                
                chrome.runtime.sendMessage({message: "amazonAsinListClean"})
                var shop_list = document.querySelectorAll(
                    ".s-search-results>div:not([data-asin=''])"
                );
                for (let i = 0; i < shop_list.length; i++) {
                    let nodeValue = shop_list[i].attributes["data-asin"].nodeValue;
                    let rankType;
                    if (
                        document.querySelectorAll(".s-search-results>div:not([data-asin=''])")
                        [i].querySelector(".s-label-popover.s-sponsored-label-text") ==
                        undefined
                    ) {
                        rankType = "nature";
                    } else {
                        rankType = "ads";
                    }
                    console.log(nodeValue, i, rankType);
                    chrome.runtime.sendMessage({
                        message: "amazonAsinList",
                        data: nodeValue,
                        page: currentPage,
                        rankType: rankType,
                    },
                        function (response) {
                            console.log(response);
                        }
                    )
                }
                document.querySelector(".s-pagination-next").click();
                window.location.reload()
            }else{
                chrome.storage.local.set({ amazon_crawler_status: 'stop' }, function () {
                    console.log("存储成功")
                  });
            }
        }
    });
}, 1500)

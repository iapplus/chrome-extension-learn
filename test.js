function aaa(){
    console.log("aaa")
}





var blob = new Blob([JSON.stringify([0,1,2])], {type : 'application/json'})
var fileOfBlob = new File([blob], 'aFileName.json')

const formData = new FormData()
form.append("image_file", fileOfBlob,'test,png')
const url = "xxxx.xxx.xxxx";
const resp = await fetch(url, {
    method: "POST",
    body: formData // 自动修改请求头, formdata的默认请求头的格式是 multipart / form - data
})

const res = await resp.json()
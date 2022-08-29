// 请求地址
const requestUrl = 'http://localhost:9999'

const xhr = new XMLHttpRequest()

// 请求是否发送成功
const onreadystatechange = (resolve) => {
    return () => {
        if (xhr.readyState !== 4) return
        if (!(xhr.status >= 200 && xhr.status < 300)) return
        resolve(JSON.parse(xhr.responseText))
    }
}

const post = (url, data) => new Promise(resolve => {
    xhr.open("POST", `${requestUrl}${url}`)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = onreadystatechange(resolve)
    xhr.send(data)
})

export { post }
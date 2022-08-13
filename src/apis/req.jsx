const requestUrl = 'http://localhost:9999'
const xhr = new XMLHttpRequest()
const get = (data) => new Promise(resolve => {
    xhr.open("POST", `${requestUrl}/export`)
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return
        if (!(xhr.status >= 200 && xhr.status < 300)) return
        resolve(JSON.parse(xhr.responseText))
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(data)
})

const req = { get }

export default req
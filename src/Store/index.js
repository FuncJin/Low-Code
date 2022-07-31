import libs from '../components/Libs'

// key值始终固定
const key = 123456789
const map = new Map(libs)
const store = {
    getItem() {
        const str = window.localStorage.getItem(key) || '[]'
        const data = JSON.parse(str)
        const result = data.map(v => {
            const [classify, comp] = v.afterRender.split(' ')
            const el = map.get(classify)[comp].el
            v.el = el
            return v
        })
        return result
    },
    setItem(data) {
        window.localStorage.setItem(key, JSON.stringify(data))
    },
    remove() {
        window.localStorage.removeItem(key)
    },
}

export default store

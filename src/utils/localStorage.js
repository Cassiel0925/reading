//导入
import Storage from 'web-storage-cache'
//创建localStorage变量 通过new Storage 实例化
const localStorage = new Storage()
    //localStorage的基本操作

//1. 写入
export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}
//2. 获取
export function getLocalStorage(key) {
    return localStorage.get(key)
}
//3. 删除
export function removeLocalStorage(key) {
    return localStorage.delete(key)
}
//4. 清除全部
export function clearLocalStorage() {
    return localStorage.clear()
}

// 离线存储语言切换
export function getLocale() {
    return getLocalStorage('locale')
}

export function saveLocale(locale) {
    return setLocalStorage('locale', locale)
}

// 书架
export function getBookShelf() {
    return getLocalStorage('shelf')
}

export function saveBookShelf(shelf) {
    return setLocalStorage('shelf', shelf)
}

// --------------------- ebook ----------------------
export function setBookObject(fileName, key, value) {
    let book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
    let book = getLocalStorage(`${fileName}-info`)
    if (book) {
        return book[key]
    } else {
        return null
    }
}

// 离线存储字号
export function getFontSize(fileName) {
    return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
    return setBookObject(fileName, 'fontSize', fontSize)
}

// 离线存储字体
export function getFontFamily(fileName) {
    return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName, font) {
    return setBookObject(fileName, 'fontFamily', font)
}

// 离线存储主题设置
export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
    return setBookObject(fileName, 'theme', theme)
}

// 离线存储进度
export function getLocation(fileName) {
    return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
    return setBookObject(fileName, 'location', location)
}

// 阅读时间
export function getReadTime(fileName) {
    return getBookObject(fileName, 'readTime')
}

export function saveReadTime(fileName, readTime) {
    return setBookObject(fileName, 'readTime', readTime)
}

// 书签
export function getBookmark(fileName) {
    return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
    return setBookObject(fileName, 'bookmark', bookmark)
}
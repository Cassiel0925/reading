import axios from 'axios'
import { setLocalForage } from 'utils/localForage'

export function home() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/home`
    })
}

export function list() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/list`
    })
}

export function shelf() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
    })
}

export function download(book, onSuccess, onError, onProgress) {
    if (!onProgress) {
        onProgress = onError
        onError = null
    }
    return axios.create({
            baseURL: process.env.VUE_APP_EPUB_URL,
            method: 'get',
            responseType: 'blob',
            timeout: 180 * 1000,
            onDownloadProgress: progressEvent => {
                if (onProgress) onProgress(progressEvent)
            }
        }).get(`${book.categoryText}/${book.fileName}.epub`)
        .then(res => {
            const blob = new Blob([res.data])
            setLocalForage(book.fileName, blob, () => {
                if (onSuccess) onSuccess(book)
            }, err => {
                if (onError) onError(err)
            })
        }).catch(err => {
            if (onError) onError(err)
        })
}

export function detail(book) {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/detail`,
        params: {
            fileName: book.fileName
        }
    })
}

export function categories() {
    return axios({
        method: 'get',
        url: `${process.env.VUE_APP_BASE_URL}/book/categories`,
    })
}

export function login(ruleForm) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/login`,
        params: {
            phone: ruleForm.phone,
            password: ruleForm.password
        }
    })
}

export function enroll(ruleForm) {
    return axios({
        method: 'post',
        url: `${process.env.VUE_APP_BASE_URL}/addUser`,
        params: {
            username: ruleForm.username,
            mobile: ruleForm.mobile,
            enrollPassword: ruleForm.enrollPassword
        }
    })
}
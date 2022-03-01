const login = {
    state: {
        loginPage: false,
        avatar: window.localStorage.getItem('avatar'),
        username: window.localStorage.getItem('username'),
        loginSuccess: false,
        token: window.localStorage.getItem('token')
    },
    mutations: {
        'SET_LOGINPAGE': (state, loginPage) => {
            state.loginPage = loginPage
        },
        'SET_AVATAR': (state, avatar) => {
            state.avatar = avatar
            window.localStorage.setItem('avatar', avatar)
        },
        'SET_USERNAME': (state, username) => {
            state.username = username
            window.localStorage.setItem('username', username)
        },
        'SET_LOGINSUCCESS': (state, loginSuccess) => {
            state.loginSuccess = loginSuccess
        },
        'SET_TOKEN': (state, token) => {
            state.token = token
            window.localStorage.setItem('token', token)
        },

    }
}

export default login
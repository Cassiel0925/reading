const actions = {
    setOffsetY: ({ commit }, offsetY) => {
        return commit('SET_OFFSET_Y', offsetY)
    },
    setIsEditMode: ({ commit }, isEditMode) => {
        return commit('SET_IS_EDIT_MODE', isEditMode)
    },
    setShelfTitleVisible: ({ commit }, shelfTitleVisible) => {
        return commit('SET_SHELF_TITLE_VISIBLE', shelfTitleVisible)
    },
    setShelfList: ({ commit }, shelfList) => {
        return commit('SET_SHELF_LIST', shelfList)
    },
    setShelfSelected: ({ commit }, shelfSelected) => {
        return commit('SET_SHELF_SELECTED', shelfSelected)
    },
    setCurrentType: ({ commit }, currentType) => {
        return commit('SET_CURRENT_TYPE', currentType)
    },
    setShelfCategory: ({ commit }, shelfCategory) => {
        return commit('SET_SHELF_CATEGORY', shelfCategory)
    },
    // book
    setFileName: ({ commit }, fileName) => {
        return commit('SET_FILENAME', fileName)
    },
    setIsTitleAndFooterVisible: ({ commit }, isTitleAndFooterVisible) => {
        return commit('SET_TITLE_AND_FOOTER_VISIBLE', isTitleAndFooterVisible)
    },
    setEbookPage: ({ commit }, ebookPage) => {
        return commit('SET_EBOOK_PAGE', ebookPage)
    },
    setSettingVisible: ({ commit }, settingVisible) => {
        return commit('SET_SETTINGVISIBLE', settingVisible)
    },
    setDefaultFontSize: ({ commit }, defaultFontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
    },
    setCurrentBook: ({ commit }, currentBook) => {
        return commit('SET_CURRENTBOOK', currentBook)
    },
    setDefaultFontFamily: ({ commit }, defaultFontFamily) => {
        return commit('SET_DEFAULT_FONT_FAMILY', defaultFontFamily)
    },
    setFontFamilyVisible: ({ commit }, fontFamilyVisible) => {
        return commit('SET_FONT_FAMILY_VISIBLE', fontFamilyVisible)
    },
    setDefaultTheme: ({ commit }, defaultTheme) => {
        return commit('SET_DEFAULT_THEME', defaultTheme)
    },
    setProgress: ({ commit }, progress) => {
        return commit('SET_PROGRESS', progress)
    },
    setBookAvailable: ({ commit }, bookAvailable) => {
        return commit('SET_BOOKAVAILBLE', bookAvailable)
    },
    setSection: ({ commit }, section) => {
        return commit('SET_SECTION', section)
    },
    setCover: ({ commit }, cover) => {
        return commit('SET_COVER', cover)
    },
    setMetadata: ({ commit }, metadata) => {
        return commit('SET_METADATA', metadata)
    },
    setNavigation: ({ commit }, navigation) => {
        return commit('SET_NAVIGATION', navigation)
    },
    setIsBookmark: ({ commit }, isBookmark) => {
        return commit('SET_IS_BOOKMARK', isBookmark)
    },
    setCurrentTab: ({ commit }, currentTab) => {
        return commit('SET_CURRENTTAB', currentTab)
    },
    // login
    setLoginPage: ({ commit }, loginPage) => {
        return commit('SET_LOGINPAGE', loginPage)
    },
    setAvatar: ({ commit }, avatar) => {
        return commit('SET_AVATAR', avatar)
    },
    setUsername: ({ commit }, username) => {
        return commit('SET_USERNAME', username)
    },
    setLoginSuccess: ({ commit }, loginSuccess) => {
        return commit('SET_LOGINSUCCESS', loginSuccess)
    },
    setToken: ({ commit }, token) => {
        return commit('SET_TOKEN', token)
    }
}

export default actions
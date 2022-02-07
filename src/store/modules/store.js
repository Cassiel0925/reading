const store = {
    state: {
        offsetY: 0,
        isEditMode: false,
        shelfTitleVisible: true,
        shelfList: [],
        shelfSelected: [],
        currentType: 1, // 1 书架 2 分类里
        shelfCategory: [],
    },
    mutations: {
        'SET_OFFSET_Y': (state, offsetY) => {
            state.offsetY = offsetY
        },
        'SET_IS_EDIT_MODE': (state, isEditMode) => {
            state.isEditMode = isEditMode
        },
        'SET_SHELF_TITLE_VISIBLE': (state, shelfTitleVisible) => {
            state.shelfTitleVisible = shelfTitleVisible
        },
        'SET_SHELF_LIST': (state, shelfList) => {
            state.shelfList = shelfList
        },
        'SET_SHELF_SELECTED': (state, shelfSelected) => {
            state.shelfSelected = shelfSelected
        },
        'SET_CURRENT_TYPE': (state, currentType) => {
            state.currentType = currentType
        },
        'SET_SHELF_CATEGORY': (state, shelfCategory) => {
            state.shelfCategory = shelfCategory
        },
    }
}

export default store
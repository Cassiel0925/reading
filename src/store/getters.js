const ebook = {
    //store
    offsetY: state => state.store.offsetY,
    isEditMode: state => state.store.isEditMode,
    shelfTitleVisible: state => state.store.shelfTitleVisible,
    shelfList: state => state.store.shelfList,
    shelfSelected: state => state.store.shelfSelected,
    currentType: state => state.store.currentType,
    shelfCategory: state => state.store.shelfCategory,
    // book
    fileName: state => state.book.fileName,
    isTitleAndFooterVisible: state => state.book.isTitleAndFooterVisible,
    ebookPage: state => state.book.ebookPage,
    settingVisible: state => state.book.settingVisible,
    defaultFontSize: state => state.book.defaultFontSize,
    currentBook: state => state.book.currentBook,
    defaultFontFamily: state => state.book.defaultFontFamily,
    fontFamilyVisible: state => state.book.fontFamilyVisible,
    defaultTheme: state => state.book.defaultTheme,
    progress: state => state.book.progress,
    bookAvailable: state => state.book.bookAvailable,
    section: state => state.book.section,
    cover: state => state.book.cover,
    metadata: state => state.book.metadata,
    navigation: state => state.book.navigation,
    isBookmark: state => state.book.isBookmark,
    currentTab: state => state.book.currentTab,
}

export default ebook
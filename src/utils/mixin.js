import { mapActions, mapGetters } from 'vuex'
import { shelf } from 'network/index'
import { appendAddToShelf, removeAddFromShelf, computeId } from 'utils/store'
import { getBookShelf, saveBookShelf, saveLocation, getBookmark } from 'utils/localStorage'
import { gotoBookDetail } from './store'
import { themeList, addCss, getReadTimeByMinute } from './book'

export const storeHomeMixin = {
    computed: {
        ...mapGetters([
            'offsetY'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY'
        ]),
        // 跳转到详情页
        showBookDetail(book) {
            gotoBookDetail(this, book)
        }
    },

}

export const storeShelfMixin = {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfTitleVisible',
            'shelfList',
            'shelfSelected',
            'offsetY',
            'currentType',
            'shelfCategory',
            'ebookPage'
        ]),

    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfTitleVisible',
            'setShelfList',
            'setShelfSelected',
            'setOffsetY',
            'setCurrentType',
            'setShelfCategory',
            'setEbookPage'
        ]),
        // 获取书架列表
        getShelfList() {
            let bookList = getBookShelf()
            if (!bookList) {
                shelf().then(response => {
                    if (response.status === 200 && response.data && response.data.bookList) {
                        bookList = appendAddToShelf(response.data.bookList)
                        saveBookShelf(bookList)
                        return this.setShelfList(bookList)
                    }
                })
            } else {
                return this.setShelfList(bookList)
            }
            console.log(bookList);
        },
        // 获取分类列表的书籍
        getCategoryList(title) {
            this.getShelfList().then(() => {
                const categoryList = this.shelfList.filter(item => item.type === 2 && item.title === title)
                this.setShelfCategory(categoryList[0])
            })
        },
        // 移出分组
        moveOutOfGroup(f) {
            this.setShelfList(this.shelfList.map(book => {
                // 分组内没有被选中的书籍保留在分组内
                if (book.type === 2 && book.itemList) {
                    book.itemList = book.itemList.filter(subBook => !subBook.selected)
                }
                return book
            })).then(() => {
                // 把最后一个 + 从shelfList 列表中移出 
                const list = computeId(appendAddToShelf([].concat(
                    removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
                this.setShelfList(list).then(() => {
                    this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
                    if (f) f()
                })
            })
        },
        // 跳转到详情页
        showBookDetail(book) {
            if (book.type === 2 || book.type === 3) {
                return
            }
            gotoBookDetail(this, book)
        }
    }
}

export const storeEbookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'isTitleAndFooterVisible',
            'ebookPage',
            'settingVisible',
            'defaultFontSize',
            'currentBook',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'progress',
            'bookAvailable',
            'section',
            'cover',
            'metadata',
            'navigation',
            'offsetY',
            'isBookmark',
            'currentTab',
        ]),
        themeList() {
            return themeList(this)
        },
        // 获取章节名称
        getSectionName() {
            return this.section ? this.navigation[this.section].label : ''
        }
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setIsTitleAndFooterVisible',
            'setEbookPage',
            'setSettingVisible',
            'setDefaultFontSize',
            'setCurrentBook',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setProgress',
            'setBookAvailable',
            'setSection',
            'setCover',
            'setMetadata',
            'setNavigation',
            'setOffsetY',
            'setIsBookmark',
            'setCurrentTab'
        ]),
        // 9. 全局主题设置
        initGlobalStyle() {
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/defaultTheme.css`)
                    break
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/eyeTheme.css`)
                    break
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/goldTheme.css`)
                    break
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/nightTheme.css`)
                    break
                default:
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/defaultTheme.css`)
                    break
            }
        },
        // display 方法
        display(target, cb) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
        },
        // 章节切换和进度同步
        refreshLocation() {
            // 当前进度的对象
            const currentLocation = this.currentBook.rendition.currentLocation()
            console.log(currentLocation);
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                console.log(progress);
                this.setProgress(Math.floor(progress * 100))
                    // 获取章节名称
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)

                // 书签
                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                        this.setIsBookmark(true)
                    } else {
                        this.setIsBookmark(false)
                    }
                } else {
                    this.setIsBookmark(false)
                }
            }

        },
        // 阅读时间
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        },
        //  5. 标题栏和菜单栏的隐藏
        hideTitleAndMenu() {
            // this.$store.dispatch('setMenuVisible', false)
            this.setIsTitleAndFooterVisible(false)
            this.setSettingVisible(-1)
        },
    }
}
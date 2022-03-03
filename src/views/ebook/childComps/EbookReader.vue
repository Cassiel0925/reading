<template>
    <div class="ebook-reader">
        <div id="read"></div>
        <div class="ebook-reader-mask"
             @click="onMaskClick"
             @touchmove="move"
             @touchend="moveEnd"
             @mousedown.left="onMouseEnter"
             @mousemove.left="onMouseMove"
             @mouseup.left="onMouseEnd">
        </div>
    </div>
</template>
<script>
import {getLocalForage} from 'utils/localForage'
import {storeEbookMixin} from 'utils/mixin'
import { getFontSize,
         saveFontSize,
         getFontFamily,
         saveFontFamily,
         getTheme,
         saveTheme,
         getLocation} from 'utils/localStorage'
import Epub from 'epubjs'
import {flatten} from 'utils/book'
export default {
   name:'EbookReader',
   mixins: [storeEbookMixin],
   methods: {
       // 初始化电子书 阅读器的解析和渲染
       initEpub(url) {
           this.book = new Epub(url)
           this.setCurrentBook(this.book)
           this.initRendition()
           //this.initGesture()
           // 解析电子书
           this.parseBook()
           // 进度条定位
           // console.log(this.book.locations);
           this.book.ready.then(() => {
               return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
            }).then(locations => {
                this.setBookAvailable(true)
                this.refreshLocation()
            })
       },
       // rendition
       initRendition() {
           this.rendition = this.book.renderTo('read', {
               width: window.innerWidth,
               height: window.innerHeight,
               method: 'default'
           })
           // 初始化位置
           const location = getLocation(this.fileName)
           this.display(location, () => {
                this.initFontSize()
                this.initFontFamily()
                this.initTheme()
                this.initGlobalStyle()
           })
           
           this.rendition.hooks.content.register(contents => {
                Promise.all([
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/FZQingFSJW_Xi.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/FZFWZhuZLSHTJWB.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/FZFWZhuZGDSMCJW.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/FZJCGFKTK.css`),
                    // contents.addStylesheet('assets/fonts/FZQingFSJW_Xi.css'),
                    // contents.addStylesheet('assets/fonts/FZFWZhuZLSHTJWB.css'),
                    // contents.addStylesheet('assets/fonts/FZFWZhuZGDSMCJW.css'),
                    // contents.addStylesheet('assets/fonts/FZJCGFKTK.css'),
                ])
           })
       },
       // gesture
       initGesture() {
           this.rendition.on('touchstart', event => {
               // 获取手指点击屏幕的x轴位置
               this.touchStartX = event.changedTouches[0].clientX
               // 获取手指在屏幕上的点击事件
               this.touchStartTime = event.timeStamp
           })
           this.rendition.on('touchend', event => {
               const offsetX = event.changedTouches[0].clientX - this.touchStartX
               const time = event.timeStamp - this.touchStartTime
               if(time < 500 && offsetX > 40) {
                   this.prevPage()
               } else if (time < 500 && offsetX < -40) {
                   this.nextPage()
               } else {
                   this.toggleTitleAndMenu()
               }
               // 禁止默认事件和方法调用
               event.preventDefault()
               event.stopPropagation()
           })
       },
       // 上一页
       prevPage() {
           if(this.rendition) {
               this.rendition.prev().then(() => {
                   this.refreshLocation()
               })
               this.hideTitleAndMenu()
               this.setFontFamilyVisible(false)
           }
       },
       // 下一页
       nextPage() {
           if(this.rendition) {
               this.rendition.next().then(() => {
                   this.refreshLocation()
               })
               this.hideTitleAndMenu()
               this.setFontFamilyVisible(false)
           }
       },
       // 标题栏和菜单栏的显示和隐藏
       toggleTitleAndMenu() {
           if(this.menuVisible) {
                this.setSettingVisible(-1)
           }
           this.setIsTitleAndFooterVisible(!this.isTitleAndFooterVisible)
           this.setFontFamilyVisible(false)
       },
       // 初始化字号大小
       initFontSize() {
           let fontSize = getFontSize(this.fileName)
           if(!fontSize) {
               saveFontSize(this.fileName, this.defaultFontSize)
           } else {
               this.rendition.themes.fontSize(fontSize)
               this.setDefaultFontSize(fontSize)
           }
       },
       // 初始化字体
       initFontFamily() {
           let font = getFontFamily(this.fileName)
           if(!font) {
               saveFontFamily(this.fileName, this.defaultFontFamily)
           } else {
               this.rendition.themes.font(font)
               this.setDefaultFontFamily(font)
           }
       },
       // 初始化主题
       initTheme() {
           let theme = getTheme(this.fileName)
           if(!theme) {
               saveTheme(this.fileName, this.defaultTheme)
           } 
           this.setDefaultTheme(theme)
           this.themeList.forEach(theme => {
               this.rendition.themes.register(theme.name, theme.style)
           })
           this.rendition.themes.select(theme)
       },
       // 解析电子书
       parseBook() {
           // 获取封面
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })
            // 获取书本基本信息
            this.book.loaded.metadata.then(metadata => {
                this.setMetadata(metadata)
            })
            // 渲染书本章节信息
            this.book.loaded.navigation.then(nav => {
                const navItem = flatten(nav.toc)

                function find(item, level = 0) {
                    if (!item.parent) {
                        return level
                    } else {
                        return find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
                    }
                }
                navItem.forEach(item => {
                    item.level = find(item)
                })

                this.setNavigation(navItem)
                // console.log(navItem);
            })
       },

       //    书签功能实现
        // 1 - 鼠标进入
        // 2 - 鼠标进入后的移动
        // 3 - 鼠标从移动状态松手
        // 4 - 鼠标还原
        // PC端书签的实现
        // 鼠标点击
        onMouseEnter(e) {
            this.mouseState = 1
            this.mouseStartTime = e.timeStamp
            // 禁止调用默认方法
            e.preventDefault()
            // 禁止进行重构
            e.stopPropagation()
        },
        // 鼠标移动
        onMouseMove(e) {
             if (this.mouseState === 1) {
                 this.mouseState = 2
             } else if (this.mouseState === 2) {
                 let offsetY = 0
                 if(this.firstOffsetY) {
                    offsetY = e.clientY - this.firstOffsetY
                    this.setOffsetY(offsetY)
                 } else {
                    this.firstOffsetY = e.clientY
                 }
             }
            // 禁止调用默认方法
            e.preventDefault()
            // 禁止进行重构
            e.stopPropagation()
        },
        // 鼠标松开
        onMouseEnd(e) {
            if (this.mouseState === 2) {
                this.setOffsetY(0)
                this.firstOffsetY = null
                this.mouseState = 3
            } else {
                this.mouseState = 4
            }
            const time = e.timeStamp - this.mouseStartTime
            if (time < 100) {
                this.mouseState = 4
            }
            // 禁止调用默认方法
            e.preventDefault()
            // 禁止进行重构
            e.stopPropagation()
        },
         // 手势移动
        move(e) {
            // console.log(e);
            let offsetY = 0
            if(this.firstOffsetY) {
                offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                this.setOffsetY(offsetY)
            } else {
                this.firstOffsetY = e.changedTouches[0].clientY
            }
            // 禁止调用默认方法
            e.preventDefault()
            // 禁止进行重构
            e.stopPropagation()
        },
        // 手势移动结束 屏幕还原
        moveEnd() {
            this.setOffsetY(0)
            this.firstOffsetY = null
        },
        // 点击左侧 返回上一页；点击中间 显示和隐藏标题栏和菜单栏；点击右侧，返回下一页
        onMaskClick(e) {
            // console.log(this.mouseState);
            if (this.mouseState && (this.mouseState === 2 || this.mouseState ===3)) {
                return
            }
            const offsetX = e.offsetX
            const width = window.innerWidth
            if(offsetX > 0 && offsetX < width * 0.3) {
                this.prevPage()
            } else if(offsetX > 0 && offsetX > width * 0.7) {
                this.nextPage()
            } else {
                this.toggleTitleAndMenu()
            }
        },
   },
   mounted () {
       const books = this.$route.params.fileName.split('|')
       const category = books[0]
       const fileName = books[1]
        this.setFileName(books.join('/')).then(() => {
            const url = process.env.VUE_APP_EPUB_URL + '/' + category + '/' + fileName
            this.initEpub(url)
        })
    //    getLocalForage(fileName, (err, blob) => {
    //         if(!err && blob) {
    //             console.log('find');
    //             this.setFileName(books.join('/')).then(() => {
    //                 this.initEpub(blob)
    //             })
    //         } else {
    //             console.log('online');
    //             this.setFileName(books.join('/')).then(() => {
    //                 const url = process.env.VUE_APP_EPUB_URL + '/' + category + '/' + fileName
    //                 this.initEpub(url)
    //             })
    //         }
    //     })
   }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .ebook-reader {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .ebook-reader-mask{
            position: absolute;
            top: 0;
            left: 0;
            background: transparent;
            z-index: 50;
            width: 100%;
            height: 100%;
        }
    }
</style>    

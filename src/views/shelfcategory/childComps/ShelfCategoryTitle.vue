<template>
    <div class="shelf-category-title">
        <div class="shelf-category-title-wrapper">
            <!-- left start-->
            <div class="title-left-wrapper">
                <!-- 返回 -->
                <div class="left-icon" @click="back" v-if="!isEditMode">
                    <span class="icon-back"></span>
                </div>
                <!-- 修改分组 -->
                <div class="left-text" v-else @click="editGroup">{{$t('shelf.editGroup')}}</div>
            </div>
            <!-- left end-->

            <!-- center start -->
            <div class="title-center-wrapper">
                <!-- 标题名 -->
                <div class="center-title-text">{{title}}</div>
                <!-- 选择书籍 -->
                <div class="center-sub-title-text" v-show="isEditMode">{{$t('shelf.selectBook')}}</div>
            </div>
            <!-- center end -->

            <!-- right start -->
            <div class="title-right-wrapper">
                <!-- 编辑/取消 -->
                <div class="right-edit-text" 
                     @click="editClick"
                     v-if="isShowList">
                    {{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}
                </div>
                <div class="right-edit-group-text"
                     v-else
                     @click="editGroup">
                     {{$t('shelf.editGroup')}}
                </div>
            </div>
            <!-- right end -->

        </div>
    </div>
</template>
<script>
import {storeShelfMixin} from 'utils/mixin'
import {saveBookShelf} from 'utils/localStorage'
export default {
   name:'ShelfCategoryTitle',
   mixins: [storeShelfMixin],
   computed: {
       title() {
           return this.shelfCategory.title
       },
       emptyCategory() {
           return !this.shelfCategory || !this.shelfCategory.itemList || !this.shelfCategory.itemList.length === 0
       },
       isShowList() {
           return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
       }
   },
   methods: {
       back() {
           this.$router.go(-1)
       },
       // 点击进入编辑模式/取消编辑模式
       editClick() {
           if(!this.isEditMode) {
               this.setShelfSelected([])
               this.shelfList.forEach(item => {
                   item.selected = false
                   if(item.itemList) {
                       item.itemList.forEach(subItem => {
                           subItem.selected = false
                       })
                   }
               })
           }
           this.setIsEditMode(!this.isEditMode)
       },
       // 修改分组
       editGroup() {
           this.popupMenu = this.popup({
               btn: [
                   {
                       text: this.$t('shelf.editGroupName'),
                       click: () => {
                           this.editGroupName()
                       }
                   },
                   {
                       text: this.$t('shelf.deleteGroup'),
                       type: 'danger',
                       click: () => {
                           this.deleteGroup()
                       } 
                   },
                   {
                       text: this.$t('shelf.cancel'),
                       click: () => {
                            this.hidePopup()
                       } 
                   }
               ]
           }).show()
       },
       // 修改分组名
       editGroupName() {
           this.hidePopup()
           this.dialog({
               showNewGroup: true,
               groupName: this.shelfCategory.title
           }).show()
       },
       // 删除分组
       deleteGroup() {
           this.hidePopup()
           setTimeout(() => {
                this.popupMenu = this.popup({
                    title: this.$t('shelf.deleteGroupTitle'),
                    btn: [
                        {
                            text: this.$t('shelf.confirm'),
                            type: 'danger',
                            click: () => {
                                this.confirmToDelete()
                            }
                        },
                        {
                            text: this.$t('shelf.cancel'),
                            click: () => {
                                this.hidePopup()
                            }
                        }
                    ]
                }).show()
           }, 200)
           
       },
       // 确定删除分组
       confirmToDelete() {
           if(!this.emptyCategory) {
               this.setShelfSelected(this.shelfCategory.itemList)
               this.moveOutOfGroup(this.onComplete)
           } else {
               this.onComplete()
           }
       },
       // 取消
       hidePopup() {
           this.popupMenu.hide()
       },
       // 将分组彻底删除
       onComplete() {
           this.hidePopup()
           this.setShelfList(this.shelfList.filter(book => book.id !== this.shelfCategory.id))
           .then(() => {
               saveBookShelf(this.shelfList)
               this.$router.go(-1)
               this.setIsEditMode(false)
           })
       }
   },
  
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .shelf-category-title {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: px2rem(42);
        background: #fff;
        box-shadow: 0 px2rem(1) px2rem(1) 0 rgba(0, 0, 0, .1);
        z-index: 1000;
        .shelf-category-title-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            .title-left-wrapper {
                flex: 0 0 px2rem(66);
                display: flex;
                padding-left: px2rem(10);
                box-sizing: border-box;
                @include left;
                .left-icon {
                    font-size: px2rem(16);
                }
                .left-text {
                    font-size: px2rem(14);
                }
            }
            .title-center-wrapper {
                flex: 1;
                display: flex;
                @include columnCenter;
                .center-title-text {
                    font-size: px2rem(16);
                    font-weight: 700;
                    color: #333;
                }
                .center-sub-title-text {
                    padding-top: px2rem(3);
                    box-sizing: border-box;
                    font-size: px2rem(12);
                }
            }
            .title-right-wrapper {
                flex: 0 0 px2rem(66);
                font-size: px2rem(14);
                display: flex;
                .right-edit-text {
                    flex: 0 0 px2rem(55);
                    @include right;
                }
                .right-edit-group-text {
                    @include left;
                }
            }
        }
    }
</style>

<template>
    <ebook-dialog :title="title" ref="dialog">
        <div v-if="!isNewGroup">
            <div class="dialog-list-wrapper"
                v-for="(item, index) in categoryList"
                :key="index">
                <div class="dialog-list-item"
                    :class="{'edit-color': item.edit && item.edit === 1}"
                    v-if="item.edit !== 2 || (item.edit === 2 && isInGroup) || !item.edit"
                    @click="onGroupClick(item)">
                    <div class="dialog-list-item-text">{{item.title}}</div>
                    <div class="dialog-list-icon-wrapper" v-if="isInGroup && shelfCategory.id === item.id">
                        <span class="icon-check"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新建分组 -->
        <div class="dialog-new-group-wrapper" v-else>
            <!-- title -->
            <div class="new-group-title">
                <span>{{$t('shelf.groupName')}}</span>
            </div>
            <div class="new-group-input-wrapper">
                <input type="text"
                       class="input"
                       v-model="newGroupName">
                <div class="input-icon-wrapper" 
                     v-if="newGroupName && newGroupName.length > 0"
                     @click="clear">
                    <span class="icon-close-circle-fill"></span>
                </div>
            </div>
        </div>

        <!-- btn -->
        <div slot="btn" class="dialog-btn-wrapper">
            <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
            <div class="dialog-btn" 
                 :class="{'is-empty': newGroupName && newGroupName.length === 0}"
                 v-if="isNewGroup"
                 @click="createNewGroup">
                {{$t('shelf.confirm')}}
            </div>
        </div>
    </ebook-dialog>
</template>
<script>
import EbookDialog from 'components/common/dialog/Dialog.vue'
import {storeShelfMixin} from 'utils/mixin'
import {saveBookShelf} from 'utils/localStorage'
import {removeAddFromShelf, appendAddToShelf} from 'utils/store'
export default {
   name:'ShelfGroupDialog',
   components: { 
       EbookDialog 
    },
    props: {
        showNewGroup: {
            type: Boolean,
            default: false
        },
        groupName: String
    },
    mixins: [storeShelfMixin],
    data () {
        return {
            isNewGroup: false,
            newGroupName: ''
        }
    },
    computed: {
        title() {
            return this.isNewGroup ? this.$t('shelf.newGroup') : this.$t(`shelf.moveBook`)
        },
        defaultCategory() {
            return [
                {
                    //新建分组
                    title: this.$t('shelf.newGroup'),
                    edit: 1
                }, 
                {
                    //移除分组
                    title: this.$t('shelf.groupOut'),
                    edit: 2
                }
            ]
        },
        category() {
            return this.shelfList.filter(item => item.type === 2)
        },
        categoryList() {
            return [...this.defaultCategory, ...this.category]
        },
        // 是否在分组里面
        isInGroup() {
            return this.currentType === 2   
        }
    },
    methods: {
        show() {
            this.newGroupName = this.groupName
            this.isNewGroup = this.showNewGroup
            this.$refs.dialog.show()
        },
        hide() {
            // dialog 隐藏
            this.$refs.dialog.hide()
            // 退出新建分组模式
            this.isNewGroup = false
        },
        // 点击 item 进入相应的操作
        onGroupClick(item) {
            if(item.edit && item.edit === 1) {
                this.isNewGroup = true
            } else if(item.edit && item.edit === 2) {
                this.moveOutOfGroup(this.onComplete)
            } else {
                this.moveToGroup(item)
            }
        },
        // 将输入的内容清除
        clear() {
            this.newGroupName = ''
        },
        // 完成之后的一些操作
        onComplete() {
            saveBookShelf(this.shelfList)
            this.hide()
            this.setIsEditMode(false)
        },
        // 移动到相应分组中
        moveToGroup(group) {
            if(this.isInGroup) {
                return
            }
            this.setShelfList(this.shelfList.filter(book => {
                if(book.itemList) {
                    book.itemList = book.itemList.filter(subBook => this.shelfSelected.indexOf(subBook) < 0)
                }
                return this.shelfSelected.indexOf(book) < 0
            })).then(() => {
                if(group && group.itemList) {
                    group.itemList = [...group.itemList, ...this.shelfSelected]
                }
                group.itemList.forEach((item, index) => {
                    item.id = index + 1
                })
                this.simpleToast(this.$t('shelf.moveBookInSuccess').replace('$1', group.title))
                this.onComplete()
            })
        },
        // 新建分组
        createNewGroup() {
            if(!this.newGroupName || this.newGroupName.length === 0) {
                return 
            }
            if(this.showNewGroup) {
                // 修改分组名
                this.shelfCategory.title = this.newGroupName
                this.onComplete()
            } else {
                // 创建一个新的分组
                const group = {
                    id: this.shelfList[this.shelfList.length -2].id + 1,
                    itemList: [],
                    selected: false,
                    title: this.newGroupName,
                    type: 2
                }
                let list = removeAddFromShelf(this.shelfList)
                list.push(group)
                list = appendAddToShelf(list)
                this.setShelfList(list).then(() => {
                    this.moveToGroup(group)
                })
                this.hide()
            }
        }
    }
   
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .dialog-list-wrapper {
        padding: 0 px2rem(20);
        box-sizing: border-box;
        .dialog-list-item {
            display: flex;
            font-size: px2rem(14);
            padding: px2rem(15) 0;
            box-sizing: border-box;
            &.edit-color {
                color: rgb(74, 171, 255);
            }
            .dialog-list-item-text {
                flex: 1;
            }
            .dialog-list-icon-wrapper {}
        }
    }
    .dialog-new-group-wrapper {
        padding: px2rem(30) px2rem(20) px2rem(40);
        box-sizing: border-box;
        .new-group-title {
            font-size: px2rem(12);
            color: #666;
            padding-bottom: px2rem(15);
            box-sizing: border-box;
        }
        .new-group-input-wrapper {
            width: 100%;
            border-bottom: px2rem(1) solid #ccc;
            display: flex;
            .input {
                flex: 1;
                padding-bottom: px2rem(10);
                box-sizing: border-box;
                outline: none;
                border: none;
            }
            .input-icon-wrapper {
                flex: 0 0 px2rem(20);
                @include left;
                font-size: px2rem(14);
                color: #ccc;
            }
        }
    }
    .dialog-btn-wrapper {
        display: flex;
        width: 100%;
        font-size: px2rem(14);
        text-align: center;
        font-weight: 700;
        border-radius: 0 0 px2rem(10) px2rem(10);
        padding: px2rem(15) 0;
        background: rgb(74, 171, 255);
        color: #fff;
        .dialog-btn {
            flex: 1;
            opacity: 1;
            &.is-empty {
                opacity: .5;
            }
        }
    }
    
</style>

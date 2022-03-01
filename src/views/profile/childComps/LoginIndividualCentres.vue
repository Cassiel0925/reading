<template>
    <div class="login-individual-centres">
        <div class="login-individual-centres-wrapper">
            <div class="login-individual-centres-title-wrapper">
                <div class="login-individual-centres-text">{{$t('login.individualCentres')}}</div>
                <div class="login-individual-centres-icon">
                    <span class="icon-forward"></span>
                </div>
            </div>
            <div class="login-individual-centres-item-wrapper">
                <tab-bar>
                    <tab-bar-item>
                        <span slot="item-icon" class="icon-envelop item-icon"></span>
                        <span slot="item-text" class="item-text">{{$t('login.message')}}</span>
                    </tab-bar-item>
                    <tab-bar-item>
                        <span slot="item-icon" class="icon-users item-icon"></span>
                        <span slot="item-text" class="item-text">{{$t('login.share')}}</span>
                    </tab-bar-item>
                    <tab-bar-item>
                        <span slot="item-icon" class="icon-file-text item-icon"></span>
                        <span slot="item-text" class="item-text">{{$t('login.review')}}</span>
                    </tab-bar-item>
                    <tab-bar-item>
                        <span slot="item-icon" class="icon-quill item-icon"></span>
                        <span slot="item-text" class="item-text">{{$t('login.comments')}}</span>
                    </tab-bar-item>
                </tab-bar>
            </div>
        </div>
    </div>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
   name:'LoginIndividualCentres',
   components: { 
       TabBar,
       TabBarItem 
    },

}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .login-individual-centres {
        width: 100%;
        padding: px2rem(10);
        box-sizing: border-box;
        .login-individual-centres-wrapper {
            border-radius: px2rem(5);
            box-shadow: px2rem(2) px2rem(2) px2rem(7) px2rem(2) rgba(100, 100, 100, .1);
            padding: px2rem(20) px2rem(5) px2rem(15) px2rem(15);
            box-sizing: border-box;
            .login-individual-centres-title-wrapper {
                font-size: px2rem(16);
                display: flex;
                .login-individual-centres-text {
                    flex: 1;
                    font-weight: 700;
                }
                .login-individual-centres-icon {
                    flex: 0 0 px2rem(20);
                    color: #ccc;
                }
            }
            .login-individual-centres-item-wrapper {
                padding-top: px2rem(15);
                .item-icon {
                    color: #666;
                }
                .item-text {
                    color: #ccc;
                    font-size: px2rem(14);
                }
            }
        }
    }
</style>

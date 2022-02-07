<template>
    <div class="login-user">
        <div class="login-user-name-wrapper">
            <div class="user-img-wrapper">
                <span class="icon-person"></span>
            </div>
            <div class="user-name-wrapper">
                <span class="name-text">{{$t('login.visitor')}}</span>
            </div>
        </div>
        <div class="login-user-login-text-wrapper">
            <div class="login-text">{{$t('login.clickSignIn')}}</div>
            <span class="icon-forward"></span>
        </div>
    </div>
</template>
<script>
export default {
   name:'LoginUser',
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .login-user {
        width: 100%;
        display: flex;
        .login-user-name-wrapper {
            flex: 1;
            display: flex;
            padding: px2rem(10) 0 px2rem(10) px2rem(10);
            box-sizing: border-box;
            .user-img-wrapper {
                width: px2rem(60);
                height: px2rem(60);
                border-radius: 50%;
                border: px2rem(1) solid #ccc;
                background: #eee;
                @include center;
                .icon-person {
                    color: #ccc;
                }
            }
            .user-name-wrapper {
                font-size: px2rem(18);
                padding-left: px2rem(15);
                box-sizing: border-box;
                @include center;
            }
        }
        .login-user-login-text-wrapper {
            flex: 0 0 px2rem(80);
            font-size: px2rem(12);
            display: flex;
            @include center;
            color: #999;
        }
    }
</style>

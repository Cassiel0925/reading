<template>
    <div class="enroll">
        <nav-bar class="enroll-nav-bar">
            <div slot="left" class="icon-back" @click="back"></div>
        </nav-bar>
        <div class="enroll-title-wrapper">
            <div class="enroll-title-text">账号注册</div>
        </div>
        <div class="enroll-input-wrapper">
            <input type="text" 
                   placeholder="用户名"
                   class="input"
                   v-model="userName">
            <input type="tel" 
                   placeholder="手机号"
                   maxlength="11"
                   class="input"
                   v-model="mobile">
            <input type="password" 
                   placeholder="设置密码"
                   class="input"
                   v-model="enrollPassword"
                   maxlength="16">
            <input type="password" 
                   placeholder="再次输入密码"
                   class="input"
                   v-model="password2"
                   maxlength="16">
        </div>
        <div class="enroll-button-wrapper" >
            <div class="enroll-btn-text" @click="toEnroll">立即注册</div>
        </div>
        <div class="enroll-other-wrapper" @click="toLogin">
            <span>已有帐号，去登录！</span>
        </div>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {storeLoginMixin} from 'utils/mixin'
import {enroll} from 'network/index'
export default {
   name:'Enroll',
   components: { 
       NavBar 
    },
    mixins: [storeLoginMixin],
    data () {
        return {
            userName: '',
            mobile: '',
            enrollPassword: '',
            password2: ''
            
        }
    },
    computed: {
        
    },
    methods: {
        back() {
            this.$router.push({
                path: '/profile'
            })
            this.setLoginPage(false)
        },
        toLogin() {
            this.$router.push({
                path: '/login'
            })
        },
        toEnroll() {
            if(this.enrollPassword !== this.password2) {
                this.simpleToast('密码输入不一致！')
                return false
            } else if(this.userName === '' || this.mobile === '' || this.enrollPassword === '' || this.password2 === '') {
                this.simpleToast('请填完信息再注册！')
                return false
            } else if(!/^1[345678]\d{9}$/.test(this.mobile)) {
               this.simpleToast('请输入正确的手机号！')
               return false
            } else {
                enroll({
                    username: this.userName,
                    mobile: this.mobile,
                    enrollPassword: this.enrollPassword
                }).then(response => {
                    console.log(response);
                    if(response.status === 200 && response.data.error_code === 1) {
                        this.simpleToast('手机号已被注册过!')
                        return false
                    }
                    if(response.status === 200 && response.data.error_code === 0 && response.data.data){
                        this.setUsername(response.data.data)
                        this.setLoginSuccess(true)
                        this.setLoginPage(false)
                        const token = response.data.token
                        console.log(token);
                        this.setToken(token)
                        this.$router.push({
                            path: '/profile'
                        })
                    }
                })
            }

        }
        
    }
}
</script>
<style lang="scss" scoped>
@import "assets/styles/global";
    .enroll {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .enroll-nav-bar {
            .icon-back {
                text-align: left;
                padding-left: px2rem(12);
            }
        }
        .enroll-title-wrapper {
            .enroll-title-text {
                font-size: px2rem(20);
                padding: px2rem(26) 0 px2rem(15) 0;
                @include center;
            }
        }
        .enroll-input-wrapper {
            align-items: center;
            padding-left: 12%;
            .input {
                display: block;
                width: 88%;
                height: px2rem(40);
                padding: px2rem(10) px2rem(5);
                box-sizing: border-box;
                font-size: px2rem(14);
                color: #666;

                border: none;
                outline: none;

                border-bottom: px2rem(2) solid #eee;
                &::-webkit-input-placeholder {
                    color: #ccc;
                }
            }
        }
        .enroll-button-wrapper {
            width: 100%;
            padding-top: px2rem(30);
            @include center;
            .enroll-btn-text {
                width: 70%;
                height: px2rem(38);
                background-color: rgb(74,171,255);
                color: #fff;
                display: flex;
                font-size: px2rem(14);
                border-radius: px2rem(19);
                box-shadow: px2rem(0) px2rem(2) px2rem(2) px2rem(2) rgba(100, 100, 100, .1);
                @include center;
            }
        }
        .enroll-other-wrapper {
            font-size: px2rem(14);
            padding: px2rem(15) 0 0 px2rem(58);
            color: #666;
        }
        
    }
</style>

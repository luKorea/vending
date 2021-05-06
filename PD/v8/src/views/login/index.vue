<template>

    <div class="login-container">
        <div class="bg">
            <div class="swiper-container">
                <div class="swiper-wrapper ">
                    <img src="../../../public/img/1.jpg" alt="" class="swiper-slide ">
                    <img src="../../../public/img/2.jpg" alt="" class="swiper-slide ">
                    <img src="../../../public/img/3.jpg" alt="" class="swiper-slide ">
                    <img src="../../../public/img/4.jpg" alt="" class="swiper-slide ">
                    <img src="../../../public/img/5.jpg" alt="" class="swiper-slide ">
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="wrap">
            <div class="tabBox">
                <div class="word">请<br>登<br>录</div>
                <div class="line"></div>
            </div>
            <div class="container">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="width: 100%;" auto-complete="on" label-position="left">
                    <div class="wrap-left">
                        <img src="../../../public/img/icon.png" alt="" style="border-radius: 50%;">
                        <div style="font-size: 26px;">物流-质检费控系统</div>
                    </div>
                    <div class="login-inp list">
                        <img src="../../../public/img/account.png" alt="">
                        <el-input ref="username" v-model="loginForm.username" placeholder="请输入账号" name="username" type="text" tabindex="1" auto-complete="on" />
                    </div>
                    <div class="login-inp list">
                        <img src="../../../public/img/flag1.png" alt="">
                        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入您的密码" name="password" tabindex="2" auto-complete="new-password"
                            @keyup.enter.native="handleLogin" />
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                        </span>
                    </div>
                    <div class="login-blur">
                        <div class="icon-radio">
                            <el-checkbox v-model="checked">记住密码</el-checkbox>
                        </div>
                    </div>
                    <el-button :loading="loading" class="login-inp2 login-btn" type="primary" style="width:80%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
                </el-form>
                <div class="login-tip">建议使用Google Chrome或者360浏览器极速模式，使用其它浏览器可能无法正常使用本系统。</div>
            </div>
        </div>
    </div>
</template>

<script>
import defaultSettings from '@/settings.js'
/**
 * TODO:登录页面
 */
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: true,
      defaultSettingsTitle: defaultSettings.title,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        //重定向
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.loginForm.username = window.localStorage.getItem('account_' + defaultSettings.KEY) || '';
    this.loginForm.password = window.localStorage.getItem('password_' + defaultSettings.KEY) || '';
  },
  mounted() {
    this.$nextTick((v) => {
      var swiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    })
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      let that = this;
      //验证
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          //验证成功，调用接口
          that.loading = true

          let params = {
            username: that.loginForm.username,
            password: that.loginForm.password,
          }
          if (params.password != window.localStorage.getItem('password_' + defaultSettings.KEY)) {
            params.password = hex_md5(params.password)
          }

          that.$store.dispatch('user/login', params).then(() => {
            // console.log('登录成功，跳转', that.redirect)
            // that.$router.push({ path: that.redirect || '/' })
            if (that.checked) {
              // 记住密码的记录
              console.log("记住密码");
              window.localStorage.setItem("account_" + defaultSettings.KEY, params.username);
              window.localStorage.setItem("password_" + defaultSettings.KEY, params.password);
            } else {
              console.log("没记住密码");
              window.localStorage.removeItem('account_' + defaultSettings.KEY);
              window.localStorage.removeItem('password_' + defaultSettings.KEY);
            }
            //获取权限
            that.$store.dispatch('user/getControl', {}).then(() => {
              that.$router.push({ path: '/' })
            }).catch(() => {
              that.loading = false
            })
            //删除缓存面包屑导航
            that.$store.dispatch('tagsView/delAllViews', null, { root: true })
            that.loading = false
          }).catch(() => {
            that.loading = false
          })
        } else {
          //验证失败
          console.log('错误提交')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000000;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100vh;
    margin: 0;
    display: block;
    z-index: -10;
    overflow: hidden;
    .swiper-container {
      width: 100%;
      height: 40vw;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .login-form {
    right: 5%;
    top: 50%;
    margin-top: -230px;
    width: 480px;
    height: 460px;
    position: fixed;
    background: #fff url(../../../public/img/loginBG.png) no-repeat;
    z-index: 10;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 3px;
    top: 16px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.wrap {
  right: 5%;
  top: 50%;
  margin-top: -230px;
  width: 480px;
  height: 460px;
  position: fixed;
  background: #fff url(../../../public/img/loginBG.png) no-repeat;
  z-index: 10;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  .tabBox {
    box-sizing: border-box;
    padding: 0 40px;
    height: 200px;
    display: flex;
    align-items: center;
    .word {
      font-size: 24px;
      color: #be954a;
    }
    .line {
      color: #be954a;
      width: 20px;
      height: 100%;
      border-right: 4px solid #be954a;
    }
  }
  .container {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .wrap-left {
      display: flex;
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 40px;
      color: #be954a;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
    }
    .login-inp {
      display: flex;
      margin: 0 0 10px 0;
      border-bottom: 1px solid #aab4b9;
      align-items: center;
      width: 80%;
      position: relative;
    }
    .login-inp img {
      height: 20px;
      width: 20px;
    }
    .login-inp input {
      height: 48px;
      width: 80%;
      padding-left: 5%;
      font-size: 12px;
    }
    .login-blur {
      display: flex;
      margin: 0;
      justify-content: space-between;
      color: #b18e5d;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .login-inp2 {
      width: 300px;
      background: #b18e5d;
      font-size: 16px;
      color: #fff;
      padding: 5px 0;
      border-radius: 20px;
      border: none;
      margin-top: 20px;
      outline: none;
      text-align: center;
      cursor: pointer;
    }
    .login-tip {
      color: red;
      font-size: 14px;
      margin-top: 20px;
      margin-right: 30px;
    }
  }
}

@media screen and (max-width: 768px) {
  .tabBox {
    display: none !important;
  }

  .login-container {
    .bg {
      z-index: 11;
      .swiper-container {
        width: 100%;
        height: 40vw;
        top: 0;
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    .wrap {
      right: 0;
      top: 0;
      margin-top: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      .container {
        width: 96%;
        margin: 0 auto;
        form {
          text-align: center;
          .wrap-left {
            width: 96vw;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            margin-top: 20px;
          }
        }
        .login-tip {
          display: none;
        }
        .login-inp {
          width: 100%;
        }
      }
    }
  }
}
@media screen and (max-height: 500px) {
  .login-container {
    .wrap {
      .container {
        margin-top: 100px;
      }
    }
  }
}


</style>

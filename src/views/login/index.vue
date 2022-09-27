<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref='form'>
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
        { require:true, message: '请输入手机号' },
        { pattern:/^1[3-9]\d{9}$/, message: '请输入正确格式手机号' },
        ]"
      >
      <template #left-icon>
        <i class="iconfont icon-shouji"></i>
      </template>
        <!-- <i slot="left-icon" class="toutiao toutiao-shouji"></i> -->
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
        { require:true, message: '请输入验证码' },
        { pattern:/^\d{6}$/, message: '请输入正确格式验证码' },
        ]"
      >
      <template #left-icon>
        <i class="iconfont icon-yanzhengma"></i>
      </template>
        <!-- <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i> -->
        <template #button >
        <van-button v-if="isShowBtn" class="send-sms-btn" round size="small" type="button" @click="SendCode">发送验证码</van-button>
        <van-count-down v-else :time="3*1000" format="ss秒后重新发送" @change="onChange"/>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
        @submit="onSubmit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import types from '@/store/types'
export default {
  name: 'LoginIndex',
  data () {
    return {
      mobile: '17746611763',
      code: '246810',
      isShowBtn: true
    }
  },
  methods: {
    onChange ({ seconds }) {
      if (!seconds) this.isShowBtn = true
    },
    async SendCode () {
      await this.$refs.form.validate('mobile')
      console.log('通过了', this.mobile)
      try {
        await this.apis.user.sendCode(this.mobile)
        this.$toast.success('短信验证码发送成功')
        this.isShowBtn = false
      } catch (err) {
        console.log('短信验证码发送失败', err)
        // this.$toast.fail(err.response.data.message)
        this.$toast.fail('服务器繁忙，请稍后重试')
      }
    },
    onSubmit (data) {
      console.log(data)
      this.$toast.loading({
        message: '加载中...', // 提示信息
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      this.apis.user.login({
        mobile: this.mobile,
        code: this.code
      })
        .then((res) => {
          this.$store.commit(types.mutations.setUser, res.data.data)
          this.$toast.success('登录成功')
          // 路由跳转推荐使用{name}形式，可维护性强一些
          // 如果用path直接跳，万一日后path要改，那么你代码就得改
          this.$router.push({ name: 'MyPage' })
        })
        .catch((err) => {
          console.log('错了', err)
          // this.$toast.fail(err.response.data.message)
        })
      // TODO: 跳首页
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>

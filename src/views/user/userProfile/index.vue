<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="userInfo.name" is-link
    @click="isShowUpdateName=true"
    />
    <van-cell title="性别" :value="userInfo.gender?'女':'男'" is-link />
    <van-cell title="生日" :value="userInfo.birthday" is-link />
    <!-- 编辑昵称弹层 -->
    <van-popup
    v-model="isShowUpdateName"
    style="height: 100%"
    position="bottom">
      <UserName
      v-if="isShowUpdateName"
      @update-username="changeUserName"
      :message="userInfo.name" />
    </van-popup>
    <!-- 编辑昵称弹层 -->
  </div>
</template>

<script>
import UserName from './UserName'
import { Toast } from 'vant'
export default {
  data () {
    return {
      userInfo: {},
      isShowUpdateName: false
    }
  },
  components: {
    UserName
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    changeUserName (username) {
      if (username === null) {
        this.isShowUpdateName = false
        return
      }
      if (username !== this.userInfo.name) {
        this.apis.user.updateUserProfileAPI({
          name: username
        }).then(() => {
          // 修改成功,清空message，退出页面
          this.userInfo.name = username
          Toast.success('修改成功')
        }, (err) => {
          Toast.fail('修改失败，请重试！', err)
        }).finally(() => {
          this.isShowUpdateName = false
        })
      } else {
        this.isShowUpdateName = false
      }
    },
    getUserProfile () {
      this.apis.user.getUserProfileAPI().then((res) => {
        // console.log(res)
        this.userInfo = res.data.data
      })
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>

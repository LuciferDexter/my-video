<template>
  <el-dialog
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    v-model="is_show"
    title="用户登录"
    width="90%"
    center
  >
    <form>
      <el-input
        style="width: 100%"
        v-model="pwd"
        placeholder="请输入密码"
        show-password
        @keypress.enter="Login"
      />
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="Login"> 登录 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import md5 from "js-md5";
import { ElMessage } from "element-plus";
export default {
  data() {
    return { pwd: "" };
  },
  props: { is_show: Boolean },
  methods: {
    Login() {
      var passwd = md5(this.pwd);
      for (var i = 0; i <= 8; i++) {
        passwd = md5(passwd);
      }
      console.log(passwd);
      $.get("/login", { pwd: passwd }, (data) => {
        this.resmsg = data;
        if (data != "") {
          this.$bus.emit("sys_login", passwd, data);
          ElMessage({
            message: "登录成功。",
            type: "success",
          });
          $(".player").show();
        } else {
          ElMessage.error("密码错误。");
        }
      });
    },
  },
};
</script>
<style lang="sass"></style>

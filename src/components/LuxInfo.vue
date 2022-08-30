<template>
  <el-dialog
    v-model="show"
    :fullscreen="true"
    :title="msg.vod_name"
    :before-close="win_Close"
    :destroy-on-close="true"
    @open="win_Create"
  >
    <el-row>
      <el-col
        style="text-align: center"
        :xs="24"
        :sm="0"
        :md="0"
        :lg="0"
        :xl="0"
      >
        <el-image :src="msg.vod_pic"></el-image>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        style="text-align: center"
        :xs="0"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-image :src="msg.vod_pic"></el-image>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <p>地区：{{ msg.vod_area }}</p>
        <p>导演：{{ msg.vod_director }}</p>
        <p>演员：{{ msg.vod_actor }}</p>
        <p>简介：{{ msg.vod_blurb }}</p>
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item, index) in urls" :key="index">
            <p>{{ item[index] }}</p>
            <el-button @click="sendplayer(urls[index])">正片</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col
            :xs="8"
            :sm="6"
            :md="4"
            :lg="3"
            :xl="2"
            v-for="(item, index) in infotitle"
            :key="index"
          >
            <el-button @click="sendplayer(infourl[index])">{{
              item
            }}</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    msg: [],
    show: Boolean,
  },
  data() {
    return {
      is_show: false,
      tete: [],
      urls: {},
      infotitle: [],
      infourl: [],
    };
  },
  mounted() {},
  methods: {
    sendplayer(url) {
      this.$bus.emit("sys_player_url", url);
      this.urls = {};
      this.infotitle = [];
      this.infourl = [];
      this.$bus.emit("sys_win_close");
    },
    win_Create() {
      var urlstr = this.msg.vod_play_url;
      var reg = /index.m3u8/;
      if (urlstr.indexOf("$") == -1) {
        this.urls = { urlstr };
      } else {
        var arr = urlstr.split("$$$");
        var n = arr[0].search(reg);
        var tmp = 0;
        if (n != -1) tmp = 0;
        else tmp = 1;
        arr = arr[tmp].split("#");
        for (let i = 0; i < arr.length; i++) {
          var infotmp = arr[i].split("$");
          if (infotmp[0] != "" || infotmp[1] != "") {
            this.infotitle.push(infotmp[0]);
            this.infourl.push(infotmp[1]);
          }
        }
      }
    },
    win_Close(done) {
      this.urls = {};
      this.infotitle = [];
      this.infourl = [];
      done();
    },
  },
};
</script>
<style lang="scss">
.el-dialog__headerbtn {
  -webkit-app-region: no-drag;
}
</style>
<template>
  <el-row>
    <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4"
      ><div class="grid-content bg-purple"></div
    ></el-col>
    <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="16"
      ><div id="dplayer" style="height: 100%"></div
    ></el-col>
    <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4"
      ><div class="grid-content bg-purple"></div
    ></el-col>
  </el-row>
</template>
<script>
import * as Hls from "hls.js";
import * as DPlayer from "dplayer";
export default {
  data() {
    return {
      url: "",
      dp: [],
    };
  },
  mounted() {
    var t = this;
    this.dp = new DPlayer({
      container: document.getElementById("dplayer"),
      autoplay: false,
      mutex: false,
      theme: "#b7daff",
      loop: false,
      lang: "zh-cn",
      screenshot: true,
      hotkey: true,
      preload: "auto",
      volume: 0.5,
      playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3],
      video: {
        url: t.url,
        type: "customHls",
        customType: {
          customHls: function (video, player) {
            const hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(video);
          },
        },
      },
    });

    this.$bus.on("sys_player_url", (url) => {
      t.url = url;
      this.dp.seek(0);
      t.dp.switchVideo({
        url: t.url,
        type: "customHls",
        customType: {
          customHls: function (video, player) {
            const hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(video);
          },
        },
      });
      this.dp.play();
    });
  },
};
</script>

<style lang="scss">

</style>

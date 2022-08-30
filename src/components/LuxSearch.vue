<template>
  <div style="margin: 15px 5px 15px 5px">
    <el-row>
      <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4"> </el-col>
      <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="16">
        <div>
          <el-input
            v-model="wd"
            placeholder="Please input"
            class="input-with-select"
            @keypress.enter="search_video"
          >
            <template #prepend>
              <el-select
                v-model="xl"
                placeholder="线路"
                style="width: 80px"
                @change="change_url"
              >
                <el-option
                  v-for="(item, index) in cfg.urls"
                  :key="index"
                  :value="item.name"
                ></el-option>
              </el-select>
            </template>
            <template #append>
              <el-button @click="search_video">
                <el-icon>
                  <search />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
        <div v-loading="loading">
          <div class="test">
            <!---------------------------------------------------------------------->
            <el-select
              @change="change_type"
              change_type
              v-model="type"
              placeholder="类型"
              style="width: 100%; margin-bottom: 15px"
              :model-value="DefaultValue"
            >
              <el-option label="全部" :value="9999999"></el-option>
              <el-option
                style="-webkit-app-region: no-drag"
                v-for="(item, index) in vod_types"
                :key="index"
                :label="item.type_name"
                :value="item.type_id"
              ></el-option>
            </el-select>
            <!---------------------------------------------------------------------->
            <el-row :gutter="10">
              <el-col
                v-for="(item, index) in vod_list.list"
                :key="index"
                :xs="24"
                :sm="8"
                :md="6"
                :lg="4"
                :xl="3"
              >
                <el-space direction="vertical" alignment="flex-start">
                  <el-skeleton style="width: 240px" :loading="loading" animated>
                    <template #template>
                      <el-skeleton-item
                        variant="image"
                        style="width: 300px; height: 200px"
                      />
                      <div style="padding: 14px">
                        <el-skeleton-item variant="h3" style="width: 50%" />
                        <div
                          style="
                            display: flex;
                            align-items: center;
                            justify-items: space-between;
                            margin-top: 16px;
                            height: 16px;
                          "
                        >
                          <el-skeleton-item
                            variant="text"
                            style="margin-right: 16px"
                          />
                          <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                      </div>
                    </template>
                    <template #default>
                      <el-card
                        :body-style="{ padding: '0px' }"
                        style="margin-bottom: 10px"
                        shadow="never"
                        @click="Get_VideoInfo(index)"
                      >
                        <el-image
                          :src="item.vod_pic"
                          class="image"
                          style="max-height: 491px"
                        />
                        <div style="padding: 14px">
                          <h3 class="cell">{{ item.vod_name }}</h3>
                          <div class="bottom">
                            <h5>{{ item.type_name }}</h5>
                            <time class="time">{{ item.vod_time }}</time>
                          </div>
                        </div>
                      </el-card>
                    </template>
                  </el-skeleton>
                </el-space>
              </el-col>
            </el-row>
          </div>
          <el-affix position="bottom" :offset="18">
            <div align="center" style="margin-top: 10px">
              <el-pagination
                background
                small
                :page-size="20"
                :total="vod_list.total"
                :current-page="nowpage"
                layout="prev, pager, next"
                @current-change="change_page"
              >
              </el-pagination>
            </div>
          </el-affix>
        </div>
      </el-col>
      <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4"> </el-col>
    </el-row>
  </div>
  <lux-info :show="win_show" :msg="vod_info" />
</template>
<script>
import LuxInfo from "./LuxInfo.vue";
export default {
  data() {
    return {
      vod_info: [],
      win_show: false,
      nowpage: 1,
      pwd: "",
      xl: "无尽",
      wd: "",
      pg: "1",
      tp: "",
      vod_list: [],
      vod_types: [],
      cfg: [],
      item: 0,
      loading: false,
      src: "无尽",
    };
  },
  components: { LuxInfo },
  mounted() {
    this.$bus.on("sys_login", (pwd, data) => {
      this.pwd = pwd;
      this.cfg = data;
      this.Get_List();
      this.Get_Types();
    });
    this.$bus.on("sys_win_close", () => {
      this.win_show = false;
    });
  },
  methods: {
    change_url() {
      this.Get_Loading();
      this.DefaultValue = "全部";
      this.pg = 1;
      this.nowpage = 1;
      this.tp = "";
      this.Get_Types();
      this.Get_List();
    },
    change_page(val) {
      this.Get_Loading();
      this.pg = val;
      this.nowpage = val;
      this.Get_List();
    },
    change_type(val) {
      this.Get_Loading();
      this.nowpage = 1;
      this.pg = 1;
      if (val == 9999999) {
        this.tp = "";
      } else {
        this.tp = val;
      }
      this.Get_List();
    },
    search_video() {
      this.Get_Loading();
      this.nowpage = 1;
      this.pg = 1;
      this.Get_List();
    },
    Get_VideoInfo(val) {
      this.vod_info = this.vod_list.list[val];
      this.win_show = true;
    },
    Get_Loading() {
      $(".test").scrollTop(0);
      this.loading = true;
    },
    Get_List() {
      var t = this;
      $.get(
        "/lux",
        {
          pwd: this.pwd,
          wd: this.wd,
          pg: this.pg,
          tp: this.tp,
          src: this.xl,
        },
        (data) => {
          t.vod_list = data;
          this.loading = false;
        }
      );
    },
    Get_Types() {
      var t = this;
      $.get("/type", { pwd: this.pwd, src: this.xl }, (data) => {
        t.vod_types = data;
      });
    },
  },
};
</script>
<style lang="scss">
.test {
  margin-top: 15px;
  //border: 1px solid red;
  height: 58vh;
  overflow-y: auto;
  overflow-x: hidden;
}

h5,
h3 {
  margin: 0px;
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 15px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  width: 100%;
  display: block;
}
.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /*下面三条缺一不可 可以生成 '...' 主要针对谷歌浏览器 */
  -webkit-line-clamp: 1; //表示行数
  -webkit-box-orient: vertical; //表示纵向
  margin: -5px;
}
</style>

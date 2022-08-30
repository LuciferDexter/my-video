<template>
  <div class="player">
    <el-button type="primary" @click="test"> test </el-button>
    <!--<lux-player />-->
  </div>
  <div class="search">
    <lux-search />
  </div>
</template>

<script>
import LuxPlayer from "./LuxPlayer.vue";
import LuxSearch from "./LuxSearch.vue";
export default {
  name: "HelloWorld",
  data() {
    return {
      getdata: "",
      pwd: "",
    };
  },
  props: {
    msg: String,
  },
  components: {
    LuxPlayer,
    LuxSearch,
  },
  mounted() {
  },
  methods: {
    test() {
      this.$axios.get('/api', {
        params: { ac: 'list', pg: 1 },
      })
        .then(function (response) {
          //res.json(response.data.class);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

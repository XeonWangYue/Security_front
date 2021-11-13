<template>
  <el-container>
    <el-header>
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
      >
        <el-menu-item index="hosts">主机监控</el-menu-item>
        <el-menu-item index="pcap">网络监控</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import router from "router/router";

export default {
  name: "Home",
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      router.push({path: '/' + key});
    }
  },
  data() {
    return {
      activeIndex: ""
    }
  }
}
</script>

<style scoped>
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
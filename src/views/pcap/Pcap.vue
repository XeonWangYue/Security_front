<template>
  <!--  <el-row>-->
  <!--    <HostPcap hostname="/localhost"></HostPcap>-->
  <!--  </el-row>-->
  <!--  <el-row>-->
  <!--    <HostPcap hostname="/192.168.17.140"></HostPcap>-->
  <!--  </el-row>-->
  <template v-for="host in hosts">
      <HostPcap :hostname=host></HostPcap>
  </template>
</template>

<script>
import {postHosts} from "api/index";
import HostPcap from "./HostPcap.vue";

export default {
  name: "Pcap",
  components: {
    HostPcap
  },
  methods: {
    getHosts() {
      postHosts().then((res) => {
        if (res.length && res.length != 0) {
          this.hosts = res;
        }
      })
    }
  },
  mounted() {
    this.getHosts();
  },
  data() {
    return {
      hosts: null,
    }
  }
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
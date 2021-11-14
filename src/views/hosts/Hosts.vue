<template>
  <template v-for="name in hosts" class="hoststyle">
    <HostInfo :ip=name></HostInfo>
  </template>
</template>

<script>
import HostInfo from "views/hosts/HostInfo.vue"
import {postHosts} from "api/index";

export default {
  name: "Hosts",
  components: {
    HostInfo
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
      hosts: []
    }
  }
}
</script>

<style scoped>

</style>
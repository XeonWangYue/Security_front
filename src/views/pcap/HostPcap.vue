<template>
  <el-row>
    <el-descriptions
        class="margin-top"
        :title=hostname
        :column="4"
        border
    >
      <template #extra>
        <el-button type="danger" size="small">禁用网络</el-button>
        <el-button type="warning" size="small">发出警告</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          平台
        </template>
        ubuntu
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          硬件地址
        </template>
        1233:gfbb:3425:2525:dagg:234d
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          收到报文数
        </template>
        1995959
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          发送报文数
        </template>
        1995959
      </el-descriptions-item>
    </el-descriptions>
  </el-row>
  <el-row>
    <div ref="speed" style="width: 100%;height: 600px"></div>
  </el-row>
  <el-row>
    <div ref="packSt" style="width: 100%;height: 600px"></div>
  </el-row>
</template>

<script>
export default {
  name: "HostPcap",
  props: {
    hostname: String
  },
  data() {
    return {
      name: "",

      chartSpeed: null,
      chartPack: null,
    }
  },
  mounted() {
    this.setSpeed();
  },
  methods: {
    setSpeed() {
      let dom = this.$refs.speed;
      this.chartSpeed = this.$echarts.init(dom);
      let data = [100,14,42,56];

      let options = {
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: ['udp', 'tcp', 'arp', 'icmp'],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            realtimeSort: true,
            name: '报文数',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      };
      this.chartSpeed.setOption(options);
    },
    setPack() {

    }
  }
}
</script>

<style scoped>

</style>
<template>
  <el-row>
    <el-descriptions
        class="margin-top"
        :title=hostname
        :column="4"
        border
    >
      <template #extra>
        <el-button type="danger" size="small" @click="onDisable">禁用网络</el-button>
        <el-button type="warning" size="small" @click="onWarning">发出警告</el-button>
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
    <div ref="pack" style="width: 100%;height: 600px"></div>
  </el-row>
  <el-row>
    <div ref="speed" style="width: 100%;height: 600px"></div>
  </el-row>
</template>

<script>
import {postPackcount, postOneSecond} from "api/index";
import {postDisable, postWarning} from "../../api";

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
      packInternal: null,
      speedInternal: null
    }
  },
  mounted() {
    this.setPack();
    this.setSpeed();
  },
  unmounted() {
    clearInterval(this.speedInternal);
    clearInterval(this.packInternal);
  },
  methods: {
    setPack() {
      let dom = this.$refs.pack;
      this.chartPack = this.$echarts.init(dom);
      let data = [0, 0, 0, 0];

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
        animationDurationUpdate: 5000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      };
      this.chartPack.setOption(options)

      this.packInternal = setInterval(() => {
        postPackcount(this.hostname).then((res) => {
          if (res != null) {
            data[0] = res.tcp;
            data[1] = res.udp;
            data[2] = res.arp;
            data[3] = res.icmp;
            console.log(data);
            this.chartPack.setOption({
              series: [{
                name: '报文数',
                data: data
              }]
            })
          } else {
            clearInterval(this.chartPack);
          }
        })
      }, 10 * 1000)
    },
    setSpeed() {
      let dom = this.$refs.speed;
      this.chartSpeed = this.$echarts.init(dom);
      let data = [];
      let options = {
        title: {
          text: this.hostname
        },
        legend: {
          data: ["speed"]
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]['data'];
            let date = new Date(params.name);
            return (
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds() +
                ' : ' +
                params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'speed',
            type: 'line',
            areaStyle: {},
            showSymbol: false,
            data: data
          },
        ]
      };
      let labels = ["( B)", "(KB)", "(MB)", "(GB)"];
      this.chartSpeed.setOption(options);
      this.speedInternal = setInterval(() => {
        postOneSecond(this.hostname).then((res) => {
          if (!res) {
            clearInterval(this.speedInternal);
          }
          let timenow = Date.now();
          let name = new Date(timenow);
          let value = [name.getFullYear(), name.getMonth() + 1, name.getDay()].join("/") + " " + [name.getHours(), name.getMinutes(), name.getSeconds()].join(":");
          let temp = res.length
          let dataone = {
            name: timenow,
            value: [value, temp]
          }
          data.push(dataone);
          if (data.length > 100) {
            data.shift();
          }
          this.chartSpeed.setOption({
            title: {
              text: this.hostname
            },
            series: [
              {
                name: "speed",
                data: data
              }
            ]
          })
        });
      }, 3000);
    },
    onWarning() {
      postWarning(this.hostname).then((res) => {
        alert("发送成功!");
      })
    },
    onDisable() {
      postDisable(this.hostname).then((res)=>{
        alert("发送成功!");
      })
    }
  }
}
</script>

<style scoped>

</style>
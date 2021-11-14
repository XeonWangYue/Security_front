<template>
  <el-row>
    <el-col :span="12">
      <div ref="usepercent" style="width: 100%;height: 600px"></div>
    </el-col>
    <el-col :span="6">
      <el-descriptions>
        <el-descriptions-item label="用户平台">{{ this.platform }}</el-descriptions-item>
        <el-descriptions-item label="正常运行时间">{{ this.myuptime }}</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
</template>

<script>
import {postSystem} from "api";

export default {
  name: "HostInfo",
  props: {
    ip: String
  },
  methods: {
    cpuUse() {
      const dom = this.$refs.usepercent;
      this.charts = this.$echarts.init(dom);
      let cpudata = [];
      let memorydata = [];
      let option = {
        title: {
          text: this.ip
        },
        legend: {
          data: ["cpu", "memory"]
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
          max: 100,
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'memory',
            type: 'line',
            areaStyle: {
              opacity: 0.7
            },
            showSymbol: false,
            data: cpudata
          },
          {
            name: 'cpu',
            type: 'line',
            areaStyle: {
              opacity: 1
            },
            showSymbol: false,
            data: cpudata
          }
        ]
      };
      this.charts.setOption(option);
      this.interval = setInterval(() => {
        postSystem(this.ip).then(response => {
          if (response == null) {
            clearInterval(this.interval);
          }
          let obj;
          try {
            obj = JSON.parse(response)
          } catch (e) {
            clearInterval(this.interval)
          }
          let cpuper = obj.cpuLoadPercentage;
          let memory = obj.memory;
          let perdata = this.getCpuData(cpuper, memory)
          this.myuptime = obj.uptime;
          if (cpudata.length == 0) {
            this.platform = obj.platform;
          }

          memorydata.push(perdata[1]);
          cpudata.push(perdata[0]);
          if (memorydata.length > 100) {
            memorydata.shift();
          }
          if (cpudata.length > 100) {
            cpudata.shift();
          }
          this.charts.setOption({
            series: [
              {
                name: "cpu",
                data: cpudata
              },
              {
                name: "memory",
                data: memorydata
              }
            ]
          })
        })
      }, 1000)
    },
    getCpuData(cpuper, memory) {
      let timenow = Date.now();
      let name = new Date(timenow);
      let value = [name.getFullYear(), name.getMonth() + 1, name.getDay()].join("/") + " " + [name.getHours(), name.getMinutes(), name.getSeconds()].join(":");
      return [{
        name: timenow,
        value: [value, cpuper]
      },
        {
          name: timenow,
          value: [value, memory]
        }];
    }
  },
  mounted() {
    this.cpuUse();
  },
  unmounted() {
    clearInterval(this.interval);
  },
  data() {
    return {
      platform: "",
      uptime: 0,
      charts: null,
      interval: null
    }
  },
  computed: {
    myuptime: {
      set: function (newValue) {
        this.uptime = newValue;
      },
      get: function () {
        let secs = this.uptime;
        let day = Math.floor(secs / 86400);
        secs = secs % 86400;
        let hour = Math.floor(secs / 3600);
        secs = secs % 3600;
        let minute = Math.floor(secs / 60);
        secs = secs % 60;
        let seconds = secs
        return day + "天 " + hour + "小时 " + minute + "分钟 " + seconds + "秒";
      }
    }
  }
}
</script>

<style scoped>
</style>
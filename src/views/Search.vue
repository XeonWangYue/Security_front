<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item>
      <el-input v-model="form.bpf"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">Search</el-button>
      <el-button @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" class="infinite-list-item">
      <el-descriptions class="margin-top"
                       :column="7"
                       border>
        <el-descriptions-item>
          <template #label>
            编号
          </template>
          {{ (this.packs[i - 1]).id }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            报文类型
          </template>
          {{ (this.packs[i - 1]).type }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            源地址
          </template>
          {{ (this.packs[i - 1]).srcAddr }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            源端口
          </template>
          {{ (this.packs[i - 1]).srcPort }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            目的地址
          </template>
          {{ (this.packs[i - 1]).dstAddr }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            目的端口
          </template>
          {{ (this.packs[i - 1]).dstPort }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            报文长度（B）
          </template>
          {{ (this.packs[i - 1]).length }}
        </el-descriptions-item>
      </el-descriptions>
    </li>
  </ul>
</template>

<script>
import {postSearch} from "api/index";

export default {
  name: "Search",
  data() {
    return {
      form: {
        bpf: ""
      },
      count: 0,
      packs: [],
      temp: [],
    }
  },
  methods: {
    onSearch() {
      postSearch(this.form.bpf).then((res) => {
        this.count = 0;
        this.packs = [];
        this.temp = res;
        let step = (this.temp.length - this.count) > 20 ? 20 : (this.temp.length - this.count);
        for (let i = this.count; i < this.count + step; i++) {
          this.packs.push(this.temp[i])
        }
        this.count += step;
      })
    },
    load() {
      if (this.count == 0) {
        return;
      }
      let step = (this.temp.length - this.count) > 20 ? 20 : (this.temp.length - this.count);
      for (let i = this.count; i < this.count + step; i++) {
        this.packs.push(this.temp[i])
      }
      this.count += step;
    },
    onReset() {
      this.form.bpf = "";
    }
  }
}
</script>

<style lang="scss">
.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
}
</style>
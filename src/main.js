import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import router from "router/router";


const app = createApp(App).use(router).use(ElementPlus, {locale})

app.config.globalProperties.$echarts = echarts
app.mount("#app")


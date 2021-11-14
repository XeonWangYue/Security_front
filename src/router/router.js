import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import("views/Home.vue")
const Hosts = () => import('views/hosts/Hosts.vue')
const Pcap = () => import("views/pcap/Pcap.vue")

const routes = [
  {
    path: '/hosts',
    component: Hosts
  },
  {
    path: '/pcap',
    component: Pcap
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
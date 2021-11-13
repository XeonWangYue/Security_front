import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import("views/Home.vue")
const Hosts = () => import('views/hosts/Hosts.vue')
const Pcap = () => import("views/pcap/Pcap.vue")

const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    redirect: "/hosts",
    component: Home,
  },
  {
    path: '/hosts',
    component: Hosts
  },
  {
    path: '/pacp',
    component: Pcap
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
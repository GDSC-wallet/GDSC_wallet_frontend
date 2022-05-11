import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chart from '../views/Chart.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
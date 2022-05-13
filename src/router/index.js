import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chart from '../views/Chart.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

import store from '@/store';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        meta: { requiresAuth: true },
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }, // 不需驗證
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: { requiresAuth: false }, // 不需驗證
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
    console.log('to=', to.fullPath, '| from=', from.fullPath);
    const isAuthenticated = store.getters['auth/isLoggedin']
    if (to.matched.some(record => {
        console.log(record.name, record.meta.requiresAuth);
        return record.meta.requiresAuth;
    })) {
        // 如果沒有 token 
        if (!isAuthenticated) {
            // 轉跳到 login page
            next({ path: '/login' });
        } else {
            next(); // 往下繼續執行
        }
    } else {
        next(); // 往下繼續執行
    }
});

export default router

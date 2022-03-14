import { createWebHistory, createRouter } from "vue-router";

// import views
import Home from "./views/Home.vue";
import About from "./views/About.vue";

const routes = [
    {path: "/", name: "Home", component: Home},
    {path: "/about", name: "About", component: About},
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    routes
});

export default router;
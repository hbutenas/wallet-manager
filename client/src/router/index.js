import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/register',
                name: 'Register',
                component: Home // change to normal component
            },
            {
                path: '/forgot',
                name: 'Forgot',
                component: Home // change to normal component
            }
        ]
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Home // change to normal component
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

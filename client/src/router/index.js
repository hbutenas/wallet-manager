import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { beforeEnterValidation } from '../composables/auth/beforeEnterValidation';

/**
 * Todo
 * Whenever already logged in user hits the / route he should be redirected to 'Dashboard' page
 */

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
        component: () => import('../views/Dashboard/Dashboard.vue'),
        async beforeEnter(to, from, next) {
            const response = await beforeEnterValidation();

            if (!response) await router.push({ name: 'Home' });

            next();
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

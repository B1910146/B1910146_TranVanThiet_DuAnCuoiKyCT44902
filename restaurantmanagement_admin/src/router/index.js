import { createWebHistory, createRouter } from "vue-router";
import DishManagement from "@/views/DishManagement.vue";
import notFound from "@/views/NotFound.vue";
import employeeManagement from "@/views/EmployeeManagement.vue";
import order from "@/views/Order.vue";
import userInfo from "@/views/UserInfo.vue";
import billManagement from "@/views/BillManagement.vue";
import UserAdd from "@/views/UserAdd.vue";
import DishAdd from "@/views/DishAdd.vue";
import DishUpdate from "@/views/DishUpdate.vue";
// import Login from "@/views/Login.vue";
import UserUpdate from "@/views/UserUpdate.vue";

const routes = [
    // {
    //     path: "/",
    //     name: "login",
    //     component: Login,
    //     // router.beforeEach((to, from, next) => {
    //     //     // to and from are both route objects. must call `next`.
    //     // })
    // },

    {
        path: "/dish",
        name: "dishmanagement",
        component: DishManagement,
    },

    {
        path: "/addDish",
        name: "dish.add",
        component: DishAdd,
    },

    {
        path: "/updateDish/:id",
        name: "dish.update",
        component: DishUpdate,
        props: true,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: notFound,
    },

    {
        path: "/employee",
        name: "employeemanagement",
        component: employeeManagement,
    },

    {
        path: "/updateEmployee/:id",
        name: "user.update",
        component: UserUpdate,
        props: true,
    },

    {
        path: "/addUser",
        name: "user.add",
        component: UserAdd,
    },

    {
        path: "/order",
        name: "order",
        component: order,
    },

    {
        path: "/user",
        name: "userinformation",
        component: userInfo,
    },

    // {
    //     path: "/register",
    //     name: "register",
    //     component: Register,
    // },
    
    // {
    //     path: "/admin/login",
    //     name: "login",
    //     component: Login,
    // },

    {
        path: "/bill",
        name: "billmanagement",
        component: billManagement,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
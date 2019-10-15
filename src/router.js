import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/home.vue"),
      children: [
        {
          path: "CarMsg",
          name: "CarMsg",
          component: () => import("./views/CarManagement/CarMsg.vue")
        },
        {
          path: "/base",
          name: "base",
          component: () => import("./views/CarManagement/base.vue")
        },
        {
          path: "toiltmsg",
          name: "toiltmsg",
          component: () => import("./views/ToiletManagement/ToiltMsg.vue")
        },
        {
          path: "supervision",
          name: "supervision",
          component: () => import("./views/ToiletManagement/Supervision.vue")
        },
        {
          path: "personnel",
          name: "personnel",
          component: () => import("./views/ToiletManagement/Personnel.vue")
        },
        {
          path: "monitor",
          name: "monitor",
          component: () => import("./views/ToiletManagement/Monitor.vue")
        },
        {
          path: "mobile",
          name: "mobile",
          component: () => import("./views/ToiletManagement/Mobile.vue")
        },
        {
          path: "led",
          name: "led",
          component: () => import("./views/ToiletManagement/LED.vue")
        },
        {
          path: "assessment",
          name: "assessment",
          component: () => import("./views/HRManagement/Assessment.vue")
        },
        {
          path: "hr",
          name: "hr",
          component: () => import("./views/HRManagement/HRManagement.vue")
        },
        {
          path: "message",
          name: "message",
          component: () => import("./views/HRManagement/Message.vue")
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/login.vue")
    }
  ]
});

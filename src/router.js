import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("./views/home/home.vue"),
      redirect: "/homeview",
      children: [
        {
          path: "/homeview",
          name: "homeview",
          component: () => import("./views/homeview/homeview.vue"),
        },
        {
          path: "/onece",
          name: "onece",
          component: () => import("./views/onece/index.vue"),
        },
        {
          path:"/onece/base",
          name:"base",
          component: () =>import("./views/onece/base.vue")
        },
        {
          path:"/onece/carmsg",
          name:"base",
          component: () =>import("./views/onece/CarMsg.vue")
        },
        {
          path:"/onece/vehicle",
          name:"vehicle",
          component: () =>import("./views/onece/vehicle.vue")
        },
        {
          path: "/town",
          name: "town",
          component: () => import("./views/town/index.vue")
        },
        {
          path: "/town/worker",
          name: "worker",
          component: () => import("./views/town/Worker.vue")
        },
        {
          path: "/town/carmsg",
          name: "CarMsg",
          component: () => import("./views/town/CarMsg.vue")
        },
        {
          path: "/town/supervision",
          name: "supervision",
          component: () => import("./views/town/Supervision.vue")
        },
        {
          path: "/welcom",
          name: "welcom",
          component: () => import("./views/three/index.vue")
        },
        {
          path: "/business",
          name: "business",
          component: () => import("./views/four/index.vue")
        },
        {
          path: "/business/process",
          name: "process",
          component: () => import("./views/four/process.vue")
        },
        {
          path: "/matters",
          name: "matters",
          component: () => import("./views/five/index.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/login.vue")
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  mode: 'hash',
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
          name:"carmsg",
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
          path: "/welcom/wcmap",
          name: "wcmap",
          component: () => import("./views/three/wcmap.vue")
        },
        {
          path: "/welcom/toiltMsg",
          name: "toiltMsg",
          component: () => import("./views/three/ToiltMsg.vue")
        },
        {
          path: "/welcom/WcSupervision",
          name: "WcSupervision",
          component: () => import("./views/three/WcSupervision.vue")
        },
        {
          path: "/welcom/Personnel",
          name: "Personnel",
          component: () => import("./views/three/Personnel.vue")
        },
        {
          path: "/welcom/LED",
          name: "LED",
          component: () => import("./views/three/LED.vue")
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
          path: "/business/project",
          name: "project",
          component: () => import("./views/four/project.vue")
        },
        {
          path: "/matters",
          name: "matters",
          component: () => import("./views/five/index.vue")
        },
        {
          path: "/Recruitment",
          name: "Recruitment",
          component: () => import("./views/five/Recruitment.vue")
        },
        {
          path: "/AddressBook",
          name: "AddressBook",
          component: () => import("./views/five/AddressBook.vue")
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

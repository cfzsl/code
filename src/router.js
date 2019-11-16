import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("./views/home/home.vue"),
      redirect: "/town/supervision",
      children: [
        // {
        //   path: "/homeview",
        //   name: "homeview",
        //   component: () => import("./views/homeview/homeview.vue")
        // },
        // {
        //   path: "/onece/base",
        //   name: "base",
        //   component: () => import("./views/onece/base.vue")
        // },
        // {
        //   path: "/onece/carmsg",
        //   name: "carmsg",
        //   component: () => import("./views/onece/CarMsg.vue")
        // },
        // {
        //   path: "/onece/vehicle",
        //   name: "vehicle",
        //   component: () => import("./views/onece/vehicle.vue")
        // },
        {
          path: "/town/worker",
          name: "worker",
          component: () => import("./views/worker/Worker.vue")
        },
        // {
        //   path: "/town/carmsg",
        //   name: "CarMsg",
        //   component: () => import("./views/town/CarMsg.vue")
        // },
        {
          path: "/town/supervision",
          name: "supervision",
          component: () => import("./views/supervision/Supervision.vue")
        },
        // {
        //   path: "/welcom/wcmap",
        //   name: "wcmap",
        //   component: () => import("./views/three/wcmap.vue")
        // },
        // {
        //   path: "/welcom/toiltMsg",
        //   name: "toiltMsg",
        //   component: () => import("./views/three/ToiltMsg.vue")
        // },
        // {
        //   path: "/welcom/WcSupervision",
        //   name: "WcSupervision",
        //   component: () => import("./views/three/WcSupervision.vue")
        // },
        // {
        //   path: "/welcom/Personnel",
        //   name: "Personnel",
        //   component: () => import("./views/three/Personnel.vue")
        // },
        // {
        //   path: "/welcom/LED",
        //   name: "LED",
        //   component: () => import("./views/three/LED.vue")
        // },
        {
          path: "/business/process",
          name: "process",
          component: () => import("./views/process/process.vue")
        },
        // {
        //   path: "/business/project",
        //   name: "project",
        //   component: () => import("./views/four/project.vue")
        // },
        // {
        //   path: "/Recruitment",
        //   name: "Recruitment",
        //   component: () => import("./views/five/Recruitment.vue")
        // },
        {
          path: "/AddressBook",
          name: "AddressBook",
          component: () => import("./views/personnel/AddressBook.vue")
        },
        // {
        //   path: "/Attendance",
        //   name: "Attendance",
        //   component: () => import("./views/five/Attendance.vue")
        // },
        {
          path: "/matters/HRManagement",
          name: "HRManagement",
          component: () => import("./views/personnel/HRManagement.vue")
        },
        // {
        //   path: "/matters/bonus",
        //   name: "bonus",
        //   component: () => import("./views/five/bonus.vue")
        // },
        {
          path: "/matters/details",
          name: "details",
          component: () => import("./views/details/details.vue")
        },
        {
          path: "/matters/Adance",
          name: "details",
          component: () => import("./views/personnel/Adance.vue")
        },
        {
          path: "/logList",
          name: "logList",
          component: () => import("./views/logList/logList.vue")
        },
        {
          path: "/materiel",
          name: "materiel",
          component: () => import("./views/materiel/materiel.vue")
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/OmoFun/Manage.vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component:()=>import('../views/OmoFun/Manage.vue'),
    redirect:"/index",
    children:[
      {path:'index', name:'Index', component:()=>import('../views/OmoFun/Index')},
      {path:'dongmanindex', name:'DongManIndex', component:()=>import('../views/OmoFun/DongManIndex')},
      {path:'detail', name:'Detail', component:()=>import('../views/OmoFun/Detail')},
      {path:'play', name:'Play', component:()=>import('../views/OmoFun/Play')},
    ]
  },
  {
    path: '/Backstage',
    name: 'Backstage',
    component: () => import('../views/Backstage/BackstageView.vue'),
    redirect: "video",
    children:[
      {path:'/video', name:'VideoManagement', component:()=>import('../views/Backstage/VideoManagement'),meta: {authRequired: true}},
      {path: '/playManagement',name: 'PlayManagement.vue',component:()=>import('../views/Backstage/PlayManagement'),meta: {authRequired: true}},
      {path: '/personal',name: 'Personal.vue',component:()=>import('../views/Backstage/Personal'),meta: {authRequired: true}},
      {path: '/permission',name: 'Permission.vue',component:()=>import('../views/Backstage/Permission'),meta: {authRequired: true}}
    ]
  },
  {
    path: '/Login',
    name:"Login",
    component:() => import('../views/Backstage/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user')
  // 目标路由不是登录页，并且还需要token验证，还没有token，那就直接给返回到登录页
  if (to.name != 'Login'&& to.meta.authRequired && !token){
    next({ name: 'Login' })
  }else{
    // 目标路由是登录页-自然不需要token验证
    // 或目标路由不需要身份验证
    // 又或目标路由非登录页，需要token验证，但是有token
    // next放行
    next()
  }
})

export default router

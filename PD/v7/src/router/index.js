

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'
export const constantRoutesStart = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
];



/** 固定Routes */
export const constantRoutes = constantRoutesStart

/** 异步加载Routes 根据权限 */
export const asyncRouterMap = [

  {
    path: '/company',
    component: Layout,
    redirect: '/company/list',
    // alwaysShow: true,
    name: '商家管理',
    meta: { title: '商家管理', icon: 'el-icon-s-goods', },
    children: [
      {
        path: 'list',
        name: '商家列表',
        component: () => import('@/views/company/list'),
        meta: { title: '商家列表', icon: 'el-icon-s-goods', }
      },
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    // alwaysShow: true,
    name: '订单管理',
    meta: { title: '订单管理', icon: 'el-icon-s-order', },
    children: [
      {
        path: 'list',
        name: '订单列表',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: 'el-icon-s-order', }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    alwaysShow: true,
    name: '用户及角色管理',
    meta: { title: '用户及角色管理', icon: 'el-icon-user-solid', },
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/users/list'),
        meta: { title: '用户管理', icon: '', }
      },
      {
        path: 'rolelist',
        name: '角色管理',
        component: () => import('@/views/role/list'),
        meta: { title: '角色管理', icon: '', }
      },
    ]
  },


  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' } }
];

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()



export default router

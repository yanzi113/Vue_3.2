import router from './index'
import store from '@/store'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // 要判断是否登录，首先要拿到token token在vuex里，所以要导入store
  // 判断token是否存在，如果存在，判断它要去的路径是不是login,如果是login把它重定向到首页去
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      // 如果要去的路径不等于login，则随便访问
    } else {
      next()
    }
    // 没有token时，即用户尚未登录
    // 检查用户要访问的路由是否在whiteList白名单列表中
  } else {
    // 要访问的路由包含去白名单的路径
    if (whiteList.includes(to.path)) {
      next() // 在白名单则允许用户继续访
      // 不在白名单中，重定向到登陆界面/login
    } else {
      next('/login')
    }
  }
})

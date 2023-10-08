import { login as loginApi } from '@/api/login'
// 导入名为loginApi的登录接口函数，该函数用于发送登录请求
import router from '@/router'
// 导入Promise的reject和resolve方法，用于处理异步操作的结果
// 导出一个对象作为Vuex模块的默认导出
// 设置该模块的命名空间为true,即在使用该模块的地方需要通过模块名来访问其中的状态和操作
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,

  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  // 定义该模块的状态，其中token是存储在本地存储中的登录凭证
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      // 定义该模块的变更操作，其中 setToken 是一个变更函数，用于设置 token 的值，并将其存储在本地存储中。
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            console.log(res)
            commit('setToken', res.token)
            setTokenTime()
            router.replace('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 推出时，先把存的东西给它设置为默认值
    logout({ commit }) {
      commit('setToken', '')
      // clear是清空设置为默认值
      localStorage.clear()
      // 同时返回到登录界面
      router.replace('/login')
    }
  }
}
// 这段代码的作用是在登录时调用登录接口函数，将返回的 token 存储在状态中，并提供了一个异步操作函数 login，可以在组件中调用该函数来进行登录操作。
// 在 login 函数中，首先创建一个 Promise 对象，用于处理异步操作的结果。

// 在 loginApi(userInfo) 中调用登录接口函数，将用户信息作为参数传递给它。
// 如果登录成功，通过 commit 方法调用 setToken 变更函数，将返回的 token 设置到状态中。
// 如果登录失败，返回错误信息
// 最后，通过 resolve 方法将异步操作的结果返回。

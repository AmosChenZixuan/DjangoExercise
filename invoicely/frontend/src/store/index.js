import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      username:''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    initStore(state) {
      let token = localStorage.getItem('token')
      if (token){
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')
        state.token = token
        state.isAuthenticated = true
      }
      else{
        this.commit("removeToken")
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.user.username = ''
      state.user.id = ''
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
  },
  modules: {
  }
})

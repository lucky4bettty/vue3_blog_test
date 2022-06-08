import { createStore } from "vuex";
import nowRoute from './modules/nowRoute.js'
import login from './modules/login.js'


export default createStore({
  modules: {
     nowRoute:nowRoute,
     login:login
  }
});

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

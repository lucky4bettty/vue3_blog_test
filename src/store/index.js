import { createStore } from "vuex";
import nowRoute from './modules/nowRoute.js'
import login from './modules/login.js'
import commonData from './modules/commonData.js'


export default createStore({
  modules: {
     nowRoute:nowRoute,
     login:login,
     commonData:commonData
  }
});

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

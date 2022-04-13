import { createStore } from "vuex";
import nowRoute from './modules/nowRoute.js'


export default createStore({
  modules: {
     nowRoute:nowRoute,
  }
});

// export default createStore({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

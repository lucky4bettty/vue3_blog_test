import axios from 'axios'
import router from "@/router/index.js";

const CSRF_TOKEN = (process.env.NODE_ENV == 'production')? document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1] : "";
const instance = axios.create({
    retry:2,
    retryDelay : 1000,
    timeout: 300000,
    headers: { "Content-Type": "application/json;charset=UTF-8", "X-XSRF-TOKEN": CSRF_TOKEN },
})



instance.interceptors.request.use(
    (confing) => {
      console.log('攔截請求');
      console.log(`request url: ${confing.url}`);
      return confing;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
instance.interceptors.response.use(
    (response) => {
      console.log('攔截回應');
      console.log(response.data);
      return response;
    },
    (err) => {
      console.log("----攔截錯誤訊息----")
      console.log(err)
        if (err && err.response) {
            switch (err.response.status) {
              case 400:
                err.message = '請求錯誤'
                break
              case 401:
                err.message = '未授權，請登入'
                break
              case 403:
                err.message = '拒絕訪問'
                break
              case 404:
                err.message = `請求地址出錯: ${err.response.config.url}`
                break
              case 408:
                err.message = '請求超時'
                break
              case 500:
                err.message = '伺服器內部錯誤'
                break
              case 501:
                err.message = '服務未實現'
                break
              case 502:
                err.message = '閘道器錯誤'
                break
              case 503:
                err.message = '服務不可用'
                break
              case 504:
                err.message = '閘道器超時'
                break
              case 505:
                err.message = 'HTTP版本不受支援'
                break
              default:
            }
          }

          // // 若為401 直接導到錯誤頁
          // if(err.response.status == 401){
          //   router.push("/errpage");
          // }
          
          return Promise.reject(err.message)
    }
);

/**
 * 請求Token
 * @param {*} callback 請求成功回撥
 * @param {*} user token請求引數，登入資訊
 */
function getToken(callback, user) {
    var srcwin = window.opener || window.parent
    srcwin.postMessage('SUBSYS.ADMIN|GetToken', '*')
  
    setTimeout(function() {
      if (callback) {
        const obj = storeHelper.getStorageObject()
        // console.log('wandan')
        // console.log(obj)
        if (obj && obj.tokenInfo) {
          instance.defaults.headers.common['Authorization'] = 'bearer ' + obj.tokenInfo.access_token
          return callback(obj.tokenInfo)
        }
      }
    }, 2000)
    return
    // ---------------------
  }
  instance.install = (Vue) => {
    Vue.prototype.$http = instance
    Vue.prototype.$getToken = getToken
    Vue.prototype.$mystore = storeHelper
  }

  export default instance;

// 全域攔截 :  https://nighthree.github.io/2020/08/19/2020-08-19-vue%E7%9A%84axios%E6%94%94%E6%88%AA%E5%99%A8/

// 超時請求 參考 : https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/204094/

// axios封裝參考2(目前主要用這個) : https://www.itread01.com/content/1541730913.html
// axios封裝參考3 :https://www.itread01.com/content/1541730872.html
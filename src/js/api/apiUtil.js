import axios from "@/js/api/axiosUtil"; // 請求API(+攔截器)
import { loadingView } from "@/js/utils/Utils.js";
import { watch, onMounted, computed, ref, inject } from "vue";




export const apiUtil = async (path, data = {}, method = 'post', useLocalJson = false) => {
    const basicDialog = inject("basicDialog");

    let pathStr;
    if(false) { //是否為測試用資料
      method = 'get';
      pathStr = '/testJson/' + path + '.json';
    } 
    
    var load = loadingView();

    var passData = {
      "txid":path,
      "data":data
    }
    console.log('request data');
    console.log(passData);

    var result = await axios
    [method]('/api', passData) 
    .then(function(res) {
      console.log("apiUtils----正確ＭＳＧ")
      console.log(res)
      let resObj = JSON.parse(res.data.responseData);


      // 這裡的 code 和 status code 毫無關聯，只是前後端約定好便於判斷的代號，如果不是 200 會跳出錯誤彈窗
      if(resObj.result !== '0') { 
        return new Error(`${resObj.message}`);
      }

      return resObj;
    })
    .catch(function (error) {
      // 请求失败处理
      let errResult = typeof error === 'string' ? new Error(error) : error;
      console.log(errResult);
      load.close();
      return errResult;
    });
    load.close();
    return result;
}
<template>
<div class='perSet salRep'>
    <div class="pop car_mark">
        <el-dialog v-model="dialogVisble" :title="title" center :before-close="handleClose">
            <div class="bodyContent">
                <!-- 查詢 -->
                <el-tabs v-model="activeName" stretch type="border-card" @tab-click="tab_toggle">
                    <el-tab-pane name="markSearch" label="廠牌查詢" class='button_page' >
                        <el-row :gutter='24'>
                            <el-col :xs="24" :sm="12">
                                <FBSelect :option='dialogState.trmakItem' :value='valObj.trmakVal' fieldName="trmak" label="廠牌" class='suffix_fix mb-md-0'>
                                </FBSelect>
                            </el-col>
                            <el-col :xs="24" :sm="12">
                                <FBSelect :option='dialogState.vehSeriesItem' :value='valObj.vehSeriesVal' fieldName="vehSeries" label="車系" class='suffix_fix'>
                                </FBSelect>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24" justify="center" class='btnRow FBButtons bt_footer'>
                            <el-col :xs="12" :sm="8">
                                <!-- 清空 -->
                                <el-button round class='el-button--base button_couple bt_white' @click="clearMark">清空</el-button>
                            </el-col>
                            <el-col :xs="12" :sm="8">
                                <!-- 查詢 -->
                                <el-button round class='el-button--base button_couple' @click="getTramakList">查詢</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane name="keyWordSearch" label="關鍵字查詢" class='button_page'>
                        <el-row>
                            <el-input class="keyword_search" v-model="valObj.keyWord" fieldName="keyWord" placeholder="請輸入關鍵字"></el-input>
                        </el-row>
                        <el-row :gutter="24" justify="center" class='btnRow FBButtons bt_footer'>
                            <el-col :xs="12" :sm="8">
                                <!-- 清空 -->
                                <el-button round class='el-button--base button_couple bt_white' @click="clearKeyWord">清空</el-button>
                            </el-col>
                            <el-col :xs="12" :sm="8">
                                <!-- 查詢 -->
                                <el-button round class='el-button--base button_couple' @click="getVehMakeKeyWord">查詢</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
                <!-- !!!「關鍵字搜尋」時要關閉 -->
                <!-- 查詢選項 -->
                <el-collapse class='collapse_content' accordion>
                    <!-- 熱門廠牌:第1階段未啟用，故隱藏 -->
                    <el-collapse-item title="熱門廠牌" class='mark_g hot d-none'>
                        <el-row justify="space-between" class=''>
                            <el-button class='mark hot'>Alfa Romeo 愛快羅密歐</el-button>
                            <el-button class='mark hot'>Chrysler 克萊斯勒</el-button>
                            <el-button class='mark hot'>Lamborghini 林寶堅尼</el-button>
                            <el-button class='mark hot'>Maserati 瑪莎拉蒂</el-button>
                            <el-button class='mark hot'>Oldsmobile 奧斯莫比</el-button>
                            <el-button class='mark hot'>Rolls Royce 勞斯萊斯</el-button>
                        </el-row>
                    </el-collapse-item>
                    <!-- 廠牌列表 -->
                    <el-collapse-item title="廠牌列表" class='mark_g' :class="{ 'd-none': valObj.mark_g_disabled}">
                        <el-row justify="space-between" class=''>
                            <el-button v-for="(ele, index) in dialogState.trmakItem" :key="index" class='mark' @click="setMark(ele)">{{ele.label}}</el-button>
                        </el-row>                                              
                    </el-collapse-item>
                </el-collapse>
                <!-- 查詢結果 -->
                <div class="title result">查詢結果</div>
                <el-col  :class="{ 'd-none': valObj.search_result_disabled,'fadein': valObj.search_result_fadein,'fadeout': valObj.search_result_fadeout}" class='search_result'>
                    <div class="tableContent">
                        <table role="table" class="carTable">
                            <thead role="rowgroup" class="carTableThead">
                                <tr role="row" class="formCell">
                                    <th role="columnheader" class="formHeaderStyle">製造年度</th>
                                    <th role="columnheader" class="formHeaderStyle">車型代號</th>
                                    <th role="columnheader" class="formHeaderStyle col-xl-6">車型名稱</th>
                                    <th role="columnheader" class="formHeaderStyle">產地</th>
                                    <th role="columnheader" class="formHeaderStyle">重置價</th>
                                    <th role="columnheader" class="formHeaderStyle"></th>
                                </tr>
                            </thead>
                            <tbody role="rowgroup" class="carTableBody">
                                <tr v-for="(ele, index) in dialogState.tramakList" :key="index" role="row" class="formCell">
                                    <td role="cell">{{ele.vehLisnyr}}</td>
                                    <td role="cell">{{ele.vehType}}</td>
                                    <td role="cell">{{ele.vehTypeDesc}}</td>
                                    <td role="cell">{{ele.vehDorf == 'D' ? '國產' : '進口'}}</td>
                                    <td role="cell">{{MarkDialogUtil.transTenThousand(ele.vehRprice)}}</td>
                                    <td role="cell">
                                        <el-button class="base" plain round @click="chooseMark(ele)">選擇</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-col>

            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
import { defineComponent, ref,reactive,onMounted,inject, watch, provide } from "vue";
import * as elItems from "@/js/widgets.js";
import * as MarkDialogUtil from"@/js/utils/MarkDialogUtil.js";
import { queryBrandsAndSeriesByCarType,queryCarListByCarTypeAndBrandAndSerie,queryCarListByKeyWord} from "@/js/utils/api/getData";
import { showErrDialog,showDialog} from "@/js/utils/Utils.js";
import { DialogModel } from "@/js/utils/Model.js";
export default defineComponent({
    name: "MarkDialog",
    components: elItems,
    props: {
        title: { type: String, default: '廠牌型式' },
        dialogVisble: { type: Boolean, default: false },
        motCode:{type: String, default: ''},
        mohLisndate:{type: String, default: ''},
        getValue:{},
        basicDialog: {},
    },
    emits: [
        'update:dialogVisble',
    ],
  setup(props, context){
    const dialogVisble = ref(props.dialogVisble);
    const basicDialog = props.basicDialog;
    const activeName = ref('markSearch');
    const valObj = reactive({
        motCode:props.motCode,//車輛種類
        mohLisndate:props.mohLisndate,//原始發照年月日
        trmakVal:'',//目前選的廠牌值
        vehSeriesVal:'',//目前選的車系值
        keyWord:'',//關鍵字
        search_result_fadein:false,//表格淡入
        search_result_disabled:true,//表格出現
        search_result_fadeout:false,//查詢結果淡出    
        mark_g_disabled:false,//廠牌列表隱藏   
    });
    const dialogState = reactive({
        markAndSeries:[],//廠牌及車系
        trmakItem:[],//廠牌選項
        vehSeriesItem:[],//車系選項
        tramakList:[],//查詢結果列表
    });
    const getValue = props.getValue;
    provide("getVal", getVal);
    onMounted(()=>{
        initData();
    })    
    const handleClose = (done) => {
      dialogVisble.value = false;
      context.emit('update:dialogVisble', false)
    }
    async function initData () {
      console.log(`廠牌型式`);
      dialogState.markAndSeries = await getBrandsAndSeriesByCarTypeList();
      dialogState.trmakItem = MarkDialogUtil.getTrmakItem(dialogState['markAndSeries']);
    }
    //清空廠牌及車系查詢
    const clearMark = () => {
        valObj.trmakVal = '';
        valObj.vehSeriesVal = '';
        dialogState.vehSeriesItem = [];
        clearTable();
    }
    //清空關鍵字查詢
    const clearKeyWord = () => {
        valObj.keyWord = '';
        clearTable();
    }
    const clearTable = () => {
        dialogState.tramakList = [];  
        valObj.search_result_disabled = true;      
    }    
    //選擇廠牌
    const seriesFilter = (val) => {
        valObj.trmakVal = val;
        dialogState.vehSeriesItem = MarkDialogUtil.getVehSeriesItem(dialogState['markAndSeries'],val);
        valObj.vehSeriesVal = '';        
    }  
    /**
     * 值變更會走這裡
     */
    function getVal (formID, field, val,displayValue,displayValue2) {
        if(field == 'trmak'){
            seriesFilter(val);
        }
        if(field == 'vehSeries'){
            valObj.vehSeriesVal = val;
        }
        console.log(`formID:${formID}, field:${field}, val:${val},displayValue:${displayValue},displayValue2:${displayValue2}`);
    }
    //根據車輛種類抓取廠牌及車系
    const getBrandsAndSeriesByCarTypeList = async()=> {
        let data = {
            tvhMotCode : valObj.motCode
        }      
        let list = await queryBrandsAndSeriesByCarType(data); 
        if (list instanceof Error) {
            handleClose();
            return showErrDialog(basicDialog, list.message);
        }        
        list = list['responseObj'];   
        return list;        
    }
    //透過廠牌車系,拿到車系列表資料
    const getTramakList = async()=> {
        let msg = MarkDialogUtil.makeAndSeriesCheck(valObj.trmakVal,valObj.vehSeriesVal);
        if(!!msg){
            let dialogModel = new DialogModel();
            dialogModel.title = '提示';
            dialogModel.content = msg;
            return showDialog(basicDialog, dialogModel);            
        }
        let data = {
            tvhMotCode:valObj.motCode,//車種
            vehMake:valObj.trmakVal,//廠牌代號
            vehSeriesDesc:valObj.vehSeriesVal,//車系名稱
        };
        let list = await queryCarListByCarTypeAndBrandAndSerie(data);
        if (list instanceof Error) {
            dialogState.tramakList = [];
            return showErrDialog(basicDialog, list.message);
        }         
        list = list['responseObj'];
        list = MarkDialogUtil.filterByMohLisndate(list,valObj.mohLisndate);
        dialogState.tramakList = list;
        search_result_open();
    }
    //取得廠牌關鍵字查詢列表
    const getVehMakeKeyWord = async()=> { 
        let msg = MarkDialogUtil.keyWordCheck(valObj.keyWord);
        if(!!msg){
            let dialogModel = new DialogModel();
            dialogModel.title = '提示';
            dialogModel.content = msg;
            return showDialog(basicDialog, dialogModel);
        }   
        let data = {        
            tvhMotCode:valObj.motCode,
            keyWord:valObj.keyWord,
        }
        let list = await queryCarListByKeyWord(data);
        if (list instanceof Error) {
            dialogState.tramakList = [];
            return showErrDialog(basicDialog, list.message);
        }          
        list = list['responseObj'];
        list = MarkDialogUtil.filterByMohLisndate(list,valObj.mohLisndate);
        dialogState.tramakList = list;
        search_result_open();
    }


    //選擇廠牌型式選項
    const chooseMark = (data ={}) =>{
        let vehTramak = data['vehTramak'] || '';
        let vehTypeDesc = data.vehTypeDesc;
        let label = `${vehTramak} ${vehTypeDesc}`;
        let option = [{
            value:vehTramak,
            label:label,
        }];
        getValue(vehTramak,option,label);
        // context.emit('update:mohVehTramak.text', vehTramak)
        handleClose();
        console.log('廠牌選項');
    }

    //從廠牌列表,帶入廠牌
    const setMark = (ele)=> {   
        if(ele.length == 0){
            return;
        }
        let val = ele.value || '';  
        valObj.trmakVal = val;
        seriesFilter(val);
    }    

    // 查詢結果(預設disable)
    const search_result_open = () => {
        // 表格淡入
        valObj.search_result_fadein =true;
        // 表格出現
        setTimeout(() => valObj.search_result_disabled =false, 350)
        // // 廠牌淡出
        // this.mark_g_fadeout = true;
        // // 廠牌消失
        // setTimeout(() => this.mark_g_disabled =true, 350)
        // setTimeout(() => this.mark_g_fadeout = true, 350)
    }
    // 分頁切換時，廠牌列表關閉
    const tab_toggle = () =>{
        //根據點選Tab隱藏廠牌列表
        hideTrmakItem();
        // 查詢結果淡出
        valObj.search_result_fadeout = !valObj.search_result_fadeout;
        setTimeout(() => valObj.search_result_fadeout = !valObj.search_result_fadeout, 350)
        // 查詢結果關閉
        setTimeout(() => valObj.search_result_disabled = true, 350)
        // // 廠牌淡入
        // this.mark_g_fadein = !this.mark_g_fadein;
        // // 廠牌出現
        // setTimeout(() => this.mark_g_disabled = !this.mark_g_disabled, 350);
    }
    //根據點選Tab隱藏廠牌列表
    const hideTrmakItem = () => {
        if(activeName.value == 'keyWordSearch'){
           valObj.mark_g_disabled = true;
        }else{
           valObj.mark_g_disabled = false;
        }
    }    
    return {
      dialogVisble,
      handleClose,
      activeName,
      valObj,
      dialogState,
      clearMark,
      getTramakList,
      search_result_open,
      tab_toggle,
      MarkDialogUtil,
      getVehMakeKeyWord,
      chooseMark,
      clearKeyWord,
      setMark,
    };        
  },
})
</script>

// 表格樣式
<style>
/*
	Max width before this PARTICULAR table gets nasty. This query will take effect for any screen smaller than 760px and also iPads specifically.
	*/
.formHeaderStyle {
    border: 1px solid #EBEEF5;
    padding: 3px 20px 3px 8px;
    background-color: rgb(184, 217, 242);
    color: #000;
    text-align: left;
}

.formCell td {
    border: 1px solid #EBEEF5;
    text-align: left;
    padding: 3px 8px;
}

.formCell .base {
    border: 1px solid #FFAE2D;
    color: #FFAE2D;
}

.tableContent {
    height: 300px;
    /* height: fit-content; */
    overflow: scroll;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px) {

    /* Force table to not be like tables anymore */
    .carTable,
    .carTableThead,
    .carTableBody,
    .formHeaderStyle,
    .formCell td,
    .formCell {
        display: block;
    }

    /* 為了讓第一個表格的header不要被吃掉 */
    .carTable {
        margin: 30px 0 0 0;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    .carTable thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    .carTable tr {
        margin: 0 0 3rem 0;
        position: relative;
    }

    .carTable td {
        /* Behave  like a "row" */
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 50%;
    }

    .carTable td:before {
        /* Now like a table header */
        position: absolute;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
    }

    .formCell td {
        padding-left: 50%;
    }

    /*
    縮小時的header

*/
    .formCell td:nth-of-type(1):before {
        content: "製造年度";
        font-weight: bold;
        color: #000;
    }

    .formCell td:nth-of-type(2):before {
        content: "車型代號";
        font-weight: bold;
        color: #000;
    }

    .formCell td:nth-of-type(3):before {
        content: "車型名稱";
        font-weight: bold;
        color: #000;
    }

    .formCell td:nth-of-type(4):before {
        content: "產地";
        font-weight: bold;
        color: #000;
    }

    .formCell td:nth-of-type(5):before {
        content: "重置價";
        font-weight: bold;
        color: #000;
    }

    .formCell td:nth-of-type(6):before {
        content: "";
    }

    .carTable tr:before {
        content: "車型";
        font-weight: bold;
        color: #000;
        width: 100%;
        padding: 4px 0;
        /* border: 1px solid red;  */
        background-color: rgb(184, 217, 242);
        position: absolute;
        top: -32px;
        left: 0;
        /* margin: 0 0 15px 0; */
    }

}
</style>

// 其他樣式
<style lang="scss" src="@/style/insureMake/base.scss"></style>
<style lang="scss" src="@/style/insureMake/insureMake.scss"></style>
<style lang="scss" src="@/style/personalSetting/personalSetting.scss"></style>

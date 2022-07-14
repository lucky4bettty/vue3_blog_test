<template>

  <div class="information">

    <div class="edit_btn">
       <el-button class="class_elbtn" @click="editBtn" type="primary">
          儲存
       </el-button>
    </div>

    <div class="img_div">
      <div class="title_img">
          <!-- <img src="@/images/my.jpeg" alt=""> -->
          <!-- 預設 -->
          <img v-if="imageUrl==''" src="@/images/my.jpeg" alt="">
          <!-- 上傳 -->
          <img v-else :src="imageUrl" alt="" class="customerImg mt-0">
      </div>
    </div>

    <div class="img_div">
        <!-- <el-button class="class_elbtn" @click="editBtn" type="primary">上傳</el-button> -->
        <el-upload action="" :auto-upload="false" :show-file-list="false" :on-change="imgUpload">
            <el-button class="class_img_btn"  type="primary">上傳</el-button>
        </el-upload>
        <el-button class="class_img_btn" @click="imgDelete" type="primary">刪除</el-button>
    </div>

    <span>帳號：</span>
    <el-input v-model="field_all['account']['value']" placeholder=""></el-input>

    <!-- <span>信箱：</span>
    <el-input v-model="field_all['email']['value']" placeholder=""></el-input> -->

    <span>舊密碼：</span>
    <el-input v-model="field_all['oldPassword']['value']" placeholder=""></el-input>

    <span>新密碼：</span>
    <el-input v-model="field_all['password']['value']" placeholder=""></el-input>

    <!-- 性別 -->
    <span>性別：</span>
    <div>
      <el-radio-group v-model="gender" class="ml-4 radioStyle">
        <el-radio label="1" size="large">男</el-radio>
        <el-radio label="2" size="large">女</el-radio>
      </el-radio-group>
    </div>

    <span>介紹：</span>
    <el-input
    type="textarea"
    :rows="10"
    placeholder="请输入内容"
    v-model="field_all['introduce']['value']">
    </el-input>


  </div>

</template>

<script>
import { ref, defineComponent, onMounted,watch,inject ,reactive} from "vue";
import {member_edit_api} from "@/js/api/getData.js"
import router from "@/router/index.js";
import { showErrDialog ,showDialog } from "@/js/utils/Utils.js";
import InputWidget from "@/views/widget/dataWidgets/InputWidget.vue";
import {widgetModule} from "@/js/module/widgetModule.js";
import store from "@/store/index.js";



export default defineComponent({
  name: "Information",
  components:{
    InputWidget
  },
  setup(props, {emit}) {

    const imageUrl = ref('');
    const basicDialog = inject("basicDialog");
    var gender = ref("1");

    var field_all = reactive({
        account:ref(new widgetModule('帳號','account')),
        password: ref(new widgetModule('密碼','password')),
        oldPassword: ref(new widgetModule('舊密碼','oldPassword')),
        email:ref(new widgetModule('信箱','email')),
        introduce: ref(new widgetModule('介紹','introduce')),
    });
    
    onMounted(() => {
      var myUserData = store.state.login.userDetail ;
      field_all['account']['value'] = myUserData.account ;
      field_all['introduce']['value'] = myUserData.introduce ;
      gender.value = myUserData.gender ;


    });


    // 儲存
    const editBtn = async()=>{
      var req = {
        "memberToken": store.getters["login/getUserToken"],
        "account": field_all['account']['value'],
        "password": field_all['password']['value'],
        "oldPassword": field_all['oldPassword']['value']
      }
      if(imageUrl.value){ // 圖檔轉為base64
					const img = await getBase64Image(imageUrl.value).then(res=>{
							var dataBase64 = res.base64.replace(/^data:.*?;base64,/, "");
							return dataBase64;
					})
      }


        
        let res = await member_edit_api(JSON.parse(JSON.stringify(req)));


        if (res instanceof Error) {
           return showErrDialog(basicDialog, res.toString());

        }

        router.push('/member/information')

    }

    // 圖片上傳
    const imgUpload = (file)=>{
      console.log(file);
      if(file.raw.type != 'image/jpeg'){
				return showErrDialog(basicDialog, { hint: '檔案格式錯誤' });
			}

			var totalSizeMB = (file.size / Math.pow(1024,2)).toFixed(1);
				if(totalSizeMB > 2.5){
				return showErrDialog(basicDialog, { hint:'檔案大小不得大於 2.5 MB' });
			}

			imageUrl.value = URL.createObjectURL(file.raw);

    }

    //圖片刪除
    const imgDelete = ()=>{
      imageUrl.value='';
    }

    // url轉base64
    function getBase64Image(url) {
					const img = new Image()
					img.setAttribute("crossOrigin", 'anonymous');
					//如果需要兼容ios，这两个顺序一定不能换，先设置crossOrigin后设置src
					img.src = url;
					return new Promise((resolve, reject) => {
							img.onload = () => {
							//canvas基本配置
							const canvas = document.createElement("canvas");
							canvas.width = img.width;
							canvas.height = img.height;
							const ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
									resolve({
											success: true,
											//canvas.toDataURL的方法将图片的绝对路径转换为base64编码
											base64: canvas.toDataURL()
									})
							}
							img.onerror = () => {
									reject({ success: false })
							}
					})
			}



    return {
      field_all,
      editBtn,
      imgUpload,
      imgDelete,
      imageUrl,
      gender
    };
  },
});
</script>

<style >
  .edit_btn{
    width: 100%;
    display: flex;
    justify-content: flex-end ;
    margin-top:30px !important;
  }

  .class_elbtn{ 
    width: 100px;
  }
  /* 頭像圖 */
  .information .img_div{
    width: 100%;
    display: flex;
    justify-content: center ;
  }
  .information .title_img{
          max-width: 200px;
          max-height: 200px;
          border-radius: 50%;
          background-color: pink;
          overflow:hidden;
  }
  .information .title_img img{
          width: 200px;
          height:200px;
          object-fit:fill
  }
  .information .class_img_btn{
    width: 100px;
    margin:10px !important;
  }

  /* radio */
  .information .radioStyle label{
    margin-left:10px;
  }

</style>

<style lang="scss" src="@/style/vue-common.scss" scoped></style>
<style lang="scss" src="@/style/member/information.scss" scoped></style>
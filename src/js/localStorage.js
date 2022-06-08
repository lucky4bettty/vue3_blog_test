class Storage{
    constructor(name){
        this.name = 'storage';
    }
    //設置緩存
    setItem(params){
        let obj = {
            name:'',
            value:'',
            expires:"",
            startTime:new Date().getTime()//記錄何時將值存入緩存，毫秒級
        }
        let options = {};
        //將obj和傳進來的params合併
        Object.assign(options,obj,params);
        if(options.expires){
        //如果options.expires設置了的話
        //以options.name爲key，options爲值放進去
            localStorage.setItem(options.name,JSON.stringify(options));
        }else{
        //如果options.expires沒有設置，就判斷一下value的類型
               let type = Object.prototype.toString.call(options.value);
               //如果value是對象或者數組對象的類型，就先用JSON.stringify轉一下，再存進去
            if(Object.prototype.toString.call(options.value) == '[object Object]'){
                options.value = JSON.stringify(options.value);
            }
            if(Object.prototype.toString.call(options.value) == '[object Array]'){
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(options.name,options.value);
        }
    }
    //拿到緩存
    getItem(name){
        let item = localStorage.getItem(name);
        //先將拿到的試着進行json轉爲對象的形式
        try{
            item = JSON.parse(item);
        }catch(error){
        //如果不行就不是json的字符串，就直接返回
            item = item;
        }
        //如果有startTime的值，說明設置了失效時間
        if(item.startTime){
            let date = new Date().getTime();
            //何時將值取出減去剛存入的時間，與item.expires比較，如果大於就是過期了，如果小於或等於就還沒過期
            if(date - item.startTime > item.expires){
            //緩存過期，清除緩存，返回false
                localStorage.removeItem(name);
                return false;
            }else{
            //緩存未過期，返回值
                return item.value;
            }
        }else{
        //如果沒有設置失效時間，直接返回值
            return item;
        }
    }
    //移出緩存
    removeItem(name){
        localStorage.removeItem(name);
    }
    //移出全部緩存
    clear(){
        localStorage.clear();
    }
}

export {Storage} ;

// 參考：https://www.twblogs.net/a/5c547c72bd9eee06ef36546f
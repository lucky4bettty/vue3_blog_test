export default (app) => {
    // 日期格式
    app.directive('timeFormat',(el,binding)=>{
        if(el.textContent !== ''){
            el.textContent = binding.value.replaceAll('-','/'); ;
        }
    })
}
  
export default (app) => {
    // 日期格式
    app.directive('timeFormat',(el,binding)=>{
        el.textContent = binding.value.replaceAll('-','/'); ;
    })
}
  
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" id="testtt" v-model.lazy="text">
  </div>
</template>

<script>
import { ref, defineComponent, onMounted,watch,inject} from "vue";
import "@/js/bootstrap-datepicker-tw-master/bootstrap-datepicker.js";

export default defineComponent({
  name: "FBDate",

  setup(props, {emit}) {
    var text = ref("");
    
    onMounted(() => {
      $(`[id='testtt']`).datepicker({
        format: "yyyy/mm/dd",
        twPop: false,
        orientation: "top",
      }).on("changeDate", (date) => {
        text.value = $(`[id='testtt']`).val();

        console.log($(`[id='testtt']`).val())
        


      });

    });



    return {
      text
    };
  },
});
</script>

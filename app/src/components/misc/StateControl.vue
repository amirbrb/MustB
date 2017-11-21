<template>
  <div class="state-control">
    <span class="close" @click="goBack"><i class="fa-times fa"></i></span>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
export default {
  extends: MBBase,
  components: {
    
  },
  props: [],
  data () {
    return {
      imageId: ''
    }
  },
  methods: {
    goBack(){
      this.$router.back();
    }
  }
}

</script>

<style scoped>
  .close{
    position: absolute;
    top: -20px;
    left: 10px;
  }
</style>

this.$router.back();
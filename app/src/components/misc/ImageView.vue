<template>
  <div class="image-view col-xs-12">
    <span class="close" @click="goBack"><i class="fa-times fa"></i></span>
    <img :src="this.domain + '/images/' + this.imageId"/>
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
  created(){
    this.imageId = this.$route.params.id;
  },
  methods: {
    goBack(){
      this.$router.back();
    }
  }
}

</script>

<style scoped>
  .image-view {
    position: fixed;
    top: 110px;
    margin: 5px 5px 5px 5px;
    width: 100%;
  }

  .close{
    position: absolute;
    top: -20px;
    left: 10px;
  }

  img{
    width: 100%;
    height: 80vh;
    margin-top: 10px
  }
</style>

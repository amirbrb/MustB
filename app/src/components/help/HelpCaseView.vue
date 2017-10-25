<template>
  <div class="case-view">
    <span class="close" @click="toggleCaseShowing"><i class="fa-times fa"></i></span>
    <div class="case-issuer">
      
    </div>
    <div class="case-title">{{caseData.title}}</div>
    <div class="case-description">{{caseData.description}}</div>
    <div class="case-images">
      <img v-for="img in caseData.images" :src="domain + '/images/' + img"/> 
    </div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import axios from 'axios';
export default {
  extends: MBBase,
  components: {
    
  },
  props: [],
  data () {
    return {
      caseData: {}
    }
  },
  created(){
    this.getData();
  },
  methods: {
    toggleCaseShowing(){
      debugger;
      this.$emit('toggleCaseData');
    },
    getData(){
      var self = this;
      var url = self.domain + '/sos/' + self.$route.params.id;
      axios.get(url).then(response => {
        var data = response.data;
        if(data.isSuccess){
          this.caseData = data.data.helpCase;
        }
      }).catch(response => {
        debugger;
      });
    }
  }
}

</script>

<style scoped>
  .case-images img{
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }
  
</style>

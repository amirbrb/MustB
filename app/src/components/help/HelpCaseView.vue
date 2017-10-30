<template>
  <div class="case-view col-xs-12">
    <span class="close" @click="toggleCaseShowing"><i class="fa-times fa"></i></span>
    <div class="case-title">{{caseData.title}}</div>
    <div class="case-description">{{caseData.description}}</div>
    <div class="case-images">
      <router-link v-for="img in caseData.images" :to="'/image/' + img">
        <img :src="domain + '/images/' + img"/>   
      </router-link>
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
      this.$router.back();
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
        //TBD - show proper error
      });
    }
  }
}

</script>

<style scoped>
  .case-view{
    margin-top: 90px;
  }

  .close{
    position: absolute;
    top: -20px;
    left: 10px;
  }

  .case-title{
    margin-top: 10px; 
  }

  .case-description{
    margin-top: 10px; 
  }

  .case-images{
    width: 100%;
  }

  .case-images img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 10px;
  }


  
</style>

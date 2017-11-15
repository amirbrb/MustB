<template>
  <div class="case-view col-xs-12">
    <span class="close" @click="toggleCaseShowing"><i class="fa-times fa"></i></span>
    <h3 class="case-title">{{caseData.title}}</h3>
    <div class="case-data-wrraper">
      <div class="case-description">{{caseData.description}}</div>
      <div class="case-images">
        <router-link v-for="img in caseData.images" :to="'/image/' + img">
          <img :src="imagesDomain + img"/>   
        </router-link>
      </div>
    </div>
    <div class="case-issuer-wrapper">
      <img :src="domain + '/users/avatar/' + userData.id"/>
    </div>
    <Chabox :caseId="caseData.id" :isActive="caseData.isActive" ></Chabox>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import Chabox from './Chatbox.vue';
import axios from 'axios';
export default {
  extends: MBBase,
  components: {
    Chabox
  },
  props: [],
  data () {
    return {
      caseData: {},
      timeoutId: null
    }
  },
  created(){
    this.getData();
  },
  destroyed(){
    var self = this;
    if(self.timeoutId){
      clearTimeout(self.timeoutId);
    }
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
          self.caseData = data.data.helpCase;
          self.caseData.messages = data.data.messages;
          self.timeoutId = setTimeout(self.getChatMessages, 1000);
        }
      }).catch(response => {
        //TBD - show proper error
      });
    },
    getChatMessages(){
      var self = this;
      var now = new Date();
      var url = self.domain + '/sos/messages/' + self.$route.params.id + '?q=' + now;
      axios.get(url).then(response => {
        self.caseData.messages = response.data;
        self.timeoutId = setTimeout(self.getChatMessages, 1000);
      }).catch(response => {
        //TBD - show proper error
      });
    }
  }
}

</script>

<style scoped>
  .case-view{
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

  .case-title{
    margin-top: 10px;
    font-weight: bold; 
  }

  .case-data-wrraper{
    width: 80%;
    float: left;
  }
  .case-issuer-wrapper{
    width: 19%;
    float: right;
    height: 80px;
    position: relative;
    top: -60px;
    text-align: right;
  }

  .case-issuer-wrapper img{
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }

  .case-description{
    margin-top: 10px;
    font-size: 17px; 
    max-height: 100px;
    overflow-y: auto;
  }

  .case-images{
    max-height: 80px;
    overflow: auto;
  }

  .case-images img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 10px;
  }


  
</style>

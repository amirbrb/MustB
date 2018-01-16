<template>
  <div class="case-view col-xs-12">
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
      <router-link :to="{ path: '/user/' + caseData.userId}">
        <img v-if="caseData.userId" :src="imagesDomain + '/avatar/' + caseData.userId"/>
      </router-link>
    </div>
    <div class="case-messages-wrapper">
      <router-link :to="{ path: '/case/chat/' + $route.params.id}">
        <i v-if="caseData.messages" class="fa fa-comment-o" :counter="caseData.messages.length > 10 ? '10+' : caseData.messages.length" aria-hidden="true"></i>
      </router-link>
    </div>
    <div id="caseMapContainer"></div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import StateControl from '../misc/StateControl.vue'
import $ from 'jquery';
var google = window.google;
export default {
  extends: MBBase,
  components: {
    StateControl
  },
  props: [],
  data () {
    return {
      caseData: {
        messages: []
      },
      commentCount: 0
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      var self = this;
      var url = '/sos/' + self.$route.params.id;
      $.ajax({
        url: url,
        method: 'GET'
      }).done(function(response){
        var data = response;
        if(data.isSuccess){
          self.caseData = data.data.helpCase;
          var caseLatLng = new google.maps.LatLng(parseFloat(self.caseData.location.lat), parseFloat(self.caseData.location.lng));
          self.map = new google.maps.Map(document.getElementById('caseMapContainer'), {
            center: caseLatLng,
            zoom: 16
          });

          var caseMarker = new google.maps.Marker({
            position: caseLatLng
          });
          caseMarker.setMap(self.map);
        }
      }).fail(function(e){
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
    margin-top: 60px;
    font-weight: bold; 
    max-width: 100%;
  }

  .case-data-wrraper{
    width: 100%;
    float: left;
  }
  .case-issuer-wrapper{
    position: absolute;
    top: -15px;
    right: 20px;
  }

  .case-issuer-wrapper img{
    width: 60px;
    height: 60px;
    border-radius: 80px;
  }

  .case-messages-wrapper{
    position: absolute;
    top: -15px;
    right: 90px;
  }

  .case-messages-wrapper .fa{
    font-size: 50px;
    color:gray;
  }

  .case-description{
    margin-top: 10px;
    font-size: 17px; 
    max-height: 100px;
    overflow-y: auto;
  }

  .case-images{
    max-height: 200px;
    overflow: auto;
  }

  .case-images img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 10px;
  }

  #caseMapContainer{
    height: 350px;
    width: 98%;
    top: 15px;
  }

  .fa-comment-o:after {
    position: absolute;
    content:attr(counter);
    top: 10px;
    right: 2px;    
    height: 20px;
    min-width: 20px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 16px;
    font-size: 15px;    
    line-height: 20px;
    text-align: center;
    background: red;
    color: white;
  }
  
</style>

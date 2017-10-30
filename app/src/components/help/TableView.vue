<template>
  <div class="table-view">
    <div v-for="helpIssue in cases" class="help-issue" @click="caseShowing">
      <div class="help-issuer">
        <router-link :to="{ path: '/user/' + helpIssue.id}">
          <img class="img" :src="helpIssue.image"></img>
        </router-link>
        <div class="help-distance">{{farwaway(helpIssue.location.lat, helpIssue.location.lng)}}</div>
        <router-link :to="{ path: '/case/' + helpIssue.id}">
          <div class="help-title">{{helpIssue.title}}</div>
        </router-link>
        <div class="help-description">
          {{helpIssue.description.length > maxDescriptionChars ? helpIssue.description.substring(0, maxDescriptionChars) + '...' : helpIssue.description}}
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue';
import axios from 'axios';
export default {
  extends: MBBase,
  components: {

  },
  created(){
    this.getData();
  },
  props: ['currentLocation'],
  data () {
    return {
      maxDescriptionChars: 100,
      cases: []
    }
  },
  methods: {
    getData() {
      var self = this;
      var url = self.domain + '/sos';
      axios.get(url, {
        location: self.currentLocation
      }).then(response => {
        self.cases = response.data.map(data => {
          return {
            image: self.domain + '/images/' + data.userImage,
            title: data.title,
            description: data.description,
            id: data.id,
            location: data.location
          }
        });
        setTimeout(self.getData, 1000);
      }).catch(response => {
        alert(response.data);
        //TBD: proper error message
      });
    },
    caseShowing(){
      this.$emit('caseShowing');
    },
    farwaway(lat, lng){
      var self = this;
      var lat2 = self.currentLocation.lat;
      var lng2 = self.currentLocation.lng;
      var R = 6371; // Radius of the earth in km
      var dLat = self.deg2rad(lat2-lat);  // deg2rad below
      var dLon = self.deg2rad(lng2-lng); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(self.deg2rad(lat)) * Math.cos(self.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km

      if(d > 1){
        return Math.round(d, 2) + ' km from you';
      }
      else{
        return Math.round(d * 1000, 2) + ' meters from you'
      }
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    }
  }
}

</script>

<style scoped>
  .table-view {
    max-height: 600px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .help-issuer {
    width: 100%;
  }
  .help-issuer img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }

  .help-issue {
    max-height: 125px;
  }

  .help-distance{
    font-weight: bolder;
    font-size: 18px;
    left: 85px;
    position: relative;
    top: -70px;
  }

  .help-title {
    font-weight: bolder;
    font-size: 16px;
    left: 85px;
    position: relative;
    top: -70px;
  }
  .help-description {
    font-size: 15px;
    left: 85px;
    position: relative;
    top: -70px;
    width: 75%;
  }
</style>

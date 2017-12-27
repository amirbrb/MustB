<template>
  <div class="table-view">
    <div v-if="cases.length === 0" class="no-cases empty-data">
      nothing to show in your area
    </div>
    <div v-for="caseData in cases" class="help-issue" @click="caseShowing">
      <div class="help-issuer">
        <router-link :to="{ path: '/user/' + caseData.userId}">
          <img class="img" :src="caseData.image"></img>
        </router-link>
        <div class="help-distance">
          <label>{{farwaway(caseData.location.lat, caseData.location.lng)}}</label>
        </div>
        <router-link :to="{ path: '/case/' + caseData.id}">
          <div class="help-title">{{caseData.title}}</div>
        </router-link>
        <div class="help-description">
          {{caseData.description.length > maxDescriptionChars ? caseData.description.substring(0, maxDescriptionChars) + '...' : caseData.description}}
        </div>
      </div>
    </div>  
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue';
export default {
  extends: MBBase,
  components: {

  },
  props: ['cases'],
  data () {
    return {
      maxDescriptionChars: 100
    }
  },
  methods: {
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
    width: 100%;
    height: 100%;
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
    margin-right: 10px;
  }

  .help-issue {
    max-height: 125px;
  }

  .help-distance{
    font-weight: bolder;
    font-size: 18px;
    left: 100px;
    position: relative;
    top: -75px
  }

  .help-title {
    font-weight: bolder;
    font-size: 16px;
    left: 100px;
    position: relative;
    top: -75px;
  }
  .help-description {
    font-size: 15px;
    left: 100px;
    position: relative;
    top: -75px;
    width: 75%;
  }
  .no-cases{
    width: 100%;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%); 
  }
</style>

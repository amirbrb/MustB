<template>
  <div>
    <div class="table-view">
      <div v-if="cases.length === 0" class="no-cases empty-data">
        nothing to show in your area
      </div>
      <div v-for="caseData in cases" :class="{'help-issue': true}">
        <router-link :to="{ path: '/case/' + caseData.id}">
          <div class="help-distance">
            <label>{{farwaway(caseData.location.lat, caseData.location.lng)}} -- {{stringifyDate(caseData.created)}}</label>
          </div>
          <div class="help-title">{{caseData.title}}</div>
          <div class="help-description">
            {{caseData.description.length > maxDescriptionChars ? caseData.description.substring(0, maxDescriptionChars) + '...' : caseData.description}}
          </div>
        </router-link>
      </div>  
    </div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue';
import StateControl from '../misc/StateControl.vue';
import $ from 'jquery'
export default {
  extends: MBBase,
  created(){
    var self = this;
    var url = '/users/cases/' + self.$route.params.id;
    $.ajax({
      url: url,
      method: 'GET'
    }).done(function(response){
      self.cases = response.map(data => {
        return {
          image: self.imagesDomain + 'avatar/' + data.userId,
          title: data.title,
          description: data.description,
          id: data.id,
          location: data.location,
          userId: data.userId,
          created: data.created
        }
      });
      clearTimeout(self.timeoutId);
      self.timeoutId = setTimeout(self.getData, self.queryDelay);
    }).fail(function(response){
      console.log(response);
      //TBD: proper error message
    });
  },
  components: {
    StateControl
  },
  props: [],
  data () {
    return {
      cases: [],
      maxDescriptionChars: 90
    }
  },
  methods: {
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
    margin-top: 40px;
    margin-left: 5px;
    width: 98%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .help-issue {
    position: relative;
    width: 100%;
    border: 4px groove;
    margin-top: 2px;
    padding: 10px;
  }

  .help-distance{
    font-weight: bolder;
    font-size: 18px;
  }

  .help-title {
    font-weight: bolder;
    font-size: 16px;
  }
  .help-description {
    margin-top: 5px;
    font-size: 15px;
    width: 99%;
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

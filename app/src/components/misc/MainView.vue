<template>
  <div class="main-view">
    <div class="data-view" v-if="!isShowingHelp">
      <ul class="nav nav-tabs">
        <li :class="{'active': userData.settings.viewType === 1}">
          <a data-toggle="tab" href="#sosTable" @click="selectTableView">table</a>
        </li>
        <li :class="{'active': userData.settings.viewType === 2}">
          <a data-toggle="tab" href="#sosMap" @click="selectMapView">map</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="sosTable" 
          :class="{'tab-pane': true, 'fade': true, 'in': userData.settings.viewType === 1, 'active': userData.settings.viewType === 1}">
          <TableView :cases="cases"
            :currentLocation="currentLocation"
            v-show="!isShowingCase && userData.settings.viewType === 1" v-on:caseShowing="isShowingCase = true"></TableView>
        </div>
        <div id="sosMap" :class="{'tab-pane': true, 'fade': true, 'in': userData.settings.viewType === 2, 'active': userData.settings.viewType === 2}">
          <MapView :cases="cases"
            v-show="!isShowingCase && userData.settings.viewType === 2" 
            v-on:caseShowing="isShowingCase = true" 
            :mapZoomLevel="userData.settings.mapZoomLevel"
            :currentLocation="currentLocation"
            v-on:mapZoomChanged="mapZoomChanged">
          </MapView>
        </div>
      </div>
    </div>
    <transition name="fade-short">
      <SosControl v-show="!isShowingHelp" :location="userData.settings.sosControlLocation" 
        v-on:sosControlLocationChanged="sosControlLocationChanged">
      </SosControl>
    </transition>
  </div>
</template>

<script>

import axios from 'axios';
import MBBase from '../../MBBase.vue';
import ViewType from '../../enums/viewType'
import SosControl from './SosControl.vue';
import SosForm from './SosForm.vue';
import TableView from '../help/TableView.vue';
import MapView from '../help/MapView.vue';
import HeaderNavbar from './HeaderNavbar.vue';
export default {
  extends: MBBase,
  components: {
    SosControl,
    SosForm,
    TableView,
    HeaderNavbar,
    MapView,
    ViewType
  },
  data () {
    return {
      isShowingHelp: false,
      isShowingCase: false,
      userData: this.$parent.userData,
      currentLocation: this.$parent.currentLocation,
      cases: [],
      timeoutId: null
    }
  },
  props: [],
  created(){
    var self = this;
    window.ViewType = ViewType
    self.getData();
  },
  destroyed(){
    var self = this;
    clearTimeout(self.timeoutId);
  },
  methods: {
    getData(){
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
        self.timeoutId = setTimeout(self.getData, 2000);
      }).catch(response => {
        console.log(response);
        //TBD: proper error message
      });
    },
    sosControlLocationChanged (location){
      var self = this;
      self.userData.settings.sosControlLocation = location;
      self.userSettingsChanged(self.userData.settings, self.userData.id);
    },
    selectTableView(){
      this.selectedTabChanged(ViewType.table)
    },
    selectMapView(){
      this.selectedTabChanged(ViewType.map)
    },
    selectedTabChanged(viewType){
      var self = this;
      self.userData.settings.viewType = viewType;
      self.userSettingsChanged(self.userData.settings, self.userData.id);
    },
    mapZoomChanged(zoomLevel){
      var self = this;
      self.userData.settings.mapZoomLevel = zoomLevel;
      self.userSettingsChanged(self.userData.settings, self.userData.id);
    }
  }
}

</script>

<style scoped>
  .data-view{
    position: absolute;;
    top: 80px;
    margin: 5px 5px 5px 5px;
    width: 100%;
  }

  .nav li{
    font-size: 20px;
  }
</style>

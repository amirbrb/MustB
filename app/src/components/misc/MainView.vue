<template>
  <div>
    <div class="data-view data-container">
      <ul class="nav nav-tabs">
        <li :class="{'active': userData.settings.viewType === 2}">
          <a data-toggle="tab" href="#sosMap" @click="selectMapView"><i class="fa fa-map-o" aria-hidden="true"></i></i></a>
        </li>
        <li :class="{'active': userData.settings.viewType === 1}">
          <a data-toggle="tab" href="#sosTable" @click="selectTableView"><i class="fa fa-list-ul" aria-hidden="true"></i></i></a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="sosMap" :class="{'tab-pane': true, 'fade': true, 'in': userData.settings.viewType === 2, 'active': userData.settings.viewType === 2}">
          <MapView :cases="cases"
            v-show="userData.settings.viewType === 2" 
            :mapZoomLevel="userData.settings.mapZoomLevel"
            :currentLocation="currentLocation"
            v-on:mapZoomChanged="mapZoomChanged">
          </MapView>
        </div>
        <div id="sosTable" 
          :class="{'tab-pane': true, 'fade': true, 'in': userData.settings.viewType === 1, 'active': userData.settings.viewType === 1}">
          <TableView :cases="cases"
            :currentLocation="currentLocation"
            v-show="userData.settings.viewType === 1"></TableView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery';
import MBBase from '../../MBBase.vue';
import ViewType from '../../enums/viewType'
import SosForm from './SosForm.vue';
import TableView from '../help/TableView.vue';
import MapView from '../help/MapView.vue';
import HeaderNavbar from './HeaderNavbar.vue';

export default {
  extends: MBBase,
  components: {
    SosForm,
    TableView,
    HeaderNavbar,
    MapView,
    ViewType
  },
  data () {
    return {
      userData: this.$parent.userData,
      currentLocation: this.$parent.currentLocation,
      cases: [],
      timeoutId: null,
      queryDelay: 5000
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
      var url = '/sos';
      $.ajax({
        url: url,
        method: 'GET',
        data: {
          location: self.currentLocation,
          userId: self.userData.userId
        }
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
    selectTableView(){
      this.selectedTabChanged(ViewType.table)
    },
    selectMapView(){
      this.selectedTabChanged(ViewType.map)
    },
    selectedTabChanged(viewType){
      var self = this;
      self.userData.settings.viewType = viewType;
      self.userSettingsChanged(self.userData.settings, self.userData.userId);
    },
    mapZoomChanged(zoomLevel){
      var self = this;
      self.userData.settings.mapZoomLevel = zoomLevel;
      self.userSettingsChanged(self.userData.settings, self.userData.userId);
    }
  }
}

</script>

<style scoped>
  .data-view{
    margin: 5px 5px 5px 5px;
  }
</style>

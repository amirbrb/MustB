<template>
  <div class="main-view">
    <HeaderNavbar v-on:toggleSettings="isShowingSettings = !isShowingSettings"></HeaderNavbar>
    <div class="data-view" v-if="!isShowingHelp && !isShowingSettings">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#sosTable">Table</a></li>
        <li><a data-toggle="tab" href="#sosMap">Map</a></li>
      </ul>
      <div class="tab-content">
        <div id="sosTable" class="tab-pane fade in active">
          <TableView 
            :currentLocation="currentLocation"
            v-show="!isShowingCase" v-on:caseShowing="isShowingCase = true"></TableView>
        </div>
        <div id="sosMap" class="tab-pane fade">
          <MapView
            v-show="!isShowingCase" 
            v-on:caseShowing="isShowingCase = true" 
            :currentLocation="currentLocation">
          </MapView>
        </div>
        <transition name="fade-short">
          <div class="data-viewer" v-show="isShowingCase">
            <router-view></router-view>  
          </div>
        </transition>
      </div>
    </div>
    <Settings v-if="isShowingSettings"></Settings>
    <transition name="fade-short">
      <SosControl v-show="!isShowingHelp && !isShowingSettings" :location="userData.settings.sosControlLocation" 
        v-on:sosControlLocationChanged="sosControlLocationChanged" 
        v-on:helpRequested="helpRequested">
      </SosControl>
    </transition>
    <transition name="fade-short">
      <SosForm :userId="userData.id" v-if="isShowingHelp" v-on:SosFormHidden="hideSosForm" :currentLocation="currentLocation"></SosForm>
    </transition>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue';
import SosControl from './SosControl.vue';
import SosForm from './SosForm.vue';
import TableView from '../help/TableView.vue';
import MapView from '../help/MapView.vue';
import HeaderNavbar from './HeaderNavbar.vue';
import Settings from './Settings.vue';
export default {
  extends: MBBase,
  components: {
    SosControl,
    SosForm,
    TableView,
    HeaderNavbar,
    Settings,
    MapView
  },
  data () {
    return {
      isShowingHelp: false,
      isShowingCase: false,
      isShowingSettings: false
    }
  },
  props: ['userData', 'currentLocation'],
  created(){
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to);
    console.log(from);
    next();
  },
  methods: {
    sosControlLocationChanged (location){
      var self = this;
      self.userData.settings.sosControlLocation = location;
      self.$emit('userSettingsChanged', self.userData.settings);
    },
    helpRequested(){
      this.isShowingHelp = true;
    },
    hideSosForm(){
      this.isShowingHelp = false;
    },
    showSettings(){
      this.isShowingSettings = true;
    }
  }
}

</script>

<style scoped>
  .data-view{
    position: fixed;
    top: 65px;
    margin: 0px 5px 5px 5px;
    width: 100%;
  }
  .tab-content{
    position:relative;
    margin: 5px 5px 5px 5px;
  }
  .tab-pane{
    width: 95%;
  }
  .fade {
   -webkit-transition: opacity 1.5s linear;
      -moz-transition: opacity 1.5s linear;
       -ms-transition: opacity 1.5s linear;
        -o-transition: opacity 1.5s linear;
           transition: opacity 1.5s linear;
   }
  .tab-content>.tab-pane:not(.active) {
      opacity: 0;
   }
</style>

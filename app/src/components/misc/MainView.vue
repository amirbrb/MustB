<template>
  <div class="main-view">
    <div class="data-view" v-if="!isShowingHelp">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#sosTable">Table</a></li>
        <li><a data-toggle="tab" href="#sosMap">Map</a></li>
      </ul>
      <div class="tab-content">
        <div id="sosTable" class="tab-pane fade in active">
          <TableView :data="cases" v-show="!isShowingCase" v-on:caseShowing="isShowingCase = true"></TableView>
        </div>
        <div id="sosMap" class="tab-pane fade">
          aaa
        </div>
        <transition name="fade-short">
          <div class="data-viewer" v-show="isShowingCase">
            <router-view></router-view>  
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade-short">
      <SosControl v-show="!isShowingHelp" :location="userData.settings.sosControlLocation" 
        v-on:sosControlLocationChanged="sosControlLocationChanged" 
        v-on:helpRequested="helpRequested">
      </SosControl>
    </transition>
    <transition name="fade-short">
      <SosForm :userId="userData.id" v-show="isShowingHelp" v-on:SosFormHidden="hideSosForm"></SosForm>
    </transition>
  </div>

</template>

<script>

import MBBase from '../../MBBase.vue';
import SosControl from './SosControl.vue';
import SosForm from './SosForm.vue';
import TableView from '../help/TableView.vue';
import axios from 'axios';
export default {
  extends: MBBase,
  components: {
    SosControl,
    SosForm,
    TableView
  },
  data () {
    return {
      isShowingHelp: false,
      isShowingCase: false,
      cases: []
    }
  },
  props: ['userData'],
  created(){
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
          id: data.id
        }
      })
    }).catch(response => {
      debugger;
    });
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
    }
  }
}

</script>

<style scoped>
  .data-view{
    margin: 10px 5px 10px 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .tab-content{
    position:relative;
    margin: 10px 10px 10px 10px;
  }
  .fade {
   -webkit-transition: opacity 1.5s linear;
      -moz-transition: opacity 1.5s linear;
       -ms-transition: opacity 1.5s linear;
        -o-transition: opacity 1.5s linear;
           transition: opacity 1.5s linear;
   }
  .tab-content > .tab-pane {
     top: 0;
     position:absolute;
     display:block;
   }
  .tab-content>.tab-pane:not(.active) {
      opacity: 0;
   }
</style>

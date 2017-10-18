<template>
  <div class="main-view">
    <SosControl v-show="!isShowingHelp" :location="userData.sosControlLocation" 
      v-on:sosControlLocationChanged="sosControlLocationChanged" 
      v-on:helpRequested="helpRequested"></SosControl>
    <SosForm v-show="isShowingHelp" v-on:SosFormHidden="hideSosForm"></SosForm>
  </div>

</template>

<script>

import MBBase from '../../MBBase.vue';
import SosControl from './SosControl.vue';
import SosForm from './SosForm.vue';
export default {
  extends: MBBase,
  components: {
    SosControl,
    SosForm
  },
  data () {
    return {
      isShowingHelp: false
    }
  },
  props: ['userData'],
  methods: {
    sosControlLocationChanged (location){
      var self = this;
      self.userData.sosControlLocation = location;
      self.$emit('userSettingsChanged');
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
</style>

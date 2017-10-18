<template>
  <div class="sos-request col-xs-8 col-xs-offset-2">
    <span class="close" @click="hide"><i class="fa-times fa"></i></span>
    <div class="col-xs-12 text-center help-title">Need help?</div>
    <div class="form-group has-feedback">
      <input name="title" v-model="help.title"
        v-validate="'required'" :class="{'form-control': true, 'error-input': errors.has('title') }" 
        placeholder="title">
      <span v-show="errors.has('email')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <textarea name="description" 
        class="form-control" placeholder="description" rows="5"></textarea>
    </div>
    <div class="form-group text-center">
      <a class="btn btn-primary call-help-btn" v-on:click="callHelp">SOS</a>
    </div>
    <div class="seperator">
      <span>
        OR
      </span>
    </div>
    <div class="form-group text-center record-help">
      <a class="btn btn-danger record-help-btn" v-on:click="recordHelp">
        <i class="fa fa-microphone"></i>
      </a>
    </div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import audioService from '../../services/audioService'
//import axios from 'axios'

export default {
  extends: MBBase,
  components: {
    
  },
  data () {
    return {
      help: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    hide(){
      this.$emit('SosFormHidden');
    },
    callHelp(){
      var self = this;
      self.$validator.validateAll({
        title: self.help.title
      }).then((result) => {
        if(result){

        }
      });
    },
    recordHelp(){
      console.log(audioService.captureMediaAndGetFile());
    }
  }
}

</script>

<style scoped>
  .sos-request{
    margin-top: 90px;
  }

  .close{
    position: absolute;
    top: -60px;
    left: -20px;
  }

  .help-title{
    margin-bottom: 10px;
    font-size: 32px;
  }

  .call-help-btn{
    border-radius: 150px;
    height: 70px;
    width: 70px;
    line-height: 60px;
  }

  .record-help{
    margin-top: 40px;
  }

  .record-help-btn{
    height: 100px;
    width: 100px;
    line-height: 100px;
    border-radius: 100px;
    font-size: 40px;
  }
</style>

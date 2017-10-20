<template>
  <div class="sos-request col-xs-10 col-xs-offset-1">
    <span class="close" @click="hide"><i class="fa-times fa"></i></span>
    <div class="col-xs-12 text-center help-title">Need help?</div>
    <div class="form-group has-feedback">
      <input name="title" v-model="help.title"
        v-validate="'required'" :class="{'form-control': true, 'error-input': errors.has('title') }" 
        placeholder="title">
      <span v-show="errors.has('email')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <textarea name="description"  v-model="help.description"
        class="form-control" placeholder="description" rows="5"></textarea>
    </div>
    <div class="form-group has-feedback">
      <input ref="autocomplete" class="form-control" placeholder="where sre you?" type="text">
      <span class="glyphicon glyphicon-map-marker col-xs-offset-1 form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback col-xs-12">
      <label class="file-container">
        <a class="btn btn-default file-loader">choose images</a>
        <input ref="images" type="file" @change="imagesSelected" multiple/>
      </label>
      <Information :data="'provide users with images of the issue so they can help'"></Information>
      <div ref="imageContainer" class="images-container"></div>
    </div>
    <div class="form-group text-center">
      <a class="btn btn-primary call-help-btn" v-on:click="callHelp">SOS</a>
    </div>
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import Information from './Information.vue'
import axios from 'axios'

var autocomplete;
export default {
  extends: MBBase,
  components: {
    Information
  },
  props: ['userId'],
  data () {
    return {
      help: {
        title: '',
        description: '',
        images: []
      }
    }
  },
  mounted(){
    this.initAutocomplete();
  },
  methods: {
    hide(){
      var self = this;
      self.help.title = '';
      self.help.description = '';
      self.help.images = [];
      var container = self.$refs.imageContainer
      while (container.firstChild) {
          container.removeChild(container.firstChild);
      }
      this.$emit('SosFormHidden');
    },
    initAutocomplete(){
      autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        {types: ['geocode']}
      );
      var circle = new window.google.maps.Circle({
        center: this.currentLocation
      });
      autocomplete.setBounds(circle.getBounds());
      setTimeout(this.locateHelpLocation, 1000);
      autocomplete.addListener('place_changed', this.helpLocationChanged);
    },
    locateHelpLocation(){
      var self = this;
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.currentLocation.lat + ','+ this.currentLocation.lng + '&key=AIzaSyBSqo5kFr5ENcknN23v5QUfQy-zoWnpopA'; 
      axios.get(url).then(response => {
        if(response.data.results && response.data.results.length > 0){
          self.$refs.autocomplete.value = response.data.results[0].formatted_address;
        }
      }).catch(response => {
        debugger;
      });
    },
    callHelp(){
      var self = this;
      self.$validator.validateAll({
        title: self.help.title
      }).then((result) => {
        if(result){
          axios.post(self.domain + '/sos/text', {
            userId: self.userId,
            title: self.help.title,
            description: self.help.description
          });

          const formData = new FormData();
          formData.append('userId', self.userId);  
          formData.append('title', self.help.title);  
          formData.append('description', self.help.description);  
          for(var fileIndex = 0; fileIndex < self.help.images.length; fileIndex++){
            formData.append(self.help.images[fileIndex].image, self.help.images[fileIndex].file);  
          }
          
          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };
          axios.post(self.domain + '/sos/text', formData, config)
            .then(response => {
              self.hide();
            });  
        }
      });
    },
    imagesSelected(){
      var self = this;
      var imageInput = self.$refs.images;
      var imageContainer = self.$refs.imageContainer;
      var curFiles = imageInput.files;
      for (var fileIndex = 0; fileIndex < curFiles.length; fileIndex++) {
        var image = document.createElement('img');
        image.style.cssText = 'width: 50px;height: 50px;border-radius: 50px;margin-left: 5px;';
        var dataUri = window.URL.createObjectURL(curFiles[fileIndex]);
        image.src = dataUri;
        imageContainer.appendChild(image);
        self.help.images.push({
            image: curFiles[fileIndex].name, 
            file: curFiles[fileIndex]
        });
      };
    }
  }
}

</script>

<style scoped>
  .sos-request{
    margin-top: 100px;
  }

  .close{
    position: absolute;
    top: -60px;
    left: -10px;
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

  .file-container {
    overflow: hidden;
    position: relative;
    width: 80%;
  }

  .file-container [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    min-height: 100%;
    min-width: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
  }

  .file-loader{
    width: 100%;
  }
</style>

<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img v-if="settings.avatar" ref="avatarPresent" :src="imagesDomain + settings.avatar" class="user-avatar"/>
        <input ref="userAvatar" type="file" accept="image/*" capture="capture" @change="avatarSelected" :disabled="isReadOnly" />
      </label>
    </div>
    <div class="cases section container">
      <router-link :to="'/user/cases/' + userIdParam" class="ok-button" >cases <span class="badge">{{settings.caseCount}}</span></router-link>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="name">name</label>
          <div class="col-xs-8">
            <input class="form-control ok-form-control" id="name" placeholder="name" v-model="settings.name" :readonly="isReadOnly" name="name">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">phone:</label>
          <div class="col-xs-8">
            <input type="number" class="form-control ok-form-control" id="phone" placeholder="phone" v-model="settings.phoneNumber" :readonly="isReadOnly" name="phone">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">more details:</label>
          <div class="col-xs-8">
            <input type="text" v-model="settings.description" :readonly="isReadOnly" class="form-control"></input>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">gender:</label>
          <div class="col-xs-8 text-left">
            <label class="radio-inline"><input type="radio" name="gender" value="1" :disabled="isReadOnly" v-model="settings.gender">male</label>
            <label class="radio-inline"><input type="radio" name="gender" value="2" :disabled="isReadOnly" v-model="settings.gender">female</label>
            <label class="radio-inline"><input type="radio" name="gender" value="3" :disabled="isReadOnly" v-model="settings.gender">other</label>
          </div>
        </div>
      </form>
    </div>
    <div class="save-settings" v-if="!isReadOnly">
      <a class="btn btn-sm btn-default" @click="saveSettings">save settings</a>
      <a class="btn btn-sm btn-default" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  import StateControl from '../misc/StateControl';
  import $ from 'jquery'
  export default {
    extends: MBBase,
    components: {
      StateControl
    },
    props: ['userId', 'isReadOnly'],
    data () {
      return {
        settings: {
          avatar: null,
          name: '',
          phoneNumber: '',
          description: '',
          gender: 3,
          goodAt: [],
          notificationSettings: {
            alertDistance: 5,
            showMeOnMap: false,
            onlyFriendsAlert: false
          },
          caseCount: 0,
          userId: this.userIdParam
        }, 
        uploadedAvatar: null
      }
    },
    computed: {
      userIdParam(){
        return this.userId || this.$route.params.id;
      }
    },
    created(){
      var self = this;
      const url = '/users/details/' + self.userIdParam;
      
      $.ajax({
        method: 'GET',
        url: url
      }).done(function(response){
        self.settings = response;
      }).fail(function(e) {
        //TBD: handke error
      });
    },
    methods: {
      avatarSelected() {
        var self = this;
        var imageInput = self.$refs.userAvatar;
        var imageContainer = self.$refs.avatarPresent;
        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          imageContainer.src = dataURL;
        };

        var image = imageInput.files[0];
        self.uploadedAvatar = image;
        reader.readAsDataURL(image);
      },
      saveSettings(){
        var self = this;
        const url = '/users/settings';
        
        const formData = new FormData();
        formData.append('userId', self.userId);  
        formData.append('settings', JSON.stringify(self.settings));  

        if(self.uploadedAvatar){
          formData.append('avatar', self.uploadedAvatar);  
        }

        $.ajax({
          url: url, 
          data: formData, 
          processData: false,
          contentType: false
        }).done(function(response){
        }).fail(function(e) {
          //TBD: handke error
        });
      },
      logout(){
        var self = this;
        self.$emit('logout');
      }
    }
  }
</script>
<style scoped>
	.profile{
    margin: 0px 5px 5px 5px;
  }

  .section{
    text-align: center;
    width: 100%;
    float: left;
    margin-top: 10px;
  }

  @media only screen and (max-width: 768px) {
      /* For mobile phones: */
      [class*="section"] {
          width: 100%;
      }
  }

  .user-avatar{
    width: 100px;
    height: 100px;
    border-radius: 150px;
  }

  .img-editor{
    z-index: 9999;
    font-size: 24px;
  }

  .save-settings{
    position: fixed;
    right:5px;
    bottom: 10px;
  }
</style>

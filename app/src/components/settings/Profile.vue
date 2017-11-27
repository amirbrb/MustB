<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img v-if="userProfile.avatar" ref="avatarPresent" :src="imagesDomain + userProfile.avatar" class="user-avatar"/>
        <input ref="userAvatar" type="file" @change="avatarSelected" :disabled="isReadOnly" />
      </label>
    </div>
    <div class="cases section container">
      <router-link :to="'cases/' + userProfile.userId" class="btn btn-primary btn-md">cases <span class="badge">{{userProfile.caseCount}}</span></router-link>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="name">name</label>
          <div class="col-xs-8">
            <input class="form-control" id="name" placeholder="name" v-model="userProfile.name" :readonly="isReadOnly" name="name">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">phone:</label>
          <div class="col-xs-8">
            <input type="number" class="form-control" id="phone" placeholder="phone" v-model="userProfile.phoneNumber" :readonly="isReadOnly" name="phone">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">more details:</label>
          <div class="col-xs-8">
            <input type="text" v-model="userProfile.description" :readonly="isReadOnly" class="form-control"></input>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">gender:</label>
          <div class="col-xs-8 text-left">
            <label class="radio-inline"><input type="radio" name="gender" value="1" :disabled="isReadOnly" v-model="userProfile.gender">male</label>
            <label class="radio-inline"><input type="radio" name="gender" value="2" :disabled="isReadOnly" v-model="userProfile.gender">female</label>
            <label class="radio-inline"><input type="radio" name="gender" value="3" :disabled="isReadOnly" v-model="userProfile.gender">other</label>
          </div>
        </div>
      </form>
    </div>
    <div class="save-settings" v-if="!isReadOnly">
      <a class="btn btn-large btn-warning" @click="saveSettings">save settings</a>
      <a class="btn btn-large btn-danger" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  import $ from 'jquery'
  export default {
    extends: MBBase,
    props: ['userId', 'isReadOnly'],
    data () {
      return {
        userProfile: {
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
          userId: this.userId || this.$route.params.id  
        }
      }
    },
    created(){
      var self = this;
      const url = '/users/details/' + self.userProfile.userId;
      
      $.ajax({
        method: 'GET',
        url: url
      }).done(function(response){
        self.userProfile = response;
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
        self.userProfile.avatar = image;
        reader.readAsDataURL(image);
      },
      saveSettings(){

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
    width: 150px;
    height: 150px;
    border-radius: 150px;
  }

  .img-editor{
    z-index: 9999;
    font-size: 24px;
  }

  .save-settings{
    
  }
</style>

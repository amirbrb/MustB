<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img ref="avatarPresent" :src="imagesDomain + userData.avatar" class="user-avatar"/>
        <input ref="userAvatar" type="file" @change="avatarSelected"/>
      </label>
    </div>
    <div class="cases section container">
      <router-link :to="'cases/' + userData.userId" class="btn btn-primary btn-md">my cases <span class="badge">7</span></router-link>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="name">name</label>
          <div class="col-xs-8">
            <input class="form-control" id="name" placeholder="name" :value="userData.name" v-model="userProfile.name" name="name">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">phone:</label>
          <div class="col-xs-8">
            <input type="number" class="form-control" id="phone" placeholder="phone" v-model="userProfile.phone" name="phone">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">about you:</label>
          <div class="col-xs-8">
            <input type="text" v-model="userProfile.description" class="form-control"></input>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">gender:</label>
          <div class="col-xs-8">
            <label class="radio-inline"><input type="radio" name="gender" value="1" v-model="userProfile.gender">male</label>
            <label class="radio-inline"><input type="radio" name="gender" value="2" v-model="userProfile.gender">female</label>
            <label class="radio-inline"><input type="radio" name="gender" value="3" v-model="userProfile.gender">other</label>
          </div>
        </div>
      </form>
    </div>
    <div class="save-settings">
      <a class="btn btn-large btn-warning" @click="saveSettings">save settings</a>
      <a class="btn btn-large btn-danger" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  import axios from 'axios';
  export default {
    extends: MBBase,
    data () {
      return {
        userProfile: {
          avatar: null,
          name: '',
          phone: '',
          description: '',
          gender: 3,
          goodAt: [],
          notificationSettings: {
            alertDistance: 5,
            showMeOnMap: false,
            onlyFriendsAlert: false
          }  
        }
      }
    },
    created(){
      var self = this;
      var url = self.domain + '/users/details/' + self.userData.userId;
      axios.post(url)
      .then(response => {
        self.userProfile.name = response.fullName;
        self.userProfile.phone = response.phone;
      })
      .catch(e => {
        //TBD: add logs
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

<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img ref="avatarPresent" :src="imagesDomain + userData.imageUrl" class="user-avatar"/>
        <input ref="userAvatar" type="file" @change="avatarSelected"/>
        <a class="btn btn-default file-loader">
          <span class="fa fa-upload"></span><p>Upload avatar</p>
        </a>
      </label>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="first">first name:</label>
          <div class="col-xs-8">
            <input class="form-control" id="first" placeholder="first name" v-model="userProfile.firstName" name="first">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="last">Password:</label>
          <div class="col-xs-8">          
            <input class="form-control" id="last" placeholder="last name" v-model="userProfile.lastName" name="last">
          </div>
        </div>
      </form>
    </div>
    <div class="contact section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="phone">phone:</label>
          <div class="col-xs-8">
            <input class="form-control" id="phone" placeholder="phone" v-model="userProfile.phone" name="phone">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="facebook">facebook profile:</label>
          <div class="col-xs-8">          
            <input class="form-control" id="facebook" placeholder="" v-model="userProfile.facebook" name="facebook">
          </div>
        </div>
      </form>
    </div>
    <div class="save-settings">
      <a class="btn btn-large btn-warning">save settings</a>
      <a class="btn btn-large btn-danger" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase,
    data () {
      return {
        userProfile: {
          avatar: null,
          firstName: '',
          lastName: '',
          phone: '',
          facebook: '',
          description: '',
          born: null,
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
      logout(){
        var self = this;
        window.localStorage.removeItem('mb_usercookie');
        window.localStorage.removeItem('mb_loginType');
        window.localStorage.removeItem('mb_registrationId');
        self.$parent.$parent.isLoggedIn = false;        
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
    width: 49%;
    float: left;
  }

  @media only screen and (max-width: 768px) {
      /* For mobile phones: */
      [class*="section"] {
          width: 100%;
      }
  }

  .user-avatar{
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }

  .save-settings{
    position: fixed;
    right: 5px;
    bottom: 5px;
  }
</style>

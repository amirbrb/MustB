<template>
  <div class="profile">
    <div class="avatar section container">
      <label class="file-container">
        <img ref="avatarPresent" :src="imagesDomain + userData.imageUrl" class="user-avatar"/>
        <i class="img-editor fa fa-edit"></i>
        <input ref="userAvatar" type="file" @change="avatarSelected"/>
      </label>
    </div>
    <div class="basics section container">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-xs-4 col-sm-3" for="first">name</label>
          <div class="col-xs-8">
            <input class="form-control" id="first" placeholder="first name" v-model="userProfile.name" name="first">
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
            <textarea v-model="userProfile.description" class="form-control"></textarea>
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
          name: '',
          phone: '',
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
    width: 100%;
    float: left;
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
    position: relative;
    z-index: 9999;
    font-size: 24px;
  }

  .save-settings{
    position: fixed;
    right: 5px;
    bottom: 5px;
  }
</style>

<template>
  <div class="profile">
    <div class="seperator">
      <span>you</span>
    </div>
    <div class="avatar">
      <label class="file-container">
        <img :src="domain + userData.imageUrl" class="user-avatar"/>
        <input ref="userAvatar" type="file" @change="avatarSelected" multiple/>
        <a class="btn btn-default file-loader">
          <span class="fa fa-upload"></span><p>Upload avatar</p>
        </a>
      </label>
    </div>
    <div class="first"></div>    
    <div class="last"></div>
    <div class="seperator">
      <span>notification settings</span>
    </div>
    <div class="save-settings">
      <a class="btn btn-large btn-warning">save settings</a>
    </div>
  </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase,
    data () {
      return {
        userProfile: {}
      }
    },
    created(){

    },
    methods: {
      avatarSelected() {

      }
    }
  }
</script>
<style scoped>
	.profile{
    margin: 0px 5px 5px 5px;
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

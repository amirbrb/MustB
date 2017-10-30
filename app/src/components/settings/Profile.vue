<template>
  <div class="profile">
    <div class="seperator">
      <span>you</span>
    </div>
    <div class="avatar">
      <label class="file-container">
        <img :src="domain + userProfile.avatar"/>
        <input ref="userAvatar" type="file" @change="avatarSelected" multiple/>
      </label>
    </div>
    <div class="first"></div>    
    <div class="last"></div>
    <div class="email"></div>    
    <div class="seperator">
      <span>notification settings</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase,
    props: ['userId'],
    data () {
      return {
        userProfile: {}
      }
    },
    created(){
      var self = this;
      var url = self.domain + '/users/' + self.userId;
      axios.get(url)
        .then(response => {
          self.userProfile = response.userProfile;
        })
        .catch(error => {
          console.log(error)
          //TBD = show proper error
        })
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
</style>

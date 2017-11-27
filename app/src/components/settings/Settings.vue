<template>
  <div class="settings">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#profile" @click="selectedSettingsType = 1">me</a>
        </li>
      </ul>
      <div class="tab-content">
      <div id="profile" 
          :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 1, 'active' : selectedSettingsType === 1}" v-if="selectedSettingsType === 1">
          <Profile :userId="$parent.userData.userId" v-if="selectedSettingsType === 1" v-on:logout="logout"></Profile>
        </div>
      </div>
    </div>
</template>

<script>
  import About from '../settings/About.vue'
  import Profile from '../settings/Profile.vue'
  import MBBase from '../../MBBase.vue';
  const SettingsType = {
    profile: 1,
    about: 2
  }
  window.SettingsType = SettingsType
  export default {
    extends: MBBase,
    components: {
      About, 
      Profile,
      SettingsType
    },
    methods: {
      logout(){
        window.localStorage.removeItem('mb_usercookie');
        window.localStorage.removeItem('mb_loginType');
        window.localStorage.removeItem('mb_registrationId');
        window.localStorage.removeItem('mb_token');
        
        var self = this;
        self.$parent.isLoggedIn = false;
        self.$parent.isLoginForm = true;
        self.$router.replace('/');
      }
    },
    created(){
      this.SettingsType = SettingsType;
    },
    data(){
      return {
        selectedSettingsType: 1
      }
    }
  }
</script>
<style scoped>
	.settings{
    margin: 5px 5px 5px 5px;
		width: 97%;
    overflow-y:auto;
	}

  .nav li{
    font-size: 20px;
  }
</style>

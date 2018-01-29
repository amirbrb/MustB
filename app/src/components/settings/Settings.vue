<template>
  <div class="settings">
    <ul class="nav nav-tabs">
      <li class="active">
        <a data-toggle="tab" href="#profile" @click="selectedSettingsType = 1"><i class="fa fa-user-circle" aria-hidden="true"></i></i></a>
      </li>
      <li>
        <a data-toggle="tab" href="#events" @click="selectedSettingsType = 2"><i class="fa fa-list-ul" aria-hidden="true"></i></i></a>
      </li>
    </ul>
    <div class="tab-content">
      <div id="profile" 
        :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 1, 'active' : selectedSettingsType === 1}" v-if="selectedSettingsType === 1">
        <Profile :userId="$parent.userData.userId" v-if="selectedSettingsType === 1" v-on:logout="logout"></Profile>
      </div>
      <div id="events" 
        :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 2, 'active' : selectedSettingsType === 2}" v-if="selectedSettingsType === 2">
        <UserEvents :userId="$parent.userData.userId" v-if="selectedSettingsType === 2"></UserEvents>
      </div>
    </div>
  </div>
</template>

<script>
  import About from './About.vue'
  import Profile from './Profile.vue'
  import UserEvents from './UserEvents.vue'
  import MBBase from '../../MBBase.vue';
  const SettingsType = {
    profile: 1,
    activity: 2
  }
  window.SettingsType = SettingsType
  export default {
    extends: MBBase,
    components: {
      About, 
      Profile,
      SettingsType,
      UserEvents
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
</style>

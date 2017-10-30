<template>
  <div class="settings">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#about" @click="selectedSettingsType = 2">about</a>
        </li>
        <li>
          <a data-toggle="tab" href="#profile" @click="selectedSettingsType = 1">me</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="about" 
          :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 2, 'active' : selectedSettingsType === 2}" v-if="selectedSettingsType === 2">
          <About v-if="selectedSettingsType === 2"></About>
        </div>
        <div id="profile" 
          :class="{'tab-pane' : true, 'fade': true, 'in' : selectedSettingsType === 1, 'active' : selectedSettingsType === 1}" v-if="selectedSettingsType === 1">
          <Profile :userId="$parent.userData.id" v-if="selectedSettingsType === 1"></Profile>
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
    created(){
      this.SettingsType = SettingsType;
    },
    data(){
      return {
        selectedSettingsType: 2
      }
    }
  }
</script>
<style scoped>
	.settings{
		position: fixed;
		top: 65px;
    margin: 0px 5px 5px 5px;
		width: 100%;
	}
</style>

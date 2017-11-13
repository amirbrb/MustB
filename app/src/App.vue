<template>
  <div id="app">
    <transition name="fade">
      <Login v-on:loggedIn="userAuthenticated" v-on:showRegistration="showRegistration" v-if="!isLoggedIn && isLoginForm"></Login>
    </transition>
    <transition name="fade">
      <Register v-on:registered="userAuthenticated" v-on:showLogin="showLogin" v-if="!isLoggedIn && isRegistrationForm"></Register>
    </transition>
    <div class="data-viewer" v-if="isLoggedIn">
      <HeaderNavbar></HeaderNavbar>
      <transition name="fade-short">
        <router-view></router-view>
      </transition>  
    </div>
  </div>

</template>

<script>

import ViewType from './enums/viewType'
import MBBase from './MBBase.vue';
import Login from './components/login/Login.vue';
import Register from './components/login/Register.vue';
import MainView from './components/misc/MainView.vue';
import HeaderNavbar from './components/misc/HeaderNavbar.vue';

export default {
  extends: MBBase,
  name: 'app',
  components: {
    Login,
    Register,
    MainView,
    HeaderNavbar
  },
  props: ['loggedInUserData'],
  data () {
    return {
      isLoggedIn: false,
      userData: {
        name: "",
        avatar: "",
        id: 0,
        settings: {
          sosControlLocation: {
            left: 50,
            top: 50
          },
          viewType: ViewType.table,
          mapZoomLevel: 14
        }
      },
      currentLocation: null,
      isLoading: false,
      isLoginForm: true,
      isRegistrationForm: false
    }
  },
  created () {
    window.ViewType = ViewType;
    var self = this;
    if(self.$parent.loggedInUserData){
      self.userData = self.$parent.loggedInUserData;
      self.isLoggedIn = true;
    }

    self.currentLocation = self.$parent.currentLocation;
    self.watchGeolocation();
  },
  methods: {
    watchGeolocation() {
      var self = this;
      if (navigator.geolocation) {
        var watchOptions = {
          enableHighAccuracy: false,
          maximumAge: 0
        };

        navigator.geolocation.watchPosition(function(position){
          var coords = position.coords;
          self.currentLocation.lat = coords.latitude;
          self.currentLocation.lng = coords.longitude;
        }, function(err){
          console.log(err); //TBD - add proper logging
        }, watchOptions);
      }
    },
    userAuthenticated (userData){
      var self = this;
      self.userData.name = userData.fullName;
      self.userData.avatar = userData.imageUrl;
      self.userData.id = userData.userId;
      self.userData.settings.sosControlLocation = userData.settings.sosControlLocation;
      self.userData.settings.viewType = userData.settings.viewType || self.userData.settings.viewType;
      self.userData.settings.mapZoomLevel = userData.settings.mapZoomLevel || self.userData.settings.mapZoomLevel;
      self.isLoginForm = false;
      self.isRegistrationForm = false;
      self.isLoggedIn = true;
    },
    showRegistration (){
      var self = this;
      self.isLoginForm = false;
      self.isRegistrationForm = true;
    },
    showLogin (){
      var self = this;
      self.isLoginForm = true;
      self.isRegistrationForm = false;
    }
  }
};

</script>

<style>
.fade-enter-active, .fade-leave-active {
  -webkit-transition: opacity 1.5s ease-in;
  transition: opacity 1.5s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-long-enter-active, .fade-long-leave-active {
  -webkit-transition: width 5s ease-out;
  transition: opacity 5s ease-out;
}

.fade-long-enter, .fade-long-leave-to {
  opacity: 0;
}

.fade-short-enter-active, .fade-short-leave-active {
  -webkit-transition: width 1s ease-out;
  transition: opacity 1s ease-out;
}

.fade-short-enter, .fade-short-leave-to {
  opacity: 0;
}

.main-view{
  width: 100%;
}

</style>

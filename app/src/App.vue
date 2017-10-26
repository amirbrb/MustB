<template>
  <div id="app">
    <div v-show="isLoading">loading...</div>
    <transition name="fade">
      <Login v-on:loggedIn="userAuthenticated" v-on:showRegistration="showRegistration" v-if="!userData.isLoggedIn && isLoginForm"></Login>
    </transition>
    <transition name="fade">
      <Register v-on:registered="userAuthenticated" v-on:showLogin="showLogin" v-if="!userData.isLoggedIn && isRegistrationForm"></Register>
    </transition>
    <div class="data-viewer" v-if="userData.isLoggedIn">
      <HeaderNavbar></HeaderNavbar>
      <transition name="fade-short"><router-view></router-view></transition>
    </div>
  </div>

</template>

<script>

import LoginType from './enums/loginType'
import ViewType from './enums/viewType'
import axios from 'axios';
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
  data () {
    return {
      userData: {
        isLoggedIn: false,
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
      currentLocation: {},
      isLoading: false,
      isLoginForm: true,
      isRegistrationForm: false
    }
  },
  created () {
    window.ViewType = ViewType;
    var self = this;
    self.geolocate();
    var usernameCookie = window.localStorage.mb_usercookie;
    if(usernameCookie){
      var loginTypeEnum = window.localStorage.mb_loginType;
      if(loginTypeEnum == LoginType.mail){
        var url = self.domain + '/users/relogin';
        var data = {
          mail: usernameCookie
        };
        axios.post(url, data)        
        .then(response => {
          var data = response.data;
          self.hasErrors = !data.isSuccess;
          if(data.isSuccess){
            self.userAuthenticated(data.data.userData);
          }
        });          
      }
    }
  },
  methods: {
    geolocate() {
      var self = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    },
    userAuthenticated (userData){
      var self = this;
      self.userData.name = userData.fullName;
      self.userData.avatar = userData.imageUrl;
      self.userData.id = userData.userId;
      self.userData.isLoggedIn = true;
      self.userData.settings.sosControlLocation = userData.settings.sosControlLocation;
      self.userData.settings.viewType = userData.settings.viewType || self.userData.settings.viewType;
      self.userData.settings.mapZoomLevel = userData.settings.mapZoomLevel || self.userData.settings.mapZoomLevel;
      self.isLoginForm = false;
      self.isRegistrationForm = false;
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

</style>

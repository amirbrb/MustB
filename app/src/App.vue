<template>
  <div id="app">
    <Login v-on:loggedIn="userAuthenticated" v-on:showRegistration="showRegistration" v-if="!userData.isLoggedIn && isLoginForm"></Login>
    <Register v-on:registered="userAuthenticated" v-if="!userData.isLoggedIn && isRegistrationForm"></Register>
    <div v-if="userData.isLoggedIn" :userImage="userData.avatar">aaa</div>
  </div>

</template>

<script>

import Login from './components/Login.vue';
import Register from './components/Register.vue';

export default {
  name: 'app',
  components: {
    Login,
    Register
  },
  data () {
    return {
      userData: {
        isLoggedIn: false,
        name: "",
        avatar: "",
        id: 0
      },
      isLoginForm: true,
      isRegistrationForm: false
    }
  },
  methods: {
    userAuthenticated: function(userData){
      this.isLoginForm = false;
      this.isRegistrationForm = false;
      this.userData.name = userData.fullName;
      this.userData.avatar = userData.imageUrl;
      this.userData.id = userData.id;
      this.userData.isLoggedIn = true;
    },
    showRegistration: function(){
      this.isLoginForm = false;
      this.isRegistrationForm = true;
    },
    showLogin: function(){
      this.isLoginForm = true;
      this.isRegistrationForm = false;
    }
  }
}

</script>

<style>

</style>

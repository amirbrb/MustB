<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img class="profile-img" :src="domain + '/images/avatar.png'" alt="">
            <div class="form-signin">
              <input v-model="userDetails.mail" type="text" v-bind:class="['form-control', isLoggingIn && missingMail ? 'missing-input' : '']" placeholder="mail" required autofocus>
              <input v-model="userDetails.password" type="password" v-bind:class="['form-control', isLoggingIn && missingPassword ? 'missing-input' : '']" placeholder="password" required>
              <button class="btn btn-lg btn-primary btn-block" v-on:click="login">login</button>
              <div ref="errors" id="errors" v-bind:style="{ display: hasErrors ? null : 'none'}" class="text-center alert alert-danger">aaa</div>
            </div>
          </div>
          <a href="#" v-on:click="showRegistration" class="text-center new-account">Im new here</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Login',
  components: {
    
  },
  data () {
    return {
      domain: 'http://localhost:3000',
      hasErrors: false,
      isLoggingIn: false,
      userDetails: {
        mail: "",
        password: ""
      }
    }
  },
  computed: {
    missingMail: function(){
      var filter = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      var isValidMail = filter.test(this.userDetails.mail);
      return this.userDetails.mail === "" || !isValidMail;
    },
    missingPassword: function(){
      return this.userDetails.password === "";
    }
  },
  methods: {
    login: function(){
      var self = this;
      self.isLoggingIn = true;

      if(self.missingMail || self.missingPassword) return;

      var url = self.domain + '/users/login';
      var data = {
        mail: self.userDetails.mail,
        password: self.userDetails.password
      };
      axios.post(url, data)        
        .then(response => {
          var data = response.data;
          self.hasErrors = !data.isSuccess;
          if(!data.isSuccess){
            self.$refs.errors.innerHTML = data.data.message;
          }
          else{
            self.$emit('loggedIn', data.data.userData)
          }
        })
        .catch(e => {
          debugger;
        });
    },
    showRegistration: function(){
      this.$emit('showRegistration');
    }
  }
}

</script>

<style scoped>

#login{
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  width: 100%
}

.form-signin
{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

}
.form-signin input[type="password"]
{
    margin-top: 5px;
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 5px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

#errors{
  margin-top: 10px
}

.new-account
{
    display: block;
    margin-top: 10px;
}

</style>

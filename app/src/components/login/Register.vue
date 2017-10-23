<template>
  <div id="register">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img ref="userAvater" class="profile-img" :src="domain + '/images/community.png'" alt="">
            <div class="registration-form" v-bind:style="{ display: step == 1 ? null : 'none'}">
              <div class="form-group has-feedback">
                <input name="email" v-model="userDetails.mail" type="email" 
                  v-validate="'required|email'" :class="{'form-control': true, 'error-input': errors.has('email') }" 
                  placeholder="email">
                <span v-show="errors.has('email')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input name="password" v-model="userDetails.password" 
                  v-validate="'required'" :class="{'form-control': true, 'error-input': errors.has('password') }" type="password"
                  placeholder="password">
                <span v-show="errors.has('password')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group text-center controls">
                <a class="btn btn-lg btn-primary next" @click="next">next</a>
              </div>
            </div>
            <div class="registration-form" v-bind:style="{ display: step == 2 ? null : 'none'}">
              <div class="form-group has-feedback">
                <input name="first" v-model="userDetails.first" 
                  v-validate="'required|alpha'" :class="{'form-control': true, 'error-input': errors.has('first') }" 
                  placeholder="first name">
                <span v-show="errors.has('first')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input name="last" v-model="userDetails.last" 
                  v-validate="'required|alpha'" :class="{'form-control': true, 'error-input': errors.has('last') }" 
                  placeholder="last name">
                <span v-show="errors.has('last')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input name="phone" v-model="userDetails.phone" 
                  v-validate="'required|numeric'" :class="{'form-control': true, 'error-input': errors.has('phone') }" 
                  placeholder="phone number">
                <span v-show="errors.has('phone')" class="glyphicon glyphicon-exclamation-sign form-control-feedback"></span>
              </div>
              <div class="form-group text-center">
                <a class="btn btn-lg btn-primary prev" @click="prev">prev</a>
                <a class="btn btn-lg btn-success next" @click="register">done</a>  
                <div ref="errors" id="errors" v-show="hasErrors" class="text-center alert alert-danger"></div>
              </div>
            </div>
          </div>
          <a href="#" v-on:click="showLogin" class="text-center old-account">i have an account</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import MBBase from '../../MBBase.vue';
export default {
  extends: MBBase,
  name: 'Login',
  components: {
    
  },
  data () {
    return {
      hasErrors: false,
      step: 1,
      isRegistering: false,
      userDetails: {
        mail: "",
        password: "",
        first: "",
        last: "",
        phone: ""
      }
    }
  },
  methods: {
    next: function(){
      var self = this;
      self.$validator.validateAll({
        email: self.userDetails.mail,
        password: self.userDetails.password
      }).then((result) => {
        if(result){
          self.step += 1;
        }
      });
    },
    prev: function(){
      this.step-=1;
    },
    register: function (){
      var self = this;
      self.$validator.validateAll({
        first: self.userDetails.first,
        last: self.userDetails.last,
        phone: self.userDetails.phone
      }).then((result) => {
        if(result){
          var url = self.domain + '/users/register';
          var data = {
            mail: self.userDetails.mail,
            password: self.userDetails.password,
            firstName: self.userDetails.firstName,
            lastName: self.userDetails.lastName,
            phoneNumber: self.userDetails.phoneNumber
          };
          axios.post(url, data)        
            .then(response => {
              var data = response.data;
              self.hasErrors = !data.isSuccess;
              if(!data.isSuccess){
                self.$refs.errors.innerHTML = data.data.message;
              }
              else{
                self.$refs.userAvater.src = self.domain + data.data.userData.imageUrl;
                setTimeout(function(){
                  self.$emit('registered', data.data.userData)
                }, 3000)
              }
            })
            .catch(e => {
              self.hasErrors = true;
              console.error(e);
              self.$refs.errors.innerHTML = 'an error occured, please try again';
            });
        }
      });
    },
    showLogin: function(){
      this.$emit('showLogin');
    }
  }
}

</script>

<style scoped>

#register{
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  width: 100%
}

.registration-form
{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.registration-form
{
    margin-bottom: 10px;
}
.registration-form .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.registration-form .form-control:focus
{
    z-index: 2;
}
.registration-form input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

}
.registration-form input[type="password"]
{
    margin-top: 5px;
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.account-wall
{
    padding: 10px 0px 0px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.controls{
  margin-top: 15px;
  margin-bottom: 15px;
}

.next, .prev{
  width:100px;
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

.old-account
{
    display: block;
    margin-top: 10px;
}

</style>

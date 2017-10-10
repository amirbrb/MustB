<template>
  <div id="register">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
          <div class="account-wall">
            <img class="profile-img" :src="domain + '/images/avatar.png'" alt="">
            <div class="registration-form" v-bind:style="{ display: step == 1 ? null : 'none'}">
              <input type="text" v-model="userDetails.mail" v-bind:class="['form-control', isRegistering && missingMail ? 'missing-input' : '']" placeholder="mail" required autofocus>
              <input type="password" v-model="userDetails.password" v-bind:class="['form-control', isRegistering && missingPassword ? 'missing-input' : '']" placeholder="password" required>
              <div class="col-xs-12 text-center controls">
                <a class="btn btn-lg btn-primary next" @click="next">next</a>
              </div>
            </div>
            <div class="registration-form" v-bind:style="{ display: step == 2 ? null : 'none'}">
              <input type="text" v-model="userDetails.first" v-bind:class="['form-control', isRegistering && missingFirst ? 'missing-input' : '']" placeholder="first name" required autofocus>
              <input type="text" v-model="userDetails.last" v-bind:class="['form-control', isRegistering && missingLast ? 'missing-input' : '']" placeholder="last name" required>
              <input type="text" v-model="userDetails.phone" v-bind:class="['form-control', isRegistering && missingPhone ? 'missing-input' : '']" placeholder="phoneNumber" required>
              <div class="col-xs-12 text-center controls">
                <a class="btn btn-lg btn-primary prev" @click="prev">prev</a>
                <a class="btn btn-lg btn-success next" @click="register">done</a>  
              </div>
              <div ref="errors" id="errors" v-bind:style="{ display: hasErrors ? null : 'none'}" class="text-center alert alert-danger">aaa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Login',
  components: {
    
  },
  computed: {
    missingMail: function(){
      var filter = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      var isValidMail = filter.test(this.userDetails.mail);
      return this.userDetails.mail === "" || !isValidMail;
    },
    missingPassword: function(){
      return this.userDetails.password === "";
    },
    missingFirst: function(){
      return this.userDetails.first === "";
    },
    missingLast: function(){
      return this.userDetails.last === "";
    },
    missingPhone: function(){
      return this.userDetails.phone === "";
    }
  },
  data () {
    return {
      domain: 'http://localhost:3000',
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
      self.isRegistering = true;
      if(self.missingMail || self.missingPassword) return;

      self.step+=1;
    },
    prev: function(){
      this.step-=1;
    },
    register: function (){
      var self = this;
      if(self.missingFirst || self.missingLast || self.missingPhone) return;

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
            self.$emit('registered', data.data.userData)
          }
        })
        .catch(e => {
          debugger;
        });
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
.registration-form input[type="text"], .registration-form input[type="password"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: 5px;
}
.account-wall
{
    padding: 10px 0px 60px 0px;
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

</style>

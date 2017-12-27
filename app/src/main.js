// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';
import HelpCaseView from './components/help/HelpCaseView'
import MainView from './components/misc/MainView'
import Settings from './components/settings/Settings'
import Profile from './components/settings/Profile'
import ImageView from './components/misc/ImageView';
import SosForm from './components/misc/SosForm';
import LoginType from './enums/loginType'
import $ from 'jquery'

Vue.use(VueRouter)
Vue.use(VeeValidate);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: MainView },
  { path: '/help', component: SosForm },
	{ path: '/case/:id', component: HelpCaseView },
  { path: '/image/:id', component: ImageView },
  { path: '/user/:id', component: Profile, props: { isReadOnly: true } },
	{ path: '/settings', component: Settings }
];

const router = new VueRouter({ routes });

window.onerror = function(message, file, line, column, error) {
  
}

window.addEventListener('native.keyboardshow', function(e){
  //var height = e.keyboardHeight;
  //alert(height);
  setTimeout(function() {
      window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
  }, 0);
});

document.addEventListener('deviceready', function(){
  /* eslint-disable no-undef */
  /* eslint-disable valid-typeof */

  var pushIsDefined = typeof PushNotification !== "undefined";
  if(pushIsDefined){
    var push = PushNotification.init({
      "android": {
        "senderID": "878990424337"
      },
      "ios": {
        "sound": true,
        "vibration": true,
        "badge": true,
        "categories": {},
        "windows": {}
      }
    });

    push.on('registration', function(data) {
      window.localStorage.mb_registrationId = data.registrationId;
    });

    push.on('notification', function(data) {
      alert(data.title + " Message: " + data.message);
    });

    push.on('error', function(e) {
      alert(e.message);
    });
  }
  
  init();  
}, false);

window.setTimeout(function() {
    var e = document.createEvent('Events'); 
    e.initEvent("deviceready", true, false); 
    document.dispatchEvent(e);
}, 100);

function init(){  
  const baseUrl = 'https://mustb-amirbrb.c9users.io';
  $.ajaxSetup({
      beforeSend: function(xhr, options) {
        options.url = baseUrl + options.url;
        xhr.setRequestHeader("mb_token", localStorage.mb_token);
      },
      data: {
        mb_token: localStorage.mb_token
      },
      global: false,
      type: "POST"
  });

  if(navigator.geolocation){
    var geoLocationOptions = {
      enableHighAccuracy: true
    };

    var geoLoctionSuccess = function(position) {
      var coords = position.coords;
      var currentLocation = {
        lat: coords.latitude,
        lng: coords.longitude
      };

      var usernameCookie = window.localStorage.mb_usercookie;
      if(usernameCookie){
        var loginTypeEnum = window.localStorage.mb_loginType;
        if(loginTypeEnum == LoginType.mail){
          var url = '/login/relogin';
          var data = {
            mail: usernameCookie,
            gcmRegistrationId: window.localStorage.mb_registrationId,
            lat: currentLocation.lat,
            lng: currentLocation.lng
          };

          $.post(url, data, function(response){
            var data = response;
            if(data.isSuccess){
              localStorage.mb_token = data.data.token;
              createApplication(data.data.userData, currentLocation);
            }
            else{
              createApplication(null, currentLocation);
            }
          }).fail(function(e){
            //TBD - log
            createApplication(null, currentLocation);
          });
        }
      }
      else{
        createApplication(null, currentLocation);
      }
    };

    var geoLocationFailure = function(){
      //TBD - show error and close application
    }
    navigator.geolocation.getCurrentPosition(geoLoctionSuccess, geoLocationFailure, geoLocationOptions);
  }
}

function createApplication(userData, currentLocation){
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App />',
    components: { App },
    data () {
      return {
        loggedInUserData: userData,
        isLoading: false,
        currentLocation: currentLocation
      }
    },
    router: router
  })
}


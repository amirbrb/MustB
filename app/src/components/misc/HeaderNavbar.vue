<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="mb-navbar-header">
        <a id="toggle" @click="toggleSettings" :class="{'on' : navbarIsOpen}"><span></span></a>
        <img class="mb-navbar-logo" :src="this.domain + '/images/static/community.png'"/>
        <label>
          <a class="mb-navbar-brand">Ukholo</a>
           someone to trust
        </label>
      </div>
    </div>
  </nav>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase,
    data() {
      return {
        
      }
    },
    methods:{
      toggleSettings() {
        var self = this;
        if(!self.navbarIsOpen){
          self.$router.push('/settings');
        }
        else{
          self.$router.replace('/');
        }
      }
    },
    computed: {
      navbarIsOpen(){
        return this.$route.fullPath.indexOf('settings') > 0;
      } 
    }
  }
</script>
<style scoped>
  .navbar{
    height: 80px;
    line-height: 80px;
  }

  .mb-navbar-header{
    width: 100%;
    text-align: center;
  }

  .mb-navbar-logo{
    height: 40px;    
    position: absolute;
    left: 20px;
    top: 20px;
  }

  .mb-navbar-brand{
    color: #777;
    font-size: 26px;
  }

  .navbar-close{
    height: 15px;
  }

  /* Important styles */
  #toggle {
    display: block;
    width: 28px;
    height: 30px;
    position: absolute;
    right: 25px;
    top: 40px;
    cursor: pointer;
  }

  #toggle span:after,
  #toggle span:before {
    content: "";
    position: absolute;
    left: 0;
    top: -9px;
  }
  #toggle span:after{
    top: 9px;
  }
  #toggle span {
    position: relative;
    display: block;
  }

  #toggle span,
  #toggle span:after,
  #toggle span:before {
    width: 100%;
    height: 5px;
    background-color: #888;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 2px;
  }

  /* on activation */
  #toggle.on span {
    background-color: transparent;
  }
  #toggle.on span:before {
    transform: rotate(45deg) translate(5px, 5px);
  }
  #toggle.on span:after {
    transform: rotate(-45deg) translate(7px, -8px);
  }
  #toggle.on + #menu {
    opacity: 1;
    visibility: visible;
  }
</style>

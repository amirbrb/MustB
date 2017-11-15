<script>
import axios from 'axios';
export default {
  data() {
  	return {
		  domain: 'https://mustb-amirbrb.c9users.io',
      imagesDomain: 'https://mustb-amirbrb.c9users.io/images/',
      userData: this.$parent.userData,
      currentLocation: this.$parent.currentLocation
  	}
  },
  methods:{
    userSettingsChanged (settings, userId){
      var self = this;
      var url = self.domain + '/users/settings';
        var data = {
          settings: settings,
          userId: userId
        };
        axios.post(url, data);
    },
    log(message){
		  alert(message.message);
    }
  }
}

</script>

<script>
import $ from 'jquery';
import moment from 'moment';
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
      var url = '/users/preferences';
        var data = {
          settings: JSON.stringify(settings),
          userId: userId
        };
        $.post(url, data);
    },
    log(message){
		  alert(message.message);
    },
    stringifyDate(dateObject, format){
      format = format || 'DD-MMM-YYYY HH:mm:ss';
      return moment(dateObject).format(format);
    }
  }
}

</script>

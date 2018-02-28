<script>
import $ from 'jquery';
import moment from 'moment';
import config from '.config';

export default {
  data() {
  	return {
		  domain: config.domain,
      imagesDomain: config.imagesDomain,
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

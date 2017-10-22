<script>

export default {
  data() {
  	return {
  			domain: 'https://mustb-amirbrb.c9users.io',
    		loginType: {
  				"mail":1,
    			"google": 2, 
    			"facebook": 3
    		}  
  	}
  },
  created(){
    this.geolocate();
  },
  methods:{
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
    }
  }
}

</script>

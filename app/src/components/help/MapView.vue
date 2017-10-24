<template>
  <div class="map-view">
    <div id="map"></div>    
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue'
import axios from 'axios';
var google = window.google;
export default {
  extends: MBBase,
  components: {
    
  },
  props: ['currentLocation', 'mapZoomLevel'],
  data () {
    return {
      map: {},
      cases: []   
    }
  },
  mounted(){
    var self = this;
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: self.currentLocation.lat, lng: self.currentLocation.lng},
      zoom: self.mapZoomLevel,
      disableDefaultUI: true,
      mapTypeControlOptions: google.maps.MapTypeId.ROADMAP
    });

    self.map.addListener('zoom_changed', function() {
      var zoom = self.map.getZoom();
      self.$emit('mapZoomChanged', zoom);
    });

    self.getData();
  },
  methods: {
    getData() {
      var self = this;
      var url = self.domain + '/sos';
      axios.get(url, {
        location: self.currentLocation
      }).then(response => {
        self.cases = response.data.map(data => {
          return {
            image: self.domain + '/images/' + data.userImage,
            title: data.title,
            description: data.description,
            id: data.id,
            location: data.location
          }
        });
        self.placeDataOnMaps();
        setTimeout(self.getData, 1000);
      }).catch(response => {
        alert(response.data);
        //TBD: proper error message
      });
    },
    placeDataOnMaps(){
      var self = this;
      self.cases.forEach(function(data){
        var position = {
          lat: parseFloat(data.location.lat),
          lng: parseFloat(data.location.lng)
        };
        var icon = {
          url: data.image,
          scaledSize: new google.maps.Size(40, 40), 
          origin: new google.maps.Point(0,0), 
          anchor: new google.maps.Point(0, 0) 
        };

        var markerString = "<h3>" + data.title + "</h3>";
        markerString += "<p>" + data.description + "</p>";
        var infowindow = new google.maps.InfoWindow({
          content: markerString
        });

        var marker = new google.maps.Marker({
          position: position,
          map: self.map,
          title: data.title,
          icon: icon
        });

        marker.addListener('click', function() {
          infowindow.open(self.map, marker);
        });

        marker.setMap(self.map);
      });
    }
  }
}

</script>

<style scoped>
  .map-view {
    height: 80vh;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 5px;
  }

  #map{
    height: 100%;
  }
</style>

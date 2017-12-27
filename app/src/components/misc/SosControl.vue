<template>
  <div ref="sosControl" id="sosControl" class="sos-control" 
    v-bind:style="{ top: location.top + 'px', left: location.left + 'px'  }">
    <i class="fa fa-handshake-o"></i></div>
</template>

<script>

import Hammer from 'hammerjs';
export default {
  components: {
    
  },
  props: ['location'],
  data () {
    return {
      
    }
  },
  mounted (){
    var self = this;
    var sosControl = self.$refs.sosControl;

    sosControl.style.left = self.location.left + "px";
    sosControl.style.top = self.location.top + "px";

    var hammertime = new Hammer(sosControl);
    var lastPosX = self.location.left;
    var lastPosY = self.location.top;
    var isDragging = false;
    
    hammertime.on('press', function(ev){
      
    });

    hammertime.on('tap', function(ev) {
      self.$router.push('/help');
    });

    hammertime.on('pan', function(ev) {
      var elem = ev.target;
      if (!isDragging) {
        isDragging = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;
      }

      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      if(posX < 0 || posY < 0) return;

      // move our element to that position
      elem.style.left = posX + "px";
      elem.style.top = posY + "px";
      
      // DRAG ENDED
      // this is where we simply forget we are dragging
      if (ev.isFinal) {
        isDragging = false;
        self.$emit('sosControlLocationChanged', {
          left: posX,
          top: posY
        });
      }
    });
  },
  methods: {
    
  }
}

</script>

<style scoped>
.sos-control{
  height: 70px;
  width: 70px;
  line-height: 70px;
  text-align: center;
  background-color: lightgray;
  z-index: 9999;
  border-radius: 150px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 5px 5px 5px grey;
  opacity: 0.45;
}
</style>

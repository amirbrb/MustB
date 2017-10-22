<template>
  <div>case</div>
</template>

<script>

import MBBase from '../../MBBase.vue'
//import axios from 'axios';
export default {
  extends: MBBase,
  components: {
    
  },
  props: [],
  data () {
    return {
      
    }
  },
  created(){
    this.getData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData(){
      /*var self = this;
      var url = self.domain + '/sos/' + self.$route.params.id;
      axios.get(url).then(response => {
        debugger;
      }).catch(response => {
        debugger;
      });*/
    }
  }
}

</script>

<style scoped>
  
</style>

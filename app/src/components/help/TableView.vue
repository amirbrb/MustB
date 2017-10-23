<template>
  <div class="table-view">
    <div v-for="helpIssue in cases" class="help-issue" @click="caseShowing">
      <router-link :to="{ path: '/case/' + helpIssue.id}">
        <div class="help-issuer">
          <img class="img" :src="helpIssue.image"></img>
          <div class="help-title">{{helpIssue.title}}</div>
          <div class="help-description">
            {{helpIssue.description.length > maxDescriptionChars ? helpIssue.description.substring(0, maxDescriptionChars) + '...' : helpIssue.description}}
          </div>
        </div>
      </router-link>
    </div>  
  </div>
</template>

<script>

import MBBase from '../../MBBase.vue';
import axios from 'axios';
export default {
  extends: MBBase,
  components: {

  },
  created(){
    this.getData();
  },
  props: ['currentLocation'],
  data () {
    return {
      maxDescriptionChars: 100,
      cases: []
    }
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
        setTimeout(self.getData, 1000);
      }).catch(response => {
        alert(response.data);
        //TBD: proper error message
      });
    },
    caseShowing(){
      this.$emit('caseShowing');
    }
  }
}

</script>

<style scoped>
  .table-view {
    max-height: 600px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .help-issuer {
    width: 100%;
  }
  .help-issuer img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
  }

  .help-issue {
    height: 90px;
  }

  .help-title {
    font-weight: bolder;
    font-size: 22px;
    left: 85px;
    position: relative;
    top: -70px
  }
  .help-description {
    font-size: 15px;
    left: 85px;
    position: relative;
    top: -70px
  }
</style>

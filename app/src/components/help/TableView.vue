<template>
  <div class="table-view">
    <div v-for="helpIssue in data" class="help-issue" @click="caseShowing">
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
export default {
  extends: MBBase,
  components: {

  },
  props: ['data'],
  data () {
    return {
      maxDescriptionChars: 100
    }
  },
  methods: {
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

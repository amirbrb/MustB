<template>
  <div class="settings">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#me">Me</a>
        </li>
        <li>
          <a data-toggle="tab" href="#privacy">Privacy</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="me" class="tab-panec fade in active">
          
        </div>
        <div id="privacy" class="tab-pane fade">
          
        </div>
      </div>
    </div>
</template>

<script>
  import MBBase from '../../MBBase.vue';
  export default {
    extends: MBBase
  }
</script>
<style scoped>
	.settings{
		position: fixed;
		top: 65px;
    	margin: 0px 5px 5px 5px;
		width: 100%;
	}
</style>

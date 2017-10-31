<template>
	<div class="chat-box col-xs-10 col-xs-offset-1">
		<p>messages: </p>
      	<div class="messages-wrapper">
	      	<div v-for="message in messages" class="chat-message">
	        	<label>{{message.timestamp}}</label>
		        <label>{{message.sender}}</label>
		        <p>{{message.text}}</p>
	      	</div>
      	</div>
      	<div class="chat-text col-xs-10 col-xs-offset-1">
      		<div class="input-group">
		  		<input type="text" class="form-control" v-model="newMessage" placeholder="enter message here" aria-describedby="send-addon">
		  		<span class="input-group-addon" id="send-addon" @click="sendMessage"><i class="glyphicon glyphicon-send"></i></span>
			</div>
      	</div>
	</div>
</template>

<script>
	import MBBase from '../../MBBase.vue'
	import axios from 'axios';
	import moment from 'moment';
	export default {
  		extends: MBBase,
	  	components: {
	    },
	  	props: ['caseId'],
	  	data () {
		    return {
	      		messages: [],
	      		timeoutId: null,
	      		newMessage: '',
	      		lastQuery: moment(new Date(-8640000000000000)).format()
		    }
	  	},
	  	created(){
	    	this.getChatMessages();
	  	},
	  	destroyed(){
	    	var self = this;
	    	if(self.timeoutId){
	      		clearTimeout(self.timeoutId);
	    	}
	  	},
	  	methods: {
	    	getChatMessages(){
	      		var self = this;
	      		var url = self.domain + '/sos/messages/' + self.caseId + '?q=' + self.lastQuery;
	      		axios.get(url)
      			.then(response => {
	        		self.messages.push.apply(self.messages, response.data.messages);
	        		if(response.data.lastTimestamp){
	        			self.lastQuery = response.data.lastTimestamp;
	        		}

	        		self.timeoutId = setTimeout(self.getChatMessages, 1000);
	      		})
	      		.catch(response => {
			        debugger;
			        //TBD - show proper error
		      	});
	    	},
	    	sendMessage(){
    			var self = this;
	      		var url = self.domain + '/sos/message/';
	      		var data = {
	      			caseId: self.caseId,
	      			text: self.newMessage,
	      			userId: self.userData.id
	      		};
      			axios.post(url, data)
      			.then(response => {
	        		
	      		})
	      		.catch(response => {
	        		//TBD - show proper error
	      		});
    		}
	}
}
</script>

<style scoped>
	.chat-box{

	}
	.chat-text{
		margin-top: 10px;
	}
	.messages-wrapper{
		border: 1px solid black;
		max-height: 250px;
		min-height: 40px;
		overflow: auto;
	}
</style>

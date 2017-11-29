<template>
	<div class="chat-box col-xs-12" :disabled="!isActive">
		<p class="mb_title">messages: </p>
      	<div class="messages-wrapper col-xs-12" ref="messagesContainer">
      		<div v-if="isLoading">Getting messages</div>
	      	<div v-if="!isLoading" v-for="message in messages" :class="{'wrap-message': true, 'wrap-message-right' : message.senderId === userData.id}">
		      	<div class="chat-message">
			        <div class="message-sender">
			        	<img :src="domain + '/images/avatar/' + message.senderId"/>
			        </div>
			        <p>{{message.text}}</p>
		      	</div>
	      	</div>
      	</div>
      	<div class="chat-text col-xs-8 col-xs-offset-4 col-md-4 col-md-offset-8">
      		<div class="input-group">
		  		<input type="text" :disabled="!isActive" class="form-control" v-model="newMessage" placeholder="enter message here" aria-describedby="send-addon">
		  		<span class="input-group-addon" :disabled="!isActive" id="send-addon" @click="sendMessage"><i class="glyphicon glyphicon-send"></i></span>
			</div>
      	</div>
	</div>
</template>

<script>
	import MBBase from '../../MBBase.vue'
	import moment from 'moment';
	import $ from 'jquery'
	export default{
		extends: MBBase,
	  	components: {
	    },
	  	props: ['caseId', 'isActive'],
	  	data () {
		    return {
	      		messages: [],
	      		timeoutId: null,
	      		newMessage: '',
	      		lastQuery: moment(new Date(-8640000000000000)).format(),
	      		alive: true,
	      		isLoading: true
		    }
	  	},
	  	created(){
	    	this.getChatMessages();
	  	},
	  	beforeDestroy(){
	    	var self = this;
	    	self.alive = false;
	  	},
	  	methods: {
	    	getChatMessages(){
	      		var self = this;
	      		var url = '/sos/messages/' + self.caseId + '?q=' + self.lastQuery;
	      		$.get(url, function(response){
      				self.messages.push.apply(self.messages, response.messages);
	        		if(response.lastTimestamp){
	        			self.lastQuery = response.lastTimestamp;
	        		}

	        		if(response.messages.length > 0){
	        			var scroller = $(self.$refs.messagesContainer);
	        			setTimeout(function(){
	        				scroller.stop().animate({
							  scrollTop: scroller[0].scrollHeight
							}, 400)
        				}, 200);
	        		}

        			self.isLoading = false;

	        		if(self.alive){
	        			self.timeoutId = setTimeout(self.getChatMessages, 1000);
	        		}
	      		}).fail(function(response) {
			        //TBD - show proper error
		      	});
	    	},
	    	sendMessage(){
    			var self = this;
    			if(!self.isActive) return;

	      		var url = '/sos/message/';
	      		var data = {
	      			caseId: self.caseId,
	      			text: self.newMessage,
	      			userId: self.userData.userId
	      		};
      			$.post(url, data, function(response){
      				self.newMessage = '';
      			});
    		}
	}
}
</script>

<style scoped>
	.chat-box{

	}
	.chat-text{
		margin-top: 5px;
	}
	.messages-wrapper{
		border: 1px solid black;
		height: 250px;
		overflow: auto;
	}
	.chat-message{
		min-height: 50px;
		background: grey;
		opacity: 0.8;
		border-radius: 5px;
		padding-left: 25px;
		padding-top: 5px;
		padding-bottom: 5px;
		margin: 5px 5px 5px 5px;
		width: 100%; 
	}

	.wrap-message{
		width: 55%;
		float: left;
	}
	.wrap-message-right{
		float: right;
	}

	.wrap-message-right .chat-message{
		float: right;
	}

	.input-group-addon{
		cursor: pointer;
	}

	.message-sender{
		float: left;
	}
	.message-sender img{
		width: 40px;
		height: 40px;
		position: relative;
		left: -20px;
		border-radius: 40px
	}
</style>

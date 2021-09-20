<template>
	<div class="comment-card">
		<div @click="viewUser()"><v-lazy-image
			class="profile-photo"
			:src="commenterProfilePhoto"
		/></div>
		<div class="comment-text-wrapper">
			<div class="comment-text">
				<div class="top-info">
					<div class="commenter-name">
						<div>
							<span class="commenter-name-p">
								{{commenterName}}

								<span v-if="isVerified" class="verified-btn">
									<svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="verifiedIconTitle" stroke="#00acee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"> <title id="verifiedIconTitle">Verified</title> <path d="M8 12.5L10.5 15L16 9.5"/> <path d="M12 22C13.2363 22 14.2979 21.2522 14.7572 20.1843C14.9195 19.8068 15.4558 19.5847 15.8375 19.7368C16.9175 20.1672 18.1969 19.9453 19.0711 19.0711C19.9452 18.1969 20.1671 16.9175 19.7368 15.8376C19.5847 15.4558 19.8068 14.9195 20.1843 14.7572C21.2522 14.2979 22 13.2363 22 12C22 10.7637 21.2522 9.70214 20.1843 9.24282C19.8068 9.08046 19.5847 8.54419 19.7368 8.16246C20.1672 7.08254 19.9453 5.80311 19.0711 4.92894C18.1969 4.05477 16.9175 3.83286 15.8376 4.26321C15.4558 4.41534 14.9195 4.1932 14.7572 3.8157C14.2979 2.74778 13.2363 2 12 2C10.7637 2 9.70214 2.74777 9.24282 3.81569C9.08046 4.19318 8.54419 4.41531 8.16246 4.26319C7.08254 3.83284 5.80311 4.05474 4.92894 4.92891C4.05477 5.80308 3.83286 7.08251 4.26321 8.16243C4.41534 8.54417 4.1932 9.08046 3.8157 9.24282C2.74778 9.70213 2 10.7637 2 12C2 13.2363 2.74777 14.2979 3.81569 14.7572C4.19318 14.9195 4.41531 15.4558 4.26319 15.8375C3.83284 16.9175 4.05474 18.1969 4.92891 19.0711C5.80308 19.9452 7.08251 20.1671 8.16243 19.7368C8.54416 19.5847 9.08046 19.8068 9.24282 20.1843C9.70213 21.2522 10.7637 22 12 22Z"/> </svg>
								</span>
							</span>
							<span class="dot" v-if="date != null && date != ''"></span>
							<span class="date" v-if="date != null && date != ''">{{date}}</span>
						</div>

						<div class="name-action-icons">
			                <svg
			                	style="margin-right: 14px;"
			                  v-if="!isLiked"
			                  @click="likeComment()"
			                  xmlns="http://www.w3.org/2000/svg"
			                  width="15"
			                  height="15"
			                  viewBox="0 0 24 24"
			                  fill="none"
			                  stroke="#9c9c9c"
			                  stroke-width="2"
			                  stroke-linecap="round"
			                  stroke-linejoin="round"
			                  class="feather feather-heart"
			                >
			                  <path
			                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			                  ></path>
			                </svg>

			                <svg
			                	style="margin-right: 14px;"
			                  v-if="isLiked"
			                  @click="likeComment()"
			                  xmlns="http://www.w3.org/2000/svg"
			                  width="15"
			                  height="15"
			                  viewBox="0 0 24 24"
			                  fill="red"
			                  stroke="red"
			                  stroke-width="2"
			                  stroke-linecap="round"
			                  stroke-linejoin="round"
			                  class="feather feather-heart"
			                >
			                  <path
			                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			                  ></path>
			                </svg>

			                <svg @click="replyComment()" style="margin-right: 14px;" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
			                	</svg>

			                <svg
				                @click="showCommentDialogue = !showCommentDialogue"
				                xmlns="http://www.w3.org/2000/svg"
				                width="15"
				                height="15"
				                viewBox="0 0 24 24"
				                fill="none"
				                stroke="#9c9c9c"
				                stroke-width="2"
				                stroke-linecap="round"
				                stroke-linejoin="round"
				                class="feather feather-more-horizontal"
				              >
				                <circle cx="12" cy="12" r="1"></circle>
				                <circle cx="19" cy="12" r="1"></circle>
				                <circle cx="5" cy="12" r="1"></circle>
				             </svg>
			            </div>
					</div>

					<div id="text-to-likify" class="comment-text comment-text-p" @click="replyComment()">
						{{commentText}}
					</div>

					<div class="date-replies">
						<!-- <span class="date">{{date}}</span> -->
						<div class="like-icon-and-num" @click="replyComment()">
		                	<div>
		                		<!-- <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
			                	</svg> -->
			                	
			                	<div v-if="replies > 1" class="send-comment-btn">
			                		<span>view {{ replies }}</span> replies
			                	</div>
			                	<div v-if="replies == 1" class="send-comment-btn">
			                		<span>view {{ replies }}</span> reply
			                	</div>
			                </div>
		            	</div>
		            </div>
				</div>
			</div>

		</div>

		<div class="dialog-sheet" v-if="showCommentDialogue" key="postDialog">
	      <h1 class="closeDialogBtn" @click="showCommentDialogue = false">&times;</h1>

	      <div @click="replyComment()">Send a reply</div>
	      <div v-if="!isMyComment" class="primary-color">Report comment</div>
	      <div @click="deleteComment()" v-if="isMyComment" class="primary-color">Delete your comment</div>
	    </div>
    </div>
</template>

<script>
import * as linkify from 'linkifyjs';
import 'linkifyjs/plugins/hashtag';
import 'linkifyjs/plugins/mention';
import linkifyStr from 'linkifyjs/html';
import linkifyHtml from 'linkifyjs/html';
import linkifyElement from 'linkifyjs/html';
import VLazyImage from "v-lazy-image";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
	name: "CommentReplyCard",

	components: {
		VLazyImage,
	},

	data() {
		return {
			commenterName: '',
			commenterProfilePhoto: '',
			commenterUsername: '',
			// newCommentTime: '',

			newCommentText: '',
			newCommenterId: '',
			newCommentTime: '',

			isVerified: false,
			date: null,
			isLiked: false,
			likes: 0,
			replies: 0,
			showCommentDialogue: false,
			isMyComment: false
		}
	},

	props: {
		commentText: {
			required: true,
			type: String,
			default: '',
		},

		commenterId: {
			required: true,
			type: String,
			default: '',
		},

		commentTime: {
			// required: true,
		},

		commentId: {
			required: true,
			type: String,
			default: '',
		},
	},

	mounted() {
		this.getNewCommentInfo()
		this.linkifyContent()
		this.checkLiked()
		this.getRepliesNum()
		
	},

	updated() {
		console.log('updated///')

	},
  
	watch: {
		$props: {
	      handler(val) {
	      	console.log(val)
	      	// this.getNewCommentInfo()
	      	// console.log('commentTime', val.commentTime)
	      	// this.newCommentTime = this.commentTime

	      	// this.getNewCommentInfo()

	        // console.log('handler or something', val.id)
	        // this.newId = val.id;
	      },
	    },
	},

	methods: {

		async getNewCommentInfo() {
			// console.log(this.$route.params.id)

			await db
	          .collection("Replies")
	          .doc(this.$route.params.id)
	          .collection("Comments")
	          .doc(this.commentId)
	          .get()
	          .then((doc) => {
	          	// console.log(doc.data())

	          	this.newCommentText = doc.data()['commentText']
				this.newCommenterId = doc.data()['commenterId']
				this.newCommentTime = doc.data()['postTime']
				
				console.log(this.newCommentTime)

				if(this.newCommentTime != null) this.convertDate();
				
				this.checkIsMyComment()
				this.getCommenterInfo()
	          })
		},

	    linkifyContent() {
	      setTimeout(() => {
	        var postTitle = document.getElementById('text-to-likify')

	        var linkifiedElement = linkifyStr(postTitle.innerHTML, {
	          formatHref: function (href, type) {
	            if (type === 'url') {
	              return href;
	              // console.log(type, href)
	            }

	            if (type === 'mention') {
	              return 'https://grrid.netlify.app/user/' + href.substring(1);
	              // console.log(type, href)
	            }

	            if (type === 'hashtag') {
	              return 'https://grrid.netlify.app/tag/' + href.substring(1);
	              // console.log(type, href)
	            }
	          }
	        });

	        var div = document.createElement('div')
	        div.innerHTML = linkifiedElement.trim()
	        postTitle.innerHTML = div.innerHTML
	      }, 2000)
	    },

	    async checkLiked() {
	      await db
			// .collection("Replies")
			// .doc(this.$route.params.id)
			// .collection("Likes")


		        .collection("Replies")
		        .doc(this.$route.params.id)
		        .collection("Comments")
		        .doc(this.commentId)
		        .collection('Likes')
		        
			.doc(localStorage.getItem('uid'))
	        .get()
	        .then((doc) => {
	          if (doc.exists) {
	            console.log('is liked!')
	            this.isLiked = true;
	          } else {
	            this.isLiked = false;
	            console.log('not liked!')
	          }
	        });
	    },

	    async getRepliesNum() {
	      await db
	        .collection("Replies")
	        .doc(this.commentId)
	        .collection("Comments")
	        // .doc(this.commentId)
	        // .collection("Likes")
	        .onSnapshot((snapshot) => {
	        	console.log(snapshot)
	          this.replies = this.formatNumbers(snapshot.size);
	        });
	    },

	    formatNumbers(num) {
	      if (num > 999 && num < 1000000) {
	        return (num / 1000).toFixed(2) + "k";
	      } else if (num > 1000000) {
	        return (num / 1000000).toFixed(2) + "M";
	      } else if (num < 900) {
	        return num;
	      }
	    },

	    async likeComment() {
	      if (localStorage.getItem("uid") != null) {
	        this.isLiked = !this.isLiked;

	        if (this.isLiked) {
	          await db
		        .collection("Replies")
		        .doc(this.$route.params.id)
		        .collection("Comments")
		        .doc(this.commentId)
		        .collection('Likes')
		        .doc(localStorage.getItem('uid'))
	            .set({
	              liked: true,
	              userId: localStorage.getItem("uid"),
	            });
	        }

	        if (!this.isLiked) {
	          await db
		        .collection("Replies")
		        .doc(this.$route.params.id)
		        .collection("Comments")
		        .doc(this.commentId)
		        .collection('Likes')
		        .doc(localStorage.getItem('uid'))
	            .delete();
	        }
	      } else alert("please sign in");
	    },

		checkIsMyComment() {
			if(this.newCommenterId == localStorage.getItem('uid')) this.isMyComment = true;
			else this.isMyComment = false
		},

	    async deleteComment() {
	      await db
	        .collection("Replies")
	        .doc(this.$route.params.id)
	        .collection('Comments')
	        .doc(this.commentId)
	        .delete()

	        this.deleteCommentFromReplies()
	    },

	    async deleteCommentFromReplies() {
	      await db
	        .collection("Replies")
	        .doc(this.commentId)
	        .delete()
	    },

		async getCommenterInfo() {
			await db
	        .collection("Users")
	        .doc(this.newCommenterId)
	        .onSnapshot((doc) => {
	          this.commenterName = doc.data()["name"];
	          this.commenterUsername = doc.data()["username"]
	          this.commenterProfilePhoto = doc.data()["photoUrl"];
	          this.isVerified = doc.data()["verified"];
	        });
		},

		viewUser() {
			this.$router.push({
				name: "User",
				params: {
					id: this.newCommenterId,
				},
			});
		},

		replyComment() {
			this.$router.push({
				name: "ReplyComment",
				params: {
					id: this.commentId,
				},
			});
		},

	    convertDate() {
	      var dateValue = this.newCommentTime.toDate();
	      var stringDate = new Date(this.newCommentTime.seconds * 1000);
	      this.date = stringDate.toDateString();
	    },
	},
};
</script>
<style lang="scss">

.profile-photo {
	width: 50px;
	height: 50px;
	border-radius: 100px;	
	object-fit: cover;
	margin-right: 10px;
	background: gainsboro;
}

.dot {
	background: #9c9c9c
}

.date {
	// margin-bottom: -10px;
}

.date-replies,
.send-comment-btn {
	display: flex;
	align-items: center;
	color: #9c9c9c;

	span {
		display: block;
		margin-right: 22px;
	}
}

.send-comment-btn {
	position: relative;
	top: 4px;

	span {
		margin-right: 4px;
	}
}

.commenter-name-p {
	max-width: 150px;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.comment-text-p {
	font-size: 13px;
	padding-right: 10px;
}

.commenter-name {
	padding: 3px 0;

	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		position: relative;
		top: 3px;
	}

	.name-action-icons {
		position: absolute;
		right: 0;
	}
}

.comment-action-icons {
	// margin-top: 13px;
	display: flex;
	align-content: center;
	justify-content: flex-start;
	position: relative;
	top: 2.5px;
	
	div {
		margin: 0 10px;
	}

	.likes-num {
		margin-left: -4px;
		margin-right: 0;
		position: relative;
		top: 0;
	}
}

.comment-text-wrapper {
	display: flex;
	align-content: flex-start;
	justify-content: flex-start;
	flex-direction: column;

}

.verified-btn svg {
	margin: 0;
	width: auto;
	height: auto;
	position: relative;
	top: 3px;
	margin-left: 3px;
}

.comment-card {
	display: flex;
	align-content: flex-start;
	justify-content: flex-start;
	border-bottom: 1px solid #E6E7E755;
	padding: 10px 15px;
	padding-bottom: 8px;

	.comment-text {
		// border: 1px solid #E6E7E7;
		// padding: 8px;
		// border-radius: 7px;
	}

	.top-info {
		margin-bottom: 2px;
		width: 80vw;
		.dot {
			position: relative;
			top: -2px;
		}

		span {
			color: #9c9c9c;
		}
	}
}
</style>
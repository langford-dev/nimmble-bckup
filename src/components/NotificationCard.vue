<template>
  <div>
	<div class="notification-card" @click="viewNotification()" :style="!isRead ? 'background: #3c92f214' : 'background: #fff'">
        <div style="display: flex; align-content: center; justify-content: flex-start;">

          <div class="profile-img-text">

          <div v-if="type == 'comment'" class="notifications-img">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#1da1f2"
              stroke="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-circle"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              ></path>
            </svg>
          </div>

          <div v-if="type == 'commentReply'" class="notifications-img">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#1da1f2"
              stroke="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-circle"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              ></path>
            </svg>
          </div>

          <div v-if="type == 'repost'" class="notifications-img">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ace1f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </div>

          <div v-if="type == 'like'" class="notifications-img">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
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
          </div>

          <div v-if="type == 'unfollow'" class="notifications-img">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png">
          </div>

          <div v-if="type == 'subscription' || type == 'mention' || type == 'replyMention'" class="notifications-img">
            <img :src="userProfile">
          </div>

          <div>
            <p class="name">
              {{ notificationText }}
            </p>
            <p class="work" v-if="targetText != '' && targetText != null">
              '{{targetText}}''
            </p>
            <p class="work">
              {{notificationTime}}
            </p>
          </div>
        </div>
      </div>

          <div style="margin-top: 0; margin-right: 0;">
            <!-- <svg
              @click="showPostDialog = !showPostDialog"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14171A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-more-horizontal"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg> -->

            <svg @click="showPostDialog = !showPostDialog" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14171A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </div>

    </div>

      <vue-topprogress
        ref="topProgress"
        :height="topProgressHeight"
        colorShadow="=#ffffff00"
        color="#1da1f2"
      ></vue-topprogress>
  </div>
</template>
<script>
import { vueTopprogress } from "vue-top-progress";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
	name: 'NotificationCard',

	data() {
		return {
      topProgressHeight: 4,
			notificationTime: null,
			notificationText: '',
			targetPageId: '',
			targetText: '',
			type: '',
			userId: '',
      username: '',
      userProfile: '',
			isRead: false,
		}
	},

  components: {
    vueTopprogress,
  },

	props: {
		notificationId: {
			required: true,
			type: String,
		}
	},

	mounted() {
		this.getNotificationInfo()
	},

	methods: {
		async getNotificationInfo() {
			await db
	      .collection('Users')
	      .doc(localStorage.getItem('uid'))
	      .collection('Notifications')
	      .doc(this.notificationId)
	      // .get()
	      .onSnapshot((doc) => {
	      	// console.log(doc.data())
          this.notificationText = doc.data()['notificationText']
					this.userProfile = doc.data()['userProfile']
					this.targetPageId = doc.data()['targetPageId']
					this.targetText = doc.data()['targetText']
					this.type = doc.data()['type']
					this.userId = doc.data()['userId']
          this.username = doc.data()['username']
					this.isRead = doc.data()['isRead']
	      	this.notificationTime = this.convertDate(doc.data()['notificationTime'])
	      })
		},

	    convertDate(rawDate) {
	    	// console.log(rawDate)
      	var dateValue = rawDate.toDate();
	      var stringDate = new Date(rawDate.seconds * 1000);
	      return stringDate.toDateString();
	    },

	    async viewNotification() {
        // this.$refs.topProgress.start()

        db
        .collection('Users')
        .doc(localStorage.getItem('uid'))
        .collection('Notifications')
        .doc(this.notificationId)
        .update({
          'isRead': true
        })

        if(this.type == 'comment' || this.type == 'like') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "Status",
            params: {
              id: this.targetPageId,
            },
          });
        }

        if(this.type == 'subscription') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "User",
            params: {
              id: this.targetPageId,
            },
          });
        }

        if(this.type == 'mention') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "Status",
            params: {
              id: this.targetPageId,
            },
          });
        }

        if(this.type == 'commentReply') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "ReplyComment",
            params: {
              id: this.targetPageId,
            },
          });
        }

        if(this.type == 'replyMention') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "ReplyComment",
            params: {
              id: this.targetPageId,
            },
          });
        }

        if(this.type == 'repost') {
          // this.$refs.topProgress.done()
          this.$router.push({
            name: "Status",
            params: {
              id: this.targetPageId,
            },
          });
        }
	    },
	}
};
</script>
<style lang="scss">

.notification-card {
  display: flex;
  cursor: pointer;
  line-height: 1.5;
  padding: 10px;
  justify-content: space-between;
  margin: 10px 10px;
  margin-left: 10px;
  width: 100%;
  border-bottom: 1px solid #eee;
  margin-left: 0;
  margin-bottom: -10px;
  padding: 12px 15px;
  // padding-left: 34px;

  .profile-img-text {
    display: flex;
    // align-items: center;
    justify-content: flex-start;
  }

  .name {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-weight: 500;
  line-height: 17px;
  margin-bottom: 8px;
  }

  .work {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    color: #6a6a6a;
    font-size: 13px;
    max-width: 292px;
    margin-top: 5px;
  }

  .notifications-img {
    width: 50px;
    // height: 50px;
    // border-radius: 100px;
    // background: #f1f1f1;
    // margin-right: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      object-fit: cover;
    }
  }
}
</style>
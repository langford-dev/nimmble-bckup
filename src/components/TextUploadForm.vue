<template>
  <div class="upload-form">
    <div v-if="!loading">

      <div class="input-wrapper">
        <div class="label">
          <img
            class="profile-avatar"
            :src="oldProfile"
          />
          <span>What you thinkin'?</span>
        </div>
        <textarea @click="observeUserInput()" id="post-text" v-model="title"></textarea>
      </div>

      <div class="more-post-buttons">
        <div
          class="primary-btn"
          @click="sharePost()"
          style="width: 110px;"
          to="/"
        >
          <p style="font-weight: bold">Share it</p>
        </div>

        <router-link to="/share">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00acee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </router-link>

        <router-link to="/share-video">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00acee" stroke="#00acee" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
        </router-link>

        <router-link to="/new-collection">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00acee" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </router-link>
      </div>
    </div>

    <div class="mention-popup" v-if="showMentionPopUp">
      <h2 class="title">Mention people</h2>
      <input v-model="mentionTextField" placeholder="Find users to mention in your post" @input="getUsersToMention"/>

      <div class="people-container">
        <div v-for="person in mentionedUsers" key="person.id">
          <div class="user-card">
            <div class="profile-img-text" @click="mentionedUserOnclick(person.username)">
              <v-lazy-image :src="person.photoUrl"/>
              <div>
                <p class="name">
                  {{ person.name }}
                </p>
                <p class="work">
                  @{{ person.username }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="test">Hello @world from #myEnds also from https://google.com lmao</div> -->

    <!-- <div id="linkified"></div> -->

    <div class="no-tab-data" v-if="loading">
      sharing...
    </div>

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#ffffff00"
      color="#00acee"
    ></vue-topprogress>
  </div>
</template>

<script>
import * as linkify from 'linkifyjs';
import 'linkifyjs/plugins/hashtag';
import 'linkifyjs/plugins/mention';
import linkifyStr from 'linkifyjs/html';

import VLazyImage from "v-lazy-image";
import UploadForm from "@/components/UploadForm";
import BackHeader from "@/components/BackHeader";
import { vueTopprogress } from "vue-top-progress";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  data() {
    return {
      topProgressHeight: 4,
      showMentionPopUp: false,
      showHashtagPopUp: false,
      loading: false,
      oldProfile: localStorage.getItem('photoUrl'),
      title: "",
      postText: '',
      linkified: '',
      mentionTextField: '',
      allTags: [],
      mentions: [],
      mentionedUsers: [],
    }
  },

  mounted() {
    this.checkAuthState()

    window.addEventListener('load', () => {
      if(Notification.permission == 'default') Notification.requestPermission()
      
      const msgNotificationElement = new Notification('A new message', {
        body: 'This is the message body',
        icon: null,
      })

    console.log(msgNotificationElement)
    })
  },

  components: {
    VLazyImage,
    vueTopprogress,
  },

  methods: {
    observeUserInput() {
      this.showMentionPopUp = true
      // let postTextBox = document.getElementById('post-text')
      
      // postTextBox.addEventListener('keydown', event => {

      //   if(event.key == '@') {
      //     this.showMentionPopUp = true
      //   }
        
      //   if(String.fromCharCode(event.keyCode) === '@') {
      //     this.showMentionPopUp = true
      //   }

      //   else this.showMentionPopUp = false
      // })
    },

    async mentionedUserOnclick(username) {
      console.log(username)
      this.title += ` @${username}`
    },

    async getUsersToMention() {
      this.$refs.topProgress.start()
      this.mentionedUsers = []

      if(this.mentionTextField.trim() != '')
        await db
        .collection("Users")
        .where('name', '>=', this.mentionTextField.trim())
        .limit(50)
        .onSnapshot((snapshot) => {
          snapshot.forEach(async (doc) => {

            let person = doc.data()
            person.id = doc.id

            if(person.id != localStorage.getItem('uid')) this.mentionedUsers.push(person)
          })
        })

        this.$refs.topProgress.done()
    },

    async sendMentionAlerts(postId) {
      // console.log(this.mentions, this.postText)

      if(this.mentions == []) this.$refs.topProgress.done();

      else {
        for (var i = this.mentions.length; i--; ) {
          console.log(this.mentions[i]);

          if(this.mentions[i] != localStorage.getItem('uid')) {
            await db
            .collection('Users')
            .doc(this.mentions[i])
            .collection('Notifications')
            .add({
              'type': 'mention',
              'userProfile': localStorage.getItem('photoUrl'),
              'notificationText': `${localStorage.getItem('name')} mentioned you in a post`,
              'targetPageId': postId,
              'notificationTime': firebaseApp.serverTimestamp,
              'userId': localStorage.getItem('uid'),
              'username': localStorage.getItem('name'),
              'targetText': this.postText,
              'isRead': false,
            })
          }
        }
        
        setTimeout(() => {
          this.$refs.topProgress.done();
        }, 2000)
      }
    },

    checkAuthState() {
      if (localStorage.getItem("uid") == null) {
        this.$router.replace("/login").catch(() => {});
      }
    },

    async sharePost() {
      try {
        if (this.title != '') {
          this.loading = true;
          this.$refs.topProgress.start();
          this.postText = this.title

          var t = this
          const name = await localStorage.getItem("name");
          const uid = await localStorage.getItem("uid");

          linkifyStr(t.title,{
            formatHref: function (href, type) {
              if (type === 'hashtag') {
                t.allTags.push(href.substring(1))
              }
              if (type === 'mention') {
                t.mentions.push(href.substring(1))
              }
              return href;
            }
          });

          setTimeout(async () => {
            await db
            .collection("Posts")
            .add({
              'photo': null,
              'video': null,
              'thumbnail': null,
              'title': t.title,
              'posterName': name,
              'posterUid': uid,
              'posterProfilePhoto': localStorage.getItem('photoUrl'),
              'type': 'text',
              'postTime': firebaseApp.serverTimestamp,
              'tags': t.allTags,
              'mentions': t.mentions,
              'isVideo': false,
            })
            .then((val) => {
              t.updateLastPostTime()
              t.updateCoins()
              t.sendMentionAlerts(val.id)
            })
            .catch((err) => {
              t.loading = false;
              t.$refs.topProgress.done();
              alert(err.message);
            });
          }, 3000)


        } else {
          alert("C'mon write something");
        }
      }
      catch (e) {
        this.loading = false;
        this.$refs.topProgress.done();
        console.log(e.message);
        // alert(e.message);
      }
    },

    async insertIntoFirestore() {
      // console.log("original", this.originalImgUrl);
      // console.log("thumbnail", this.thumbnailUrl);
      // const tags = [this.tagOne, this.tagTwo, this.tagThree];
      
    },

    async updateLastPostTime() {
      await db
      .collection("Users")
      .doc(localStorage.getItem('uid'))
      .update({
        'lastPostTime': firebaseApp.serverTimestamp
      })
    },

    async updateCoins() {
      console.log('updating coins...')
      var coins

      await db
        .collection("Users")
        .doc(localStorage.getItem('uid'))
        .get()
        .then((doc) => {
          if(doc.data()["coins"] == null) {
            console.log('null coins', doc.data()["coins"])
            coins = 10
          } else {
            var parsedCoinsNum = parseInt(doc.data()["coins"], 10)
            coins = parsedCoinsNum + 10;
            console.log('old coins', doc.data()["coins"])
            console.log('new coins num', coins)
          }
        })
        

      await db
        .collection("Users")
        .doc(localStorage.getItem('uid'))
        .update({
          'coins': coins
        })
        .then((val) => {
          this.imgFile = null;

          this.title = ""
          this.allTags = []
          this.mentions = []
          
          // this.link = "";
          // this.tagOne = null;
          // this.tagTwo = "";
          // this.tagThree = "";
          coins = 0;

          this.loading = false;
          // this.$refs.topProgress.done();
          this.$router.replace("/");
        })
        .catch((err) => {
          this.loading = false;
          this.$refs.topProgress.done();
          console.log(err.message);
        })
    }
  },
};
</script>

<style lang="scss" scoped>
.upload-form {
  // padding: 10px;
  margin-bottom: 100px;
  max-width: 450px;
  // margin: 100px auto;
  // margin-top: 66px;
}

.people-container {}

.user-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1.5;
  padding: 10px 0;
  justify-content: space-between;

  .profile-img-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .filled {
    padding-top: 7px;
    background: #3c92f214;
    height: 36px;
    border-radius: 100px;

    p {
      color: #00acfe;
    }

    &:hover {
      background: #f1f1f1;

      p {
        color: #000;
      }
    }
  }

  &:hover {
    background: #fff;
  }

  .name {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-weight: 500;
  }

  .work {
    font-weight: 300;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }

  img {
    object-fit: cover;
    width: 60px;
    height: 60px;
    border-radius: 100px;
    background: #f1f1f1;
    margin-right: 10px;
  }
}

.more-post-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: -23px;

  a,
  div {
    margin: 8px;
  }

  svg {
    position: relative;
    top: 5px;
    // background: #00acee1c;
    padding: 0px;
    width: 21px;
    // height: 35px;
    // padding: 7px;
    // border-radius: 100%;
  }
}

.primary-btn {
  margin: 1px;
}

.no-tab-data {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.label {
  // font-size: 18px;
  margin-bottom: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  span {
    font-size: 1.2rem;
    font-family: 'bold';
    font-weight: bold;
  }

  img {
    width: 53px;
    height: 53px;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.mention-popup {
  padding: 20px;
  border: 1px solid #E6E7E7;
  border-radius: 10px;
  margin-top: 20px;
  max-height: 330px;
  overflow-y: scroll;

  input {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #E6E7E7;
    border-radius: 100px;
    width: 100%;
  }

  .title {
    margin-bottom: 0;
  }
}

.input-wrapper {
  margin-bottom: 30px;
  margin-top: 20px;
}

input[type="text"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 13px 12px;
  font-size: 17px;
  border: none;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #E6E7E7;
}

textarea {
  // border-radius: 0;
  height: 136px;
  resize: none;
}

input,
textarea {
  outline: none;
}
</style>

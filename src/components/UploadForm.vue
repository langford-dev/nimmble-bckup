<template>
  <div>
    <div class="upload-form">
      <div v-if="!loading">

        <div class="input-wrapper">
          <div>
            <img
            class="profile-avatar"
            :src="oldProfile"/>
          </div>
          <textarea @click="observeUserInput()" v-model="title" placeholder="What ya up to?"></textarea>
        </div>

        <div>
          <img v-if="imgFile != null" class="preview" :src="previewImg" />
          
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="previewImage"
            accept="image/*"/>
        </div>
        
        <div class="more-post-buttons">
          <div @click="uploadImage()" class="primary-btn" style="width: 110px;">
            <p>Done</p>
          </div>

          <div @click="click1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>

          <router-link to="/share-video">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1da1f2" stroke="#1da1f2" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
          </router-link>

          <router-link to="/new-collection">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </router-link>
        </div>

        <div class="mention-popup" v-if="showMentionPopUp">
          <h2 class="section-name">Mention people</h2>
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


        <!-- <div
          class="primary-btn"
          @click="uploadImage()"
          style="width: 110px;"
          to="/"
        >
          <p style="font-weight: bold">Share photo</p>
        </div> -->
      </div>

      <div class="no-tab-data" v-if="loading">
        uploading...
      </div>

      <div class="toast" @click="viewNewPost()">Post sent. View Post</div>

      <vue-topprogress
        ref="topProgress"
        :height="topProgressHeight"
        colorShadow="=#ffffff00"
        color="#1da1f2"
      ></vue-topprogress>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import * as linkify from 'linkifyjs';
import 'linkifyjs/plugins/hashtag';
import 'linkifyjs/plugins/mention';
import linkifyStr from 'linkifyjs/html';
import UploadForm from "@/components/UploadForm";
import BackHeader from "@/components/BackHeader";
import BottomNav from "@/components/BottomNav";
import VLazyImage from "v-lazy-image";
import imageCompression from "browser-image-compression";
import { vueTopprogress } from "vue-top-progress";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  data() {
    return {
      topProgressHeight: 4,
      previewImg: null,
      imgFile: null,
      loading: false,
      showMentionPopUp: false,
      compressedImage: null,
      thumbnail: null,
      oldProfile: localStorage.getItem('photoUrl'),
      originalImgUrl: null,
      thumbnailUrl: null,

      mentionTextField: '',
      newPostId: '',

      title: "",
      allTags: [],
      mentions: [],
      mentionedUsers: [],
    };
  },

  mounted() {
    this.checkAuthState();
  },

  components: {
    vueTopprogress,
    VLazyImage,
    BottomNav,
  },

  methods: {

    viewNewPost() {
      const toast = document.querySelector('.toast')
      toast.style.display = 'none'
      
      this.$router.push({
        name: "Status",
        params: {
          id: this.newPostId,
        },
      });
    },

    observeUserInput() {
      this.showMentionPopUp = true
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

      if(this.mentions == []) this.$refs.topProgress.done()

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
              'targetText': null,
              'isRead': false,
            })
          }
        }
      }
    },
    
    checkAuthState() {
      if (localStorage.getItem("uid") == null) {
        this.$router.replace("/login").catch(() => {});
      }
    },

    click1() {
      this.$refs.input1.click();
    },

    async previewImage(event) {
      this.imgFile = event.target.files[0];
      this.loading = true;
      this.$refs.topProgress.start();
      this.previewImg = URL.createObjectURL(this.imgFile);

      console.log(
        this.imgFile,
        `originalFile size ${this.imgFile.size / 1024 / 1024} MB`
      );

      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1440,
        useWebWorker: true,
      };

      const thumbnailOptions = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 120,
        useWebWorker: true,
      };

      try {
        if (
          this.imgFile.type == "image/png" ||
          this.imgFile.type == "image/jpg" ||
          this.imgFile.type == "image/gif" ||
          this.imgFile.type == "image/jpeg"
        ) {
          const compressedFile = await imageCompression(this.imgFile, options);
          const compressedThumbnail = await imageCompression(
            this.imgFile,
            thumbnailOptions
          );

          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          );

          console.log(
            `thumbnail size ${compressedThumbnail.size / 1024 / 1024} MB`
          );

          this.compressedImage = compressedFile;
          this.thumbnail = compressedThumbnail;
          this.loading = false;
          this.$refs.topProgress.done();
        } else alert("File not an image");
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.$refs.topProgress.done();
      }
    },

    async uploadImage() {
      try {

        if (this.imgFile != null) {

          this.loading = true;
          this.$refs.topProgress.start();
          const storageRef = firebaseApp
            .storage()
            .ref(`posts/ ${Date.now()}.jpg`);
          let task = storageRef.put(this.compressedImage);

          await task.then((data) => {
            data
            .ref.getDownloadURL()
            .then((url) => {
              this.originalImgUrl = url;
              console.log("this.originalImgUrl", this.originalImgUrl);

              this.uploadThumbnail();
            });
          });
        } else this.initInsertIntoFirestore()
      } catch (e) {
        this.loading = false;
        this.$refs.topProgress.done();
        console.log(e.message);
        alert(e.message);
      }
    },

    async uploadThumbnail() {
      try {
        const storageRef = firebaseApp
          .storage()
          .ref(`posts/ ${Date.now()}.jpg`);
        let task = storageRef.put(this.thumbnail);

        await task.then((data) => {
          data
          .ref.getDownloadURL()
          .then((url) => {
            this.thumbnailUrl = url;
            this.initInsertIntoFirestore();
          });
        });
      } catch (e) {
        this.loading = false;
        this.$refs.topProgress.done();
        console.log(e.message);
        alert(e.message);
      }
    },

    async initInsertIntoFirestore() {
      console.log(this.title)

      if(this.title != '' || this.imgFile != null) {
        const t = this
        this.loading = true;
        this.$refs.topProgress.start();


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

        this.insertIntoFirestore()
        
      } else {
        this.loading = false;
        this.$refs.topProgress.done();
        alert("c'mon write or choose a photo")
      }
    },

    async updateLastPostTime() {
      await db
      .collection("Users")
      .doc(localStorage.getItem('uid'))
      .update({
        'lastPostTime': firebaseApp.serverTimestamp
      })
    },

    async insertIntoFirestore() {
      setTimeout(async() => {
        await db
        .collection("Posts")
        .add({
          'type': 'photo',
          'photo': this.originalImgUrl,
          'video': null,
          'thumbnail': this.thumbnailUrl,
          'title': this.title,
          'posterName': localStorage.getItem("name"),
          'posterUid': localStorage.getItem("uid"),
          'postTime': firebaseApp.serverTimestamp,
          'mentions': this.mentions,
          'tags': this.allTags,
          'isVideo': false,
        })
        .then((val) => {
          this.newPostId = val.id
          this.updateLastPostTime()
          this.updateCoins()
          this.sendMentionAlerts(val.id)
        })
        .catch((err) => {
          this.loading = false;
          this.$refs.topProgress.done();
          alert(err.message);
        });
      }, 3000)
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
            coins = 30
          } else {
            var parsedCoinsNum = parseInt(doc.data()["coins"], 10)
            coins = parsedCoinsNum + 30;
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
          const toast = document.querySelector('.toast')
          toast.style.display = 'flex'

          coins = 0
          this.loading = false
          this.previewImg = null
          this.imgFile = null
          this.showMentionPopUp = false
          this.compressedImage = null
          this.thumbnail = null
          this.originalImgUrl = null
          this.thumbnailUrl = null
          this.mentionTextField = ''
          this.title = ""
          this.allTags = []
          this.mentions = []
          this.mentionedUsers = []

          setTimeout(() => {
            toast.style.display = 'none'
            this.$refs.topProgress.done()
          }, 6000)
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
  // padding-top: 10px;
  // margin-bottom: 100px;
  // max-width: 450px;
  // margin: 100px auto;
  // margin-top: 66px;
}

// select {
//   outline: none;
// }

// .img-select-btn {
//   padding: 14px;
// }

// select * {
//   background: #fff;
//   border-bottom: 2px solid grey;
// }

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
    outline: none;
  }

  .title {
    margin-bottom: 0;
  }
}

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
        color: #14171A;
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

.preview {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  max-height: 170px;
  // width: 100%;
  // height: 100%;
  // -o-object-fit: contain;
  // object-fit: contain;
  // border-radius: 20px;
  // // max-height: 400px;
  // margin-bottom: 25px;
  // margin: auto;
  // /* text-align: center; */
  // display: flex;
  // // top: -126px;
  // position: relative;
  // margin-top: -100px;
  // margin-bottom: 100px;
}

// .label {
//   font-size: 18px;
//   font-weight: normal;
//   margin-bottom: 13px;
// }

// .title {
//   margin-bottom: 13px;
//   text-align: center;
// }

.input-wrapper {
  margin-top: 20px;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
}

textarea {
  width: 100%;
  padding: 13px 12px;
  padding-top: 0;
  font-size: 17px;
  border: none;
  background: #fff;
  border-radius: 10px;
  height: 100px;
  resize: none;
  outline: none;
  padding-left: 0;
  position: relative;
  top: -21px;
  margin-left: 10px;
}

.input-wrapper ::placeholder {
  font-size: 1.35rem
}

.profile-avatar {
  width: 45px;
  height: 45px;
}

.more-post-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  a,
  div {
    margin: 8px;
  }

  svg {
    position: relative;
    top: 5px;
    padding: 0px;
    width: 21px;
  }
}
</style>

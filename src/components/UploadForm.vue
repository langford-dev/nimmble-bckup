<template>
  <div class="upload-form">
    <div v-if="!loading">
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      
      <div>
        <div v-if="imgFile != null">
          <img class="preview" height="268" width="356" :src="previewImg" />
          <br />
        </div>

        <div class="img-select-btn" @click="click1">Choose photo</div>
        <br />

        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
      </div>

      <div class="input-wrapper">
        <p class="label">Photo title</p>
        <textarea v-model="title" autofocus type="text"></textarea>
      </div>

      <div
        class="primary-btn"
        @click="uploadImage()"
        style="width: 110px;"
        to="/"
      >
        <p style="font-weight: bold">Share photo</p>
      </div>
    </div>

    <div class="no-tab-data" v-if="loading">
      uploading...
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
import UploadForm from "@/components/UploadForm";
import BackHeader from "@/components/BackHeader";
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
      compressedImage: null,
      thumbnail: null,
      randomNumber: Date.now() + Math.floor(Math.random() * 100),
      otherRandomNumber: Date.now() + Math.floor(Math.random() * 100),

      originalImgUrl: "",
      thumbnailUrl: "",

      title: "",
      allTags: [],
      mentions: [],
    };
  },

  mounted() {
    this.checkAuthState();
  },

  components: {
    vueTopprogress,
  },

  methods: {
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
              'targetText': null,
              'isRead': false,
            })
          }
        }
        this.$refs.topProgress.done();
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
            data.ref.getDownloadURL().then((url) => {
              this.originalImgUrl = url;
              console.log("this.originalImgUrl", this.originalImgUrl);

              this.uploadThumbnail();
            });
          });
        } else {
          alert("please choose a photo to upload");
        }
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
          data.ref.getDownloadURL().then((url) => {
            this.thumbnailUrl = url;
            console.log("this.thumbnailUrl", this.thumbnailUrl);

            this.insertIntoFirestore();
          });
        });
      } catch (e) {
        this.loading = false;
        this.$refs.topProgress.done();
        console.log(e.message);
        alert(e.message);
      }
    },

    async insertIntoFirestore() {
      // const tags = [this.tagOne, this.tagTwo, this.tagThree];
      const name = await localStorage.getItem("name");
      const uid = await localStorage.getItem("uid");
      const t = this

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
            'type': 'photo',
            'photo': t.originalImgUrl,
            'video': null,
            'thumbnail': t.thumbnailUrl,
            'title': t.title,
            'posterName': name,
            'posterUid': uid,
            'postTime': firebaseApp.serverTimestamp,
            'mentions': t.mentions,
            'tags': t.allTags,
            'isVideo': false,
          })
          .then((val) => {
            t.updateLastPostTime()
            t.updateCoins()
            t.sendMentionAlerts(val.id)
          })
          .catch((err) => {
            this.loading = false;
            this.$refs.topProgress.done();
            alert(err.message);
          });
        }, 3000)
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
          this.imgFile = null;

          this.title = "";
          this.link = "";
          this.tagOne = null;
          this.tagTwo = "";
          this.tagThree = "";
          coins = 0;

          this.loading = false;
          this.$refs.topProgress.done();
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
  padding: 10px;
  margin-bottom: 100px;
  max-width: 450px;
  margin: 100px auto;
  margin-top: 66px;
}

select {
  outline: none;
}

.img-select-btn {
  padding: 14px;
}

select * {
  background: #fff;
  border-bottom: 2px solid grey;
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
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 20px;
  // max-height: 400px;
  margin-bottom: 25px;
  margin: auto;
  /* text-align: center; */
  display: flex;
  // top: -126px;
  position: relative;
  margin-top: -100px;
  margin-bottom: 100px;
}

.label {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 13px;
}

.title {
  margin-bottom: 13px;
  text-align: center;
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
  border-radius: 15px;
  border: 2px solid #efefef;
}

textarea {
  border-radius: 0;
  height: 136px;
  resize: none;
  border-top: none;
  border-left: none;
  border-right: none;
}

input,
textarea {
  outline: none;
}
</style>

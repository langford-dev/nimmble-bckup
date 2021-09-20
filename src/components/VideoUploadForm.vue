<template>
  <div class="upload-form">
    <div v-if="!loading">
      <br />
      <br />
      <br />
      <div>
        <div v-if="videoFile != null">
          <video
            :src="previewVideoUrl"
            id="video-element"
            class="preview"
            preload="auto"
            controls
          ></video>

          <h3 class="size">{{ size }}Mb</h3>

          <br />

          <canvas id="canvas" style="display: none"></canvas>
          <img id="thumbnail-img" />
        </div>

        <div class="img-select-btn" @click="click1">Open video</div>
        <br />

        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="init"
          accept="video/*"
        />
      </div>

      <div class="input-wrapper">
        <p class="label">Title</p>
        <textarea autofocus v-model="title" type="text"></textarea>
      </div>

      <div
        class="primary-btn"
        @click="uploadVideo()"
        style="width: 110px;"
        to="/"
      >
        <p style="font-weight: bold">Upload</p>
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
import { getMetadata, getThumbnails } from "video-metadata-thumbnails";
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
      previewVideoUrl: null,
      videoFile: null,
      loading: false,
      compressedImage: null,
      thumbnail: null,
      randomNumber: Date.now() + Math.floor(Math.random() * 100),
      otherRandomNumber: Date.now() + Math.floor(Math.random() * 100),

      videoUrl: "",
      thumbnailUrl: "",
      size: 0,

      title: "",
      allTags: [],
      mentions: [],
    };
  },

  mounted() {
    this.checkAuthState();

    // console.log('fuu')
    var date = new Date();
    date.setDate(date.getDate() - 3);
    // console.log(date);

    
    console.log(db);
    console.log(db.Timestamp.fromDate(date).toDate());
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

    async init(event) {
      this.videoFile = event.target.files[0];
      this.size = (this.videoFile.size / 1024 / 1024).toFixed(2);
      // this.loading = true;
      this.$refs.topProgress.start();
      this.previewVideoUrl = URL.createObjectURL(this.videoFile);

      try {
        setTimeout(async () => {
          var videoElement = document.getElementById("video-element");
          var thumbnailImg = document.getElementById("thumbnail-img");

          if (this.videoFile.type != "video/mp4") {
            alert("File is not a video", this.videoFile.type);
            this.videoFile = null;
            this.previewVideoUrl = null;
            videoElement.src = null;
            this.loading = false;
            this.$refs.topProgress.done();
          }

          if (videoElement.duration > 300) {
            alert("Video is longer than 5mins", videoElement.duration);
            this.videoFile = null;
            this.previewVideoUrl = null;
            videoElement.src = null;
            this.loading = false;
            this.$refs.topProgress.done();
          }

          if (
            videoElement.duration <= 300 &&
            this.videoFile.type == "video/mp4"
          ) {
            this.previewVideoUrl = URL.createObjectURL(this.videoFile);

            const metadata = await getMetadata(this.previewVideoUrl);
            const thumbnails = await getThumbnails(this.previewVideoUrl, {
              interval: 1,
              start: 0,
              end: 0,
            });

            console.log(metadata);
            this.thumbnailUrl = thumbnails[0].blob;

            this.$refs.topProgress.done();
            this.loading = false;

            // console.log('Preview: ', thumbnails[0].blob);
            // var cvs = document.getElementById('canvas')
            // var ctx = cvs.getContext('2d')
            // var t = this

            // videoElement.addEventListener('loadeddata', function() {
            //   console.log('metadata loaded')

            //   setTimeout(() => {
            //     cvs.width = videoElement.videoWidth;
            //     cvs.height = videoElement.videoHeight;

            //   }, 1000)
            // });

            // videoElement.addEventListener('canplaythrough', function() {

            //     ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight)

            //     thumbnailImg.src = cvs.toDataURL('image/png')

            //     cvs.toBlob(function(blob){
            //       setTimeout(() => {
            //         t.thumbnailUrl = blob
            //         console.log(t.thumbnailUrl)
            //       }, 1000)

            //     }, "image/png");

            // });
          }
        }, 2000);
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.$refs.topProgress.done();
      }
    },

    async uploadThumbnail() {
      try {
        const storageRef = firebaseApp
          .storage()
          .ref(`videothumbnails/ ${Date.now()}.jpg`);
        let task = storageRef.put(this.thumbnailUrl);
        let t = this;

        await task.then((data) => {
          data.ref.getDownloadURL().then((url) => {
            t.thumbnailUrl = url;
            console.log("this.thumbnailUrl", t.thumbnailUrl);

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

    async uploadVideo() {
      if (this.videoFile != null) {
        this.loading = true;
        this.$refs.topProgress.start();

        try {
          const storageRef = firebaseApp
            .storage()
            .ref(`videos/ ${Date.now()}.mp4`);
          let task = storageRef.put(this.videoFile);
          let t = this;

          await task.then((data) => {
            data.ref.getDownloadURL().then((url) => {
              t.videoUrl = url;
              console.log("t.videoUrl", t.videoUrl);

              this.uploadThumbnail();
            });
          });
        } catch (e) {
          this.loading = false;
          this.$refs.topProgress.done();
          console.log(e.message);
          alert(e.message);
        }
      } else alert("please choose a video");
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
            'video': t.videoUrl,
            'photo': t.thumbnailUrl,
            'thumbnail': t.thumbnailUrl,
            'title': t.title,
            'posterName': name,
            'posterUid': uid,
            'postTime': firebaseApp.serverTimestamp,
            'type': "video",
            'mentions': t.mentions,
            'tags': t.allTags,
            'isVideo': true,
          })
          .then((val) => {
            t.updateLastPostTime()
            t.updateCoins();
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
      console.log("updating coins...");
      var coins;

      await db
        .collection("Users")
        .doc(localStorage.getItem("uid"))
        .get()
        .then((doc) => {
          if (doc.data()["coins"] == null) {
            coins = 50;
          } else {
            var parsedCoinsNum = parseInt(doc.data()["coins"], 10);
            coins = parsedCoinsNum + 50;
            console.log("new coins num", coins);
          }
        });

      await db
        .collection("Users")
        .doc(localStorage.getItem("uid"))
        .update({
          coins: coins,
        })
        .then((val) => {
          this.videoFile = null;
          this.loading = false;
          this.$refs.topProgress.done();
          this.title = "";
          this.link = "";
          this.tagOne = null;
          this.tagTwo = "";
          this.tagThree = "";
          coins = 0;
          this.$router.replace("/");
        })
        .catch((err) => {
          this.loading = false;
          this.$refs.topProgress.done();
          console.log(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.size {
  margin-top: -100px;
}

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

#thumbnail-img {
  width: 100%;
  border-radius: 20px;
  margin-bottom: 30px;
  display: none;
}

.descriptive-text {
  margin-top: -70px;
}

.img-select-btn {
  padding: 14px;
  margin: 0;
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
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 20px;
  // max-height: 400px;
  margin-bottom: 25px;
  margin: auto;
  /* text-align: center; */
  display: flex;
  top: -126px;
  position: relative;
  margin-top: 120px;
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

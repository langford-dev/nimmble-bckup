<template>
  <div class="repost-main-page">
    <BackHeader name="Repost" />
    <div class="repost-page">
      <br>
      <br>
      <div class="input-wrapper">

        <img
          class="profile-avatar"
          :src="oldProfile"
        />
        <!-- <div class="label"> -->
          <!-- Add a comment -->
        <!-- </div> -->
        <!-- <br> -->
        <textarea id="post-text" v-model="commentTitle" placeholder="Add a comment"></textarea>
      </div>
      
      <div class="new-post">
        <div class="top-bar">
          <img
            class="poster-image"
            :src="posterProfilePhoto"
          />
        
          <p class="poster-name">{{ posterName }}</p>
        </div>

        <p>{{title}}</p>
        <br>
        <v-lazy-image
          v-if="photo != null"
          class="post-image"
          :src="photo"
          :alt="title"
          :src-placeholder="thumbnail"
        />
      </div>

      <br>
      <div @click="repost()" class="primary-btn">
        <p>Repost</p>
      </div>
    </div>

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#00acee"
      color="#00acee"
    ></vue-topprogress>
  </div>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";
import VLazyImage from "v-lazy-image";
import BackHeader from "@/components/BackHeader";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Home",

  data() {
    return {
      photo: null,
      thumbnail: null,
      title: '',
      commentTitle: '',
      posterName: '',
      posterUid: '',
      posterProfilePhoto: null,
      type: '',
      postTime: null,
      tags: [],
      mentions: [],
      postId: '',
      video: null,
      isVideo: null,
      
      isRepost: '',
      originalPostId: '',
      originalPosterUid: '',
      topProgressHeight: 4,


      isVerified: null,
      oldProfile: localStorage.getItem('photoUrl'),
    };
  },

  mounted() {
    this.getPostInfo()
  },

  watch: {
    $route(to, from) {
      if(to['name'] == 'Repost') this.getPostInfo()
    },
  },

  components: {
    vueTopprogress,
    VLazyImage,
    BackHeader,
  },

  methods: {
    async getPostInfo() {
      await db
      .collection("Posts")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.photo = doc.data()['photo']
        this.thumbnail = doc.data()['thumbnail']
        this.title = doc.data()['title']
        // this.posterName = doc.data()['posterName']
        this.posterUid = doc.data()['posterUid']
        this.type = doc.data()['type']
        this.video = doc.data()['video']
        this.isVideo = doc.data()['isVideo']
        this.postTime = doc.data()['postTime']
        this.isRepost = doc.data()['isRepost']
        this.originalPostId = doc.data()['originalPostId']
        this.originalPosterUid = doc.data()['originalPosterUid']
        // this.tags = doc.data()['tags']
        // this.mentions = doc.data()['mentions']

        this.getPosterInfo()
        // if(this.isRepost) this.getOriginalPosterInfo()
      });
    },

    // Baby pluto langford 1

    async getPosterInfo() {
      await db
        .collection("Users")
        .doc(this.posterUid)
        .onSnapshot((doc) => {
          this.posterName = doc.data()["name"];
          this.posterProfilePhoto = doc.data()["photoUrl"];
          this.isVerified = doc.data()["verified"];
        });
    },

    // async getOriginalPosterInfo() {
    //   await db
    //     .collection("Users")
    //     .doc(this.originalPosterUid)
    //     .onSnapshot((doc) => {
    //       this.posterName = doc.data()["name"];
    //       this.posterProfilePhoto = doc.data()["photoUrl"];
    //       this.isVerified = doc.data()["verified"];
    //     });
    // },

    async repost() {
      this.$refs.topProgress.start()

      if(this.isRepost) {
        console.log('old repost', this.commentTitle)
        
        await db
        .collection("Posts")
        .add({
          'photo': this.photo,
          'thumbnail': this.thumbnail,
          'title': this.commentTitle,
          'posterName': localStorage.getItem('name'),
          'posterUid': localStorage.getItem('uid'),
          'type': this.type,
          'postTime': firebaseApp.serverTimestamp,
          'tags': this.tags,
          'mentions': this.mentions,
          'isVideo': this.isVideo,
          // 'video': this.video,

          'originalPosterUid': this.originalPosterUid,
          'originalPosterName': this.originalPosterName,
          'originalPostTitle': this.originalPostTitle,
          'originalPostId': this.originalPostId,
          'isRepost': true,
          'postId': this.$route.params.id,
        })
        .then((val) => {
          this.$refs.topProgress.done()
          alert('Reposted......');
          this.$router.back()
        })
      } else {
        console.log('new repost', this.commentTitle)

        await db
        .collection("Posts")
        .add({
          'photo': this.photo,
          'thumbnail': this.thumbnail,
          'title': this.commentTitle,
          'posterName': localStorage.getItem('name'),
          'posterUid': localStorage.getItem('uid'),
          'type': this.type,
          'postTime': firebaseApp.serverTimestamp,
          'tags': this.tags,
          'mentions': this.mentions,
          'isVideo': this.isVideo,
          // 'video': this.video,

          'originalPosterUid': this.posterUid,
          'originalPosterName': this.posterName,
          'originalPostTitle': this.title,
          'originalPostId': this.$route.params.id,
          'isRepost': true,
          'postId': this.$route.params.id,
        })
        .then((val) => {
          this.$refs.topProgress.done()
          alert('Reposted......');
          this.$router.back()
        })
      }
    },
  }
};
</script>

<style lang="scss" scoped>

.post-image {
  min-height: 130px;
  max-height: 280px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: gainsboro;
  border-radius: 13px;
}

.poster-image {
  width: 30px;
  height: 30px;
  background: gainsboro;
  border-radius: 100px;
  object-fit: cover;
  margin-right: 8px;
}

.poster-name {
  font-weight: bold;
  font-family: 'bold';
}

.repost-page {
  padding: 15px;
}

.input-wrapper {
  margin-bottom: 20px;
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 13px 12px;
  font-size: 17px;
  border: none;
  background: #fff;
  border-radius: 10px;
  height: 100px;
  resize: none;
  outline: none;
  padding-left: 0;
}

.new-post {
  padding: 10px;
  border: 1px solid #E6E7E7;
  border-radius: 20px;
  padding-top: 15px;

  .top-bar {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start
  }
}

::placeholder {
  font-size: 1.5rem
}

.repost-main-page {
  margin-bottom: 100px
}

.primary-btn {
  margin: 0;
}
</style>

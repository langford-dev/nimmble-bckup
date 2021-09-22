<template>
  <div class="repost-main-page">
    <BackHeader name="Repost" />
    
    <div class="repost-page">
      <div class="input-wrapper">
        <div>
          <img
          class="profile-avatar"
          :src="oldProfile"/>
        </div>
        <textarea id="post-text" v-model="commentTitle" placeholder="Add a comment"></textarea>
      </div>
      
      <div class="new-post">
        <div class="top-bar">
          <img
            class="poster-image"
            :src="posterProfilePhoto"/>
          <p class="poster-name">{{ posterName }}</p>
        </div>

        <p class="post-title">{{title}}</p>
        <v-lazy-image
          v-if="photo != null"
          class="repost-post-image"
          :src="photo"
          :alt="title"
          :src-placeholder="thumbnail" />
      </div>

      <br>
      <div @click="repost()" class="primary-btn">
        <p>Repost</p>
      </div>
    </div>

    <div class="toast" @click="viewNewPost()">Sent. Tap to view post</div>
    
    <BottomNav />

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#1da1f2"
      color="#1da1f2"
    ></vue-topprogress>
  </div>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";
import VLazyImage from "v-lazy-image";
import BackHeader from "@/components/BackHeader";
import BottomNav from "@/components/BottomNav";
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
      isRepost: '',
      video: null,
      newRepostPostId: '',

      topProgressHeight: 4,


      isVerified: null,
      oldProfile: localStorage.getItem('photoUrl'),
    };
  },

  mounted() {
    this.getPostInfo()
  },

  components: {
    vueTopprogress,
    VLazyImage,
    BackHeader,
    BottomNav,
  },

  methods: {

    viewNewPost() {
      const toast = document.querySelector('.toast')
      toast.style.display = 'none'
      
      this.$router.push({
        name: "Status",
        params: {
          id: this.newRepostPostId,
        },
      });
    },

    async getPostInfo() {
      await db
      .collection("Posts")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        console.log(doc.data()['video'])
        console.log(doc.data()['photo'])

        this.photo = doc.data()['photo']
        this.video = doc.data()['video']
        this.thumbnail = doc.data()['thumbnail']
        this.title = doc.data()['title']
        // this.posterName = doc.data()['posterName']
        this.posterUid = doc.data()['posterUid']
        this.type = doc.data()['type']
        this.postTime = doc.data()['postTime']
        this.isRepost = doc.data()['isRepost']
        // this.tags = doc.data()['tags']
        // this.mentions = doc.data()['mentions']
        this.originalPhoto = doc.data()['originalPhoto']
        this.originalVideo = doc.data()['originalVideo']

        this.getPosterInfo()
      });
    },

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

    async repost() {

      this.$refs.topProgress.start()
      

      if(this.isRepost) {
        await db
        .collection("Posts")
        .add({
          'photo': this.photo,
          'video': this.video,
          'thumbnail': this.thumbnail,
          'title': this.commentTitle,
          'posterName': localStorage.getItem('name'),
          'posterUid': localStorage.getItem('uid'),
          'type': this.type,
          'postTime': firebaseApp.serverTimestamp,
          'tags': this.tags,
          'mentions': this.mentions,
          'isVideo': false,

          'originalPosterUid': this.posterUid,
          'originalPhoto': this.originalPhoto,
          'originalVideo': this.originalVideo,
          'originalPosterName': this.posterName,
          'originalPostTitle': this.title,
          'originalPostId': this.$route.params.id,
          'isRepost': true,
          'postId': this.$route.params.id,
        })
        .then((val) => {
          this.newRepostPostId = val.id
          this.commentTitle = ''
          this.updateRepostDocs()
        })
      } else {
        await db
        .collection("Posts")
        .add({
          'photo': this.photo,
          'video': this.video,
          'thumbnail': this.thumbnail,
          'title': this.commentTitle,
          'posterName': localStorage.getItem('name'),
          'posterUid': localStorage.getItem('uid'),
          'type': this.type,
          'postTime': firebaseApp.serverTimestamp,
          'tags': this.tags,
          'mentions': this.mentions,
          'isVideo': false,

          'originalPosterUid': this.posterUid,
          'originalPhoto': this.photo,
          'originalVideo': this.video,
          'originalPosterName': this.posterName,
          'originalPostTitle': this.title,
          'originalPostId': this.$route.params.id,
          'isRepost': true,
          'postId': this.$route.params.id,
        })
        .then((val) => {
          this.newRepostPostId = val.id
          this.commentTitle = ''
          this.updateRepostDocs()

          
        })
      }
    },

    async updateRepostDocs() {
      const toast = document.querySelector('.toast')
      toast.style.display = 'flex'
      
      await db
      .collection("Posts")
      .doc(this.$route.params.id)
      .collection("Reposts")
      .doc(localStorage.getItem("uid"))
      .get()
      .then(doc => {
        console.log(doc.exists)

        if(doc.exists) {
          setTimeout(() => {
            toast.style.display = 'none'
            this.$refs.topProgress.done()
          }, 6000)
        }

        if(!doc.exists) {
          this.addMyDoc()
        }
      })
    },

    async addMyDoc() {
      await db
      .collection("Posts")
      .doc(this.$route.params.id)
      .collection("Reposts")
      .doc(localStorage.getItem("uid"))
      .set({
        liked: true,
        userId: localStorage.getItem("uid"),
      });

      this.sendRepostAlert()
    },

    async sendRepostAlert() {
      const toast = document.querySelector('.toast')
      toast.style.display = 'flex'

      if(this.posterUid != localStorage.getItem('uid')) {
        await db
        .collection('Users')
        .doc(this.posterUid)
        .collection('Notifications')
        .add({
          'type': 'repost',
          'userProfile': localStorage.getItem('photoUrl'),
          'notificationText': `${localStorage.getItem('name')} reposted your post`,
          'targetPageId': this.newRepostPostId,
          'notificationTime': firebaseApp.serverTimestamp,
          'userId': localStorage.getItem('uid'),
          'username': localStorage.getItem('name'),
          'targetText': this.commentTitle,
          'isRead': false,
        })
      }
          
      
      setTimeout(() => {
        toast.style.display = 'none'
        this.$refs.topProgress.done()
      }, 6000)
    },
  }
};
</script>

<style lang="scss" scoped>

.repost-post-image {
  min-height: 130px;
  max-height: 280px;
  width: 110%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #AAB8C2;
  border-radius: 13px;
  margin-top: 0;
  margin-left: -10px;
  margin-bottom: -14px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 1px solid #E6E7E7;
}

.poster-image {
  width: 30px;
  height: 30px;
  background: #AAB8C2;
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

.profile-avatar {
  width: 45px;
  height: 45px;
}

.post-title {
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.new-post {
  padding: 10px;
  border: 1px solid #E6E7E7;
  border-radius: 20px;
  padding-top: 15px;
  overflow: hidden;

  .top-bar {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start
  }
}

::placeholder {
  font-size: 1.35rem
}

.repost-main-page {
  margin-bottom: 100px;
  margin-top: 30px
}

.primary-btn {
  margin: 0;
}
</style>

<template>
  <div class="tag-screen">
    <header>
      <div class="header-wrapper">
        <div class="left center-div">
          <div class="logo-container" @click="goBack()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              stroke="#313131"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>

          <div class="logo">
            <p>#{{ tagName }}</p>
          </div>
        </div>

        <div class="right center-div">
          <router-link to="/explore" style="margin: 20px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </router-link>

          <router-link to="/alerts" class="with-badge">
            <div class="badge"></div>
            <svg
              id="bottom-nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </header>

    <!-- <div class="main"> -->
    <!-- <p class="title">#{{ tagName }}</p> -->
    <!-- <p class="tagNum" v-if='photosNum == 1'>{{ photosNum }} photo</p>
    <p class="tagNum" v-if='photosNum > 1'>{{ photosNum }} photos</p> -->

    <!-- <div class="grid-container">
      <PostContentCard
        v-for="photo in photos"
        :key="photo.id"
        :photo-url="photo.photo"
        :title="photo.title"
        :id="photo.id"
        :posterId="photo.posterUid"
        :thumbnail="photo.thumbnail"
        :type="photo.type"
        :video="photo.video"
      />
    </div> -->

    <div class="post-content-wrapper">
      <PostContentCard
        v-for="photo in photos"
        :key="photo.id"
        class="post-item"
        :photo-url="photo.photo"
        :title="photo.title"
        :id="photo.id"
        :posterId="photo.posterUid"
        :thumbnail="photo.thumbnail"
        :type="photo.type"
        :video="photo.video"
        :tags="photo.tags"
        :date="photo.postTime"
        :mentions="photo.mentions"
      />
    </div>

    <div class="not-found" v-if="photoNotFound">
      Found 0 results for '{{ tagName }}'
    </div>

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#ffffff00"
      color="#1da1f2"
    ></vue-topprogress>
    <!-- </div> -->

    <BottomNav />

    <!-- <div v-if="scrollUp" class="scrollHidden bottomNav"></div> -->
  </div>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";
import BackHeader from "@/components/BackHeader";
import BottomNav from "@/components/BottomNav";
import PostContentCard from "@/components/PostContentCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      photos: [],
      loading: false,
      scrollUp: true,
      topProgressHeight: 4,
      tagName: this.$route.params.tag,
      photosNum: 0,
      photoNotFound: false,
    };
  },

  components: {
    PostContentCard,
    BottomNav,
    BackHeader,
    vueTopprogress,
  },

  // watch: {
  //   $route(to, from) {
  //     this.$refs.topProgress.start();
  //     this.showTagPhotos();
  //   },
  // },

  mounted() {
    this.$refs.topProgress.start();
    this.showTagPhotos();
  },

  methods: {
    showTagPhotos() {
      this.loading = true;
      // this.$refs.topProgress.start();

      db.collection("Posts")
        .where("tags", "array-contains", this.$route.params.tag)
        // .get()
        .onSnapshot((snapshot) => {
          this.photosNum = snapshot.docs.length;
          this.photos = [];

          if (snapshot.docs.length <= 0) {
            this.photoNotFound = true;
            this.loading = false;
          }

          snapshot.forEach((doc) => {
            let photo = doc.data();
            photo.id = doc.id;

            this.photos.push(photo);
          });

          setTimeout(() => {
            this.loading = false;
            this.$refs.topProgress.done();
          }, 10000);
        });
      // .catch((err) => {
      //   alert(err.message);
      //   console.log(err.message);
      // });
    },

    goBack() {
      this.isSearching = false;
      window.history.back();
      // this.$router.back()
    },
  },
};
</script>

<style lang="scss" scoped>
.center-div {
  display: flex;
  align-items: center;
}

.post-content-wrapper {
  margin-top: 72px;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 10px;

  p {
    font-weight: 500;
    font-size: 1.35rem;
    font-weight: bold;
  }
}

.profile-avatar {
  height: 32px;
  width: 32px;
  object-fit: cover;
  background: gainsboro;
  margin-right: 10px;
}

.tagNum {
  margin-bottom: 77px;
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 4px;
}

.grid-container {
  padding: 10px;
  margin-top: 20px;
}

.title {
  text-align: center;
  margin: 0;
  margin-top: 82.6px;
}

@media screen and (min-width: 320px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: block;
  }

  .title {
    font-size: 3rem;
  }

  .mobile,
  .bottomNav {
    display: none;
  }
}
</style>

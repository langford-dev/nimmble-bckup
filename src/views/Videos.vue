<template>
  <div class="home">
    <BottomNav />

    <div class="desktop">
      <MainHeader />
    </div>

    <div class="mobile" v-if="scrollUp">
      <!-- <div class="home-header">
        <div class="home-header-wrapper">
          <img
            @click="viewMyAccount()"
            class="profile-avatar"
            :src="oldProfile"
            v-if="hasAccount"
          />

          <router-link to="/explore" class="fake-search-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="24"
              viewBox="0 0 24 23"
              fill="none"
              stroke="#acacac"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <p>Explore pics, videos ...</p>
          </router-link>

          <router-link to="/alerts">
            <svg
              id="bottom-nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#4d4d4d"
              stroke="#4d4d4d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-message-circle"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              ></path>
            </svg>
          </router-link>
        </div>
      </div> -->

      <div class="tab-bar" v-if="scrollUp">
        <router-link to="/videos" class="active-tab-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
            />
          </svg>

          <span>Videos</span>
        </router-link>

        <router-link to="/">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z"/></svg> -->

          <span>Photos</span>
        </router-link>

        <router-link to="/friends">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"
            />
          </svg>

          <span>Friends</span>
        </router-link>
      </div>
    </div>

    <main>
      <div class="grid-container">
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
    </main>
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import $ from "jquery";
import Masonry from "masonry-layout";
import BottomNav from "@/components/BottomNav";
import MainHeader from "@/components/MainHeader";
import PostContentCard from "@/components/PostContentCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  name: "Videos",

  data() {
    return {
      photos: [],
      loading: true,
      scrollUp: true,
      oldProfile: null,
      hasAccount: false,

      swipeable: true,
    };
  },

  mounted() {
    this.checkAuthState();
    this.loadPhotos();
  },

  components: {
    BottomNav,
    MainHeader,
    PostContentCard,
    Skeleton,
  },

  methods: {
    viewMyAccount() {
      this.$router.push({
        name: "User",
        params: {
          id: localStorage.getItem("uid"),
        },
      });
    },

    tabChange(e, index) {
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
      }
    },

    // setUI() {
    //   let grid = document.querySelector(".gridLayout");
    //   let gridItem = document.querySelectorAll(".gridItem");
    //   console.log("grid", grid);

    //   this.msnry = new Masonry(grid, {
    //     columnWidth: 27,
    //     // itemSelector: gridItem,
    //   });
    //   console.log("msnry", this.msnry);
    // },

    // setBg() {},

    checkAuthState() {
      const user = firebase.auth().currentUser;
      if (
        localStorage.getItem("uid") == null &&
        localStorage.getItem("photoUrl") == null &&
        localStorage.getItem("name") == null &&
        user == null
      ) {
        this.$router.replace("/login").catch(() => {});
      } else {
        this.oldProfile = localStorage.getItem("photoUrl");
        this.hasAccount = true;
      }
    },

    loadPhotos() {
      const followingArray = JSON.parse(localStorage.getItem("following"));
      const clickTagsArray = JSON.parse(localStorage.getItem("clickTags"));
      const clickAndFollowingTags = followingArray.concat(clickTagsArray);

      // console.log(clickAndFollowingTags);

      db.collection("Posts")
        .where("tags", "array-contains-any", clickAndFollowingTags)
        .where("type", "==", "video")
        .orderBy("postTime", "desc")
        // .limit(10)
        .onSnapshot((snapshot) => {
          this.photos = [];
          snapshot.forEach((doc) => {
            let photo = doc.data();
            photo.id = doc.id;
            this.photos.push(photo);
          });

          setTimeout(() => {
            this.loading = false;
          }, 2000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-tablist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #fffffffa;
  justify-content: space-around;
  padding-bottom: 13px;
}

.profile-avatar {
  background: gainsboro;
  margin: 0;
  width: 40px;
  height: 40px;
}

// .photoCard {
//   width: 47%;
//   margin-bottom: 20px;

//   img {
//     width: 100%;
//     border-radius: 17px
//   }
// }

.shimmer-loader {
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
  display: inline-block;
  line-height: 1;
  min-width: 100%;
  border-radius: 20px;
  height: 213px;

  margin-right: 11px;
  margin-bottom: 11px;
}

.shimmer-loader-wrapper {
}

.fake-search-box p {
  font-size: 15px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}

// .slide-enter-active, .slide-leave-active {
//    transition: 300ms;
//   }

//  .slide-enter-to{
//     position: relative;
//     left: 0;
//  }

//  .slide-leave{
//     position: absolute;
//   }

//  .slide-enter,  {
//     left: -50vw;
//     position: absolute;
//   }

//  .slide-leave-to {
//     right: -100vw;
//  }

main {
  max-width: 1810px;
  margin: 0 auto;
  // margin-top: 110px;
  margin-bottom: 50px;
  position: relative;
  // padding: 0;
  margin-top: 121px;

  // margin-top: 85px;
}

.grid-container {
  column-count: 2;

  .post-item {
    margin-bottom: 20px;
  }
}

// .layout-wrapper {
// }

@media (min-width: 380px) {
  .posts-container {
    margin-top: -20px;
  }

  .desktop {
    display: none;
  }

  .grid-container {
    // top: 0;
    margin-top: -50px;
  }

  // .gridLayout {
  //   margin: 0;
  //   width: 95vw;
  // }

  // .photoCard {
  //   width: 43%;
  // }
}

@media (min-width: 1160px) {
  main {
    margin-top: 110px;
  }

  .desktop {
    display: block;
  }

  // .vue-tablist {
  //   top: 61px
  // }

  .grid-container {
    // position: relative;
    top: 10px;
  }

  // .photoCard {
  //   width: 280px;
  //   margin-bottom: 30px;
  // }

  // .gridLayout {
  //   width: fit-content;
  //   left: 120px;
  // }
}

@media (min-width: 1160px) {
  main {
    margin-top: 110px;
  }
}
</style>

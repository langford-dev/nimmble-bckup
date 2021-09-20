<template>
  <div class="home">
    <BottomNav />

    <div class="desktop">
      <MainHeader />
    </div>

    <div class="mobile" v-if='scrollUp'>
      <div class="home-header">
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
              fill="#000"
              stroke="#000"
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
      </div>

      <TabBar />
    </div>

    <main>
      <div class="grid-container">
        <PostCard
          v-for="photo in photos"
          :key="photo.id"
          class="gridItem"
          :photo-url="photo.photo"
          :title="photo.title"
          :id="photo.id"
          :posterId="photo.posterUid"
          :thumbnail="photo.thumbnail"
          :type="photo.type"
          :video="photo.video"
        />
      </div>

      <!--       <div v-if='!loading' class="grid-container">
        <div style="width: auto" v-for="photo in photos" :key='photo.id'>
          <PostCard
            :photo-url="photo.photo"
            :title="photo.title"
            :id="photo.id"
            :posterId="photo.posterUid"
          />
        </div>+
      </div> -->

      <!--       <div class="layout-wrapper">
        <div class="gridLayout">
          <div class="photoCard" style="left: 100px" v-for="photo in photos">
            <img :src="photo.photo">
            <b>{{photo.title}}</b>
          </div>
        </div>
      </div> -->

      <!-- <tabs :onSelect="tabChange">
          <tab title="All">
              <br>
              <PostCard
                v-for="photo in photos"
                :key="photo.id"
                class="gridItem"
                :photo-url="photo.photo"
                :title="photo.title"
                :id="photo.id"
                :posterId="photo.posterUid"
                :thumbnail="photo.thumbnail"
              />
          </tab>

          <tab title="Videos">
            <br>
            <br>
            <div class="no-tab-data">
              fetching...
            </div>
          </tab>

          <tab title="Photos">
              <br>
              <PostCard
                v-for="photo in photos"
                :key="photo.id"
                class="gridItem"
                :photo-url="photo.photo"
                :title="photo.title"
                :id="photo.id"
                :posterId="photo.posterUid"
                :thumbnail="photo.thumbnail"
              />
          </tab>

          <tab title="Music">
            <br>
            <br>
            <div class="no-tab-data">
              fetching...
            </div>
          </tab>
        </tabs> -->

      <!-- 
        <md-tabs class="md-transparent" :md-swipeable="swipeable" md-alignment="fixed">
          <md-tab id="tab-home" md-label="All"> dkagd iuahdpoiqwj </md-tab>
          <md-tab id="tab-pages" md-label="Videos"> dkagd iuahdpoiqwj </md-tab>
          <md-tab id="tab-favorites" md-label="Music"> dkagd iuahdpoiqwj </md-tab>
        </md-tabs> -->

      <!-- 
      
 -->
      <!--       <div class="gridLayout">
        <div style="width: 200px; height: 80px; background: red; margin: 10px" class="gridItem">1</div>
        <div style="width: 200px; height: 40px; background: red; margin: 10px" class="gridItem">2</div>
        <div style="width: 200px; height: 80px; background: red; margin: 10px" class="gridItem">3</div>
        <div style="width: 200px; height: 30px; background: red; margin: 10px" class="gridItem">4</div>
        <div style="width: 200px; height: 80px; background: red; margin: 10px" class="gridItem">5</div>        <div style="width: 200px; height: 80px; background: red; margin: 10px" class="gridItem">1</div>

      </div> -->

      <!--  <isotope v-if='!loading' :list='photos'>
        <div v-for="photo in photos" :key='photo.id'>
          <PostCard
            :photo-url="photo.photo"
            :title="photo.title"
            :id="photo.id"
            :posterId="photo.posterUid"
          />
        </div>
      </isotope> -->

      <!-- <div v-i='loading' class="grid-container shimmer-loader-wrapper" v-if="loading">
        <Skeleton class="shimmer-loader" />
        <Skeleton class="shimmer-loader" />
        <Skeleton class="shimmer-loader" />
      </div> -->

      <!--  <div class="loading-more">
          <div class="big-spin">
            <div class="small-spin"></div>
          </div>
        </div> -->
    </main>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
import { Skeleton } from "vue-loading-skeleton"
import $ from "jquery"
import Masonry from "masonry-layout"
import BottomNav from "@/components/BottomNav"
import MainHeader from "@/components/MainHeader"
import PostCard from "@/components/PostCard"
import firebase from "../firebaseConfig.js"
const db = firebase.firestore()

export default {
  name: "Home",

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
    this.checkAuthState()
  },

  components: {
    BottomNav,
    MainHeader,
    PostCard,
    Skeleton,
    TabBar,
  },

  methods: {
    viewMyAccount() {
      this.$router.push({
        name: "User",
        params: {
          id: localStorage.getItem('uid'),
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
        this.loadPhotos()
      }
    },

    loadPhotos() {
      const followingArray = JSON.parse(localStorage.getItem("following"));
      const clickTagsArray = JSON.parse(localStorage.getItem("clickTags"));
      const clickAndFollowingTags = followingArray.concat(clickTagsArray);

      // console.log(clickAndFollowingTags);

      db.collection("Posts")
        .where("tags", "array-contains-any", clickAndFollowingTags)
        .orderBy("postTime", "desc")
        // .limit(5)
        // .onSnapshot()
        .onSnapshot((snapshot) => {
          this.photos = [];
          snapshot.forEach((doc) => {
            let photo = doc.data();
            photo.id = doc.id;
            
            if(doc.data()['type'] != 'video') {
              this.photos.push(photo);
            }
          });

          setTimeout(() => {
            this.loading = false;
          }, 2000);

          // setTimeout(() => {
          //   this.setUI()
          // }, 2000)
        });
      // .catch((err) => {
      //   alert(err.message);
      //   console.log(err.message);
      // });
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
  padding: 0 10px;
  margin-top: 121px;

  // margin-top: 85px;
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














<template>
  <!-- <div v-if='scrollUp' class="bottom-nav-wrapper"> -->
  <div class="bottom-nav-wrapper">
   <div class="bottom-nav-icons">
      <router-link to="/">
        <!-- <svg width="27px" height="27px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="homeAlt2IconTitle" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"> <title id="homeAlt2IconTitle">Home</title> <path d="M2 12L5 9.3M22 12L19 9.3M19 9.3L12 3L5 9.3M19 9.3V21H5V9.3"/> </svg> -->

        <!-- <svg width="27" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z" fill="currentColor" /></svg> -->

        <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="homeAlt2IconTitle" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"> <title id="homeAlt2IconTitle">Home</title> <path d="M2 12L5 9.3M22 12L19 9.3M19 9.3L12 3L5 9.3M19 9.3V21H5V9.3"/> </svg>
      </router-link>

      <router-link to='/friends'>
        <!-- <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="personAddIconTitle" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"> <title id="personAddIconTitle">Add user</title> <path d="M1 18C1 15.75 4 15.75 5.5 14.25C6.25 13.5 4 13.5 4 9.75C4 7.25025 4.99975 6 7 6C9.00025 6 10 7.25025 10 9.75C10 13.5 7.75 13.5 8.5 14.25C10 15.75 13 15.75 13 18"/> <path d="M22 11H14"/> <path d="M18 7V15"/> </svg> -->

        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" width="26" height="26" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </router-link>

      <router-link to="/explore">
        <svg id='bottom-nav-icon'
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </router-link>

       <router-link to="/alerts" class='with-badge'>
        <div class="badge"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      </router-link>
<!-- 
      <router-link to="/alerts" class='with-badge'>
        <div class="badge"></div>
        <svg id='bottom-nav-icon'
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
      </router-link> -->

      <!-- <div @click="goToMyAccount()">
        <img class="profile-avatar" :src="oldProfile" v-if="hasAccount" />
        <img
          class="profile-avatar"
          src="@/assets/user-avatar.png"
          v-if="!hasAccount"
        />
      </div> -->
   </div>

   <div class="dialog-sheet" v-if="showCreateDialog">
      <h1 class="closeDialogBtn" @click="showCreateDialog = false">&times;</h1>



      <router-link to="/share">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

        Share a photo
      </router-link>

      <router-link to="/share-text">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

        Write something
      </router-link>

      <router-link to="/share-video">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>

        Upload a video
      </router-link>

      <router-link to="/new-collection">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 
        
        New list
      </router-link>

      <!-- <router-link to="/ad">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path></svg> 
        
        Create an Ad
      </router-link> -->
    </div>



    <router-link to="/share-text">
      <svg v-if='hasAccount' @click="showCreateDialog = true"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="fab feather feather-plus"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </router-link>
  </div>
</template>

<script>
import firebase from "../firebaseConfig.js";

export default {
  name: "BottomNav",

  data() {
    return {
      oldProfile: null,
      hasAccount: false,
      scrollUp: true,
      showCreateDialog: false,
    };
  },

  mounted() {
    this.checkSigned()
    this.checkScroll()
  },

  methods: {
    checkSigned() {
      const user = firebase.auth().currentUser

      if (localStorage.getItem("uid") == null &&
        localStorage.getItem("photoUrl") == null &&
        localStorage.getItem("name") == null &&
        user == null) {
        this.hasAccount = false;
      } else {
        this.oldProfile = localStorage.getItem("photoUrl");
        this.hasAccount = true;
      }
    },

    // goToMyAccount() {
    //   if (!this.hasAccount) {
    //     this.$router.push("/login");
    //   } else {
    //     this.$router.replace({
    //       name: "User",
    //       params: {
    //         id: localStorage.getItem("uid"),
    //       },
    //     });
    //   }
    // },

    checkScroll() {
      const body = document.body

      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      let lastScroll = 50;

      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          body.classList.remove(scrollUp);
          return;
        }

        if (
          currentScroll > lastScroll &&
          !body.classList.contains(scrollDown)
        ) {
          // down
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);

          this.scrollUp = false;
          console.log("scrolled up");
        } else if (
          currentScroll < lastScroll &&
          body.classList.contains(scrollDown)
        ) {
          // up
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);

          this.scrollUp = true;
          console.log("scrolled down");
        }
        lastScroll = currentScroll;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-avatar {
  height: 32px;
  width: 32px;
  background: gainsboro;
  margin-right: 0;
}

.bottom-nav-wrapper a {
  position: relative;
}

.fab {
  box-shadow: -2px 10px 16px 0px #00000054;
  background: #2196F3;
  width: 51px;
  height: 51px;
  padding: 10px;
  border-radius: 100px;
  margin: 0;
  position: absolute;
  top: -71px;
  margin: auto;
  cursor: pointer;
  right: 20px;
}
</style>

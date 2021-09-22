<template>
  <div class="home">
    <BottomNav />

    <header>
      <div class="header-wrapper">
        <div class="left center-div">
          <div @click="goToMyAccount()">
            <img class="profile-avatar" :src="oldProfile" v-if="hasAccount" />
            <img
              class="profile-avatar"
              src="@/assets/user-avatar.png"
              v-if="!hasAccount"
            />
          </div>
          <!-- <p>Nimmble 💫</p> -->
        </div>

        <div class="logo" style="text-align: center">
          <p>Nimmble 💫</p>
        </div>

        <div class="right center-div" style="margin-right: 15px">
          <router-link to="/" class='with-badge'>
            <div class="badge" v-if="messagesNum > 0">{{messagesNum}}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </router-link>
        </div>
      </div>
    </header>

    <Fab />

    <div class="post-content-wrapper">
      <PostContentCard
        v-for="photo in posts"
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
  </div>
</template>

<script>
import Fab from '@/components/Fab'
import { Skeleton } from "vue-loading-skeleton";
import $ from "jquery";
import Masonry from "masonry-layout";
import BottomNav from "@/components/BottomNav";
import MainHeader from "@/components/MainHeader";
import PostContentCard from "@/components/PostContentCard";

// import * as firebase from 'firebase'
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Home",

  data() {
    return {
      posts: [],
      following: [],

      loading: true,
      scrollUp: true,
      oldProfile: null,
      hasAccount: false,

      messagesNum: 0,

      // swipeable: true,
    };
  },

  mounted() {
    this.checkAuthState();
    this.checkStorageValueChange();
  },

  components: {
    BottomNav,
    MainHeader,
    PostContentCard,
    Skeleton,
    Fab,
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

    goToMyAccount() {
      if (!this.hasAccount) {
        this.$router.push("/login");
      } else {
        this.$router.replace({
          name: "User",
          params: {
            id: localStorage.getItem("uid"),
          },
        });
      }
    },

    checkAuthState() {
      // const user = firebaseApp.auth().currentUser;
      // console.log(user)

      //TODO check if following tags is null, if so redirect to follow page

      if (
        localStorage.getItem("uid") == null ||
        localStorage.getItem("photoUrl") == null ||
        localStorage.getItem("name") == null
      ) {
        this.$router.replace("/login").catch(() => {});
      } else {
        this.oldProfile = localStorage.getItem("photoUrl");
        this.hasAccount = true;
        this.getMyFollowing();
      }
    },

    checkStorageValueChange() {
      document.addEventListener("storage", () => {
        console.log("storage value change");
      });
    },

    async getMyFollowing() {
      await db
      .collection("Users")
      .orderBy("lastPostTime", "asc")
      .onSnapshot(async (snapshot) => {
        await snapshot.forEach((doc) => {
          let person = doc.data();
          person.id = doc.id;

          this.following.push(person.id);
        });
        
        this.loadPosts()
      });

    },

    async loadPosts() {
      this.posts = []
      const followingArray = this.following

      var date = new Date();
      date.setDate(date.getDate() - 1);

      for (var i = followingArray.length; i--; ) {
        if(followingArray[i] != localStorage.getItem('uid')) {
          await db
          .collection("Posts")
          .where("posterUid", "==", followingArray[i])
          .where('postTime', '>', date)
          .orderBy("postTime", "desc")
          .get()
          .then(async (snapshot) => {
            await snapshot.forEach((doc) => {
              let photo = doc.data();
              photo.id = doc.id;
              this.posts.push(photo);
            });
          });
        } else;
      }
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
  margin-top: 52px;
}

.logo {
  display: flex;
  align-items: center;

  p {
    margin-left: 0;
    font-size: 16px;
    margin-top: 10px;
  }
}

.profile-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
  background: #657786;
  margin-right: 10px;
  margin-top: 2px;
}

.header-wrapper {
  padding-bottom: 6px;
}
</style>

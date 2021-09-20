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
          <div class="logo">
            <p>Discover new</p>
          </div>
        </div>

        <div class="right center-div">
          <!-- <router-link to="/explore" style="margin: 20px">
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
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              aria-labelledby="bellIconTitle"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              color="#000"
            >
              <title id="bellIconTitle">Bell</title>
              <path
                stroke-linejoin="round"
                d="M10.5,4.5 C12.1666667,4.5 13.8333333,4.5 15.5,4.5 C17.5,4.5 18.8333333,3.83333333 19.5,2.5 L19.5,18.5 C18.8333333,17.1666667 17.5,16.5 15.5,16.5 C13.8333333,16.5 12.1666667,16.5 10.5,16.5 L10.5,16.5 C7.1862915,16.5 4.5,13.8137085 4.5,10.5 L4.5,10.5 C4.5,7.1862915 7.1862915,4.5 10.5,4.5 Z"
                transform="rotate(90 12 10.5)"
              />
              <path
                d="M11,21 C12.1045695,21 13,20.1045695 13,19 C13,17.8954305 12.1045695,17 11,17"
                transform="rotate(90 12 19)"
              />
            </svg>
          </router-link> -->
        </div>
      </div>
    </header>

    <main>
      <div class="people-container">
        <div v-for="person in people">
          <div class="user-card">
            <div class="profile-img-text" @click="viewUser(person.id)">
              <img :src="person.photoUrl" />
              <div>
                <p class="name">
                  {{ person.name }}
                </p>
                <p class="work">
                  {{ person.work }}
                </p>
              </div>
            </div>

            <div class="filled">
              <p>Message</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import "vue-slim-tabs/themes/default.css";
import { Tabs, Tab } from "vue-slim-tabs";
import { Skeleton } from "vue-loading-skeleton";
import $ from "jquery";
import Masonry from "masonry-layout";
import BottomNav from "@/components/BottomNav";
import MainHeader from "@/components/MainHeader";
import PostCard from "@/components/PostCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  name: "Friends",

  data() {
    return {
      people: [],
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
    PostCard,
    Skeleton,
    Tabs,
    Tab,
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

    viewUser(id) {
      this.$router.push({
        name: "User",
        params: {
          id: id,
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

    async loadPhotos() {
      const followingArray = JSON.parse(localStorage.getItem("following"));
      const clickTagsArray = JSON.parse(localStorage.getItem("clickTags"));
      const clickAndFollowingTags = followingArray.concat(clickTagsArray);

      await db
      .collection("Users")
      .where("name", ">=", localStorage.getItem("name"))
      .onSnapshot((snapshot) => {
        this.people = [];

        snapshot.forEach((doc) => {
          if (doc.id != localStorage.getItem("uid")) {
            let person = doc.data();
            person.id = doc.id;

            this.people.push(person);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.center-div {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 10px;

  p {
    font-weight: 500;
    font-size: 17px;
    font-weight: bold;
  }
}

.profile-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
  background: gainsboro;
  margin-right: 10px;
  margin-top: 2px;
}

.people-container {
  padding-top: 10px;
  margin-top: -70px;
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
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

.people-container {
  margin-bottom: 100px;
}

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
}
</style>

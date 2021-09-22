<template>
  <!-- <div v-if='scrollUp' class="bottom-nav-wrapper"> -->
  <div class="bottom-nav-wrapper">
   <div class="bottom-nav-icons">
      <router-link to="/">
        <!-- <svg width="27px" height="27px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="homeAlt2IconTitle" stroke="#14171A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="homeAlt2IconTitle">Home</title> <path d="M2 12L5 9.3M22 12L19 9.3M19 9.3L12 3L5 9.3M19 9.3V21H5V9.3"/> </svg> -->

        <!-- <svg width="27" height="23" viewBox="0 0 24 24" fill="none" stroke="#14171A" stroke-width="0.5" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z" fill="currentColor" /></svg> -->

        <svg width="23px" height="23px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="homeAlt2IconTitle" stroke="#14171A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="homeAlt2IconTitle">Home</title> <path d="M2 12L5 9.3M22 12L19 9.3M19 9.3L12 3L5 9.3M19 9.3V21H5V9.3"/> </svg>
      </router-link>

      <!-- <router-link to='/friends'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </router-link> -->

      <router-link to="/explore">
        <svg id='bottom-nav-icon'
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#14171A"
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
        <div class="badge" v-if="notifsNum > 0">{{notifsNum}}</div>
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="23px"
          height="23px"
          viewBox="0 0 24 24"
          aria-labelledby="bellIconTitle"
          stroke="#14171A"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          color="#14171A"
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
      </router-link>

       <router-link to="/" class='with-badge'>
        <div class="badge" v-if="messagesNum > 0">{{messagesNum}}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
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
          stroke="#14171A"
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



    
  </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  name: "BottomNav",

  data() {
    return {
      oldProfile: null,
      hasAccount: false,
      scrollUp: true,
      showCreateDialog: false,
      notifsNum: 0,
      messagesNum: 0
    };
  },

  mounted() {
    this.checkSigned()
    // this.checkScroll()
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
        this.getLastNotificationOpenTime()
      }
    },

    async countAlerts(time) {
      await db
      .collection('Users')
      .doc(localStorage.getItem('uid'))
      .collection('Notifications')
      .where('notificationTime', '>', time)
      // .get()
      .onSnapshot((snapshot) => {
        this.notifsNum = snapshot.size
      })
    },

    async getLastNotificationOpenTime() {
      await db
      .collection('Users')
      .doc(localStorage.getItem('uid'))
      // .get()
      .onSnapshot((snapshot) => {
        console.log(snapshot.data())
        console.log(snapshot.data()['lastOpenAlertTime'])
        this.countAlerts(snapshot.data()['lastOpenAlertTime'])
      })
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
</style>

<template>
  <div class="main-header">
    <header v-if="scrollUp" class="desktop scrollHidden" id="header">
      <div class="header-wrapper">
        <div class="logo-container">
          <router-link to="/">
            <img src="../assets/logo.png" alt="" />
          </router-link>
        </div>

        <div class="search-box-container">
          <router-link to="/explore">
            <div class="fake-search-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9c9c9c"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p>Find art, design, fashion ...</p>
              <div></div>
            </div>
          </router-link>
        </div>

        <div class="navigation-container">
          <nav>
            <li v-if="!notSigned">
              <span class="number-badge">0</span>
              <router-link class="filled" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>

                Alerts
              </router-link>
            </li>

            <li>
              <div
                v-if="notSigned"
                style="margin-right: 14px;"
                class="primary-btn"
              >
                <router-link to="/login">
                  <p>Sign up / in</p>
                </router-link>
              </div>
            </li>

            <li v-if="!notSigned">
              <router-link class="filled" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-message-circle"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  ></path>
                </svg>

                Messages
              </router-link>
            </li>

            <li v-if="!notSigned">
              <router-link to="/share" class="primary-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>

                <p>Share photo</p>
              </router-link>
            </li>
            <li v-if="!notSigned">
              <div @click="goToMyAccount()" style="margin: 0 20px">
                <img class="profile-avatar" :src="oldProfile" />
              </div>
            </li>
          </nav>
        </div>
      </div>
    </header>

    <header v-if="scrollUp" id="header" class="mobile">
      <div class="header-wrapper">
        <div class="search-box-container">
          <router-link to="/explore">
            <div class="fake-search-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9c9c9c"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p>Find art, design, fashion ...</p>
              <div></div>
            </div>
          </router-link>
        </div>
      </div>
    </header>

    <div v-if="isPostDialogOpen" class="post-dialog">
      <h1 class="closePostDialogBtn" @click="closePostDialogue()">&times;</h1>
      <br />

      <UploadForm />
    </div>

    <div class="bottomNav">
      <BottomNav />
    </div>
  </div>
</template>

<script>
import UploadForm from "@/components/UploadForm";
import BottomNav from "@/components/BottomNav";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "MainHeader",

  data() {
    return {
      isPostDialogOpen: false,

      scrollUp: true,
      notSigned: true,
      oldProfile: localStorage.getItem("photoUrl"),
    };
  },

  mounted() {
    this.checkScroll();
    this.checkSigned();
  },

  components: {
    BottomNav,
    UploadForm,
  },

  methods: {
    checkSigned() {
      if (localStorage.getItem("uid") != null) {
        this.notSigned = false;
      } else {
        this.notSigned = true;
      }
    },

    goToMyAccount() {
      this.$router.replace({
        name: "User",
        params: {
          id: localStorage.getItem("uid"),
        },
      });
    },

    checkScroll() {
      const body = document.body;
      const nav = document.querySelectorAll(".scrollHidden");

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

    showPostDialog() {
      this.isPostDialogOpen = !this.isPostDialogOpen;
    },

    closePostDialogue() {
      this.isPostDialogOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #f8f9fb;
$grey-text-color: #a4a4a4;
$primary-color: red;
$secondary-color: blue;
$body-color: #f8f9fb;

.post-dialog {
  position: relative;
  padding: 24px;
  max-width: 430px;
  height: 500px;
  background: #ffffff;
  position: fixed;
  z-index: 4;
  border-radius: 20px;
  margin: auto;
  left: 40%;
  top: 100px;
  box-shadow: -5px 8px 20px #0000004d;
  overflow: scroll;

  .form-wrapper {
    margin-top: 0;
  }
}

.closePostDialogBtn {
  cursor: pointer;
  font-size: 37px;
  left: -7px;
  top: -17px;
  color: red;
  font-weight: bold;
  display: inline;
}

.profile-avatar {
  width: 46px;
  height: 46px;
  border-radius: 100px;
  background: gainsboro;
}

header {
  height: 61px;
  position: fixed;
  width: 100vw;
  background: #fff;
  top: 0;
  z-index: 10;

  .number-badge {
    position: absolute;
    background: red;
    padding: 2px 9px;
    color: #fff;
    border-radius: 100px;
    right: 5px;
  }

  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: auto;
    // max-width: 1555px;
    max-width: 1822px;
    height: 100%;
    padding-left: 8px;
  }
}

.navigation-container {
  text-align: center;
  padding-left: 50px;

  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      color: #000;
      margin: 0 20px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-weight: bold;

      &:hover {
        color: $primary-color;
        background: #fff;
      }

      &:hover svg {
        fill: $primary-color;
        stroke: $primary-color;
      }

      img,
      svg {
        margin-right: 5px;
      }
    }

    li {
      position: relative;
      cursor: pointer;

      a {
        display: flex;
        align-items: center;

        p {
          // margin-left: 6px;
        }
      }
    }
  }
}

.logo-container {
  margin-right: 34px;
}

@media screen and (min-width: 320px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .logo-container img {
    width: 33px;
    margin-left: 0;
  }

  header {
    height: 62px;

    .header-wrapper {
      // box-shadow: 0px -17px 20px #000;
      border-bottom: 2px solid #f1f1f1;
    }
  }

  .search-box-container {
    flex: inherit;
  }

  .navigation-container {
    padding-left: 0;
  }

  .fake-search-box p {
    font-size: 18px;
    font-weight: bold;
  }

  .fake-search-box {
    // padding: 7px;
    // width: max-content;
    // margin-left: -40px;
    // margin-right: 10px;

    padding: 10px 7px;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: 95vw;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: block;
  }

  header {
    height: 61px;
    // box-shadow: 0px 1px 20px 0px #eee, 0 0 20px #eee;
  }

  .logo-container img {
    width: 44px;
  }

  .mobile,
  .bottomNav {
    display: none;
  }

  .navigation-container {
    padding-left: 50px;
  }

  .fake-search-box {
    padding: 7px 14px;

    font-size: 20px;
    max-width: 500px;
    margin: 0 auto;
    min-width: 509px;
  }

  .fake-search-box p {
    color: #9c9c9c;
    font-size: 22px;
    white-space: nowrap;
  }

  .fake-search-box img {
    margin-right: 10px;
    /*opacity: 0.6;*/
  }
}
</style>

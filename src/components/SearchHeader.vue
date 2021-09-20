<template>
  <header>
    <div class="header-wrapper">
      <div class="logo-container">
        <div @click="goBack()" style="cursor: pointer;">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
      </div>

      <div class="search-box-container">
        <input
          v-model="q"
          placeholder="Find art, design, fashion ..."
          autocomplete
          autofocus
        />
      </div>

      <div>
        <router-link to="/my">
          <img class="profile-avatar" src="../assets/avatar.jpg" />
        </router-link>
      </div>
    </div>
  </header>
  <div v-if="loading" class="loader">uploading - {{ uploadValue }}%</div>
</template>

<script>
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "SearchHeader",

  data() {
    return {
      isPostDialogOpen: false,
      q: "",
    };
  },

  methods: {
    goBack() {
      window.history.back();
      // this.$router.back()
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
  z-index: 1;
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
  width: 42px;
  height: 42px;
  border-radius: 100px;
}

.bottomNav {
  position: fixed;
  bottom: 0;
  z-index: 2;
  background: #fff;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // border-top: 1px solid #f4f4f4;

  a {
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
    // background: #e4e4e4;
    padding: 4px 15px;
    // padding: 9px 26px;
    border-radius: 62px;

    svg {
      // display: none;
    }
  }
}

header {
  height: 74px;
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
    width: 98%;
    margin: auto;
    // max-width: 1555px;
    max-width: 1822px;
    height: 100%;
    padding-left: 10px;
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
      a {
        display: flex;
        align-items: center;

        p {
          margin-left: 6px;
        }
      }
    }
  }
}

.logo-container {
  margin-right: 34px;
}

.search-box-container {
  width: 100%;

  input {
  }
}

@media screen and (min-width: 320px) {
  .desktop {
    display: none;
  }

  .search-box-container {
    input {
      font-size: 16px;
      margin-left: -38px;
    }
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
  }

  .search-box-container {
    flex: inherit;
  }

  .navigation-container {
    padding-left: 0;
  }

  .fake-search-box p {
    font-size: 17px;
  }

  .fake-search-box {
    padding: 7px;
    width: max-content;
    margin-left: -40px;
    margin-right: 10px;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: block;
  }

  .search-box-container {
    input {
      font-size: 22px;
      margin-left: 0;
    }
  }

  header {
    height: 74px;
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
    padding: 14px;

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

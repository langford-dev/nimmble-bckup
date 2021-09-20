<template>
  <div class="sign-page">
    <!-- <div class="bg"></div> -->
    <div class="main">
      <!-- <img src="../assets/logo.png" class="logo" /> -->
      <p class="title">Login</p>

      <div class="input-wrapper">
        <p class="label">Email</p>
        <input v-model="email" type="email" />
      </div>

      <div class="input-wrapper">
        <p class="label">Password</p>
        <input v-model="password" type="password" />
      </div>

      <p class="no-account-link">
        Dont have an account?
        <router-link to="/join">Sign Up</router-link>
      </p>
      <br />

      <p class="no-account-link">
        <router-link to="/forgot-password">Forgot your password?</router-link>
      </p>
      <br />

      <div class="primary-btn login-btn" @click="login()">
        <p style="font-weight: bold">Login</p>
      </div>
    </div>

    <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div>

    <!--     <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
    </div> -->
  </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      this.loading = true;

      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((val) => {
          console.log("signed in!", val.user);

          this.setLocalStorageValues(val.user);
        })
        .catch((err) => {
          this.loading = false;
          alert(err.message);
        });
    },

    async setLocalStorageValues(user) {
      console.log(user)

      await db
        .collection("Users")
        .where('authUid', '==', user.uid)
        .get()
        .then(async (snapshot) => {
          snapshot.forEach(async (doc) => {
            console.log(doc.data())

            await localStorage.setItem("uid", doc.data()["username"]);
            await localStorage.setItem("authUid", doc.data()["authUid"]);
            await localStorage.setItem("name", doc.data()["name"]);
            await localStorage.setItem("username", doc.data()["username"]);
            await localStorage.setItem("gender", doc.data()["gender"]);
            await localStorage.setItem("work", doc.data()["work"]);
            await localStorage.setItem("email", doc.data()["email"]);
            await localStorage.setItem("about", doc.data()["about"]);
            await localStorage.setItem("photoUrl", doc.data()["photoUrl"]);
          });
          // const followingArray = doc.data()["following"];
          // const temporalClickList = ["Art", "Fashion", "Movies"];

          // await localStorage.setItem(
          //   "following",
          //   JSON.stringify(followingArray)
          // );
          // await localStorage.setItem(
          //   "clickTags",
          //   JSON.stringify(temporalClickList)
          // );
        });

      await db
        .collection("Users")
        .doc(localStorage.getItem("uid"))
        .collection("Following")
        .get()
        .then((querySnaps) => {

          localStorage.removeItem("subscribedTo");
          var subs = [];

          querySnaps.forEach((doc) => {
            subs.push(doc.id);
          });

          setTimeout(() => {
            localStorage.setItem("subscribedTo", JSON.stringify(subs));

            if (JSON.parse(localStorage.getItem("subscribedTo")).length <= 0) {
              window.location = "/explore";
            } else window.location = "/";
          }, 3000)

        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// .bg {
//   background-image: url("../assets/fashion-banner.jpg");
//   background-attachment: fixed;
//   background-position: unset;
//   background-size: cover;
//   height: 100vh;
//   width: 100vw;
//   margin-top: -68px;
//   position: fixed;
//   z-index: -1;
//   filter: brightness(0.5);
// }

// .bg::after {
//   content: "";
//   background: linear-gradient(to top, black, transparent);
//   width: 100vw;
//   height: 100vh;
//   position: absolute;
// }

.main {
  margin-bottom: 100px;
  padding: 15px;
  text-align: center;
  max-width: 397px;
  margin: 20vh auto;
  margin-top: 68px;
}

.no-account-link {
  color: #000;

  a {
    // color: red;
    // font-weight: bold;
  }
}

.logo {
  width: 39px;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  border: 2px solid #eee;
  padding: 6px 14px;
  margin-bottom: 17px;
  outline: none;
  width: 93%;
  border-radius: 100px;
}

.input-wrapper {
  margin-bottom: 9px;
  text-align: left;
}

.label {
  // font-weight: bold;
  margin-bottom: 10px;
  color: #6a6a6a;
}

.login-btn {
  // width: 110px
}

.title {
  font-size: 21px;
  font-weight: 400;
}
</style>

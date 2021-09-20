<template>
  <div class="sign-page">
    <!-- <div class="bg"></div> -->
    <div class="main">
      <!-- <img src="../assets/logo.png" class="logo" /> -->
      <p class="title">Reset your password</p>

      <div class="input-wrapper">
        <p class="label">Email address of your account</p>
        <input v-model="email" type="email" />
      </div>

      <p class="no-account-link">
        Go back to 
        <router-link to="/login">Login</router-link>
      </p>
      <br />
      <!-- langfordquarshie21@gmail.com -->

      <div class="primary-btn login-btn" @click="resetPassword()">
        <p style="font-weight: bold">Reset my password</p>
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
    };
  },

  methods: {
    async resetPassword() {
      if(this.email.trim() != '') {
        this.loading = true;

        await firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then((val) => {
          alert('A password reset email has been sent. Follow the steps to reset your password, and login again with the new password')

          this.loading = false
          // this.$router.push('/login')
        })
        .catch((err) => {
          this.loading = false;
          alert(err.message);
        });
      } else alert('Type the email address of your account')
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
}

.input-wrapper {
  margin-bottom: 9px;
  text-align: left;
}

.label {
  // font-weight: bold;
  margin-bottom: 12px;
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

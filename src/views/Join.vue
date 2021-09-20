<template>
  <div class="join-page">
    <!-- <div class="bg"></div> -->

    <form id="emailForm" style="display: none" @submit.prevent="sendMail">
      <button id="email-btn"></button>
    </form>

    <div class="main">
      <!-- <img src="../assets/logo.png" class="logo" /> -->
      <p class="title">Welcome to Nimmble</p>

      <div class="input-wrapper">
        <p class="label">Your name</p>
        <input v-model="name" type="text" />
      </div>

      <div class="input-wrapper">
        <p class="label">Nickname / username</p>
        <p class="label info">This unique name can't be changed after it has been set, but your name can.</p>
        <div v-if="newUsername != ''" style="margin-bottom: 9px; color: #3c92f2;">@{{newUsername}}</div>
        <input v-model="username" @input="setNewUsername" type="text" />
      </div>

      <div class="input-wrapper">
        <p class="label">Email</p>
        <input v-model="email" type="email" />
      </div>

      <div class="input-wrapper">
        <p class="label">Password</p>
        <input v-model="password" type="password" />
      </div>

      <div class="title">Gender</div>
      
      <div class="input-wrapper flex-input-wrapper">
        <p class="label">Male</p>
        <input v-model="male" type="checkbox" name="male" @change="setGender" />
      </div>

      <div class="input-wrapper flex-input-wrapper">
        <p class="label">Female</p>
        <input v-model="female" type="checkbox" name="female" @change="setGender" />
      </div>

      <div class="title">Work</div>
      
      <div class="input-wrapper">
        <p class="label">Your work</p>
        <input v-model="work" type="text" />
      </div>

      <p class="no-account-link">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
      <br />

      <div class="primary-btn login-btn" @click="next()">
        <p style="font-weight: bold">Sign me up</p>
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
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  data() {
    return {
      loading: false,
      deviceType: 'Web user',
      name: "",
      username: '',
      newUsername: '',
      email: "",
      password: "",
      work: "",
      male: "",
      female: "",
      gender: '',
      genderProfilePic: '',
    };
  },

  mounted() {
    if(this.$device.android) this.deviceType = 'Andoid'
    if(this.$device.ios) this.deviceType = 'IOS'
    if(this.$device.iPhoneXR) this.deviceType = 'iPhoneXR'
    if(this.$device.iPhoneXSMax) this.deviceType = 'iPhoneXSMax'
    if(this.$device.androidPhone) this.deviceType = 'Andoid'
    if(this.$device.windows) this.deviceType = 'Windows'
    if(this.$device.ipad) this.deviceType = 'ipad'
    if(this.$device.iphone) this.deviceType = 'iphone'
    console.log(this.deviceType)

    this.setNewUsername()
  },

  methods: {
    sendMail(e) {
      try {
        emailjs.sendForm(
          "service_ct3siij",
          "template_oa67i3u",
          e.target,
          "user_80Ft5XL2KgrQGkr53nY1w",
          {
            name: "",
            email: this.email,
            message: "",
          }
        );
      } catch (error) {
        console.log({ error });
      }
    },

    setGender(e) {

      if(e.srcElement.name == 'male') {
        this.male = true
        this.female = false
        this.gender = 'male'
        this.genderProfilePic = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      } else {
        this.male = false
        this.female = true
        this.gender = 'female'
        this.genderProfilePic = 'https://www.sat-tax.it/wp-content/uploads/2019/06/Female-Avatar.jpg'
      }
    },

    setNewUsername(e) {
      let name = this.username.split(/\s+/).join('')
      this.newUsername = name.trim()
    },

    async next() {
      if(this.newUsername != '') {
        let randomInt = Math.floor(Math.random() * 999);
        this.username = this.newUsername + randomInt
        this.newUsername = this.newUsername + randomInt
        console.log(this.username)
      }

      if(this.gender == '' || this.name == '' || this.email == '' || this.password == '' || this.work == '') alert('please fill out all the fields')

        else {

          this.loading = true;

          await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((val) => {
              this.insertIntoFirestore(val.user.uid);
            })
            .catch((err) => {
              this.loading = false;
              alert(err.message);
            });
        }
    },

    async insertIntoFirestore(uid) {
      await db
        .collection("Users")
        .doc(this.username)
        .set({
          'email': this.email.trim(),
          'name': this.name.trim(),
          'coins': '0',
          'verified': false,
          'username':this.username.trim(),
          'gender': this.gender,
          'uid': this.username.trim(),
          'authUid': uid,
          'about': `Hello I'm ${this.name.trim()}👋. Subscribe to see more fun content`,
          'work': this.work.trim(),
          'joinDate': firebaseApp.serverTimestamp,
          'photoUrl': this.genderProfilePic,
          'lastOpenAlertTime': firebaseApp.serverTimestamp,
          'deviceType': this.deviceType
        })
        .then(async (val) => {

          var tempSubs = [];

          await localStorage.setItem("subscribedTo", JSON.stringify(tempSubs));
          await localStorage.setItem("uid", this.username);
          await localStorage.setItem("authUid", uid);
          await localStorage.setItem("name", this.name);
          await localStorage.setItem("gender", this.gender);
          await localStorage.setItem("username", this.username);
          await localStorage.setItem("work", this.work);
          await localStorage.setItem(
            "about",
            `Aloha! I'm ${this.name}👋. Follow me let's connect`
          );
          await localStorage.setItem("email", this.email);
          await localStorage.setItem(
            "photoUrl",
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          );

          this.signIn();

        })
        .catch((err) => {
          this.loading = false;
          alert(err.message);
        });
    },

    async newPost() {

      await db
      .collection("Posts")
      .add({
        'photo': null,
        'thumbnail': null,
        'title': `Heyyyyy 👋. I'm new here. Subscribe @${this.username.trim()} let's have fun 😋 #NewHere #JustJoined #NewUser`,
        'posterName': this.name.trim(),
        'posterUid': localStorage.getItem('uid'),
        'type': 'text',
        'postTime': firebaseApp.serverTimestamp,
        'tags': ['NewHere' ,'JustJoined','NewUser'],
        'mentions': [`${this.username.trim()}`],
        'isVideo': false,
      })
      .catch((err) => {
        this.loading = false;
        window.location = "/friends";
      });
    },

    async signIn() {
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (val) => {
          await this.newPost(localStorage.getItem('uid'))
          window.location = "/friends";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// .bg {
//   background-image: url("../assets/funny-banner.jpg");
//   background-attachment: fixed;
//   background-position: center;
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
.flex-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .label {
    margin-bottom: 0;
    margin-right: 10px;
  }
}

.label {
  // font-weight: bold;
  margin-bottom: 10px;
}

.info {
  color: #6a6a6a;
  margin-top: -5px;
}

.login-btn {
  // width: 110px
}

.title {
  font-size: 21px;
  font-weight: 400;
}
</style>

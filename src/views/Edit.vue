<template>
  <div class="share-page">
    <BackHeader name="Edit profile" />
    <div class="main">
      <div>
        <router-link to="/p">
          <div class="photo-div">
            <img class="profile-photo" :src="oldProfile" />
          </div>

          <br />
        </router-link>
      </div>

      <div class="input-wrapper">
        <p class="label">Your name</p>
        <input v-model="name" type="text" />
      </div>

      <div class="input-wrapper">
        <p class="label">Username</p>
        <small>This username cannot be changed</small>
        <input style="background: #f1f1f1" v-model="username" disabled type="text" />
      </div>

      <div class="input-wrapper">
        <p class="label">My work</p>
        <input v-model="work" placeholder="Fashion designer" type="text" />
      </div>

      <div class="input-wrapper">
        <p class="label">Your bio</p>
        <textarea v-model="about"></textarea>
      </div>

      <div
        v-if="work != '' || about != ''"
        class="primary-btn"
        @click="updateInfo()"
        style="width: 110px;"
        to="/"
      >
        <p style="font-weight: bold">Save changes</p>
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
import BackHeader from "@/components/BackHeader";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Edit",

  metaInfo() {
    return {
      title: "Share a photo ",
    };
  },

  data() {
    return {
      loading: false,
      name: localStorage.getItem('name'),
      username: `@${localStorage.getItem('username')}`,

      oldProfile: localStorage.getItem("photoUrl"),
      about: localStorage.getItem("about"),
      work: localStorage.getItem("work"),
    };
  },

  mounted() {
    this.checkAuthState();
  },

  components: {
    BackHeader,
  },

  methods: {
    checkAuthState() {
      const user = firebaseApp.auth().currentUser;
      if (
        localStorage.getItem("uid") == null &&
        localStorage.getItem("photoUrl") == null &&
        localStorage.getItem("name") == null &&
        user == null
      ) {
        this.$router.replace("/login").catch(() => {});
      }
    },

    async updateInfo() {
      this.loading = true;
      const myId = await localStorage.getItem("uid");

      await db
        .collection("Users")
        .doc(myId)
        .update({
          about: this.about,
          work: this.work,
          name: this.name,
        })
        .then(async (val) => {
          this.loading = false;
          await localStorage.setItem("work", this.work);
          await localStorage.setItem("about", this.about);
          await localStorage.setItem("name", this.name);
          window.location = `/user/${myId}`;
        })
        .catch((err) => {
          this.loading = false;
          alert(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  width: 100%;
  border: none;
  background: #ffa5552e;
  padding: 13px 20px;
  border-radius: 42px;
  font-size: 15px;
  // color: gray;
  outline: none;
}

.photo-div {
  text-align: center;
}

.profile-photo {
  width: 192px;
  height: 192px;
  border-radius: 200%;
  object-fit: cover;
  background: gainsboro;
}

select * {
  background: red;
}

.preview {
  width: 100%;
  object-fit: contain;
  border-radius: 20px;
  max-height: 400px;
  margin-bottom: 25px;
  margin: auto;
  /* text-align: center; */
  display: flex;
}

.img-select-btn {
  margin: 10px 0;
  text-align: center;
  border: 2px solid gainsboro;
  padding: 15px;
  border-style: dashed;
  border-width: medium;
  font-weight: bold;
  color: grey;
}

.label {
  font-size: 15px;
  color: #6a6a6a;
  // font-weight: 600;
  // margin-bottom: 13px;
}

.main {
  padding: 15px;
  max-width: 500px;
  text-align: left;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 100px;
}

.input-wrapper {
  margin-bottom: 30px;
  margin-top: 20px;
}

input[type="text"],
input[type="password"],
textarea {
  width: 100%;
  padding: 10px 13px;
  font-size: 15px;
  border: none;
  background: #fff;
  border-radius: 100px;
  border: 1px solid #E6E7E7;
  font-size: 15px;
}

small {
  color: #6a6a6a;
  display: block;
  margin-bottom: 5px;
}

textarea {
  border-radius: 10px;
  height: 136px;
  resize: none;
}

input,
textarea {
  outline: none;
}
</style>

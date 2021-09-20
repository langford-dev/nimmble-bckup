<template>
  <!-- <div class="follow">
    <div class="main">
      <div class="header">
        <p class="title">Follow tags</p>
        <div class="primary-btn" @click="next()">
          <p>Done</p>
        </div>
      </div> -->

      <!-- <div class="container"> -->
        <!-- <div class="container">
          <div class="top">
            <label for="checkBox">Fashion</label>
            <input id="checkBox" type="checkbox" name="Fashion" />
          </div>

          <div class="photo">
            <img src="@/assets/fashion-banner.jpg" />
          </div>
        </div>

        <div class="top">
          <label for="checkBox">Movies</label>
          <input id="checkBox" type="checkbox" name="Movie" />
        </div>

        <div class="photo">
          <img src="@/assets/movie-banner.jpg" />
        </div>
      </div>

      <div class="container">
        <div class="top">
          <label for="checkBox">Music</label>
          <input id="checkBox" type="checkbox" name="Music" />
        </div>

        <div class="photo">
          <img src="@/assets/music-banner.jpg" />
        </div>
      </div>

      <div class="container">
        <div class="top">
          <label for="checkBox">Funny / Meme</label>
          <input id="checkBox" type="checkbox" name="Funny" />
        </div>

        <div class="photo">
          <img src="@/assets/funny-banner.jpg" />
        </div>
      </div>

      <div class="container">
        <div class="top">
          <label for="checkBox">Arts, painting &amp; design</label>
          <input id="checkBox" type="checkbox" name="Art" />
        </div>

        <div class="photo">
          <img src="@/assets/art-banner.jpg" />
        </div>
      </div>

      <div class="container">
        <div class="top">
          <label for="checkBox">DC Marvel characters</label>
          <input id="checkBox" type="checkbox" name="Superhero" />
        </div>

        <div class="photo">
          <img src="@/assets/dc-banner.jpg" />
        </div>
      </div>

      <div class="container">
        <div class="top">
          <label for="checkBox">Science &amp; tech.</label>
          <input id="checkBox" type="checkbox" name="Science" />
        </div>

        <div class="photo">
          <img src="@/assets/tech-banner.jpg" />
        </div>
      </div> -->
    <!-- </div> -->

    <!-- <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div> -->

    <!--     <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
      <div>signing you in ...</div>
    </div> -->
  <!-- </div> -->
</template>

<script>
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      followingArray: [],
      loading: false,
    };
  },

  mounted() {
    this.checkAuthState();
  },

  methods: {
    checkAuthState() {
      if (localStorage.getItem("uid") == null) {
        this.$router.replace("/login").catch(() => {});
      }
    },

    next() {
      let checkboxes = document.querySelectorAll("#checkBox");
      let selectedCboxes = Array.prototype.slice
        .call(checkboxes)
        .filter((ch) => ch.checked == true);

      if (selectedCboxes.length > 0) {
        this.loading = true;

        for (var i = 0; i < selectedCboxes.length; i++) {
          this.followingArray.push(selectedCboxes[i].name);
          this.insertIntoFirebase(this.followingArray);
        }
      } else {
        alert("Please follow a tag");
      }
    },

    async insertIntoFirebase(followingArrayList) {
      await db
        .collection("Users")
        .doc(this.$route.params.id)
        .update({
          following: followingArrayList,
        })
        .then((val) => {
          this.setLocalStorageValues(followingArrayList);
        });
    },

    async setLocalStorageValues(followingArrayList) {
      await localStorage.removeItem("following");
      await localStorage.setItem(
        "following",
        JSON.stringify(followingArrayList)
      );

      // this.$router.replace('/')
      window.location = "/";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 500px;
  margin-bottom: 80px;
}

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.main {
  padding: 15px;
  text-align: left;
  max-width: 500px;
  margin: 19px auto;
  margin-top: 100px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 91%;
  top: -29px;
  max-width: 493px;
  background: white;
  padding-top: 51px;
  height: 30px;
  margin-top: 24px;
  margin-left: -29px;
  padding-left: 37px;
  padding-right: 56px;
  z-index: 1;

  .primary-btn {
    position: relative;
    top: -25px;
  }
}

input[type="checkbox"]:after {
  content: "follow";
  display: inline-block;
  margin-left: -24px;
  font-size: 12px;
  height: 18px;
  visibility: visible;
  border: 1px solid red;
  border-radius: 100px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  background: red;
}

input[type="checkbox"]:checked:after {
  content: "following";
  padding: -5px;
  margin-left: -40px;
  color: red;
  background-color: #fff;
}

label {
  font-weight: bold;
  font-size: 18px;
}

input[type="checkbox"] {
  transform: scale(1.5);

  width: 30px;
  height: 30px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 17px;
  visibility: hidden;
}

.photo img {
  background: gainsboro;
  height: 200px;
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
  object-fit: cover;
}

@-moz-document url-prefix() {
  input[type="checkbox"] {
    visibility: visible;
  }
}
</style>

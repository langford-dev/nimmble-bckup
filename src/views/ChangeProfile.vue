<template>
  <div class="edit-profile-photo-page">
    <BackHeader name="Change profile photo" />
    <div class="main">
      <div>
        <div class="photo-div" v-if="imgFile != null">
          <img class="profile-photo" :src="previewImg" />
          <br />
        </div>

        <div class="photo-div" v-if="imgFile == null">
          <img class="profile-photo" :src="oldProfile" />
          <br />
        </div>

        <div class="img-select-btn" @click="click1">Choose profile photo</div>
        <br />

        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
      </div>
      <br />

      <div
        v-if="imgFile != null"
        class="primary-btn"
        @click="uploadImage()"
        style="width: 110px"
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
import imageCompression from "browser-image-compression";
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
      previewImg: null,
      imgFile: null,
      loading: false,
      compressedImage: null,

      oldProfile: localStorage.getItem("photoUrl"),
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

    click1() {
      this.$refs.input1.click();
    },

    async previewImage(event) {
      this.imgFile = event.target.files[0];
      this.loading = true;
      this.previewImg = URL.createObjectURL(this.imgFile);

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 380,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(this.imgFile, options);
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );

        this.compressedImage = compressedFile;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async uploadImage() {
      this.loading = true;
      let randomNumber = Date.now() + Math.floor(Math.random() * 100);
      const storageRef = firebaseApp
        .storage()
        .ref(`profile/ ${randomNumber}.jpg`);
      let task = storageRef.put(this.compressedImage);

      await task.then((data) => {
        this.uploadValue = (data.bytesTransferred / data.totalBytes) * 100;
        data.ref.getDownloadURL().then((url) => {
          this.insertIntoFirestore(url);
        });
      });
    },

    async insertIntoFirestore(url) {
      const myId = await localStorage.getItem("uid");

      await db
        .collection("Users")
        .doc(myId)
        .update({
          photoUrl: url,
        })
        .then(async (val) => {
          this.loading = false;
          await localStorage.setItem("photoUrl", url);
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
.main {
  // margin-top: 76px;
  // padding: 15px;

  padding: 15px;
  max-width: 298px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 0;
}

.photo-div {
  text-align: center;
}

.img-select-btn {
  margin-top: 50px;
}

.profile-photo {
  width: 192px;
  height: 192px;
  border-radius: 200%;
  object-fit: cover;
  background: #e1e8ed;
  border: 3px solid #1da1f2;
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
</style>

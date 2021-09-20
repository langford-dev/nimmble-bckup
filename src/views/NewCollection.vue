<template>
  <div class="share-page">
    <BackHeader name="Make new List" />
    <div class="main" v-if="!loading">
      <div>
        <!-- <p class="title">Create collection</p> -->
        <!-- <small style="line-height: 1.6">You can set your collection as private or public</small> -->

        <div class="input-wrapper">
          <p class="label">Name your list</p>
          <input v-model="name" type="name" placeholder="eg. Fun memories" />
        </div>

        <div
          class="input-wrapper"
          style="display: flex; align-items: baseline;"
        >
          <p class="label">Make public</p>
          <input v-model="isPublic" type="checkbox" />
        </div>

        <div class="primary-btn" @click="createCollection()">
          <p>Create my list</p>
        </div>
      </div>
    </div>

    <br />
    <br />

    <!--         <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
    </div> -->

    <!--  <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div> -->

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#ffffff00"
      color="#00acee"
    ></vue-topprogress>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { vueTopprogress } from "vue-top-progress";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Share",

  data() {
    return {
      name: "",
      isPublic: true,
      loading: false,
      topProgressHeight: 4,
    };
  },

  methods: {
    async createCollection() {
      if (this.name != "") {
        this.loading = true;
        this.$refs.topProgress.start();

        await db
          .collection("Collections")
          .add({
            owner: localStorage.getItem("uid"),
            isPublic: this.isPublic,
            collectionName: this.name,
            created: firebaseApp.serverTimestamp,
            id: Date.now(),
            photo: localStorage.getItem("photoUrl"),
            photosNum: 0,
          })
          .then((val) => {
            this.loading = false;
            this.$refs.topProgress.done();
            this.$router.back();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },

  components: {
    BackHeader,
    vueTopprogress,
  },
};
</script>
<style lang="scss" scoped>
.primary-btn {
  width: 110px;
}

input[type="checkbox"] {
  margin-left: 20px;
  border: 1px solid red;
  padding: 27px;
  width: 21px;
  height: 20px;
  position: relative;
  top: 4px;
}

.label {
  font-size: 18px;
  // font-weight: 600;
  margin-bottom: 13px;
}

.title {
  // margin-bottom: 20px;
  // margin-top: -67px;
  text-align: center;
  // font-size: inherit
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
input[type="url"],
input[type="name"],
textarea {
  width: 90%;
  padding: 13px 12px;
  font-size: 17px;
  border: none;
  background: #fff;
  border-radius: 15px;
  border: 2px solid #efefef;
}

textarea {
  border-radius: 20px;
  height: 136px;
  resize: none;
}

input,
textarea {
  outline: none;
}
</style>

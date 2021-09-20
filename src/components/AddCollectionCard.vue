<template>
  <div>
    <div class="collection-card" @click="getPostInfo()">
      <img class="collection-photo" :src="collectionPhoto" />
      <div class="name-num">
        <p class="collection-name">{{ collectionName }}</p>
        <p class="collection-num" v-if="collectionPhotosNum === 1">
          {{ collectionPhotosNum }} photo
        </p>
        <p
          class="collection-num"
          v-if="collectionPhotosNum > 1 || collectionPhotosNum <= 0"
        >
          {{ collectionPhotosNum }} photos
        </p>
      </div>
    </div>
    <!-- <div v-if="loading" class="loader">
    <div class="big-spin">
      <div class="small-spin"></div>
    </div>
  </div> -->
  </div>
</template>

<script>
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "AddCollectionCard",

  data() {
    return {
      // loading: false,
    };
  },

  props: {
    collectionName: {
      type: String,
      default: "",
      required: true,
    },

    collectionId: {
      type: String,
      default: "",
      required: true,
    },

    photoId: {
      type: String,
      default: "",
      required: true,
    },

    collectionPhotosNum: {
      default: "0",
      required: true,
    },

    collectionPhoto: {
      type: String,
      default: "",
      required: true,
    },
  },

  methods: {
    async getPostInfo() {
      // console.log(id)
      // this.loading = true
      await db
        .collection("Posts")
        .doc(this.photoId)
        .get()
        .then((doc) => {
          this.photoUrl = doc.data()["photo"];
          this.posterId = doc.data()["posterUid"];
          this.title = doc.data()["title"];
          this.chooseCollection(this.collectionId);

          console.log(this.title);
        })
        .catch((err) => {
          // this.loading = false;
          console.log(err.message);
        });
    },

    async chooseCollection(collectionId) {
      console.log("choosing collection...", this.collectionId);
      const myId = localStorage.getItem("uid");
      await db
        .collection("Collections")
        .doc(this.collectionId)
        .collection("Photos")
        .doc(this.photoId)
        .set({
          posterUid: this.posterId,
          photo: this.photoUrl,
          title: this.title,
          savedTime: firebaseApp.serverTimestamp,
          postId: this.photoId,
        })
        .then((val) => {
          this.updatePhoto(this.collectionId);
          this.updatePhotosNum(this.collectionId);
        })
        .catch((err) => {
          // this.loading = false
          console.log(err.message);
        });
    },

    async updatePhoto(collectionId) {
      console.log("updating photo...", collectionId);
      await db
        .collection("Collections")
        .doc(collectionId)
        .update({
          photo: this.photoUrl,
        })
        .then((val) => {
          // this.refreshData()
          // this.loading = false
          alert("Added to collection...");
        });
    },

    async updatePhotosNum(collectionId) {
      console.log("updating photo num...", collectionId);
      var num;

      await db
        .collection("Collections")
        .doc(collectionId)
        .get()
        .then((doc) => {
          num = doc.data()["photosNum"] + 1;
        })
        .catch((err) => {
          console.log(err.message);
        });

      await db
        .collection("Collections")
        .doc(collectionId)
        .update({
          photosNum: num,
        })
        .then((val) => {
          //TODO
          this.collectionPhotosNum = this.collectionPhotosNum + 1;
          // this.refreshData()
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding-left: 0;
  margin-left: -40px;

  .collection-name {
    font-size: 16px;
    font-weight: 800;
  }

  .name-num {
    line-height: 1.5;
    margin-left: -24px;
  }

  .collection-photo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 100px;
    background: #f1f1f1;
  }
}
</style>

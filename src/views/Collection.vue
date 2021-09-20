<template>
  <div class="share-page">
    <BackHeader name=" " />
    <div class="main">
      <div>
        <p class="title">Choose a collection</p>
        <br />
        <br />
        <div @click="goToCreateCollection()" class="custom-link">
          <div class="custom-link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="middle-bottom-nav feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          New collection
        </div>

        <div v-if="hasCollection">
          <div
            style="width: auto"
            v-for="collection in collections"
            :key="collection.id"
          >
            <!-- <div class="collection-card" @click='getPostInfo(collection.id)'>
              <img class="collection-photo" :src="collection.photo">
              <p class="collection-name">{{ collection.collectionName }}</p>
            </div> -->

            <AddCollectionCard
              :collectionName="collection.collectionName"
              :collectionId="collection.id"
              :collectionPhoto="collection.photo"
              :collectionPhotosNum="collection.photosNum"
              :photoId="routeId"
              :type="photo.type"
            />
          </div>
        </div>
      </div>
    </div>

    <!--         <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
    </div> -->

    <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import imageCompression from "browser-image-compression";
import AddCollectionCard from "@/components/AddCollectionCard";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Share",

  data() {
    return {
      hasCollection: false,
      loading: true,
      collections: [],
      routeId: this.$route.params.id,

      posterId: "",
      photoUrl: "",
      title: "",
    };
  },

  watch: {
    $route(to, from) {
      this.checkCollections();
    },
  },

  mounted() {
    this.checkCollections();
  },

  methods: {
    goToCreateCollection() {
      this.$router.push({
        name: "NewCollection",
        params: {
          id: this.$route.params.id,
        },
      });
    },

    async checkCollections() {
      await db
        .collection("Collections")
        .where("owner", "==", localStorage.getItem("uid"))
        .orderBy("created", "desc")
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasCollection = true;
            this.loading = false;
            this.collections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.collections.push(collection);
            });
          } else {
            this.loading = false;
            this.hasCollection = false;
          }
        });
    },
  },

  components: {
    BackHeader,
    AddCollectionCard,
  },
};
</script>
<style lang="scss" scoped>
.middle-bottom-nav {
  width: 40px;
  height: 40px;
}

.primary-btn {
  width: 110px;
}

.label {
  font-size: 18px;
  // font-weight: 600;
  margin-bottom: 13px;
}

.title {
  margin-bottom: -10px;
  text-align: center;
  // margin-top: -67px;
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
input[type="email"],
textarea {
  width: 90%;
  padding: 13px 12px;
  font-size: 17px;
  border: none;
  background: #fff;
  border-radius: 104px;
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

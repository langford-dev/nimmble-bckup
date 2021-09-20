<template>
  <div class="tag-screen">
    <div class="back-header">
      <header class="scrollHidden" id="mobile">
        <div class="header-wrapper">
          <div class="logo-container" @click="goBack()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>

          <div class="header-buttons">
            <router-link
              v-if="isOwner"
              to="/new-collection"
              style="margin-right: 10px"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </router-link>

            <div @click="shareCollection()" style="margin-right: 5px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
                stroke="#000"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-share-2"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>

            <div @click="showCollectionDialog = true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div class="bottomNav">
        <BottomNav />
      </div>
    </div>

    <p class="title">{{ collectionName }}</p>

    <div class="photo-num">
      <img :src="collectionPhoto" v-if="!loading" class="collection-photo" />
      <div v-if="loading" class="collection-photo"></div>
      <div class="photosNum" v-if="photosNum > 0">{{ photosNum }}+</div>
    </div>

    <p class="owner-name" v-if="ownerName != ''" @click="viewUser()">
      <span style="font-weight: bold; cursor: pointer">{{ ownerName }}'s</span>
      collection
    </p>

    <tabs :onSelect="tabChange">
      <tab title="Photos">
        <div
          style="margin-top: 43px;"
          v-if="photoNotFound && !loading"
          class="no-tab-data"
        >
          No photos in collection
        </div>
        <div class="grid-container">
          <div v-for="photo in photos">
            <PostCard
              :photo-url="photo.photo"
              :title="photo.title"
              :id="photo.id"
              :posterId="photo.posterUid"
              :thumbnail="photo.thumbnail"
              :type="photo.type"
              :video="photo.video"
            />
          </div>
        </div>
      </tab>
      <tab title="Explore">
        <div
          class="all-collections-div"
          id="all-collections-div"
          style="margin-top: 12px"
        >
          <div
            style="margin-top: 43px;"
            v-if="!hasRelatedCollections && !loading"
            class="no-tab-data"
          >
            No collections
          </div>

          <div
            style="width: auto; margin-top: 20px"
            v-if="collection.id != currentCollectionId"
            v-for="collection in relatedCollections"
            :key="collection.id"
          >
            <CollectionCard
              :collectionName="collection.collectionName"
              :collectionId="collection.id"
              :collectionPhoto="collection.photo"
              :collectionPhotosNum="collection.photosNum"
              :isPublic="collection.isPublic"
            />
          </div>
        </div>
      </tab>
    </tabs>

    <div
      class="dialog-sheet"
      v-if="showCollectionDialog"
      key="collectionDialog"
    >
      <h1 class="closeDialogBtn" @click="showCollectionDialog = false">
        &times;
      </h1>
      <!-- <div v-if='isOwner' @click="">Edit collection</div> -->
      <div @click="shareCollection()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#242424"
          stroke="#242424"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-share-2"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        Send invite
      </div>
      <router-link to="/login" v-if="!isSignedIn" class="primary-color"
        >Login / Signup</router-link
      >
      <router-link to="/feedback">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-slash"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        Block / hide collection</router-link
      >
      <div @click="deleteCollection()" v-if="isOwner" class="primary-color">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="red"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Delete collection
      </div>
    </div>
    <!-- 
    <div v-if="loadingMore" class="loading-more">
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
import "vue-slim-tabs/themes/default.css";
import { Tabs, Tab } from "vue-slim-tabs";
import { vueTopprogress } from "vue-top-progress";
import BottomNav from "@/components/BottomNav";
import CollectionCard from "@/components/CollectionCard";
import PostCard from "@/components/PostCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      photos: [],
      relatedCollections: [],
      hasRelatedCollections: true,
      showCollectionDialog: false,
      topProgressHeight: 4,
      // loadingMore: true,
      isSignedIn: false,
      loading: true,
      scrollUp: true,
      collectionName: "",
      collectionPhoto: "",
      isOwner: false,
      ownerName: "",
      ownerId: "",
      photosNum: 0,
      photoNotFound: false,
      currentCollectionId: this.$route.params.id,
    };
  },

  components: {
    PostCard,
    BottomNav,
    CollectionCard,
    vueTopprogress,
    Tabs,
    Tab,
  },

  // watch: {
  //   $route(to, from) {
  //     this.getCollectionInfo()
  //     this.getPhotos()
  //   },
  // },

  mounted() {
    this.$refs.topProgress.start();
    this.getCollectionInfo();
    this.checkAuthState();
  },

  methods: {
    checkAuthState() {
      if (
        localStorage.getItem("uid") != null &&
        localStorage.getItem("photoUrl") != null &&
        localStorage.getItem("name") != null
      ) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    },

    viewUser() {
      this.$router.push({
        name: "User",
        params: {
          id: this.ownerId,
        },
      });
    },

    goBack() {
      window.history.back();
    },

    async deleteCollection() {
      this.loading = true;
      this.$refs.topProgress.start();

      await db
        .collection("Collections")
        .doc(this.$route.params.id)
        .delete()
        .then((val) => {
          console.log("collection will be deleted");
          this.loading = false;
          this.$refs.topProgress.done();
          this.$router.back();
        });
    },

    async shareCollection() {
      const shareData = {
        title: this.collectionName,
        text: `Gridd collection - ${this.collectionName}`,
        url: `https://grrid.netlify.app/view-collection/${this.$route.params.id}`,
      };

      try {
        await navigator.share(shareData);
        // alert("Collection shared! ✌️");
      } catch (err) {
        console.log("Share failed");
      }
    },

    tabChange(e, index) {
      switch (index) {
        case 0:
          this.getPhotos();
          break;
        case 1:
          this.getCollections();
      }
    },

    async getCollectionInfo() {
      this.loading = true;
      this.$refs.topProgress.start();
      this.photos = [];

      const myId = localStorage.getItem("uid");
      await db
        .collection("Collections")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.data()["owner"] == myId) this.isOwner = true;
          else this.isOwner = false;

          this.collectionName = doc.data()["collectionName"];
          this.collectionPhoto = doc.data()["photo"];
          this.loading = false;
          this.ownerId = doc.data()["owner"];
          this.getOwnerInfo(this.ownerId);
        })
        .catch((err) => {
          // alert(err.message);
          console.log(err.message);
        });
    },

    async getOwnerInfo(ownerId) {
      await db
        .collection("Users")
        .doc(ownerId)
        .get()
        .then((doc) => {
          this.ownerName = doc.data()["name"];
          this.getPhotos();
        })
        .catch((err) => {
          // alert(err.message);
          console.log(err.message);
        });
    },

    async getPhotos() {
      this.loading = true;
      this.$refs.topProgress.start();
      // this.loadingMore = true;

      await db
        .collection("Collections")
        .doc(this.$route.params.id)
        .collection("Photos")
        .get()
        .then((snapshot) => {
          this.photosNum = snapshot.docs.length - 1;
          this.photos = [];

          if (snapshot.docs.length <= 0) {
            this.photoNotFound = true;
          } else {
            this.photoNotFound = false;
            snapshot.forEach((doc) => {
              let photo = doc.data();
              photo.id = doc.id;

              this.photos.push(photo);
              this.loading = false;
              this.$refs.topProgress.done();
              // this.loading = false;

              // setTimeout(() => {
              // this.loadingMore = false;
              // }, 16000);
            });
          }
        })
        .catch((err) => {
          // this.loading = false;
          console.log(err.message);
        });
    },

    async getCollections() {
      // this.loading = true;
      this.$refs.topProgress.start();
      // this.loadingMore = true;
      this.relatedCollections = [];

      await db
        .collection("Collections")
        .where("collectionName", ">=", this.collectionName)
        .where("isPublic", "==", true)
        // .orderBy('created', 'desc')
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.relatedCollections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.relatedCollections.push(collection);
            });

            this.hasRelatedCollections = true;
            this.loading = false;
            this.$refs.topProgress.done();
          } else {
            this.loading = false;
            this.$refs.topProgress.done();
            this.hasRelatedCollections = false;
          }
        })
        .catch((err) => {
          // this.loading = false;
          console.log(err.message);
        });
    },

    goBack() {
      window.history.back();
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

#all-collections-div {
  margin-top: 12px;
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 39px;
}

.collection-photo {
  width: 120px;
  height: 120px;
  border-radius: 200%;
  object-fit: cover;
  object-fit: cover;
  background: gainsboro;
  margin: auto;
  display: flex;
  margin-top: 10px;
  margin-bottom: -50px;
}

.owner-name {
  margin-top: 10px;
  text-align: center;
}

.photo-num {
  position: relative;
  width: 130px;
  height: 130px;
  margin: auto;

  .photosNum {
    position: absolute;
    top: 20px;
    right: -10px;
    background: red;
    min-width: 35px;
    min-height: 35px;
    border: 3px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    border-radius: 100px;
  }
}

// .title {
// margin-bottom: 10px;
// }

// .collection-text {
//     text-align: center;
//     margin-bottom: 50px;
// }

.tagNum {
  margin-bottom: 77px;
  color: red;
  font-weight: bold;
  margin-top: 4px;
}

.grid-container {
  padding: 10px;
  margin-top: 20px;
}

.title {
  text-align: center;
  margin: 0;
  margin-top: 80px;
  margin-bottom: 3px;
}

@media screen and (min-width: 320px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .title {
    font-size: 2.5rem;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: block;
  }

  .title {
    font-size: 3rem;
  }

  .mobile,
  .bottomNav {
    display: none;
  }
}

$border-color: #f8f9fb;
$grey-text-color: #a4a4a4;
$primary-color: red;
$secondary-color: blue;
$body-color: #f8f9fb;

.profile-avatar {
  width: 35px;
  height: 35px;
  border-radius: 100px;
  background: gainsboro;
}

.header-buttons {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-top: 10px;
  }
}

.profile-avatar {
  width: 42px;
  height: 42px;
  border-radius: 100px;
}

@media screen and (min-width: 320px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: block;
  }

  .mobile,
  .bottomNav {
    display: none;
  }
}
</style>

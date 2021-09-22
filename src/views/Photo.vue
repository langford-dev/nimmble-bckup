<template>
  <!-- <transition name="slide" mode="out-in"> -->
  <div class="photo-page">
    <div class="mobile">
      <!-- <BackHeader /> -->
      <div class="back-header">
        <header id="mobile">
          <div class="header-wrapper">
            <div class="logo-container" @click="goBack()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#313131"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-left"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            <div class="header-icons">
              <div @click="sharePhoto()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#313131"
                  stroke="#313131"
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

              <div
                v-if="link != '' && link != 'https://'"
                @click="downloadPhoto()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-download"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>

              <div v-if="isLoggedIn" @click="openCollectionDialog()">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>
        </header>

        <div class="bottomNav">
          <BottomNav />
        </div>
      </div>
    </div>

    <div class="desktop">
      <MainHeader />
    </div>

    <main v-if="!loading" class="desktop" style="display: block">
      <div class="top">
        <div class="main-photo-div">
          <v-lazy-image
            v-if="type != 'video'"
            class="main-photo"
            :src-placeholder="thumbnail"
            :src="webp"
            :alt="title"
          />

          <!-- <v-lazy-image  class="main-photo" :src-placeholder="thumbnail" :src="webp"/> -->

          <video
            v-if="type == 'video'"
            :src="videoUrl"
            controls
            :poster="thumbnail"
          ></video>
        </div>

        <div class="photo-info">
          <div class="header-icons">
            <div @click="sharePhoto()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#313131"
                stroke="#313131"
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

            <div
              v-if="link != '' && link != 'https://'"
              @click="downloadPhoto()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>

            <div v-if="isLoggedIn" @click="openCollectionDialog()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          <br /><br />

          <div class="post-title">{{ title }}</div>

          <div class="poster-info">
            <div class="poster-avatar-text-div" @click="viewUser()">
              <div v-if="posterProfilePhoto == ''" class="profile-avatar"></div>
              <!-- <img  class="profile-avatar" :src="posterProfilePhoto" /> -->

              <v-lazy-image
                v-if="posterProfilePhoto != ''"
                class="profile-avatar"
                :src-placeholder="thumbnail"
                :src="posterProfilePhoto"
              />

              <div class="text-info">
                <p class="poster-name">
                  {{ posterName }}
                  <span v-if="isVerified" class="verified-btn">
                    <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="verifiedIconTitle" stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"> <title id="verifiedIconTitle">Verified</title> <path d="M8 12.5L10.5 15L16 9.5"/> <path d="M12 22C13.2363 22 14.2979 21.2522 14.7572 20.1843C14.9195 19.8068 15.4558 19.5847 15.8375 19.7368C16.9175 20.1672 18.1969 19.9453 19.0711 19.0711C19.9452 18.1969 20.1671 16.9175 19.7368 15.8376C19.5847 15.4558 19.8068 14.9195 20.1843 14.7572C21.2522 14.2979 22 13.2363 22 12C22 10.7637 21.2522 9.70214 20.1843 9.24282C19.8068 9.08046 19.5847 8.54419 19.7368 8.16246C20.1672 7.08254 19.9453 5.80311 19.0711 4.92894C18.1969 4.05477 16.9175 3.83286 15.8376 4.26321C15.4558 4.41534 14.9195 4.1932 14.7572 3.8157C14.2979 2.74778 13.2363 2 12 2C10.7637 2 9.70214 2.74777 9.24282 3.81569C9.08046 4.19318 8.54419 4.41531 8.16246 4.26319C7.08254 3.83284 5.80311 4.05474 4.92894 4.92891C4.05477 5.80308 3.83286 7.08251 4.26321 8.16243C4.41534 8.54417 4.1932 9.08046 3.8157 9.24282C2.74778 9.70213 2 10.7637 2 12C2 13.2363 2.74777 14.2979 3.81569 14.7572C4.19318 14.9195 4.41531 15.4558 4.26319 15.8375C3.83284 16.9175 4.05474 18.1969 4.92891 19.0711C5.80308 19.9452 7.08251 20.1671 8.16243 19.7368C8.54416 19.5847 9.08046 19.8068 9.24282 20.1843C9.70213 21.2522 10.7637 22 12 22Z"/> </svg>
                  </span>
                </p>
                <p v-if="userPostsNum > 0" class="user-posts-num">
                  {{ userPostsNum }} photos
                </p>
              </div>
            </div>

            <div
              class="filled"
              v-if="link == '' || link == 'https://'"
              @click="downloadPhoto()"
            >
              <p>Download</p>
            </div>

            <div class="filled" v-if="link != '' && link != 'https://'">
              <a :href="link">
                <p>Open site</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <!-- <div class="bottom">
        <p
          v-if="hasMore"
          style="text-align: center; font-size: 1.2rem; font-weight: 500;"
        >
          Explore
        </p>
        <br />

        <div class="grid-container" style="column-count: 4;">
          <div v-for="photo in morePhotos">
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
      </div> -->
    </main>

    <div class="mobile">
      <!-- <img class="main-photo" :src="webp" /> -->

      <v-lazy-image
        v-if="type != 'video'"
        class="main-photo"
        :src-placeholder="thumbnail"
        :src="webp"
      />

      <video
        v-if="type == 'video'"
        :src="videoUrl"
        controls
        :poster="thumbnail"
      ></video>

      <!-- <p>Pic by {{ posterName }}</p> -->

      <div class="post-title">{{ title }}</div>

      <span class="tags">
        <div v-for="tag in tags">
          <router-link
            :to="{ name: 'Tag', params: { tag: tag } }"
            v-if="tag != ''"
            class="tag"
          >
            {{ tag }}
          </router-link>
        </div>
      </span>

      <div class="poster-info" v-if="!loading">
        <div class="poster-avatar-text-div" @click="viewUser()">
          <div v-if="posterProfilePhoto == ''" class="profile-avatar"></div>
          <img
            v-if="posterProfilePhoto != ''"
            class="profile-avatar"
            :src="posterProfilePhoto"
          />

          <div class="text-info">
            <p class="poster-name">
              {{ posterName }}
              <span v-if="isVerified" class="verified-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-star"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  ></polygon>
                </svg>
              </span>
            </p>
            <p v-if="userPostsNum > 0" class="user-posts-num">
              {{ userPostsNum }} photos
            </p>
          </div>
        </div>

        <div
          class="filled"
          v-if="link == '' || link == 'https://'"
          @click="downloadPhoto()"
        >
          <p>Download</p>
        </div>

        <div class="filled" v-if="link != '' && link != 'https://'">
          <a :href="link">
            <p>Open site</p>
          </a>
        </div>
      </div>

      <br />
      <br />
      <p
        v-if="hasMore"
        style="text-align: center; font-size: 1.2rem; font-weight: 500; margin-top: -10px;"
      >
        Explore
      </p>
      <!-- <br /> -->
      <!-- <br /> -->

      <div v-if="hasMore" class="grid-container" style="padding: 10px;">
        <div v-for="photo in morePhotos">
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

      <div v-if="hasMore && loadingMore" class="loading-more">
        <div class="big-spin">
          <div class="small-spin"></div>
        </div>
      </div>

      <!-- <half-circle-spinner
        v-if="hasMore && loadingMore"
        :animation-duration="1000"
        :size="40"
        color="#242424"
      /> -->
    </div>

    <div
      class="dialog-sheet"
      v-if="showCollectionDialog"
      key="collectionDialog"
      style="max-height: 60vh; overflow-y: scroll;"
    >
      <h1 class="closeDialogBtn" @click="closeCollectionDialog()">&times;</h1>

      <div
        v-if="loadingCollections"
        class="loading-more"
        style="padding-left: 0"
      >
        <div class="big-spin">
          <div class="small-spin"></div>
        </div>
      </div>

      <!-- <div class="loading-more">
        <half-circle-spinner
          v-if="loadingCollections"
          animation-duration="1000"
          size="400"
          color="#242424"
        />
      </div> -->

      <span class="dialog-main" v-if="!loadingCollections">
        <p class="title" style="margin-top: -39px; font-size: 20px;">
          Add to collection
        </p>
        <div @click="goToCreateCollection()" class="custom-link">
          <div class="custom-link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
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
          <p>New collection</p>
        </div>

        <span v-if="hasCollection">
          <div
            style="width: auto"
            v-for="collection in collections"
            :key="collection.id"
          >
            <div>
              <div
                class="collection-card"
                @click="chooseCollection(collection.id)"
              >
                <v-lazy-image
                  class="collection-photo"
                  :src-placeholder="thumbnail"
                  :src="collection.photo"
                />

                <div class="name-num">
                  <p class="collection-name">{{ collection.collectionName }}</p>
                  <p class="collection-num" v-if="collection.photosNum === 1">
                    {{ collection.photosNum }} photo
                  </p>
                  <p
                    class="collection-num"
                    v-if="collection.photosNum > 1 || collection.photosNum <= 0"
                  >
                    {{ collection.photosNum }} photos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>

      <!-- <span class="dialog-main" v-if="!loadingCollections">
        

        <p class="title" style="margin-top: -53px">Choose a collection</p>
        <div @click="goToCreateCollection()" class="custom-link">
          <div class="custom-link-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
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
          <p>New collection</p>
        </div>

        <span v-if="hasCollection">
          <div
            style="width: auto"
            v-for="collection in collections"
            :key="collection.id"
          >
            <div>
              <div
                class="collection-card"
                @click="chooseCollection(collection.id)"
              >

                <v-lazy-imageclass="collection-photo" :src="collection.photo"/>

                <div class="name-num">
                  <p class="collection-name">{{ collection.collectionName }}</p>
                  <p class="collection-num" v-if="collection.photosNum === 1">
                    {{ collection.photosNum }} photo
                  </p>
                  <p
                    class="collection-num"
                    v-if="collection.photosNum > 1 || collection.photosNum <= 0"
                  >
                    {{ collection.photosNum }} photos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span> -->
    </div>
    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#ffffff00"
      color="#1da1f2"
    ></vue-topprogress>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import MainHeader from "@/components/MainHeader";
import BottomNav from "@/components/BottomNav";
import VLazyImage from "v-lazy-image";
import { vueTopprogress } from "vue-top-progress";
import PostCard from "@/components/PostCard";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Photo",

  data() {
    return {
      loading: true,
      loadingMore: false,
      loadingCollections: false,
      showCollectionDialog: false,
      topProgressHeight: 4,
      hasCollection: false,
      collections: [],

      morePhotos: [],
      hasMore: false,
      isVerified: false,
      isLoggedIn: false,
      type: "photo",
      // isSaved: false,

      userPostsNum: 0,
      webp: "",

      posterId: "",
      photoUrl: "",
      videoUrl: "",
      thumbnail: "",
      title: "",
      posterName: "",
      posterProfilePhoto: "",
      tags: null,
      link: "",
      email: "",
    };
  },

  metaInfo() {
    return {
      title: `${this.title}`,
      meta: [
        { vmid: "description", name: "description", content: this.title },
        { vmid: "keywords", name: "keywords", content: this.tags },
      ],
    };
  },

  mounted() {
    this.checkAuthState();
    this.$refs.topProgress.start();
    this.getPostData();
  },

  // created() {
  //   this.changeToWebp()
  // },

  watch: {
    $route(to, from) {
      this.$refs.topProgress.start();
      this.getPostData();
    },
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
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    },

    goBack() {
      // window.history.back();
      this.$router.back();
    },

    async chooseCollection(collectionId) {
      console.log("choosing collection...", collectionId);
      this.showCollectionDialog = false;
      const myId = localStorage.getItem("uid");
      await db
        .collection("Collections")
        .doc(collectionId)
        .collection("Photos")
        .doc(this.$route.params.id)
        .set({
          posterUid: this.posterId,
          photo: this.photoUrl,
          title: this.title,
          savedTime: firebaseApp.serverTimestamp,
          postId: this.$route.params.id,
        })
        .then((val) => {
          this.updatePhoto(collectionId);
          this.updatePhotosNum(collectionId);
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
          this.loadingCollections = false;
          console.log("Added to collection...");
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
        .then((val) => {})
        .catch((err) => {
          console.log(err.message);
        });
    },

    goToCreateCollection() {
      this.$router.push({
        name: "NewCollection",
        params: {
          id: this.$route.params.id,
        },
      });
    },

    openCollectionDialog() {
      this.showCollectionDialog = true;
      this.checkCollections();
    },

    closeCollectionDialog() {
      this.showCollectionDialog = false;
    },

    addToCollection() {
      this.$router.push({
        name: "Collection",
        params: {
          id: this.$route.params.id,
        },
      });
    },

    async checkCollections() {
      this.loadingCollections = true;
      await db
        .collection("Collections")
        .where("owner", "==", localStorage.getItem("uid"))
        .orderBy("created", "desc")
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasCollection = true;
            this.loadingCollections = false;
            this.collections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.collections.push(collection);
            });
          } else {
            this.loadingCollections = false;
            this.hasCollection = false;
          }
        });
    },

    convertImgToBase64URL(url, callback, outputFormat) {
      var img = new Image();
      var t = this;
      img.crossOrigin = "Anonymous";

      img.onload = function() {
        var canvas = document.createElement("CANVAS"),
          ctx = canvas.getContext("2d"),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat);

        canvas.toBlob(
          (dataURL) => {
            var uri = URL.createObjectURL(dataURL);
            var img = new Image();

            img.onload = function() {
              t.$refs.topProgress.done();
              t.getPosterData();
              t.loadMore();
            };

            img.src = uri;
            t.webp = img.src;
            t.setClickedTags(t.tags);
          },
          "image/webp",
          0.5
        );
      };
      img.src = url;
    },

    changeToWebp() {
      this.convertImgToBase64URL(this.photoUrl, function(base64Img) {});
    },

    // async checkSaved() {
    //   const myId = localStorage.getItem("uid");

    //   if (myId != null) {
    //     await db
    //       .collection("Users")
    //       .doc(myId)
    //       .collection("Saved")
    //       .doc(this.$route.params.id)
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           this.isSaved = true;
    //         } else {
    //           this.isSaved = false;
    //         }
    //       });
    //   }
    // },

    // async removeSaved() {
    //   const myId = localStorage.getItem("uid");

    //   if (myId != null) {
    //     // this.loading = true;
    //     this.isSaved = false;

    //     await db
    //       .collection("Users")
    //       .doc(myId)
    //       .collection("Saved")
    //       .doc(this.$route.params.id)
    //       .delete()

    //       .catch((err) => {
    //         console.log(err.message);
    //       });
    //   } else {
    //     alert("Oops! login to remove photos");
    //   }
    // },

    // async save() {
    //   const myId = localStorage.getItem("uid");

    //   if (myId != null) {
    //     // this.loading = true;
    //     this.isSaved = true;

    //     await db
    //       .collection("Users")
    //       .doc(myId)
    //       .collection("Saved")
    //       .doc(this.$route.params.id)
    //       .set({
    //         posterUid: this.posterId,
    //         photo: this.photoUrl,
    //         title: this.title,

    //         savedTime: firebaseApp.serverTimestamp,
    //         postId: this.$route.params.id,
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //       });
    //   } else {
    //     alert("Oops! login to save photos");
    //   }
    // },

    downloadPhoto() {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        var blob = xhr.response;

        let randomNumber = Date.now() + Math.floor(Math.random() * 100);
        this.downloadBlob(blob, `gridd-${randomNumber}.jpg`);
      };
      xhr.open("GET", this.photoUrl);
      xhr.send();
    },

    downloadBlob(blob, name = "file.jpg") {
      if (window.navigator && window.navigator.msSaveOrOpenBlob)
        return window.navigator.msSaveOrOpenBlob(blob);

      const data = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = data;
      link.download = name;

      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    },

    viewUser() {
      this.$router.push({
        name: "User",
        params: {
          id: this.posterId,
        },
      });
    },

    async sharePhoto() {
      const shareData = {
        title: this.title,
        text: `Cool photo from Gridd - ${this.title} \n`,
        url: `https://grrid.netlify.app/photo/${this.$route.params.id}`,
      };

      try {
        await navigator.share(shareData);
        // alert("Photo shared! ✌️");
      } catch (err) {
        console.log("Share failed");
      }
    },

    async getPosterData() {
      await db
        .collection("Users")
        .doc(this.posterId)
        .get()
        .then((doc) => {
          this.posterProfilePhoto = doc.data()["photoUrl"];
          this.posterName = doc.data()["name"];
          this.email = doc.data()["email"];
          this.isVerified = doc.data()["verified"];
          this.loading = false;
          // this.$refs.topProgress.done()
        });

      await db
        .collection("Posts")
        .where("posterUid", "==", this.posterId)
        .get()
        .then((snapshot) => {
          this.userPostsNum = snapshot.docs.length;
          this.loading = false;
          // this.$refs.topProgress.done()
        });
    },

    async getPostData() {
      this.loading = true;
      // this.$refs.topProgress.start();

      await db
        .collection("Posts")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          this.photoUrl = doc.data()["photo"];
          this.videoUrl = doc.data()["video"];
          this.thumbnail = doc.data()["thumbnail"];
          this.posterId = doc.data()["posterUid"];
          this.title = doc.data()["title"];
          this.tags = doc.data()["tags"];
          // this.link = doc.data()["linkUrl"];
          this.type = doc.data()["type"];
          this.changeToWebp();
        })
        .catch((err) => {
          this.loading = false;
          this.$refs.topProgress.done();
          console.log(err.message);
        });
    },

    async setClickedTags(tags) {
      await localStorage.setItem("clickTags", JSON.stringify(tags));
    },

    async loadMore() {
      this.morePhotos = [];
      this.loadingMore = true;

      // if(this.type == 'Video')
      // if(this.type != 'Video')

      await db
        .collection("Posts")
        .where("tags", "array-contains-any", this.tags)
        .orderBy("postTime", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (
              doc.id != this.$route.params.id &&
              doc.data()["photo"] != null
            ) {
              let photo = doc.data();
              photo.id = doc.id;
              this.morePhotos.push(photo);
              this.hasMore = true;

              setTimeout(() => {
                this.loadingMore = false;
              }, 16000);
            }
          });
        })
        .catch((err) => {
          this.loading = false;
          this.loadingMore = false;
          console.log(err.message);
        });
    },
  },

  components: {
    HalfCircleSpinner,
    PostCard,
    MainHeader,
    VLazyImage,
    vueTopprogress,
    BottomNav,
  },
};
</script>

<style lang="scss" scoped>
main {
  display: block;
}

video {
  width: 100%;
  background: #000;
  margin-top: -50px;
  min-height: 100px;
}

.verified-btn {
  position: relative;
  top: 3px;
}

.v-lazy-image {
  // filter: opacity(0.3) blur(5px);
  filter: opacity(0.3);
  transition: ease 0.7s;
}
.v-lazy-image-loaded {
  filter: opacity(1);
  // filter: opacity(1) blur(0);
}

.poster-avatar-text-div {
  display: flex;
  align-items: center;
}

.tags {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  .tag {
    background: #f1f1f1;
    padding: 4px 5px;
    padding-bottom: 6px;
    border-radius: 4px;
    margin: 10px;
    cursor: pointer;
    border: 1px solid #eeeeee;
    // padding-right: 0;
  }

  .tag::before {
    content: "#";
    margin-right: -2px;
  }
}

.user-posts-num {
  font-weight: 400;
  margin-top: -5px;
}

.poster-info {
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .text-info {
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    margin-left: -10px;
  }
}

.profile-avatar {
  background: gainsboro;
  width: 45px;
  height: 45px;
  margin-top: 9px;
  margin-right: 20px;
}

main {
  max-width: 1810px;
  margin: 0 auto;
  margin-bottom: 50px;
  position: relative;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  // align-items: flex-start;
}

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

.dialogue-sheet a,
.dialogue-sheet div {
  &:hover {
    background: #f4f4f4;
  }
}

.custom-link {
  margin-left: -40px;
  align-items: center;
}

.title {
  font-weight: bold;
  margin-bottom: 0px;
  margin-left: 26px;
  margin-top: -36px;
  // font-size: 19px;
}

.poster-name {
  font-size: 1.2rem;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.buttons {
  display: flex;
  align-items: center;

  svg {
    background: #f4f4f4;
    padding: 9px;
    width: 45px;
    height: 45px;
    border-radius: 100px;
    cursor: pointer;
  }

  svg:hover {
    stroke: red;
    fill: red;
  }

  div {
    // margin: 10px;
  }

  div:first-child {
    margin-left: 0;
    display: flex;
    align-content: center;
  }
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.post-text {
  // margin-top: 12px;
  // margin-bottom: 30px;
  // display: flex;
  // justify-content: space-between;

  p {
    // white-space: nowrap;
    // overflow: hidden;
    // font-size: 1.6rem;
  }

  img {
    margin-left: 10px;
  }
}

.left {
  flex: 1;
  margin-right: 20px;
  position: sticky;
  top: 100px;
  overflow-y: scroll;
  height: 90vh;
  padding-right: 10px;
}

.main-photo {
  margin-top: -30px;
  background: gainsboro;
  border-radius: 0;
  min-height: 150px;
}

.post-title {
  // margin-bottom: 10px;
  font-weight: bold;
}

.right {
  flex: 1;
}

@media screen and (min-width: 320px) {
  .desktop,
  .top,
  .bottom {
    display: none;
  }

  .main-photo {
    margin-top: -50px;
    border-radius: 0;
    width: 100%;
  }

  .mobile {
    display: block;
  }

  .buttons {
    justify-content: space-between;
  }

  .post-text,
  .buttons {
    // padding: 0 15px;
  }

  .post-text {
    // margin-left: -14px;

    p {
      // overflow: visible;
      // white-space: inherit;
    }
  }

  .post-title {
    font-size: 1.7rem;
    text-align: center;
    padding: 10px 14px;
    padding-top: 15px;
    padding-bottom: 0;
  }

  .poster-info {
    padding: 10px;
  }

  .buttons {
    // margin-top: -13px;
    // margin-top: ;
    // flex-wrap: wrap;
  }

  .more-photos {
    margin-top: 30px;
    padding: 7px;
  }
}

.left {
  text-align: center;

  .main-photo {
    // border-radius: 20px;
    max-height: 62vh;
    object-fit: contain;
    width: 100%;
  }
}

@media screen and (min-width: 1160px) {
  .desktop {
    display: flex;
  }

  .top,
  .bottom {
    display: block;
  }

  .mobile {
    display: none;
  }

  .buttons {
    // justify-content: flex-start;
  }

  .main-photo {
    border-radius: 20px;
    margin-top: 0;
    max-width: 690px;
  }

  .filled p,
  .primary-btn p {
    font-size: 15px;
  }

  main {
    margin-top: 100px;
  }

  .desktop .top {
    margin: auto;
    max-width: 1300px;
    display: flex;
    justify-content: space-between;

    .main-photo-div {
      flex: 1;
    }

    // .bottom {
    //   margin-top: 91px;
    // }

    .post-title {
      text-align: left;
      font-size: 2.6rem;
    }

    .photo-info {
      // flex: 1;
      // background: #fff;
      // padding: 20px 10px;
      // border-radius: 20px;
      // margin-left: 25px;
      // min-width: 100px;
      // height: fit-content;
      // box-shadow: 0px 1px 20px 0px #eee, 0 0 20px #eee;

      flex: 1;
      background: #fff;
      padding: 20px 10px;
      border-radius: 10px;
      margin-left: 25px;
      min-width: 100px;
      height: -webkit-fit-content;
      height: -moz-fit-content;
      height: fit-content;
      border: 2px solid #f1f1f1;
    }
  }
}
</style>

<template>
  <div>
    <div class="post-card">
      <div @click="viewUser()">
        <v-lazy-image
        class="user-profile-photo"
        :src="posterProfilePhoto" />
      </div>

      <div class="main-contact-wrapper">
        <!-- <p class="grey repost-tag" v-if="isRepost">Reposted</p> -->
        <div class="top-section">
          <div class="top-section-text">
            <p class="poster-name bold" @click="viewUser()">{{posterName}}</p>
            <div class="dot" v-if="posterName != ''"></div>
            <p class="post-date">{{newDate}}</p>
          </div>
          <svg @click="showPostDialog = !showPostDialog" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
        </div>

        <div class="content-section">
          <p class="post-title" @click="viewPost()">{{title}}</p>
          
          <div class="repost-post-card" @click="viewRepost()" v-if="isRepost">
            <div class="repost-top-section">
              <v-lazy-image
              class="repost-user-profile-photo"
              :src="originalPosterProfileImg" />

              <p class="poster-name bold">{{originalPosterName}}</p>
            </div>

            <p class="repost-post-title" v-if="originalPostTitle != ''">{{originalPostTitle}}</p>

            <div v-if="type != 'video' && type != 'text'" class="post-image-wrapper">
              <v-lazy-image
              class="repost-post-image"
              +
              :src="webp"
              :src-placeholder="thumbnail" />
            </div>
            <div v-if="type == 'video' && type != 'text'" class="post-image-wrapper">
              <v-lazy-image
              class="repost-post-image"
              :src="webp"
              :src-placeholder="thumbnail" />
              
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play play-btn"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>

          <div v-if="!isRepost && type != 'video' && type != 'text'" class="post-image-wrapper" @click="viewPost()">
            <v-lazy-image
            class="post-image"
            :src="webp"
            :src-placeholder="thumbnail" />
          </div>
          <div v-if="!isRepost && type == 'video' && type != 'text'" class="post-image-wrapper" @click="viewPost()">
            <v-lazy-image
            class="post-image"
            :src="webp"
            :src-placeholder="thumbnail" />
            
            <svg @click="viewPost()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play play-btn"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      
        <div class="post-action-bar">
          <div class="icon-and-number" @click="likePost()">
            <svg v-if="!isLiked" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>

            <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>

            <span v-if="likes > 0">{{ likes }}</span>
          </div>

          <div class="icon-and-number" @click="viewPost()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>

            <span v-if="comments > 0">{{ comments }}</span>
          </div>

          <div @click="repost()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          </div>

          <div @click="sharePost()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9c9c9c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>

        </div>
      </div>
    </div>



    <div class="dialog-sheet" v-if="showPostDialog" key="postDialog">
      <h1 class="closeDialogBtn" @click="showPostDialog = false">&times;</h1>
       <div @click="save()" v-if="!isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>Mark for later
      </div>
      <div @click="removeSaved()" v-if="isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Unmark post</div>
      <div @click="downloadPhoto()">
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
          class="feather feather-download"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download
      </div>
      <div @click="sharePhoto()">
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
        Share to...
      </div>
      <div @click="openCollectionDialog()" v-if="isSignedIn">
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
          class="feather feather-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add to my list
      </div>
      <router-link to="/login" v-if="!isSignedIn" class="primary-color"
        >Login / Signup</router-link
      >
      <router-link to="/report" v-if="isSignedIn">
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
        Block / hide</router-link
      >
      <div
        @click="deletePhoto()"
        v-if="isMyPhoto && isSignedIn"
        class="primary-color"
      >
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
        Delete
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/style.css'

import * as linkify from 'linkifyjs';
import 'linkifyjs/plugins/hashtag';
import 'linkifyjs/plugins/mention';
import linkifyStr from 'linkifyjs/html';
import linkifyHtml from 'linkifyjs/html';
import linkifyElement from 'linkifyjs/html';

import { HalfCircleSpinner } from "epic-spinners";
import AddCollectionCard from "@/components/AddCollectionCard";
import VLazyImage from "v-lazy-image";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "PostContentCard",

  data() {
    return {
      webp: "",
      linkifiedTitle: '',
      isVerified: false,
      fullyLoaded: false,
      showPostDialog: false,
      showCollectionDialog: false,
      isSaved: false,
      isMyPhoto: false,
      isSignedIn: false,
      hasVideoAndPhoto: false,

      likes: 0,
      isLiked: false,
      mentionsNum: 0,
      comments: 0,

      // loading: true,
      // hasCollection: false,
      // collections: [],
      routeId: this.$route.params.id,
      newId: "",
      newDate: "",

      posterName: "",
      posterUsername: "",
      posterProfilePhoto: "",

      originalPosterUid: '',
      originalPosterName: '',
      originalPostTitle: '',
      originalPostId: '',
      originalPosterProfileImg: '',
      isRepost: '',

      // posterId: "",
      // photoUrl: "",
      // title: "",
    };
  },

  components: {
    VLazyImage,
    AddCollectionCard,
    HalfCircleSpinner,
  },

  props: {
    photoUrl: {
      default: null,
      required: true,
    },

    posterId: {
      type: String,
      default: "",
      required: true,
    },

    title: {
      type: String,
      default: "",
      required: true,
    },

    mentions: {
    },

    id: {
      type: String,
      default: "",
      required: true,
    },

    tags: {
      // required: true,
    },

    thumbnail: {
      type: String,
      default: "",
      // required: true,
    },

    type: {
      type: String,
      default: "",
      // required: true,
    },

    date: {
      required: true,
    },

    video: {
      type: String,
      default: "",
      // required: true,
    },
  },

  mounted() {
    this.checkAuthState()
    this.getPostMoreInfo()
    this.checkHasVideoOrPhoto()
    // this.linkifyContent()
    this.getMentionsNum()
    this.convertDate()
    this.getLikesNum()
    this.getComments()
    this.checkLiked()
    this.checkSaved()
    this.checkIsMyPhoto()
    this.checkLoaded()
    this.getPosterInfo()
  },

  created() {
    this.changeToWebp();
  },

  watch: {
    $route(to, from) {
      this.showPostDialog = false;
    },

    $props: {
      handler(val) {
        // console.log('handler or something', val.id)
        this.newId = val.id;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {

    checkHasVideoOrPhoto() {
      // console.log(this.photoUrl, this.video)
      // if(this.photoUrl == '' || this.photoUrl == null) this.hasPhoto = false;
      // else hasPhoto = true

      // if(this.video == '' || this.video == null) this.video = false;
      // else video = true

      if((this.video == '' || this.video == null) && (this.photoUrl == '' || this.photoUrl == null)) this.hasVideoAndPhoto = false;
      else this.hasVideoAndPhoto = true
    },

    async getComments() {
      await db
        .collection("Posts")
        .doc(this.id)
        .collection("Comments")
        .orderBy("postTime", "desc")
        .onSnapshot((snapshot) => {
          this.comments = this.formatNumbers(snapshot.size);
        });
    },

    viewPost() {
      this.$router.push({
        name: "Status",
        params: {
          id: this.id,
        },
      });
    },

    viewRepost() {
      this.$router.push({
        name: "Status",
        params: {
          id: this.originalPostId,
        },
      });
    },

    async repost() {
      // console.log(this.originalPostId)

      // if(this.originalPostId != null) {
      //   console.log('id not null')
      //   this.$router.push({
      //     name: "Repost",
      //     params: {
      //       id: this.originalPostId,
      //     },
      //   });
      // }

      // if(this.originalPostId == null) {
        // console.log('id null')
        this.$router.push({
          name: "Repost",
          params: {
            id: this.id,
          },
        });
      // }
    },

    // linkifyContent() {
    //   setTimeout(() => {
    //     var postTitle = document.getElementById('post-title')
    //     console.log(postTitle)

    //     var linkifiedElement = linkifyStr(postTitle.innerHTML, {
    //       formatHref: function (href, type) {
    //         if (type === 'url') {
    //           return href;
    //           console.log(type, href)
    //         }

    //         if (type === 'mention') {
    //           return 'https://grrid.netlify.app/user/' + href.substring(1);
    //           console.log(type, href)
    //         }

    //         if (type === 'hashtag') {
    //           return 'https://grrid.netlify.app/tags/' + href.substring(1);
    //           console.log(type, href)
    //         }
    //       }
    //     });

    //     var div = document.createElement('div')
    //     div.innerHTML = linkifiedElement.trim()
    //     console.log(div.innerHTML, div.firstChild)
    //     postTitle.innerHTML = div.innerHTML
    //   },
    //   4000)
    // },

    getMentionsNum() {
      // console.log(this.mentions, this.mentions.length)

      this.mentionsNum = this.mentions.length
    },

    seeMentioned() {
      this.$router.push({
        name: "Mentioned",
        params: {
          id: this.id,
        },
      })
    },

    async getLikesNum() {
      await db
        .collection("Posts")
        .doc(this.id)
        .collection("Likes")
        .onSnapshot((doc) => {
          this.likes = this.formatNumbers(doc.size);
        });
    },

    formatNumbers(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + "k";
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      } else if (num < 900) {
        return num;
      }
    },

    async likePost() {
      if (localStorage.getItem("uid") != null) {
        this.isLiked = !this.isLiked;

        if (this.isLiked) {
          await db
            .collection("Posts")
            .doc(this.id)
            .collection("Likes")
            .doc(localStorage.getItem("uid"))
            .set({
              liked: true,
              userId: localStorage.getItem("uid"),
            });
            
            if(this.posterId != localStorage.getItem('uid')) this.sendAlert()
        }

        if (!this.isLiked) {
          await db
            .collection("Posts")
            .doc(this.id)
            .collection("Likes")
            .doc(localStorage.getItem("uid"))
            .delete();
        }
      } else alert("please sign in");
    },

    async sendAlert() {
      // console.log(this.posterId)

      await db
      .collection('Users')
      .doc(this.posterId)
      .collection('Notifications')
      .add({
        'type': 'like',
        'notificationText': `${localStorage.getItem('name')} liked your post`,
        'targetPageId': this.id,
        'notificationTime': firebaseApp.serverTimestamp,
        'userId': localStorage.getItem('uid'),
        'username': localStorage.getItem('name'),
        'targetText': null,
        'isRead': false,
      })

      this.commentText = ''
    },

    async checkLiked() {
      await db
        .collection("Posts")
        .doc(this.id)
        .collection("Likes")
        .doc(localStorage.getItem("uid"))
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log('is liked!')
            this.isLiked = true;
          } else {
            this.isLiked = false;
            // console.log('not liked!')
          }
        });
    },

    convertDate() {
      var dateValue = this.date.toDate();
      var stringDate = new Date(this.date.seconds * 1000);
      this.newDate = stringDate.toDateString();
    },

    intersected() {
      // console.log("intersected");
    },

    viewUser() {
      this.$router.push({
        name: "User",
        params: {
          id: this.posterId,
        },
      });
    },

    // like() {
    //   console.log('like click!')
    // },

    async getPosterInfo() {
      await db
        .collection("Users")
        .doc(this.posterId)
        .onSnapshot((doc) => {
          this.posterName = doc.data()["name"];
          this.posterUsername = doc.data()["username"]
          this.posterProfilePhoto = doc.data()["photoUrl"];
          this.isVerified = doc.data()["verified"];
        });
    },

    async getPostMoreInfo() {
      await db
      .collection("Posts")
      .doc(this.id)
      .get()
      .then((doc) => {
        this.originalPosterUid = doc.data()["originalPosterUid"];
        this.originalPostTitle = doc.data()["originalPostTitle"];
        this.originalPostId = doc.data()["originalPostId"];
        // this.postId = doc.data()['postId'];
        this.isRepost = doc.data()["isRepost"];

        if(this.isRepost) this.getOriginalPosterInfo(this.originalPosterUid)
      })
      .catch((err) => {
        console.log(err.message);
      });
    },

    async getOriginalPosterInfo(userID) {
      await db
      .collection('Users')
      .doc(userID)
      .onSnapshot(snapshot => {
        console.log(`............${snapshot.data()['name']}`)
        this.originalPosterName = snapshot.data()["name"];
        this.originalPosterProfileImg = snapshot.data()["photoUrl"];
      })
    },

    checkLoaded() {
      // console.log('checking...')
      // let ele = document.querySelector('.post-image')
      // console.log(ele)
      // ele.style.background = 'red'
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

            img.src = uri;
            t.webp = img.src;
            // document.querySelector('.post-image').src = img.src

            img.onload = function() {
              setTimeout(() => {
                t.fullyLoaded = true;
                // console.log(t.id)
              }, 1000);
              // img.style.background = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
            };
          },
          "image/webp",
          0.2
        );
      };
      img.src = url;
    },

    changeToWebp() {
      this.convertImgToBase64URL(this.photoUrl, function(base64Img) {});
    },

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

    checkIsMyPhoto() {
      const myId = localStorage.getItem("uid");

      if (this.posterId == myId) {
        this.isMyPhoto = true;
      } else {
        this.isMyPhoto = false;
      }
    },

    async checkSaved() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.isSaved = true;
            } else {
              this.isSaved = false;
            }
          });
      }
    },

    async deletePhoto() {
      await db
        .collection("Posts")
        .doc(this.newId)
        .delete()
        .then((val) => {
          // alert("Photo will be deleted");
          this.removeCoins();
        });

        this.closeCollectionDialog()
    },

    async removeCoins() {
      // console.log("removing coins...");
      var coins;

      await db
        .collection("Users")
        .doc(localStorage.getItem("uid"))
        .get()
        .then((doc) => {
          coins = doc.data()["coins"] - 10;
        });

      await db
        .collection("Users")
        .doc(localStorage.getItem("uid"))
        .update({
          coins: coins,
        })
        .then((val) => {})
        .catch((err) => {
          console.log(err.message);
        });
    },

    async save() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        this.isSaved = true;
        this.showPostDialog = false;

        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .set({
            'posterUid': this.posterId,
            'photo': this.photoUrl,
            'thumbnail': this.thumbnail,
            'type': this.type,
            'title': this.title,
            'tag': this.tags,
            'savedTime': firebaseApp.serverTimestamp,
            'postTime': this.date,
            'postId': this.newId,
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Oops! login to save photos");
      }
    },

    async removeSaved() {
      const myId = localStorage.getItem("uid");

      if (myId != null) {
        this.isSaved = false;
        this.showPostDialog = false;

        await db
          .collection("Users")
          .doc(myId)
          .collection("Saved")
          .doc(this.newId)
          .delete()
          .then(() => {
            this.checkSaved();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        alert("Oops! login to remove photos");
      }
    },

    async sharePost() {
      this.showPostDialog = false;
      const shareData = {
        title: this.title,
        text: `Look at this... ${this.title}`,
        url: `https://grrid.netlify.app/status/${this.newId}`,
      };

      try {
        await navigator.share(shareData);
        // alert("Photo shared! ✌️");
      } catch (err) {
        // console.log("Share failed");
      }
    },

    downloadPhoto() {
      this.showPostDialog = false;
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

    downloadBlob(blob, name = "photo.jpg") {
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

    viewPost() {
      this.showPostDialog = false;
      this.$router.push({
        name: "Status",
        params: {
          id: this.newId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-size: .92rem;
  color: #9c9c9c;
}

.bold {
  color: #000
}

.post-title {
  color: #000;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dot {
  top: 0;
  background: #9c9c9c
}

svg {
  margin: 0;
}

.repost-top-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.repost-post-card {
  border: 1px solid #E6E7E7;
  padding: 10px;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

.repost-user-profile-photo {
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 100px;
  background: gainsboro;
}

.post-card {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 15px;
  width: 100%;
  border-bottom: 1px solid #E6E7E755;
}

.post-card .user-profile-photo {
  width: 45px;
  height: 45px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 100px;
  background: gainsboro;
}

.top-section .top-section-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.repost-post-title {
  color: #000;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bold {
  font-weight: bold;
  font-family: 'bold';
  color: #000;
}

.grey {
  color: #9c9c9c;
}

.repost-tag {
  margin-bottom: 3px;
}

.post-title {
  color: #000;
}

.content-section {
  width: 100%;
}

.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.5px;
}

.top-section-text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.main-contact-wrapper {
  width: 100%;
}

.post-image {
  min-height: 130px;
  max-height: 380px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: gainsboro;
  border-radius: 13px;
  margin-top: 8px;
}

.repost-post-image {
  min-height: 130px;
  max-height: 200px;
  width: 108%;
  -o-object-fit: cover;
  object-fit: cover;
  background: gainsboro;
  border-radius: 13px;
  margin-top: 8px;
  margin-left: -10px;
  margin-bottom: -14px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.post-image-wrapper {
  position: relative;
}

.play-btn {
  position: absolute;
  top: 37%;
  left: 41%;
  background: #00acee;
  padding: 7px;
  padding-left: 7px;
  border-radius: 100px;
  padding-left: 12px;
  width: 46px;
  height: 46px;
  border: 3px solid #fff;
}

.icon-and-number {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-and-number span {
  margin-left: 3px;
}

.post-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}
</style>

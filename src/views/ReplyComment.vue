<template>
  <!-- <video style="width: 100%; height: 300px; object-fit: cover" @click="viewPhoto()" v-on:dblclick="likePost()" :src="video" class="poster-image" autoplay controls></video> -->
  <div>
    <BackHeader name="Reply" />
    <div class="post-card">
      <div class="post-image-wrapper">
        <div class="video-thumbnail-container">
          <div class="top-bar">
            <div class="poster-info" @click="viewUser()">
              <img
                class="poster-image"
                :src="posterProfilePhoto"
              />

              <b class="name">
                <div class="name-username">
                  <div class="name-text">{{ posterName }}</div>
                  <div class="username-text" v-if="posterUsername != ''"> @{{ posterUsername }}</div>
                </div>


                <span v-if="isVerified" class="verified-btn">
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> -->

                  <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="verifiedIconTitle" stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="verifiedIconTitle">Verified</title> <path d="M8 12.5L10.5 15L16 9.5"/> <path d="M12 22C13.2363 22 14.2979 21.2522 14.7572 20.1843C14.9195 19.8068 15.4558 19.5847 15.8375 19.7368C16.9175 20.1672 18.1969 19.9453 19.0711 19.0711C19.9452 18.1969 20.1671 16.9175 19.7368 15.8376C19.5847 15.4558 19.8068 14.9195 20.1843 14.7572C21.2522 14.2979 22 13.2363 22 12C22 10.7637 21.2522 9.70214 20.1843 9.24282C19.8068 9.08046 19.5847 8.54419 19.7368 8.16246C20.1672 7.08254 19.9453 5.80311 19.0711 4.92894C18.1969 4.05477 16.9175 3.83286 15.8376 4.26321C15.4558 4.41534 14.9195 4.1932 14.7572 3.8157C14.2979 2.74778 13.2363 2 12 2C10.7637 2 9.70214 2.74777 9.24282 3.81569C9.08046 4.19318 8.54419 4.41531 8.16246 4.26319C7.08254 3.83284 5.80311 4.05474 4.92894 4.92891C4.05477 5.80308 3.83286 7.08251 4.26321 8.16243C4.41534 8.54417 4.1932 9.08046 3.8157 9.24282C2.74778 9.70213 2 10.7637 2 12C2 13.2363 2.74777 14.2979 3.81569 14.7572C4.19318 14.9195 4.41531 15.4558 4.26319 15.8375C3.83284 16.9175 4.05474 18.1969 4.92891 19.0711C5.80308 19.9452 7.08251 20.1671 8.16243 19.7368C8.54416 19.5847 9.08046 19.8068 9.24282 20.1843C9.70213 21.2522 10.7637 22 12 22Z"/> </svg>
                </span>
              </b>
            </div>

            <div class="post-action-icons">
              <div class="like-icon-and-num">
                <svg
                  v-if="!isLiked"
                  @click="likePost()"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657786"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-heart"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>

                <svg
                  v-if="isLiked"
                  @click="likePost()"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="red"
                  stroke="red"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-heart"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>

                <!-- <div class="likes-num" v-if="likes > 0">{{ likes }}</div> -->
              </div>

              <div @click="sharePost()">
                <!-- <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657786"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-share"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg> -->

                <svg
                  @click="shareProfile()"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657786"
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
              </div>

              <div>
                <!-- <svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AAB8C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg> -->
                <svg
                  @click="showPostDialog = !showPostDialog"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657786"
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

          <!-- <div class="other-post-info">
            {{newDate}}
          </div> -->

          <span v-if="title != ''">
            <div class="bottom">
              <div class="post-title" id="post-title">{{title}}</div>
              <!-- <p class="post-title">{{ linkifiedTitle }}</p> -->
            </div>
          </span>

          <div class="thumbnail-photo-container" v-if="type != 'video' && type != 'text'">
            <div @dblclick="likePost()">
              <v-lazy-image
                class="post-image"
                :src="webp"
                :alt="title"
                :src-placeholder="thumbnail"
              />
            </div>
          </div>

          <div class="thumbnail-photo-container" v-if="type == 'video' && type != 'text'">
            <video
              v-if="type == 'video'"
              :src="video"
              controls
              :poster="thumbnail">    
            </video>
          </div>
        </div>

        <span class="tags">
          <div v-for="tag in tags" class="tag" v-if="tag != ''">
            <router-link
              :to="{ name: 'Tag', params: { tag: tag } }"
              v-if="tag != ''"
              class="tag"
            >
              #{{ tag }}
            </router-link>
          </div>
        </span>

        <div class="other-post-info" v-if="posterName != ''">
          <div>{{newDate}}</div>

          <div v-if="likes == 1"><b>{{likes}}</b> like</div>
          <div v-if="likes > 1"><b>{{likes}}</b> likes</div>
          <div v-if="likes <= 0">No likes</div>

          <div v-if="comments == 1"><b>{{comments}}</b> reply</div>
          <div v-if="comments > 1"><b>{{comments}}</b> replies</div>
          <div v-if="comments <= 0">No replies</div>
        </div>

        
      </div>
    </div>

    <div v-if="isSignedIn" class="input-box-wrapper">
      <div><img :src="myProfilePhoto"></div>
      <input v-model='commentText' type="text" placeholder="Type a reply...">
      <div class="send-btn" @click="sendComment()">Send</div>
    </div>

    <br>

    <CommentReplyCard v-for="comment in commentsArray" :key="comment.id"
      :commentText="comment.commentText"
      :commenterId="comment.commenterId"
      :commentTime="comment.postTime"
      :commentId="comment.id"
    />

    <br>
    <br>
    <br>
    <br>

    <div class="dialog-sheet" v-if="showPostDialog" key="postDialog">
      <p class="closeDialogBtn" @click="showPostDialog = false">&times;</p>
       
       <div @click="save()" v-if="!isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AAB8C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>Mark for later
      </div>
      <div @click="removeSaved()" v-if="isSaved && isSignedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#AAB8C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg> Unmark post</div>
      <div @click="downloadPhoto()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#AAB8C2"
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
      <div @click="sharePost()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#AAB8C2"
          stroke="#AAB8C2"
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
          stroke="#AAB8C2"
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
      <router-link to="/feedback" v-if="isSignedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#AAB8C2"
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

    <div
      class="dialog-sheet"
      v-if="showCollectionDialog"
      key="collectionDialog"
      style="max-height: 60vh; overflow-y: scroll; padding-top: 90px"
    >
      <p class="closeDialogBtn" @click="closeCollectionDialog()">&times;</p>

      <!-- <div v-if="loading" class="loading-more" style="padding-left: 0">
        <div class="big-spin">
          <div class="small-spin"></div>
        </div>
      </div> -->

      <div class="loading-more" style="width: 100%; padding-left: 0">
        <half-circle-spinner
          v-if="loading"
          :animation-duration="1000"
          :size="30"
          color="#AAB8C2"
        />
      </div>

      <span class="dialog-main" v-if="!loading">
        <p
          class="title"
          style="margin-bottom: 0; margin-top: -124px; font-size: 20px;"
        >
          Choose a collection
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
          <p>New List</p>
        </div>

        <span v-if="hasCollection">
          <div
            style="width: auto"
            v-for="collection in collections"
            :key="collection.id"
          >
            <div>
              <div class="collection-card" @click="getPostInfo(collection.id)">
                <img
                  class="collection-photo"
                  :src="collection.photo"
                />
                <div class="name-num">
                  <p class="collection-name">
                    {{ collection.collectionName }}
                    <span v-if="collection.isPublic == false">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#313131"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-lock"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                  </p>
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
    </div>

    <BottomNav />


    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#1da1f2"
      color="#1da1f2"
    ></vue-topprogress>

  </div>
</template>

<script>
import '@/styles/style.css'

import BackHeader from "@/components/BackHeader"
import BottomNav from "@/components/BottomNav"
import * as linkify from 'linkifyjs'
import 'linkifyjs/plugins/hashtag'
import 'linkifyjs/plugins/mention'
import linkifyStr from 'linkifyjs/html'
import linkifyHtml from 'linkifyjs/html'
import linkifyElement from 'linkifyjs/html'

import { vueTopprogress } from "vue-top-progress"

import { HalfCircleSpinner } from "epic-spinners"
// import AddCollectionCard from "@/components/AddCollectionCard"
import VLazyImage from "v-lazy-image"
import CommentReplyCard from "@/components/CommentReplyCard"
import firebaseApp from "../firebaseConfig.js"
const db = firebaseApp.firestore();

export default {
  name: "ReplyComment",

  data() {
    return {
      commentsArray: [],

      webp: "",
      linkifiedTitle: '',
      isVerified: false,
      fullyLoaded: false,
      showPostDialog: false,
      showCollectionDialog: false,
      isSaved: false,
      isMyPhoto: false,
      isSignedIn: false,

      // pageName: 'Reply',

      commentText: '',
      commentTextToShare: '',

      likes: 0,
      comments: 0,
      isLiked: false,
      topProgressHeight: 4,

      loading: true,
      hasCollection: false,
      collections: [],
      routeId: this.$route.params.id,
      postId: this.$route.params.id,
      newDate: "",

      posterName: "",
      posterUsername: '',
      posterProfilePhoto: "",
      myProfilePhoto: localStorage.getItem('photoUrl'),

      title: '',
      posterId: '',
      tags: '',
      photoUrl: null,
      type: '',
      date: '',
      video: null,
      thumbnail: '',

      mentions: [],
      hashtags: [],

      // posterProfilePhoto: '',

      // posterId: "",
      // photoUrl: "",
      // title: "",
    };
  },

  components: {
    VLazyImage,
    CommentReplyCard,
    BackHeader,
    BottomNav,
    // AddCollectionCard,
    HalfCircleSpinner,
    vueTopprogress,
  },


  mounted() {
    this.checkAuthState()
    this.getPostInfo()
  },

  methods: {

    // putUsernameInInput() {
    //   console.log(this.posterUsername)
    //   this.commentText = `@${this.posterUsername}`
    // },

    async getComments() {

      this.$refs.topProgress.start()

      await db
        .collection("Replies")
        .doc(this.$route.params.id)
        .collection("Comments")
        .orderBy("postTime", "desc")
        // .get()
        .onSnapshot((snapshot) => {
          this.comments = this.formatNumbers(snapshot.size);
          this.commentsArray = []

          snapshot.forEach((doc) => {
            let comment = doc.data();
            comment.id = doc.id;
            this.commentsArray.push(comment);
          });

        });
      
      this.$refs.topProgress.done();
    },

    async sendMentionAlerts(commentText) {
      if(this.mentions == []) return;

      else {
        for (var i = this.mentions.length; i--; ) {
          await db
          .collection('Users')
          .doc(this.mentions[i])
          .collection('Notifications')
          .add({
            'type': 'replyMention',
            'userProfile': localStorage.getItem('photoUrl'),
            'notificationText': `${localStorage.getItem('name')} mentioned you in a comment`,
            'targetPageId': this.$route.params.id,
            'notificationTime': firebaseApp.serverTimestamp,
            'userId': localStorage.getItem('uid'),
            'username': localStorage.getItem('name'),
            'targetText': commentText,
            'isRead': false,
          })
        }
        this.$refs.topProgress.done();
      }
    },

    async sendComment() {
      if(this.commentText.trim() != '') {
        this.commentTextToShare = this.commentText
        this.$refs.topProgress.start();
        this.commentText = ''
        let t = this

        linkifyStr(t.commentTextToShare,{
          formatHref: function (href, type) {
            if (type === 'mention') t.mentions.push(href.substring(1))
            if (type === 'hashtag') t.hashtags.push(href.substring(1))
            return href;
          }
        });

        setTimeout(async () => {
          await db
          .collection("Replies")
          .doc(this.$route.params.id)
          .collection("Comments")
          .add({
            'commentText': this.commentTextToShare.trim(),
            'commenterId': localStorage.getItem('uid'),
            'commentId': this.$route.params.id,
            'postTime': firebaseApp.serverTimestamp,
          })

          .then(async (val) => {
            // *****insert comment as post ready for reply
            
            await db
            .collection("Replies")
            .doc(val.id)
            .set({
              'photo': null,
              'thumbnail': null,
              'title': this.commentTextToShare.trim(),
              'posterName': localStorage.getItem('name'),
              'posterUid': localStorage.getItem('uid'),
              'type': 'text',
              'isPostReply': true,
              'commentReplyingTo': this.$route.params.id,
              'postTime': firebaseApp.serverTimestamp,
              'tags': this.hashtags,
              'mentions': this.mentions,
            })
          })

          this.getComments()
          
          if(this.posterId != localStorage.getItem('uid')) {
            this.sendMentionAlerts(this.commentTextToShare.trim());
            this.sendAlert()
          }
        }, 2500)
      }
    },

    async sendAlert() {
      // console.log(this.posterId)

      await db
      .collection('Users')
      .doc(this.posterId)
      .collection('Notifications')
      .add({
        'type': 'commentReply',
        'notificationText': `${localStorage.getItem('name')} sent a reply`,
        'targetPageId': this.$route.params.id,
        'notificationTime': firebaseApp.serverTimestamp,
        'userId': localStorage.getItem('uid'),
        'username': localStorage.getItem('name'),
        'targetText': this.commentTextToShare.trim(),
        'isRead': false,
      })

      // this.commentText = ''
    },

    viewUser() {
      this.$router.push({
        name: "User",
        params: {
          id: this.posterId,
        },
      });
    },

    async getLikesNum() {
      await db
        .collection("Replies")
        .doc(this.$route.params.id)
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

    async getPostInfo() {
      await db
        .collection("Replies")
        .doc(this.$route.params.id)
        .onSnapshot((doc) => {
          // console.log(doc.data()['posterUid'])

          this.title = doc.data()['title']
          this.posterId = doc.data()['posterUid']
          this.tags = doc.data()['tags']
          this.photoUrl = doc.data()['photo']
          this.type = doc.data()['type']
          this.date = doc.data()['postTime']
          this.video = doc.data()['video']

          if(this.title != null && this.title != '') {
            this.linkifyContent()  
          }
          
          this.convertDate()
          this.getPosterInfo()
          this.checkLiked();
          this.getLikesNum()
          this.getComments()
        });
    },

    async checkLiked() {
      await db
        .collection("Replies")
        .doc(this.$route.params.id)
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

    checkIsMyPhoto() {
      const myId = localStorage.getItem("uid");

      if (this.posterId == myId) {
        this.isMyPhoto = true;
      } else {
        this.isMyPhoto = false;
      }
    },

    async deletePhoto() {
      await db
        .collection("Replies")
        .doc(this.postId)
        .delete()
        .then((val) => {
          // alert("Photo will be deleted");
          this.removeCoins();
        });

        this.closeCollectionDialog()
    },

    async removeCoins() {
      console.log("removing coins...");
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

    async getPosterInfo() {
      // console.log(this.posterId)

      await db
        .collection("Users")
        .doc(this.posterId)
        .onSnapshot((doc) => {
          this.posterName = doc.data()["name"];
          this.posterUsername = doc.data()["username"]
          this.posterProfilePhoto = doc.data()["photoUrl"];
          this.isVerified = doc.data()["verified"];
          // this.putUsernameInInput()
          // this.pageName += ` @${this.posterUsername}` 
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
          .doc(this.postId)
          .set({
            'posterUid': this.posterId,
            'photo': this.photoUrl,
            'thumbnail': this.thumbnail,
            'type': this.type,
            'title': this.title,
            'tag': this.tags,
            'savedTime': firebaseApp.serverTimestamp,
            'postTime': this.date,
            'postId': this.postId,
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
          .doc(this.postId)
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
        url: `https://grrid.netlify.app/reply/${this.postId}`,
      };

      try {
        await navigator.share(shareData);
      } catch (err) {}
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

    linkifyContent() {
      setTimeout(() => {
        var postTitle = document.getElementById('post-title')

        var linkifiedElement = linkifyStr(postTitle.innerHTML, {
          formatHref: function (href, type) {
            if (type === 'url') {
              return href;
            }

            if (type === 'mention') {
              return 'https://grrid.netlify.app/user/' + href.substring(1);
            }

            if (type === 'hashtag') {
              return 'https://grrid.netlify.app/tag/' + href.substring(1);
            }
          }
        });

        var div = document.createElement('div')
        div.innerHTML = linkifiedElement.trim()
        // console.log(div.innerHTML, div.firstChild)
        postTitle.innerHTML = div.innerHTML
      }, 1000)
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

    convertDate() {
      var dateValue = this.date.toDate();
      var stringDate = new Date(this.date.seconds * 1000);
      this.newDate = stringDate.toDateString();
    },

    async likePost() {
      if (localStorage.getItem("uid") != null) {
        this.isLiked = !this.isLiked;

        if (this.isLiked) {
          await db
            .collection("Replies")
            .doc(this.$route.params.id)
            .collection("Likes")
            .doc(localStorage.getItem("uid"))
            .set({
              liked: true,
              userId: localStorage.getItem("uid"),
            });
            
            if(this.posterId != localStorage.getItem('uid')) this.sendLikeAlert()
        }

        if (!this.isLiked) {
          await db
            .collection("Replies")
            .doc(this.$route.params.id)
            .collection("Likes")
            .doc(localStorage.getItem("uid"))
            .delete();
        }
      } else alert("please sign in");
    },

    async sendLikeAlert() {
      // console.log(this.posterId)

      await db
      .collection('Users')
      .doc(this.posterId)
      .collection('Notifications')
      .add({
        'type': 'like',
        'notificationText': `${localStorage.getItem('name')} liked your post`,
        'targetPageId': this.$route.params.id,
        'notificationTime': firebaseApp.serverTimestamp,
        'userId': localStorage.getItem('uid'),
        'username': localStorage.getItem('name'),
        'targetText': null,
        'isRead': false,
      })

      this.commentText = ''
    },

    async chooseCollection(collectionId) {
      // console.log("choosing collection...", collectionId);
      const myId = localStorage.getItem("uid");
      await db
        .collection("Collections")
        .doc(collectionId)
        .collection("Photos")
        .doc(this.postId)
        .set({
          'posterUid': this.posterId,
          'photo': this.photoUrl,
          'title': this.title,
          'savedTime': firebaseApp.serverTimestamp,
          'postId': this.postId,
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
      // console.log("updating photo...", collectionId);

      await db
        .collection("Collections")
        .doc(collectionId)
        .update({
          // 'photo': this.webp
          photo: this.photoUrl,
        })
        .then((val) => {
          // this.refreshData()
          // this.loading = false
          // console.log("Added to collection...");
        });
    },

    async updatePhotosNum(collectionId) {
      // console.log("updating photo num...", collectionId);
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
          // this.collectionPhotosNum = this.collectionPhotosNum + 1
          // this.refreshData()
        })
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

    async checkCollections() {
      await db
        .collection("Collections")
        .where("owner", "==", localStorage.getItem("uid"))
        .orderBy("created", "desc")
        // .get()
        .onSnapshot((snapshot) => {
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

    openCollectionDialog() {
      this.showCollectionDialog = true;
      this.showPostDialog = false;
      this.checkCollections();
    },

    closeCollectionDialog() {
      this.showCollectionDialog = false;
    },

    addToCollection() {
      this.$router.push({
        name: "Collection",
        params: {
          id: this.postId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-action-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 86px;
  position: relative;
  top: -9px;

  svg {
    margin-top: 0;
  }
}

.name-username {
  display: flex;
  // align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;

  .username-text {
    color: #657786;
    // -webkit-line-clamp: 1;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // font-weight: normal;
  }
}

.other-post-info {
  margin-top: -10px;
  border-bottom: 1px solid #e6e7e7;
  padding: 11px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  
  div {
    color: #657786;
    margin-right: 10px;
  }

  b {
    font-weight: bold;
    font-family: 'bold', sans-serif;
  }
}

video {
  min-width: 95.8%;
  background: #14171A;


  width: 95.8%;
  -o-object-fit: cover;
  object-fit: cover;
  margin: 10px;
  border-radius: 12px;
}

.tags {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
  margin-top: 7px;
  margin-bottom: 13px;

  .tag {
    margin: 11px 0;
  }

  .tag a {
    border-radius: 100px;
    cursor: pointer;
    background: #3c92f214;
    border: 1px solid #3c92f214;
    color: #4a4a4a;
    margin: 10px;
    padding: 8px 16px;
  }

  .tag:first-child {
    margin-left: 0;
  }
}

.thumbnail-photo-container {
  position: relative;

  svg {
    position: absolute;
    top: 42%;
    left: 42%;
    background: #1da1f2;
    padding: 13px;
    border-radius: 100px;
    padding-left: 15px;
    width: 60px;
    height: 60px;
    border: 3px solid #fff;
  }
}

.poster-info {
  display: flex;
  align-items: center;

  .poster-image {
    width: 50px;
    height: 50px;
    background: gainsboro;
    border-radius: 100px;
    object-fit: cover;
    margin-right: 10px;
  }
}

.likes-num {
  margin-top: 0;
}

.verified-btn svg {
  position: relative;
  top: -9px;
  // margin-top: 1px;
  // width: 14px;
  // height: 14px;
  // position: relative;
  // top: 6.4px;
}

.v-lazy-image {
  // filter: opacity(0.3) blur(5px);
  filter: opacity(0.3);
  transition: ease 0.7s;
  background: gainsboro;
  // height: 180px;
}
.v-lazy-image-loaded {
  filter: opacity(1);
  // filter: opacity(1) blur(0);
}

.repost-post-image {
  min-height: 130px;
  max-height: 380px;
  width: 105.2%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #AAB8C2;
  border-radius: 13px;
  margin-top: 8px;
  margin-left: -10px;
  margin-bottom: -14px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #E6E7E7;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-top: -28px;
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
    font-weight: bold;
    font-family: 'bold', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-left: 5px;
      margin-top: -3px;
    }
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
    background: gainsboro;
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
  // margin-bottom: 0px;
  // margin-left: 26px;
  // margin-top: -36px;
  // font-size: 19px;
  // color: #fff;
}

.post-card {
  margin-top: 84px;
  width: 98.9%;
  // margin-left: -15px;

  &:hover {
    background: #fff;
  }

  .bottom {
    // overflow: hidden;
    // position: relative;
    // bottom: 60px;
    // left: 8px;
    margin-top: -10px;
  }

  .post-title {
    font-size: 1.35rem;
    overflow: hidden;
    line-height: 1.42;
    padding: 0 15px;
    padding-top: 10px;
  }

  .poster-info {
    // color: #14171A;
    // display: flex;
    // align-items: center;

    .name {
      display: flex;
      align-items: center;
      width: max-content;
      max-width: 130px;
      margin-right: 15px;
      // font-size: 15px;
      // justify-content: center;
    }

    .name-text {
      font-weight: bold;
      font-family: 'bold', sans-serif;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: nowrap;
      width: 100%;
      display: block;
    }
  }

  .profile-avatar {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background: #AAB8C2;
  }
}

.post-image-wrapper {
  // position: relative;
}

.input-box-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  padding-bottom: 5px;
  height: 51px;
  background: #fff;
  padding: 10px 15px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100px;
    background: gainsboro;
    margin-right: 12px;
    margin-top: 8px;
  }

  input[type='text'] {
    resize: none;
    padding: 19px 10px;
    left: 0;
    border: none;
    outline: none;
    height: 100%;
    width: 76%;
    border: 1px solid #E6E7E7;
    border-radius: 100px;
  }

  .send-btn {
    font-weight: bold;
    font-family: 'bold', sans-serif;

    background: #1da1f2;
    color: #fff;
    border-radius: 100px;
    padding: 4px 10px;
    padding-top: 7px;
    margin-left: 12px;
  }
}

.comments-wrapper {
}

.post-image {
  width: 95.8%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #AAB8C2;
  margin-top: 10px;
  margin: 10px;
  border-radius: 12px;
  border: 1px solid #E6E7E7;

  &:hover {
    // transform: scale(0.98);
  }
}

@media screen and (max-width: 369px) {
  .post-card .poster-info .name {
    width: max-content;
    max-width: 100px;
  }
}

@media screen and (min-width: 320px) {
  .post-card {
  }

  .post-card .post-top p {
    // font-size: 15px;
  }

  .post-title {
    // font-size: 12px;
  }
}


.repost-top-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.bold {
  color: #14171A;
  font-family: 'bold';
}

.repost-post-card {
  border: 1px solid #E6E7E7;
  padding: 10px;
  border-radius: 15px;
  margin: 10px;

  .repost-post-title {
    // font-size: 1.3rem;
    // margin-top: -5px;
    // margin-left: -10px;
    margin-top: 5px;
  }

  .post-image {
    margin: 0;
    padding: 0;
  }
}

.repost-user-profile-photo {
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 100px;
  background: gainsboro;
}
</style>

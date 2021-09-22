<template>
  <div class="user-page">
    <div class="back-header">
      <header id="mobile">
        <div class="header-wrapper">
          <div class="logo-container">
            <svg
               @click="goBack()"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 25 25"
              fill="none"
              stroke="#14171A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>

            <div class="page-name" v-if="username != ''">@{{ username }}</div>

          </div>

          <div class="header-icons"></div>
        </div>
      </header>

      <div class="bottomNav">
        <BottomNav />
      </div>
    </div>

    <div class="d">
      <div class="cover-img-wrapper">
        <img v-if="photoUrl != ''" class="cover-img" v-bind:src="photoUrl" />
      </div>

      <div class="user-info-div">
        <img
          v-if="photoUrl != '' && !isMyAccount"
          class="profile-photo"
          v-bind:src="photoUrl"
        />

        <router-link to="/p" v-if="isMyAccount && isSignedIn">
          <img
            v-if="photoUrl != ''"
            class="profile-photo"
            v-bind:src="photoUrl"
          />
        </router-link>

        <!-- router-link to="/edit" v-if="isMyAccount" -->

        <div v-if="photoUrl == ''" class="profile-photo"></div>
        <br />
        <br />

        <div class="info-text">
          <div class="name">
            {{ name }}
            <span v-if="isVerified && name != ''" class="verified-btn">
              <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="verifiedIconTitle" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="#1da1f2" color="#14171A"> <title id="verifiedIconTitle">Verified</title> <path d="M8 12.5L10.5 15L16 9.5"/> <path d="M12 22C13.2363 22 14.2979 21.2522 14.7572 20.1843C14.9195 19.8068 15.4558 19.5847 15.8375 19.7368C16.9175 20.1672 18.1969 19.9453 19.0711 19.0711C19.9452 18.1969 20.1671 16.9175 19.7368 15.8376C19.5847 15.4558 19.8068 14.9195 20.1843 14.7572C21.2522 14.2979 22 13.2363 22 12C22 10.7637 21.2522 9.70214 20.1843 9.24282C19.8068 9.08046 19.5847 8.54419 19.7368 8.16246C20.1672 7.08254 19.9453 5.80311 19.0711 4.92894C18.1969 4.05477 16.9175 3.83286 15.8376 4.26321C15.4558 4.41534 14.9195 4.1932 14.7572 3.8157C14.2979 2.74778 13.2363 2 12 2C10.7637 2 9.70214 2.74777 9.24282 3.81569C9.08046 4.19318 8.54419 4.41531 8.16246 4.26319C7.08254 3.83284 5.80311 4.05474 4.92894 4.92891C4.05477 5.80308 3.83286 7.08251 4.26321 8.16243C4.41534 8.54417 4.1932 9.08046 3.8157 9.24282C2.74778 9.70213 2 10.7637 2 12C2 13.2363 2.74777 14.2979 3.81569 14.7572C4.19318 14.9195 4.41531 15.4558 4.26319 15.8375C3.83284 16.9175 4.05474 18.1969 4.92891 19.0711C5.80308 19.9452 7.08251 20.1671 8.16243 19.7368C8.54416 19.5847 9.08046 19.8068 9.24282 20.1843C9.70213 21.2522 10.7637 22 12 22Z"/> </svg>
            </span>
          </div>

          <div class="username-text">
            <div class="subscribers-div" v-if="username != ''">
              <div class="followers-wrapper">
                <div class="followers" v-if="subscribersNum != null">
                
                  <p @click="viewSubscribers()" v-if="subscribersNum > 1">
                    <b>{{ subscribersNum }}</b> followers
                  </p>

                  <p v-if="subscribersNum <= 0 || subscribersNum == null"></p>

                  <p v-if="subscribersNum == 0">No followers</p>
                  <p v-if="subscribersNum == 1" @click="viewSubscribers()"><b>1</b> follower</p>

                </div>

                <div class="following" v-if="followingNum != null">
                  <b>{{ followingNum }}</b> following
                </div>
              </div>
              <!-- <div>
                <p @click="viewSubscribers()" v-if="subscribersNum > 1">
                  <b>{{ subscribersNum }}</b> followers
                </p>

                <p v-if="subscribersNum <= 0 || subscribersNum == null"></p>

                <p v-if="subscribersNum == 0">No followers</p>
              </div>
              

              <div>
                <p @click="viewSubscribers()" v-if="subscribersNum == 1">
                  <b>{{ subscribersNum }}</b> follower
                </p>

                <p @click="viewSubscribers()" v-if="followingNum >= 1">
                  <b>{{ followingNum }}</b> following
                </p>

                <p v-if="followingNum <= 0 || followingNum == null"></p>
              </div> -->
            </div>
          </div>

          <!-- <div class="username-text" v-if="username != ''">@{{ username }}</div> -->

          <div class="buttons" :style="isMyAccount ? '' : ''">
            <div
              @click="subscribe()"
              v-if="isSubscribed != null && !isSubscribed && !isMyAccount"
              :style="!isSubscribed ? 'border-color: #f5f8fa' : ''"
              class="subscribe-btn subscribe-btn-active">
              <p>Follow</p>
            </div>

            <div
              @click="subscribe()"
              v-if="isSubscribed != null && isSubscribed && !isMyAccount"
              class="subscribe-btn-active">
              <p>Following</p>
            </div>

            <div v-if="!isMyAccount">
              <a
                :href="
                  `mailto:${email}?body=I came across your profile on Gridd and...`
                "
                style="display: flex; align-items:center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1da1f2"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>

            <router-link to="/edit" v-if="isMyAccount && isSignedIn" class="primary-btn outline-btn">
              <p>Edit your profile</p>
            </router-link>

            <div>
              <svg
                style="margin-top: 5px"
                @click="showMore = !showMore"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                  stroke="#1da1f2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>

              <svg
                style="margin-top: 5px"
                @click="shareProfile()"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1da1f2"
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
          </div>

           <div class="about" v-if="newJoinDate != '' && newJoinDate != null && coins != null">
            
            <span class="about-text" id="about-text">{{ about }}</span>
          </div>

          <br>

          <!-- <br> -->
          <div class="icon-text-wrapper">
            <div class="icon-text" v-if="newJoinDate != null && newJoinDate != ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-gift"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>

              <p>Joined {{ newJoinDate }}</p>
            </div>

            <div class="icon-text" v-if="deviceType != null && deviceType != ''">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" aria-labelledby="smartphoneIconTitle" stroke="#6a6a6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="smartphoneIconTitle">Smartphone</title> <path stroke-linejoin="round" d="M18,3 L18,21 C18,21.5522847 17.5522847,22 17,22 L7,22 C6.44771525,22 6,21.5522847 6,21 L6,3 C6,2.44771525 6.44771525,2 7,2 L17,2 C17.5522847,2 18,2.44771525 18,3 Z"/> <line x1="11" y1="19" x2="13" y2="19"/> </svg>

              <p>{{ deviceType }} user</p>
            </div>

            <div class="icon-text" v-if="coins != null && coins != ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>

              <p><b>{{ coins }}</b> nimbles</p>
            </div>

            <div class="icon-text" v-if="work != null && work != ''">
              <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" aria-labelledby="suitcaseIconTitle" stroke="#6a6a6a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="suitcaseIconTitle">Suitcase</title> <rect width="18" height="12" x="3" y="7"/> <rect width="8" height="4" x="8" y="3"/> </svg>

              <p>{{ work }}</p>
            </div>
          </div>

          <div class="section-name" v-if="gotSuggestedUsers">Suggested users</div>

            <div class="suggested-user-wrapper" v-if="gotSuggestedUsers">
              <div v-for="(user, index) in suggestedUsers" @click="viewUser(user.id)" class="suggested-user">
                <img :src="user.photoUrl">
                <div class="suggested-user-text">
                  <b>
                    <span v-if="user.verified" class="verified-btn">
                      <svg width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="verifiedIconTitle" stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#14171A"> <title id="verifiedIconTitle">Verified</title> <path d="M8 12.5L10.5 15L16 9.5"/> <path d="M12 22C13.2363 22 14.2979 21.2522 14.7572 20.1843C14.9195 19.8068 15.4558 19.5847 15.8375 19.7368C16.9175 20.1672 18.1969 19.9453 19.0711 19.0711C19.9452 18.1969 20.1671 16.9175 19.7368 15.8376C19.5847 15.4558 19.8068 14.9195 20.1843 14.7572C21.2522 14.2979 22 13.2363 22 12C22 10.7637 21.2522 9.70214 20.1843 9.24282C19.8068 9.08046 19.5847 8.54419 19.7368 8.16246C20.1672 7.08254 19.9453 5.80311 19.0711 4.92894C18.1969 4.05477 16.9175 3.83286 15.8376 4.26321C15.4558 4.41534 14.9195 4.1932 14.7572 3.8157C14.2979 2.74778 13.2363 2 12 2C10.7637 2 9.70214 2.74777 9.24282 3.81569C9.08046 4.19318 8.54419 4.41531 8.16246 4.26319C7.08254 3.83284 5.80311 4.05474 4.92894 4.92891C4.05477 5.80308 3.83286 7.08251 4.26321 8.16243C4.41534 8.54417 4.1932 9.08046 3.8157 9.24282C2.74778 9.70213 2 10.7637 2 12C2 13.2363 2.74777 14.2979 3.81569 14.7572C4.19318 14.9195 4.41531 15.4558 4.26319 15.8375C3.83284 16.9175 4.05474 18.1969 4.92891 19.0711C5.80308 19.9452 7.08251 20.1671 8.16243 19.7368C8.54416 19.5847 9.08046 19.8068 9.24282 20.1843C9.70213 21.2522 10.7637 22 12 22Z"/> </svg>
                    </span>
                    {{user.name}}
                  </b>
                  <p>@{{user.username}}</p>
                  <!-- <p class="suggested-user-about">{{user.about}}</p> -->
                </div>
              </div>
            </div>
          
        </div>
      </div>

      <br>

      <div v-if="!loading" class="photo-content-wrapper">
        <tabs :onSelect="tabChange">
          <tab title="Posts">
            <div class="post-content-wrapper">
              <div class="no-tab-data" v-if="!hasPosts">
                No posts
              </div>
              <div style="width: auto; margin-top: 30px">

                <PostContentCard
                  v-for="(photo, index) in photos"
                  :value="index"
                  :key="index"

                  :photoUrl="photo.photo"
                  :title="photo.title"
                  :id="photo.id"
                  :posterId="photo.posterUid"
                  :thumbnail="photo.thumbnail"
                  :type="photo.type"
                  :video="photo.video"
                  :tags="photo.tags"
                  :date="photo.postTime"
                  :mentions="photo.mentions"
                />
              </div>
            </div>
          </tab>

          <tab title="Videos">
            <br>
            <div class="no-tab-data" v-if="!hasVideos">No video</div>
            <div style="width: auto">
              
              <PostContentCard
                v-for="video in videos"
                :value="video.id"
                :key="video.id"

                :photo-url="video.photo"
                :title="video.title"
                :id="video.id"
                :posterId="video.posterUid"
                :thumbnail="video.thumbnail"
                :type="video.type"
                :video="video.video"
                :tags="video.tags"
                :date="video.postTime"
              />
            </div>
          </tab>

          <tab title="Lists">
            <br />
            <br />

            <div class="all-collections-div">
              <div
                style="margin-top: -30px"
                class="no-tab-data"
                v-if="!hasCollections"
              >
                No Lists
              </div>

              <div
                style="width: auto"
                v-for="collection in collections"
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

          <tab title="Marked">
            <br>
            <div class="no-tab-data" v-if="!hasSaved">
              No marked posts
            </div>
            <div style="width: auto">
              <PostContentCard
                v-for="photo in saved"
                :value="photo.id"
                :key="photo.id"

                :photo-url="photo.photo"
                :title="photo.title"
                :id="photo.id"
                :posterId="photo.posterUid"
                :thumbnail="photo.thumbnail"
                :type="photo.type"
                :video="photo.video"
                :tags="photo.tags"
                :date="photo.postTime"
              />
            </div>
          </tab>
        </tabs>
      </div>
    </div>

    <div class="dialog-sheet" v-if="showMore">
      <h1 class="closeDialogBtn" @click="showMore = false">&times;</h1>

      <router-link to="/login" v-if="!isSignedIn" class="primary-color"
        >Login / Signup</router-link
      >

      <router-link to="/edit" v-if="isMyAccount && isSignedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#AAB8C2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
        Edit my account
      </router-link>

      <div v-if="!isMyAccount">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> -->
        Pinch user
      </div>

      <div @click="shareProfile()" v-if="isMyAccount">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
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
        Share your profile
      </div>

      <router-link to="/feedback" v-if="isMyAccount && isSignedIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#AAB8C2"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-edit"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
        Share feedback
      </router-link>

      <div
        class="primary-color"
        v-if="isSignedIn && isMyAccount"
        @click="logout()"
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
          class="feather feather-slash"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        Logout
      </div>
    </div>

    <!--  <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div> -->

    <Fab />

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#1da1f2"
      color="#1da1f2"
    ></vue-topprogress>

    <!--     <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
    </div> -->
  </div>
</template>

<script>
import '@/styles/style.css'

import Fab from "@/components/Fab";
import * as linkify from 'linkifyjs';
import 'linkifyjs/plugins/hashtag';
import 'linkifyjs/plugins/mention';
import linkifyStr from 'linkifyjs/html';
import linkifyHtml from 'linkifyjs/html';
import linkifyElement from 'linkifyjs/html';
import { vueTopprogress } from "vue-top-progress";
import "vue-slim-tabs/themes/default.css";
import { Tabs, Tab } from "vue-slim-tabs";
import BottomNav from "@/components/BottomNav";
import MainHeader from "@/components/MainHeader";
import CollectionCard from "@/components/CollectionCard";
import PostContentCard from "@/components/PostContentCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  data() {
    return {
      topProgressHeight: 4,
      subscribersNum: null,
      coins: "",
      followingNum: null,

      deviceType: null,

      loading: true,
      isVerified: false,
      isSubscribed: null,
      isMyAccount: false,
      gotSuggestedUsers: false,
      // loadingMore: true,

      photos: [],
      saved: [],
      collections: [],
      videos: [],
      suggestedUsers: [],

      hasPosts: true,
      hasVideos: true,
      hasSaved: true,
      hasCollections: true,

      showCreateDialog: false,
      showMore: false,
      isSignedIn: false,

      oldProfile: localStorage.getItem("photoUrl"),
      about: "",
      email: "",
      following: [],
      joinDate: "",
      newJoinDate: "",
      name: "",
      username: "",
      work: "",
      photoUrl: "",
    };
  },

  metaInfo() {
    return {
      title: `${this.name} | Nimble 👐`,
      meta: [{ vmid: "description", name: "description", content: this.work }],
    };
  },

  // watch: {
  //   $route(to, from) {
  //     this.checkIsMyAccount();
  //     this.getUserData();
  //     this.checkAuthState();
  //   },
  // },

  mounted() {
    console.log(this.$device)

    this.$refs.topProgress.start();
    this.checkIsMyAccount();
    this.getUserData();
    this.checkAuthState();
  },

  methods: {
    async getSubscribersNum() {
      await db
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Subscribers")
        .onSnapshot((doc) => {
          this.subscribersNum = this.formatNumbers(doc.size);
        });
    },

    async getFollowingNum() {
      await db
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Following")
        .onSnapshot((doc) => {
          console.log('followingNum', doc.size);
          this.followingNum = this.formatNumbers(doc.size);
        });
    },

    linkifyContent() {
      setTimeout(() => {
        var postTitle = document.getElementById('about-text')

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

    formatNumbers(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + "k";
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      } else if (num < 900) {
        return num;
        console.log("subscribersNum", this.subscribersNum);
      }
    },

    formatCoins(num) {
      if (num > 999 && num < 1000000) {
        this.coins = (num / 1000).toFixed(2) + "K";
      } else if (num > 1000000) {
        this.coins = (num / 1000000).toFixed(2) + "M";
      } else if (num < 900) {
        this.coins = num;
      }
    },

    async checkIsSubscribed() {
      await db
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Subscribers")
        .doc(localStorage.getItem("uid"))
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("is subscribed!");
            this.isSubscribed = true;
          } else {
            this.isSubscribed = false;
            console.log("not is subscribed!");
          }
        });
    },

    async subscribe() {
      console.log(this.subscribersNum)

      // if(this.subscribersNum != null) {
        this.isSubscribed = !this.isSubscribed;
        this.$refs.topProgress.start()
        
        if(this.isSignedIn) {
          if (this.isSubscribed) {
            await db
              .collection("Users")
              .doc(this.$route.params.id)
              .collection("Subscribers")
              .doc(localStorage.getItem("uid"))
              .set({
                isSubscribed: true,
                userId: localStorage.getItem("uid"),
              });

            this.checkFollowingStorageValues();

            await db
              .collection("Users")
              .doc(localStorage.getItem("uid"))
              .collection("Following")
              .doc(this.$route.params.id)
              .set({
                following: true,
                userId: this.$route.params.id,
              });

            this.sendFollowAlert()

            // await db
            // .collection("Users")
            // .doc(this.$route.params.id)
            // .collection('Notifications')
            // .add({
            //   'notificationText': `${localStorage.getItem('name')} just subscribed`,
            //   'type': 'subscription',
            //   'personId': localStorage.getItem('uid')
            // })
          }

          if (!this.isSubscribed) {
            await db
              .collection("Users")
              .doc(this.$route.params.id)
              .collection("Subscribers")
              .doc(localStorage.getItem("uid"))
              .delete();

            this.checkFollowingStorageValues();

            await db
              .collection("Users")
              .doc(localStorage.getItem("uid"))
              .collection("Following")
              .doc(this.$route.params.id)
              .delete();

              this.sendUnfollowAlert()
          }
        } else alert('please login')
      // } else console.log('space subs num')
    },

    async sendFollowAlert() {
      await db
      .collection('Users')
      .doc(this.$route.params.id)
      .collection('Notifications')
      .add({
        'type': 'subscription',
        'userProfile': localStorage.getItem('photoUrl'),
        'notificationText': `${localStorage.getItem('name')} just followed you`,
        'targetPageId': localStorage.getItem('uid'),
        'notificationTime': firebase.serverTimestamp,
        'userId': localStorage.getItem('uid'),
        'username': localStorage.getItem('name'),
        'targetText': null,
        'isRead': false,
      })
    },

    async sendUnfollowAlert() {
      await db
      .collection('Users')
      .doc(this.$route.params.id)
      .collection('Notifications')
      .add({
        'type': 'unfollow',
        'userProfile': localStorage.getItem('photoUrl'),
        'notificationText': `Oops! someone unfollowed you`,
        'targetPageId': null,
        'notificationTime': firebase.serverTimestamp,
        'userId': localStorage.getItem('uid'),
        'username': localStorage.getItem('name'),
        'targetText': null,
        'isRead': false,
      })
    },

    async checkFollowingStorageValues() {
      var subscribedTo = await localStorage.getItem("subscribedTo");
      console.log(subscribedTo);

      // await localStorage.removeItem('subscribedTo')
      var tempSubs = [""];

      if (subscribedTo == null) {
        console.log(subscribedTo, "subscribedTo is null");
        await localStorage.setItem("subscribedTo", JSON.stringify(tempSubs));
        this.setLocalStorageValues();
      } else this.setLocalStorageValues();
    },

    async setLocalStorageValues() {
      var subscribedTo = await localStorage.getItem("subscribedTo");
      var oldSubs = await JSON.parse(localStorage.getItem("subscribedTo"));
      var newSub = this.$route.params.id;

      if (this.isSubscribed) {
        oldSubs.push(newSub);
        await localStorage.setItem("subscribedTo", JSON.stringify(oldSubs));
        console.log(oldSubs);
        this.$refs.topProgress.done()
      }

      if (!this.isSubscribed) {
        // oldSubs.pop()

        for (var i = oldSubs.length; i--; ) {
          if (oldSubs[i] === this.$route.params.id) oldSubs.splice(i, 1);
        }

        await localStorage.setItem("subscribedTo", JSON.stringify(oldSubs));

        console.log(oldSubs);
        this.$refs.topProgress.done()
      }
    },

    convertDate() {
      console.log(this.joinDate);

      var dateValue = this.joinDate.toDate();
      var stringDate = new Date(this.joinDate.seconds * 1000);

      this.newJoinDate = stringDate.toDateString();
    },

    goBack() {
      this.$router.back();
    },

    tabChange(e, index) {
      this.showCreateDialog = false;
      this.showMore = false;
      switch (index) {
        case 0:
          this.getPosts();
          break;
        case 1:
          this.getVideos();
          break;
        case 2:
          if (!this.isMyAccount) this.getCollection();
          if (this.isMyAccount) this.getAllCollections();
          break;
        case 3:
          this.getSaved();
          break;
      }
    },

    createCollection() {
      this.showCreateDialog = false;
      this.showMore = false;
      this.$router.push({
        name: "NewCollection",
      });
    },

    async getCollection() {
      // this.loadingMore = true;
      this.$refs.topProgress.start();
      await db
        .collection("Collections")
        .where("owner", "==", this.$route.params.id)
        .where("isPublic", "==", true)
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasCollections = true;
            // this.loadingMore = false;
            this.collections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.collections.push(collection);
            });

            this.$refs.topProgress.done();
          } else {
            // this.loadingMore = false;
            this.$refs.topProgress.done();
            this.hasCollections = false;
          }
        });
    },

    async getAllCollections() {
      // this.loadingMore = true;
      this.$refs.topProgress.start();
      await db
        .collection("Collections")
        .where("owner", "==", this.$route.params.id)
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasCollections = true;
            // this.loadingMore = false;
            this.collections = [];

            snapshot.forEach((doc) => {
              let collection = doc.data();
              collection.id = doc.id;
              this.collections.push(collection);
            });

            this.$refs.topProgress.done();
          } else {
            // this.loadingMore = false;
            this.$refs.topProgress.done();
            this.hasCollections = false;
          }
        });
    },

    checkAuthState() {
      const user = firebase.auth().currentUser;
      console.log(user);

      if (
        localStorage.getItem("uid") == null ||
        localStorage.getItem("photoUrl") == null ||
        localStorage.getItem("name") == null
      ) {
        this.isSignedIn = false;
      } else {
        this.isSignedIn = true;
      }
    },

    async logout() {
      await localStorage.clear();
      await firebase.auth().signOut();
      window.location = "/";
    },

    goToChat() {
      this.$router.push("/c_c");
    },

    viewSubscribers() {
      this.$router.push({
        name: "Followers",
        params: {
          id: this.$route.params.id,
        },
      });
    },

    checkIsMyAccount() {
      if (this.$route.params.id == localStorage.getItem("uid")) {
        this.isMyAccount = true;
      } else {
        this.isMyAccount = false;
      }
    },

    async shareProfile() {
      const shareData = {
        title: `Profile | ${this.name}`,
        text: `${this.name} | Nimble👐 \n`,
        url: `https://grrid.netlify.app/user/${this.$route.params.id}`,
      };

      try {
        await navigator.share(shareData);
        // alert("Profile shared! ✌️");
      } catch (err) {
        console.log("Share failed");
      }
    },

    async getVideos() {
      this.$refs.topProgress.start();
      await db
        .collection("Posts")
        .where("posterUid", "==", this.$route.params.id)
        .where('type', '==', 'video')
        .orderBy("postTime", "desc")
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            this.hasVideos = true;
          } else {
            // this.loading = false
            this.hasVideos = false;
          }

          this.videos = [];
          doc.forEach((doc) => {
            let video = doc.data();
            video.id = doc.id;
            this.videos.push(video);
            // this.loading = false;
          });
          
          this.$refs.topProgress.done();
        });
    },

    async getPosts() {
      // this.loadingMore = true;
      // console.log("getting photos...");
      this.$refs.topProgress.start();
      this.photos = [];
      
      await db
        .collection("Posts")
        .where("posterUid", "==", this.$route.params.id)
        .orderBy("postTime", "desc")
        .get()
        .then((doc) => {
          if (doc.docs.length > 0) {
            this.hasPosts = true;
          } else {
            // this.loading = false
            this.hasPosts = false;
          }

          this.photos = [];
          doc.forEach((doc) => {
            let photo = doc.data();
            photo.id = doc.id;
            this.photos.push(photo);
            // this.loading = false;
          });
          
          this.$refs.topProgress.done();
        });
    },

    async getSaved() {
      this.$refs.topProgress.start();
      console.log("getting saved...");
      this.saved = [];

      await db
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Saved")
        .orderBy("savedTime", "desc")
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length > 0) {
            this.hasSaved = true;
          } else {
            // this.loadingMore = false;
            this.$refs.topProgress.done();
            this.loading = false;
            this.hasSaved = false;
          }

          snapshot.forEach((doc) => {
            let photo = doc.data();
            photo.id = doc.id;
            this.saved.push(photo);
            this.loading = false;
            this.$refs.topProgress.done();
          });
        });
    },

    async getSuggestedUsers() {
      this.gotSuggestedUsers = false
      this.suggestedUsers = [];

      await db
      .collection("Users")
      .where("name", ">=", localStorage.getItem("name"))
      .limit(6)
      .get()
      .then((docs) => {


        if(docs.size > 0) {
          this.gotSuggestedUsers = true
          let newSuggestedUsers = []

          docs.forEach(async (doc) => {
            if (doc.id != this.$route.params.id && doc.id != localStorage.getItem("uid")) {
              let person = doc.data();
              person.id = doc.id;

              const following = await JSON.parse(localStorage.getItem("subscribedTo"));

              if(!following.includes(person.id) && person.id != localStorage.getItem('uid')) {

                newSuggestedUsers.push(person)
                this.suggestedUsers.push(person);
              }

              else return;
            }
          });
        }

        else this.gotSuggestedUsers = false
      });

      
    },

    viewUser(id) {
      this.$router.push({
        name: "User",
        params: {
          id: id,
        },
      });
    },

    async getUserData() {
      this.loading = true;
      this.$refs.topProgress.start();

      await db
      .collection("Users")
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.about = doc.data()["about"];
        this.email = doc.data()["email"];
        this.following = doc.data()["following"];
        this.joinDate = doc.data()["joinDate"];
        this.name = doc.data()["name"];
        this.username = doc.data()["username"];
        this.work = doc.data()["work"];
        this.photoUrl = doc.data()["photoUrl"];
        this.loading = false;
        this.isVerified = doc.data()["verified"];
        this.deviceType = doc.data()['deviceType']

        this.linkifyContent()
        this.formatCoins(doc.data()["coins"]);
        
        if(this.$route.params.id != localStorage.getItem('uid')) this.checkIsSubscribed();
        
        this.getSuggestedUsers();
        this.getSubscribersNum();
        this.getFollowingNum();
        this.convertDate();
        this.getPosts();
      });
    },
  },

  components: {
    BottomNav,
    MainHeader,
    PostContentCard,
    CollectionCard,
    vueTopprogress,
    Tabs,
    Tab,
    Fab,
  },
};
</script>

<style lang="scss" scoped>
* {
  color: #6a6a6a;
}

.icon-text-wrapper {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  div {
    margin: 0 10px;
    margin-left: 0;
    margin-bottom: 5px;
  }
}

.icon-text-wrapper .icon-text {
  // margin-bottom: 6px;
}

.icon-text {
  display: flex;
  justify-content: flex-start;

  svg {
    margin-top: 1.6px;
    margin-right: 4px;
  }

  b {
    font-weight: bold;
    font-family: 'bold', sans-serif;
  }
}

.section-name {
  color: #14171A;
  margin-bottom: 15px;
}

.suggested-user-wrapper {
  display: -webkit-box;
  overflow-x: scroll;
  margin-left: -5px;

  .suggested-user-about {
    max-width: 200px;
  }

  .suggested-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid #E6E7E7;
    min-width: 195px;
    border-radius: 100px;
    padding: 4px;
    margin: 0 5px;
    padding-left: 10px;

    .suggested-user-text {
      padding-right: 10px;

      .verified-btn {
        position: relative;
        top: 4px;
      }

      b,
      p {
        white-space: nowrap;
        -webkit-line-clamp: 4;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        display: block;
        width: 98%;
      }
    }

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 100px;
      margin-right: 10px;
      background: #AAB8C2;
    }
    
    &:hover {
      background: #b6cfff1c;
    }
  }
}

.page-name {
  color: #14171A;
  font-family: 'bold', sans-serif;
  font-size: 1.1rem;
  position: relative;
  top: 4.3px;
}

.primary-btn {
  // margin: 10px auto;
}

.all-collections-div {
  // margin-top: -28px;
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 39px;
  margin-bottom: 100px;
}

.verified-btn svg {
  position: relative;
  top: 0;
}

.post-content-wrapper {
  margin-top: 22px;
}

// .subscribe-btn-active {
  // margin-right: 8px;
  // border: 1px solid #E6E7E7;
// }

.subscribers-div {
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  margin-top: 8px;

  // div {
  //   display: flex;
  // }

  // div:nth-child(2) p:nth-child(1) {
  //   margin-right: 10px;
  // }

  // div:nth-child(1) p:nth-child(1) {
  //   margin-right: 10px;
  // }

  // .dot {
  //   position: relative;
  //   top: 9px;
  // }
}

b {
  color: #14171A;
  font-weight: bold;
  font-family: 'bold', sans-serif;
}

// .collection-card {
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   // margin: 20px 10px;

//   .collection-name {
//     font-size: 16px;
//     font-weight: 400;
//   }

//   .collection-photo {
//     width: 50px;
//     height: 50px;
//     object-fit: cover;
//     margin-right: 10px;
//     border-radius: 100px;
//     background: #f1f1f1;
//   }
// }


.outline-btn {
  background: none;
  border: 1px solid #f3f3f3;
  padding: 8px 20px;
  padding-top: 13px;
}

.outline-btn p {
  color: #1da1f2;
}

.info-text {
  // margin-top: 18px;
  position: relative;
}

.photo-content-wrapper {
  margin-top: -16px;
}

.vue-tablist {
  position: relative;
}

.coins-div {
  display: inline-flex;
  align-items: center;
  margin: 0 10px;
  margin-right: 4px;

  p {
    margin-left: -5px;
    font-weight: bold;
    font-family: 'bold', sans-serif;
    color: #14171A;
  }
}

.mobile {
  text-align: center;
  // padding: 10px;
  padding-top: 45px;
}

.buttons {
  display: inline-flex;
  align-items: center;
  margin: 10px auto;
  margin-bottom: 10px;

  svg {
    margin: 0 10px;
    border: 1px solid #f5f8fa;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 100px;
  }
}

.work {
  margin: 8px 0;
  // font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  font-weight: bold;
  font-family: 'bold', sans-serif;
  color: #14171A;
  font-size: 1.2rem;
  position: absolute;
  top: -38px;
  left: 126px;
}

.username-text {
  position: absolute;
  left: 126px;
  top: -21px;
}

.join-date {
  // padding: 9px 24px;
  margin-bottom: 28px;
}

.about {
  // padding: 9px 24px;
  // padding-top: 9px;
  // text-align: center;
  padding-top: 11px;
  line-height: 1.8;
  width: 100%;
  // max-width: 387px;
  margin-top: -13px;
  margin-bottom: -4px;

  .bold {
    color: #14171A;
    font-weight: bold;
    font-family: 'bold', sans-serif;
  }
}

.user-info-div {
  padding: 0 10px;
  // text-align: center;
}

.profile-photo {
  width: 114px;
  height: 114px;
  border-radius: 200%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #e1e8ed;
  margin: auto;
  margin-bottom: -20px;
  margin-top: -64px;
  border: 4px solid #fff;
  position: relative;
}

.cover-img-wrapper {
  min-height: 20vh;
  background: #f1f1f1;

  .cover-img {
    width: 100%;
    height: auto;
    max-height: 21vh;
    -o-object-fit: cover;
    object-fit: cover;
    position: relative;
    top: 6px;
  }
}

.logo-container svg {
  width: 26px;
  height: 26px;
}
</style>

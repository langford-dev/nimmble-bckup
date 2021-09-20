<template>
  <div class="explore-page">
    <header>
        <div class="header-wrapper">
          <div class="logo-container">
            <svg
              @click="goBack()"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-arrow-left">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </div>
          <!-- @input="search()" -->
          <input
            placeholder="Search for anything..."
            @click="inputBoxClick()"
            v-model="q"
            @input="search()"
            autocomplete
          />

          <div class="header-icons">
            <svg
              @click="search()"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </header>

  <div class="tabs-main-wrapper">
    <tabs  v-if="showSearchPage" :onSelect="tabChange">
      <tab title="Posts">
        <br>
        <div>
          <PostContentCard
            v-for="photo in posts"
            :key="photo.id"
            class="post-item"
            :photo-url="photo.photo"
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
      </tab>

      <tab title="People">
        <div class="suggested-users-container" style="padding: 10px">
          <div v-for="person in searchQueryUsers" key="person.id">
            <div class="user-card">
              <div class="profile-img-text" @click="viewUser(person.username)">
                <v-lazy-image :src="person.photoUrl"/>
                <div>
                  <p class="name">
                    {{ person.name }}
                  </p>
                  <p class="work">
                    @{{ person.username }}
                  </p>
                </div>
              </div>
              <div>
                <div class="primary-btn follow-btn black">
                  <p>Follow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>

      <tab title="Hash tags"></tab>

      <tab title="Lists"></tab>


    </tabs>
  
    <div v-if="!showSearchPage" class="non-search-related-content">
      <div>
        <div class="section-name">Suggested users</div>

        <div class="suggested-users-container">
          <div v-for="person in suggestedUsers" key="person.id">
            <div class="user-card">
              <div class="profile-img-text" @click="viewUser(person.username)">
                <v-lazy-image :src="person.photoUrl"/>
                <div>
                  <p class="name">
                    {{ person.name }}
                  </p>
                  <p class="work">
                    @{{ person.username }}
                  </p>
                </div>
              </div>
              <div>
                <div class="primary-btn follow-btn black">
                  <p>Follow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="section-name">Trending tags</div>

        <div class="suggested-users-container">
          <div>
            <div class="user-card" @click="viewTag('Nimmble')">
              <div class="profile-img-text">
                <div class="tag-image">#</div>
                <div>
                  <p class="name">
                    #Nimmble
                  </p>
                  <p class="work">
                    53k posts
                  </p>
                </div>
              </div>
            </div>
            <div class="user-card" @click="viewTag('FinalDestination')">
              <div class="profile-img-text">
                <div class="tag-image">#</div>
                <div>
                  <p class="name">
                    #FinalDestination
                  </p>
                  <p class="work">
                    20k posts
                  </p>
                </div>
              </div>
            </div>
            <div class="user-card" @click="viewTag('Religion')">
              <div class="profile-img-text">
                <div class="tag-image">#</div>
                <div>
                  <p class="name">
                    #Religion
                  </p>
                  <p class="work">
                    1.2k posts
                  </p>
                </div>
              </div>
            </div>
            <div class="user-card" @click="viewTag('Movies')">
              <div class="profile-img-text">
                <div class="tag-image">#</div>
                <div>
                  <p class="name">
                    #Movies
                  </p>
                  <p class="work">
                    258 posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



    <!-- <tabs v-if="isSearching" :onSelect="tabChange">
      <tab title="Photos">
        <div class="not-found" v-if="photoNotFound">
          Found 0 results for '{{ q }}'
        </div>
        <div v-if="loadingMore" class="loading-more">
          <div class="big-spin">
            <div class="small-spin"></div>
          </div>
        </div>
        <div class="grid-container" style="padding: 10px; margin-top: 15px;">
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
      <tab title="People">
        <div class="not-found" v-if="peopleNotFound">
          Found 0 results for '{{ q }}'
        </div>
        <div v-if="loadingMore" class="loading-more">
          <div class="big-spin">
            <div class="small-spin"></div>
          </div>
        </div>
        <div class="people-container">
          <div v-for="person in people">
            <div class="user-card">
              <div class="profile-img-text" @click="viewUser(person.id)">
                <img :src="person.photoUrl" />
                <div>
                  <p class="name">
                    {{ person.name }}
                  </p>
                  <p class="work">
                    {{ person.work }}
                  </p>
                </div>
              </div>
              <div class="filled">
                <p>Message</p>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab title="Collections">
        <div
          class="all-collections-div"
          id="all-collections-div"
          style="margin-top: 12px"
        >
          <div class="not-found" v-if="collectionsNotFound">
            No collections with that name
          </div>
          <div v-if="loadingMore" class="loading-more">
            <div class="big-spin">
              <div class="small-spin"></div>
            </div>
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
            />
          </div>
        </div>
      </tab>
    </tabs> -->

    <!-- <div v-if="scrollUp" class="scrollHidden bottomNav">
      
    </div> -->

    <BottomNav />
  </div>
</template>

<script>
import "vue-slim-tabs/themes/default.css";
import VLazyImage from "v-lazy-image";
import { Tabs, Tab } from "vue-slim-tabs";
import BottomNav from "@/components/BottomNav";
import PostContentCard from "@/components/PostContentCard";
import PostCard from "@/components/PostCard";
import CollectionCard from "@/components/CollectionCard";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();
export default {
  data() {
    return {
      showSearchPage: false,
      noPostsFound: false,
      
      q: "",
      suggestedUsers: [],
      posts: [],
      searchQueryUsers: [],
      // photos: [],
      // people: [],
      // collections: [],
      // loadingMore: false,
      // scrollUp: true,
      // photoNotFound: false,
      // peopleNotFound: false,
      // collectionsNotFound: false,
      // isSearching: false,
    };
  },
  components: {
    PostCard,
    BottomNav,
    VLazyImage,
    CollectionCard,
    PostContentCard,
    Tabs,
    Tab,
  },
  mounted() {
    this.getSuggestedUsers()
  },
  methods: {
    inputBoxClick() {
      this.showSearchPage = true
    },
    tabChange(e, index) {
      switch (index) {
        case 0:
          this.search();
          break;
        case 1:
          this.searchForUsers();
          break;
        case 2:
          // this.searchCollections();
          break;
      }
    },
    viewUser(uid) {
      this.$router.push({
        name: "User",
        params: {
          id: uid,
        },
      });
    },
    viewTag(tag) {
      console.log(tag)
      this.$router.push({
        name: "Tag",
        params: {
          tag: tag,
        },
      });
    },
    async search() {
      if (this.q.trim() != "") {
        this.posts = []
        await db
        .collection("Posts")
        .where("title", ">=", this.q.trim())
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length <= 0) {
            this.noPostsFound = true;
          } else this.noPostsFound = false
          snapshot.forEach((doc) => {
            let post = doc.data();
            post.id = doc.id;
            if (post.posterId != localStorage.getItem("uid")) {
              this.posts.push(post);
            }
          });
        });
      }
    },
    async getSuggestedUsers() {
      this.suggestedUsers = []
      await db
      .collection("Users")
      .where("name", ">=", localStorage.getItem('uid'))
      .limit(5)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          let person = doc.data();
          person.id = doc.id;
          if (doc.id != localStorage.getItem("uid")) {
            this.suggestedUsers.push(person);
          }
        });
      });
    },
    async searchForUsers() {
      this.searchQueryUsers = []
      
      if (this.q.trim() != "") {
        console.log('users.......loading.....')
        await db
        .collection("Users")
        .where("name", ">=", this.q.trim())
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let person = doc.data();
            person.id = doc.id;
            if (doc.id != localStorage.getItem("uid")) {
              this.searchQueryUsers.push(person);
            }
          });
        });
      }
    },
    
    goBack() {
      this.showSearchPage = false;
      this.$router.back()
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
  width: 100%;
  margin-left: -40px;
  padding: 8px 10px;
  position: relative;
  top: 0;
  border: 1px solid #E6E7E7;
  border-radius: 100px;
}
.tabs-main-wrapper {
  margin-top: 35px;
  padding-bottom: 100px;
}
.non-search-related-content {
  padding: 20px;
}
header {
  border: none;
}
.user-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1.5;
  padding: 10px 0;
  justify-content: space-between;
  .profile-img-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .filled {
    padding-top: 7px;
    background: #3c92f214;
    height: 36px;
    border-radius: 100px;
    p {
      color: #00acfe;
    }
    &:hover {
      background: #f1f1f1;
      p {
        color: #000;
      }
    }
  }
  &:hover {
    background: #fff;
  }
  .name {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-weight: 500;
  }
  .work {
    font-weight: 300;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
  img,
  .tag-image {
    object-fit: cover;
    width: 45px;
    height: 45px;
    border-radius: 100px;
    background: #f1f1f1;
    margin-right: 10px;
  }
  .tag-image {
    display: flex;
    align-content: center;
    justify-content: center;
    padding-top: 0;
    color: #b3acac;
    font-size: 2rem;
  }
}
// #all-collections-div {
//   margin-top: 12px;
//   max-width: 700px;
//   margin: auto;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-evenly;
//   padding-top: 39px;
//   margin-bottom: 100px;
// }
// .loading-more {
//   margin-top: 100px;
// }
// body {
//   background: #fff;
// }
// .people-container {
//   padding: 10px;
//   margin-top: -10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
// }
// .user-card {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   line-height: 1.5;
//   padding: 10px 0;
//   justify-content: space-between;
//   .profile-img-text {
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//   }
//   .filled {
//     padding-top: 7px;
//     background: #000;
//     height: 36px;
//     border-radius: 100px;
//     p {
//       color: #fff;
//     }
//     &:hover {
//       background: #f1f1f1;
//       p {
//         color: #000;
//       }
//     }
//   }
//   &:hover {
//     background: #fff;
//   }
//   .name {
//     -webkit-line-clamp: 1;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//   }
//   .work {
//     font-weight: 300;
//     -webkit-line-clamp: 1;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//   }
//   img {
//     object-fit: cover;
//     width: 60px;
//     height: 60px;
//     border-radius: 100px;
//     background: #f1f1f1;
//     margin-right: 10px;
//   }
// }
// .people-container {
//   margin-bottom: 100px;
// }
// header {
//   height: 74px;
//   position: fixed;
//   width: 100vw;
//   background: #fff;
//   top: 0;
//   z-index: 10;
//   // box-shadow: 0px -17px 20px #000;
//   .number-badge {
//     position: absolute;
//     background: red;
//     padding: 2px 9px;
//     color: #fff;
//     border-radius: 100px;
//     right: 5px;
//   }
//   .header-wrapper {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 98%;
//     margin: auto;
//     // max-width: 1555px;
//     max-width: 1822px;
//     height: 100%;
//     padding-left: 10px;
//   }
// }
// .navigation-container {
//   text-align: center;
//   padding-left: 50px;
//   nav {
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     a {
//       color: #000;
//       margin: 0 20px;
//       display: flex;
//       align-items: center;
//       white-space: nowrap;
//       &:hover {
//         color: $primary-color;
//         background: #fff;
//       }
//       &:hover svg {
//         fill: $primary-color;
//         stroke: $primary-color;
//       }
//       img,
//       svg {
//         margin-right: 5px;
//       }
//     }
//     li {
//       position: relative;
//       a {
//         display: flex;
//         align-items: center;
//         p {
//           margin-left: 6px;
//         }
//       }
//     }
//   }
// }
// .logo-container {
//   margin-right: 34px;
// }
// .search-box-container {
//   width: 100%;
//   input {
//     background: #fff;
//     border: none;
//     background: #fff;
//     border-radius: 104px;
//     // border: 2px solid #efefef;
//   }
// }
// @media screen and (min-width: 320px) {
//   .desktop {
//     display: none;
//   }
//   body {
//     background: #fff;
//   }
//   .search-box-container {
//     input {
//       font-size: 16px;
//       margin-left: -38px;
//     }
//   }
//   .mobile {
//     display: block;
//   }
//   .logo-container img {
//     width: 33px;
//     margin-left: 0;
//   }
//   header {
//     height: 62px;
//   }
//   .search-box-container {
//     flex: inherit;
//   }
//   .navigation-container {
//     padding-left: 0;
//   }
//   .fake-search-box p {
//     font-size: 17px;
//   }
//   .fake-search-box {
//     padding: 7px;
//     width: max-content;
//     margin-left: -40px;
//     margin-right: 10px;
//   }
// }
// @media screen and (min-width: 1160px) {
//   .desktop {
//     display: block;
//   }
//   body {
//     background: #fff;
//   }
//   .search-box-container {
//     input {
//       font-size: 22px;
//       margin-left: 0;
//     }
//   }
//   header {
//     height: 74px;
//   }
//   .logo-container img {
//     width: 44px;
//   }
//   .mobile,
//   .bottomNav {
//     display: none;
//   }
//   .navigation-container {
//     padding-left: 50px;
//   }
//   .fake-search-box {
//     padding: 14px;
//     font-size: 20px;
//     max-width: 500px;
//     margin: 0 auto;
//     min-width: 509px;
//   }
//   .fake-search-box p {
//     color: #9c9c9c;
//     font-size: 22px;
//     white-space: nowrap;
//   }
//   .fake-search-box img {
//     margin-right: 10px;
//     /*opacity: 0.6;*/
//   }
// }
</style>
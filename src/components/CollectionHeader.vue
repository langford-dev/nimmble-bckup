<template>
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
            stroke="#2b2b2b"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>

        <div class="header-buttons">
          <router-link to="/edit" style="margin-right: 10px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="black"
              stroke="transparent"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit-2"
            >
              <path
                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
              ></path>
            </svg>
          </router-link>

          <router-link to="/share" style="margin-right: 10px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14171A"
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
              fill="#14171A"
              stroke="black"
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

          <div v-if="notSigned" style="margin-right: 14px;" class="primary-btn">
            <router-link to="/login">
              <p>Sign up / in</p>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="bottomNav">
      <BottomNav />
    </div>
  </div>
</template>

<script>
import BottomNav from "@/components/BottomNav";

export default {
  name: "CollectionHeader",

  data() {
    return {
      notSigned: true,
      oldProfile: localStorage.getItem("photoUrl"),
    };
  },

  components: {
    BottomNav,
  },

  mounted() {
    this.checkSigned();
  },

  methods: {
    checkSigned() {
      if (localStorage.getItem("uid") != null) {
        this.notSigned = false;
      } else {
        this.notSigned = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

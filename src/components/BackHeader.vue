<template>
  <div class="back-header">
    <header class="scrollHidden" id="mobile">
      <div class="header-wrapper">
        <div class="logo-container" @click="goBack()">
          <svg
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
        </div>

        <div class="page-name">
          <p>{{ name }}</p>
        </div>

        <div></div>

        <!-- <div class="header-buttons">
          <router-link to="/explore" style="margin-right: 5px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14171A"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </router-link>

          <div v-if="notSigned" style="margin-right: 14px;" class="primary-btn">
            <router-link to="/login">
              <p>Sign up / in</p>
            </router-link>
          </div>
        </div> -->
      </div>
    </header>

    <!-- <div class="bottomNav">
      <BottomNav />
    </div> -->
  </div>
</template>

<script>
// import BottomNav from "@/components/BottomNav";

export default {
  name: "BackHeader",

  data() {
    return {
      notSigned: true,
      oldProfile: localStorage.getItem("photoUrl"),
    };
  },

  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },

  components: {
    // BottomNav,
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

    goBack() {
      // window.history.back();
      this.$router.back();0
    },
  },
};
</script>

<style lang="scss" scoped>
.page-name {
  margin-right: 90px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;

  p {
    font-family: 'bold', sans-serif;
    position: absolute;
    top: 17px;
    font-size: 1.1rem;
    left: 50px;
    color: #14171A;
  }
}

.logo-container svg {
  width: 26px;
  height: 26px;
}
</style>

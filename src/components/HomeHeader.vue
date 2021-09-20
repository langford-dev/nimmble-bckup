<template>
  <div>
    <header>
      <div class="header-wrapper">
        <div class="left center-div">
          <div @click="goToMyAccount()">
            <img class="profile-avatar" :src="oldProfile"/>
          </div>
          <div class="logo">
            <p>{{name}}</p>
          </div>
        </div>

        <div class="right center-div">
          <!-- <router-link to="/explore" style="margin: 20px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </router-link>

          <router-link to="/alerts" class="with-badge">
            <div class="badge"></div>
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              aria-labelledby="bellIconTitle"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              color="#000"
            >
              <title id="bellIconTitle">Bell</title>
              <path
                stroke-linejoin="round"
                d="M10.5,4.5 C12.1666667,4.5 13.8333333,4.5 15.5,4.5 C17.5,4.5 18.8333333,3.83333333 19.5,2.5 L19.5,18.5 C18.8333333,17.1666667 17.5,16.5 15.5,16.5 C13.8333333,16.5 12.1666667,16.5 10.5,16.5 L10.5,16.5 C7.1862915,16.5 4.5,13.8137085 4.5,10.5 L4.5,10.5 C4.5,7.1862915 7.1862915,4.5 10.5,4.5 Z"
                transform="rotate(90 12 10.5)"
              />
              <path
                d="M11,21 C12.1045695,21 13,20.1045695 13,19 C13,17.8954305 12.1045695,17 11,17"
                transform="rotate(90 12 19)"
              />
            </svg>
          </router-link> -->
        </div>
      </div>
    </header>
  </div>    
</template>
<script>
export default {
  name: "HomeHeader",

  data() {
    return {
      oldProfile: localStorage.getItem('photoUrl')
    }
  },

  props: {
    name: {
      default: '',
      type: String,
      required: false
    }
  },

  methods: {
    goToMyAccount() {
      this.$router.push({
        name: "User",
        params: {
          id: localStorage.getItem("uid"),
        },
      });
    },
  }
};
</script>
<style lang="scss">
  
.center-div {
  display: flex;
  align-items: center;
}

.post-content-wrapper {
  margin-top: 72px;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 10px;

  p {
    font-weight: 500;
    font-size: 17px;
    font-weight: bold;
  }
}

.profile-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
  background: gainsboro;
  margin-right: 10px;
  margin-top: 2px;
}
</style>
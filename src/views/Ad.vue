<template>
  <div class="share-page">
    <BackHeader name="Create ad" />
    <div class="main">
      <div>
        <!-- <p class="title">Apply for an Ad</p> -->
        <small style="line-height: 1.6"
          >Describe how you want the ad to look. You will receive your ad design
          in less than a week. Refunds are available if designs don't
          arrive</small
        >
        <br />
        <br />
        <div class="input-wrapper">
          <p class="label">Email to receive file</p>
          <input v-model="email" type="email" />
        </div>

        <!--  <div class="input-wrapper">
		        <p class="label">Sample file</p>
		      <input type="file" name="">
		      </div> -->

        <div class="input-wrapper">
          <p class="label">Link to sample</p>
          <input v-model="link" type="url" />
        </div>

        <div class="input-wrapper">
          <p class="label">Brief description</p>
          <textarea
            v-model="description"
            placeholder="Also include the main colors of your brand"
          ></textarea>
        </div>

        <div class="primary-btn" @click="send()">
          <a
            :href="
              `mailto:langfordquarshie21@gmail.com?subject=Ad request from Gridd&body= ${description} ${email} ${link}`
            "
          >
            <p style="font-weight: bold">Apply</p>
          </a>
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
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Share",

  data() {
    return {
      email: localStorage.getItem("email"),
      description: "",
      link: "",
      loading: false,
    };
  },

  methods: {
    send() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },

  components: {
    BackHeader,
  },
};
</script>
<style lang="scss" scoped>
.primary-btn {
  width: 110px;
}

.label {
  font-size: 18px;
  // font-weight: 600;
  margin-bottom: 13px;
}

.title {
  margin-bottom: 13px;
  text-align: center;
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
  border-radius: 15px;
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

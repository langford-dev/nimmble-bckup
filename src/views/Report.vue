<template>
  <div class="share-page">
    <BackHeader name="Send a report" />
    <div class="main">
      <div>
        <p class="section-name lg-txt">Report an issue</p>
        <!-- <p>Share your experience</p> -->
        <!-- <br /> -->
        <!-- <div class="input-wrapper">
          <p class="label">Your email</p>
          <input v-model="email" type="email" />
        </div> -->

       <!--  <div class="input-wrapper">
          <p class="label">Target ID</p>
          <input v-model="targetID" type="text" disabled/>
        </div> -->

        <div class="input-wrapper">
          <p class="label">What are you reporting?</p>
          <select id="report-target-type" @click="setReasonType()">
            <option>A post</option>
            <option>A comment</option>
            <option>A user</option>
          </select>
        </div>

        <div class="input-wrapper">
          <p class="label">Why?</p>
          <select id="report-reason" @click="setReason()">
            <option>I'm not interested in this</option>
            <option>It displays a sensitive photo/video</option>
            <option>It's abusive or harmful</option>
            <option>I'ts a spam</option>
            <option>It looks like a pedophile trap</option>
            <option>It expresses intensions of self-harm or suicide</option>
          </select>
        </div>


        <!-- <div class="input-wrapper">
          <p class="label">Brief description</p>
          <textarea v-model="description"></textarea>
        </div> -->

        <div class="primary-btn" @click="send()">
          <a
            :href="
              `mailto:langfordquarshie21@gmail.com?subject=Nimmble user report&body=* Post ID: ${targetID}* *Reason: ${reason}* *Type: ${type}*`
            "
          >
            <p style="font-weight: bold">Send report</p>
          </a>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loader">
      <div class="big-spin">
        <div class="small-spin"></div>
      </div>
    </div>
    <!-- 
        <div v-if="loading" class="loader">
      <img src="../assets/loader.gif" />
    </div> -->
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Report",

  data() {
    return {
      email: localStorage.getItem("email"),
      targetID: `${this.$route.params.id}`,
      reason: "I'm not interested in this",
      type: "A post",
      link: "",
      loading: false,
      typeChosen: false,
      reasonChosen: false,
    };
  },

  methods: {
    setReason() {
      var reasonEle = document.getElementById('report-reason')
      var selectedOpt = reasonEle.options[reasonEle.selectedIndex].text
      this.reason = selectedOpt
      this.reasonChosen = true
    },

    setReasonType() {
      var typeEle = document.getElementById('report-target-type')
      var selectedOpt = typeEle.options[typeEle.selectedIndex].text
      this.type = selectedOpt
      this.typeChosen = true
    },

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
  width: 143px;
}

.label {
  font-size: 15px;
  color: #6a6a6a;
  margin-bottom: 5px;
}

.title {
  margin-bottom: 13px;
  text-align: center;
}

.main {
  // padding: 15px;
  // max-width: 500px;
  // text-align: left;
  // margin: auto;
  // margin-top: 80px;
  // margin-bottom: 100px;
}

.input-wrapper {
  margin-bottom: 30px;
  margin-top: 20px;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px 13px;
  font-size: 15px;
  border: none;
  background: #fff;
  border-radius: 100px;
  border: 1px solid #E6E7E7;
  font-size: 15px;
  outline: none;
}

small {
  color: #6a6a6a;
  display: block;
  margin-bottom: 5px;
}

textarea {
  border-radius: 10px;
  height: 136px;
  resize: none;
}
</style>

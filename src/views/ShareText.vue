<template>
  <div class="share-page">
    <BackHeader name="Share" />
    <div class="main">
      <TextUploadForm />
    </div>
  </div>
</template>

<script>
import TextUploadForm from "@/components/TextUploadForm";
import BackHeader from "@/components/BackHeader";
// import imageCompression from "browser-image-compression";
// import firebaseApp from "../firebaseConfig.js";
// const db = firebaseApp.firestore();

export default {
  name: "ShareText",

  metaInfo() {
    return {
      title: "What you thinkin'?",
    };
  },

  components: {
    BackHeader,
    TextUploadForm,
  },
};
</script>

<style lang="scss">
.main {
  padding: 15px;
}
</style>

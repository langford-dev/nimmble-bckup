<template>
  <div class="share-page">
    <BackHeader name="Share" />
    <div class="main">
      <UploadForm />
    </div>
  </div>
</template>

<script>
import UploadForm from "@/components/UploadForm";
import BackHeader from "@/components/BackHeader";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Share",

  metaInfo() {
    return {
      title: "Share a photo ",
    };
  },

  components: {
    BackHeader,
    UploadForm,
  },
};
</script>

<style lang="scss">
.main {
  padding: 15px;
}
</style>

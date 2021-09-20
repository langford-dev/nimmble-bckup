<template>
  <div class="share-page">
    <BackHeader name="Upload a vid" />
    <div class="main">
      <VideoUploadForm />
    </div>
  </div>
</template>

<script>
import VideoUploadForm from "@/components/VideoUploadForm";
import BackHeader from "@/components/BackHeader";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "ShareVideo",

  metaInfo() {
    return {
      title: "Share a photo ",
    };
  },

  components: {
    BackHeader,
    VideoUploadForm,
  },
};
</script>

<style lang="scss">
.main {
  padding: 15px;
}
</style>

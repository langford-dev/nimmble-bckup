<template>
  <div class="share-page">
    <BackHeader name="Status" />
    <BigPostContentCard />
  </div>
</template>

<script>
import BigPostContentCard from "@/components/BigPostContentCard";
import BackHeader from "@/components/BackHeader";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Status",

  metaInfo() {
    return {
      title: "Status",
    };
  },

  components: {
    BackHeader,
    BigPostContentCard,
  },
};
</script>

<style lang="scss" scoped>
</style>

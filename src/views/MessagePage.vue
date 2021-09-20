<template>
  <div class="alerts-page">
    <BottomNav />
    <BackHeader name="Message" />
    <div class="not-found">
      You have no alerts
    </div>
  </div>
</template>

<script>
import BottomNav from "@/components/BottomNav";
import BackHeader from "@/components/BackHeader";
import firebase from "../firebaseConfig.js";
const db = firebase.firestore();

export default {
  name: "Messages",

  data() {
    return {
      alerts: [],
    };
  },

  mounted() {
    this.checkAuthState();
  },

  components: {
    BackHeader,
    BottomNav,
  },

  methods: {
    checkAuthState() {
      const user = firebase.auth().currentUser;
      if (
        localStorage.getItem("uid") == null &&
        localStorage.getItem("photoUrl") == null &&
        localStorage.getItem("name") == null &&
        user == null
      ) {
        this.$router.replace("/login").catch(() => {});
      }
    },
  },
};
</script>

<template>
  <div class="notifications-page">
    <BottomNav />
    <HomeHeader name="Notifs" />

    <div v-if="!hasNotifications" class="not-found">
      You have no alerts
    </div>
    <!-- <br> -->
      <NotificationCard
        v-for="notification in notifications"
        key="notification.id"
        :notificationId = "notification.id"
      />
        
      <vue-topprogress
        ref="topProgress"
        :height="topProgressHeight"
        colorShadow="=#ffffff00"
        color="#1da1f2"
      ></vue-topprogress>
  </div>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";
import BottomNav from "@/components/BottomNav";
import BackHeader from "@/components/BackHeader";
import NotificationCard from "@/components/NotificationCard";
import HomeHeader from "@/components/HomeHeader";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Alerts",

  data() {
    return {
      notifications: [],
      hasNotifications: true,
      topProgressHeight: 4,
    };
  },

  mounted() {
    this.checkAuthState()
  },

  watch: {
    $route(to, from) {
      if(to['name'] == 'Alerts') this.checkAuthState()
    },
  },

  components: {
    BackHeader,
    NotificationCard,
    BottomNav,
    HomeHeader,
    vueTopprogress,
  },

  methods: {
    async updateAlertOpenTime() {
      this.$refs.topProgress.start();

      await db
      .collection('Users')
      .doc(localStorage.getItem('uid'))
      .update({
        'lastOpenAlertTime': firebaseApp.serverTimestamp
      })

      this.getNotifications()
    },

    async getNotifications() {
      this.notifications = []
      
      await db
      .collection('Users')
      .doc(localStorage.getItem('uid'))
      .collection('Notifications')
      .orderBy('notificationTime', 'desc')
      .limit(10)
      .onSnapshot((snapshot) => {
        let t = this
        
        if(snapshot.size > 0) {
          this.hasNotifications = true
          // this.checkDocChanges(snapshot)

          snapshot.forEach((doc) => {
            // console.log(doc.data())
            let notification = doc.data();
            notification.id = doc.id;
            this.notifications.push(notification);
          })
          
          this.$refs.topProgress.done();
        }

        else {
          this.hasNotifications = false
          this.$refs.topProgress.done();
        }
      })
    },

    checkAuthState() {
      if (
        localStorage.getItem("uid") == null ||
        localStorage.getItem("photoUrl") == null ||
        localStorage.getItem("name") == null
      ) this.$router.replace("/login").catch(() => {});
      else this.updateAlertOpenTime()
    },
  },
};
</script>

<style lang="scss">
.notifications-page {
  padding-top: 33px;
  padding-bottom: 100px;
}
</style>
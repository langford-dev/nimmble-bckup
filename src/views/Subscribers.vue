<template>
  <div>
    <BackHeader :name="pageName" />
    <div class="main">
      <div class="user-card" v-for="person in subscribers">
        <div class="profile-img-text" @click="viewUser(person.id)">
          <img :src="person.photoUrl" />
          <div>
            <p class="name">
              {{ person.name }}
            </p>
            <p class="work">
              {{ person.work }}
            </p>
          </div>
        </div>

        <div class="subscribe-btn-active">
          <p>Message</p>
        </div>
      </div>
    </div>

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#1da1f2"
      color="#1da1f2"
    ></vue-topprogress>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { vueTopprogress } from "vue-top-progress";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Subs",

  data() {
    return {
      pageName: '',
      userAccountName: '',
      subscribers: [],
      subscribersNum: '',
      topProgressHeight: 4,
    }
  },

  mounted() {
    this.getSubscribers()
    this.getUserAccountName()
  },

  components: {
    BackHeader,
    vueTopprogress
  },

  methods: {
    async getSubscribers() {
      this.$refs.topProgress.start();
      await db
      .collection("Users")
      .doc(this.$route.params.id)
      .collection("Subscribers")
      .onSnapshot((snapshot) => {
        this.subscribers = []

        snapshot.forEach(async (doc) => {
          let t = this
          let subscriber = doc.data();
          subscriber.id = doc.id;
          console.log(subscriber)

          await db
          .collection("Users")
          .doc(subscriber.id)
          .get()
          .then((doc) => {
            console.log(doc.data())
            let sub = doc.data();
            sub.id = doc.id;
            t.subscribers.push(sub);
          })

          this.$refs.topProgress.done();
        });
      });
    },

    async getUserAccountName() {
      await db
      .collection("Users")
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        console.log(doc.size);
        this.userAccountName = doc.data()["name"];
        this.pageName = this.userAccountName
        this.getSubscribersNum()
      });
    },

    async getSubscribersNum() {
      await db
      .collection("Users")
      .doc(this.$route.params.id)
      .collection("Subscribers")
      .onSnapshot((doc) => {
        console.log(doc.size);
        this.formatSubscribersNum(doc.size);
      });
    },

    formatSubscribersNum(num) {
      if (num > 999 && num < 1000000) {
        this.subscribersNum = (num / 1000).toFixed(2) + "k";
        this.pageName = `${this.userAccountName}'s followers (${this.subscribersNum})`
      } else if (num > 1000000) {
        this.subscribersNum = (num / 1000000).toFixed(2) + "M";
        this.pageName = `${this.userAccountName}'s followers (${this.subscribersNum})`
      } else if (num < 900) {
        this.subscribersNum = num;
        this.pageName = `${this.userAccountName}'s followers (${this.subscribersNum})`
      }
    },

    viewUser(id) {
      this.$router.push({
        name: "User",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.main {
  padding: 15px;
  margin-top: 42px;
}



.user-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1.5;
  padding: 10px 0;
  justify-content: space-between;

  .profile-img-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &:hover {
    background: #fff;
  }

  .name {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }

  .work {
    font-weight: 300;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }

  img {
    object-fit: cover;
    width: 45px;
    height: 45px;
    border-radius: 100px;
    background: #f1f1f1;
    margin-right: 10px;
  }
}
</style>

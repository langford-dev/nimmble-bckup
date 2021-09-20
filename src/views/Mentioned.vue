<template>
  <div>
    <BackHeader name="Mentions" />
    <div class="main">
      <div class="user-card" v-for="person in mentioned">
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

        <div class="filled">
          <p>Message</p>
        </div>
      </div>
    </div>

    <vue-topprogress
      ref="topProgress"
      :height="topProgressHeight"
      colorShadow="=#00acee"
      color="#00acee"
    ></vue-topprogress>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { vueTopprogress } from "vue-top-progress";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "Mentioned",

  data() {
    return {
      mentioned: [],
      topProgressHeight: 4,
    }
  },

  mounted() {
    this.getSubscribers()
  },

  components: {
    BackHeader,
    vueTopprogress
  },

  methods: {
    async getSubscribers() {
      this.$refs.topProgress.start();
      await db
      .collection("Posts")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        let mentions = doc.data()['mentions'];
        console.log(mentions)

        let t = this
        for (var i = mentions.length - 1; i >= 0; i--) {
          mentions[i]

          db
            .collection("Users")
            .doc(mentions[i])
            .get()
            .then((doc) => {
              console.log(doc.data())
              let sub = doc.data();
              sub.id = doc.id;
              t.mentioned.push(sub);
            })
          }
          this.$refs.topProgress.done();
      })
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

  .filled {
    padding-top: 7px;
    background: #000;
    height: 36px;
    border-radius: 100px;

    p {
      color: #fff;
    }

    &:hover {
      background: #f1f1f1;

      p {
        color: #000;
      }
    }
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
    width: 60px;
    height: 60px;
    border-radius: 100px;
    background: #f1f1f1;
    margin-right: 10px;
  }
}
</style>

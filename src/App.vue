<template>
  <div>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>

    <v-offline
      online-class="online"
      offline-class="offline"
      @detected-condition="amIOnline"
    >
      <template v-slot:[onlineSlot] :slot-name="onlineSlot">
        <svg
          style="margin-top: 0"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#211922"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-slash"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>

        <p>Looks like you are offline</p>
      </template>

      <template v-slot:[offlineSlot] :slot-name="offlineSlot">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#211922"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-slash"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>

        <p>Looks like you are offline</p>
      </template>
    </v-offline>
  </div>
</template>
<script>
import '@/styles/style.css'
import VOffline from "v-offline";

export default {
  name: "app",

  data: () => ({
    onLine: null,
    onlineSlot: "online",
    offlineSlot: "offline",
  }),

  components: {
    VOffline,
  },

  methods: {
    amIOnline(e) {
      this.onLine = e;
    },
  },

  metaInfo() {
    return {
      title: "Nimmble 💫",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Gridd photo sharing and downloading website from Pandora.co",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Gridd, Photo, Image, Picture, Picture of, Photo of, Image of, Placeholder, Pinterest, Imgur, Photoshoot",
        },
        { vmid: "robots", name: "robots", content: "index, follow" },
      ],
    };
  },
};
</script>

<style lang="scss">
$border-color: #e7e6e6;
$grey-text-color: #a4a4a4;
$btn-color: #ff6f00;
$primary-color: red;
$secondary-color: blue;
$body-color: #f8f9fb;
$accent-color: red;

.offline {
  background: #14171A;
  position: fixed;
  z-index: 4;
  padding: 12px 10px;
  bottom: 50px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: #211922;
    margin-top: 1px;
  }
}

@keyframes online {
  0% {
    transform: translateY(0);
    display: block;
  }

  100% {
    transform: translateY(1000px);
    display: none;
  }
}

.online {
  display: none;
  // background: #5cff00;
  // position: fixed;
  // z-index: 4;
  // padding: 12px 10px;
  // bottom: 51px;
  // font-weight: bold;
  // width: 100%;
  // text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // animation: online 5s linear;

  p {
    color: #fff;
  }

  svg {
    display: none;
  }
}

body {
  background: #fff;
  // background: #0f0f0f
}

* {

}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #3c92f2;
  font-size: inherit;
}

::-webkit-scrollbar {
  // width: 10px;
  display: none;
  width: 0;
  background: #fff;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 21px;
}

@media screen and (min-width: 320px) {
  // * {
    // font-size: 0.97rem;
  // }
}

@media screen and (min-width: 1160px) {
  * {
    font-size: 1em;
  }
}
</style>

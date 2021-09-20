<template>
  <div class="collection-card" @click="seeCollection(collectionId)">
    <v-lazy-image class="collection-photo" :src="collectionPhoto" />

    <div class="name-num">
      <p class="collection-name">
        {{ collectionName }}
        <span style="position: relative; top: 1px" v-if="!isPublic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#313131"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-lock"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </span>
      </p>
      <p class="collection-num" v-if="collectionPhotosNum === 1">
        {{ collectionPhotosNum }} pic
      </p>
      <p
        class="collection-num"
        v-if="collectionPhotosNum > 1 || collectionPhotosNum <= 0"
      >
        {{ collectionPhotosNum }} pics
      </p>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

export default {
  name: "CollectionCard",

  components: {
    VLazyImage,
  },

  props: {
    collectionName: {
      type: String,
      default: "",
      required: true,
    },

    collectionId: {
      type: String,
      default: "",
      required: true,
    },

    collectionPhotosNum: {
      default: "0",
      required: true,
    },

    isPublic: {
      default: false,
      required: true,
    },

    collectionPhoto: {
      type: String,
      default: "",
      required: true,
    },
  },

  methods: {
    seeCollection(id) {
      this.showCreateDialog = false;
      this.showMore = false;
      this.$router.push({
        name: "ViewCollection",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.collection-card {
  cursor: pointer;
  display: flex;
  align-items: baseline;
  flex-direction: column;
  width: 143px;
  height: 143px;
  padding-bottom: 0;
  margin-bottom: 49px;

  // &:hover {
  //   background: #fff;
  // }

  .collection-name {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 7px;
    font-weight: 800;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }

  .name-num {
    width: 100%;
    text-align: left;
    margin-top: -29px;
  }

  .collection-num {
    font-weight: 400;
    margin-top: -1px;
  }

  .collection-photo {
    width: 100%;
    height: 110px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 17px;
    background: #f1f1f1;
    position: relative;
    top: -36px;
  }
}
</style>

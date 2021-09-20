<template>
  <div class="share-page">
    <BackHeader name="Share a quote" />
    <div class="main">
      <h1>Convert text to image</h1>
      <small>Long press to download lol</small>

      <canvas
        style="display: none"
        id="myCanvas"
        width="220"
        height="500"
      ></canvas>

      <div id="preview"></div>

      <input
        v-model="txtxt"
        type="text"
        style="position: fixed; bottom: 60px; padding: 10px"
        placeholder="Just a random text"
      />

      <button
        style="position: fixed; bottom: 60px; right: 0"
        @click="convertToImage"
      >
        Convert to Image
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import canvasTxt from "canvas-txt";
import UploadForm from "@/components/UploadForm";
import BackHeader from "@/components/BackHeader";
import imageCompression from "browser-image-compression";
import firebaseApp from "../firebaseConfig.js";
const db = firebaseApp.firestore();

export default {
  name: "ShareText",

  data() {
    return {
      txtxt: "",
    };
  },

  metaInfo() {
    return {};
  },

  components: {
    BackHeader,
    UploadForm,
  },

  methods: {
    convertToImage() {
      if (this.txtxt != "") {
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        const txt = `\n \n ${this.txtxt} \n \n \n \n \n`;

        var img = document.createElement("img");
        var preview = document.getElementById("preview");
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);

        ctx.fillStyle = "#" + randomColor;
        ctx.fillRect(0, 0, c.width, c.height);

        canvasTxt.fontSize = 18;
        canvasTxt.lineHeight = 25;
        canvasTxt.font = "sans-serif";
        canvasTxt.fontWeight = "bold";
        canvasTxt.color = "#" + randomColor;

        ctx.fillStyle = "#fff";
        canvasTxt.drawText(ctx, txt, 10, 10, 200, 500);
        this.txtxt = "";

        img.src = c.toDataURL("image/png");
        preview.append(img);
      }
    },
  },
};
</script>

<style lang="scss">
.main {
  // max-width: 733px;
  // margin: 0 auto;
  // margin-bottom: 50px;
  // position: relative;
  // padding: 0 10px;
  // margin-top: 55px;
}
</style>

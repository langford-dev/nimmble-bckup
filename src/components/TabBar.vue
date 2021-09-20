<template>
  <div class="tab-bar">
    <router-link :to="{ name: 'Tag', params: { tag: 'ClassicMeme' } }">
      <span>#ClassicMeme</span>
    </router-link>
    
    <router-link :to="{ name: 'Tag', params: { tag: 'Art' } }">
      <span>#MyArt</span>
    </router-link>

    <router-link :to="{ name: 'Tag', params: { tag: 'Gaming' } }">
      <span>#Gaming</span>
    </router-link>

    <router-link :to="{ name: 'Tag', params: { tag: 'FamousPeople' } }">
      <span>#FamousPeople</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "TabBar",
};
</script>

<template lang="html">
  <div class="lost-page">
    <img class="lost-page__img" :src="`/${lostImg}`"></img>
  </div>
</template>

<script>
  import lostImg from 'Assets/img/lost_img.jpg';

  export default {
  data() {
    return {
      lostImg
    }
  }
  }
</script>

<style lang="scss" scoped>
  .lost-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #ECEFF1;
    &__img {
      width: 40vw;
      @media (max-width: 600px) {
        width: 100vw;
      }
    }
  }
</style>

<template>
  <div class='v-pagination'>
    <ul class="v-pagination__list">
      <li class="v-pagination__item">
        <div class="v-pagination__left">
          <img src="@/assets/img/arrow-left.svg" alt="arrow-left">
        </div>
      </li>
      <li class="v-pagination__item" v-for="page in pages">
        <span class="v-pagination__number">{{ page }}</span>
      </li>
      <li class="v-pagination__item">
        <div class="v-pagination__left">
          <img src="@/assets/img/arrow-right.svg" alt="arrow-left">
        </div>
      </li>
    </ul>
  </div>
</template>

<script >
export default {
  name: 'v-pagination',
  props: {
    pages: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang='scss'>
.v-pagination {

  &__list {
    display: flex;
  }

  &__item {
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
  }

  &__left {}

  &__number {


    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
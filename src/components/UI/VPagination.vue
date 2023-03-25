<template>
  <div class='v-pagination'>
    <ul class="v-pagination__list">
      <li class="v-pagination__item-left">
        <div class="v-pagination__left">
          <img src="@/assets/img/arrow-left.svg" alt="arrow-left">
        </div>
      </li>
      <li class="v-pagination__item" v-for="page in pages" :key="page">
        <span class="v-pagination__number"
          :class="{
            'v-pagination__number--active': page === currentPage
          }"
          @click="changePage(page)">
          {{ page }}
        </span>
      </li>
      <li class="v-pagination__item-right">
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
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage(page) {
      this.$emit('on-change-page', page);
    }
  }
}
</script>

<style lang='scss'>
.v-pagination {

  &__list {
    display: flex;

    :nth-last-of-type(2) {
      border-right: none;
    }
  }

  &__item-left,
  &__item-right {
    cursor: pointer;
  }

  &__item {
    width: 52px;

    border: 1px solid #A2A3A4;
    border-left: none;
    cursor: pointer;


  }

  &__left {}

  &__number {

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    &:hover {
      background: #A2A3A4;
    }
  }
}

.v-pagination__number--active {
  color: #fff;
  background: #00a3ff;

  &:hover {
    background: #00a3ff;

  }
}
</style>
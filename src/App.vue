<template>
  <div id="app" class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header__search">
          <VInputSearch
            ref="inputSearch"
            name="search"
            placeholder="Начните вводить текст для поиска (не менее трех символов)"
            :limit="limit"
            :page="page"
            @gotCards="gotCardsApp" />
        </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <ul class="main__cards cards-main" v-if="items.length">
          <li class="cards-main__item" v-for="item in items">
            <VCardItem
              ref="cardItem"
              :author="item.owner.login"
              :projectName="item.name"
              :projectId="item.id"
              :stargazersCount="item.stargazers_count"
              :watchersCount="item.watchers_count"
              :htmlUrl="item.html_url"
              :avatarUrl="item.owner.avatar_url" />
          </li>
        </ul>
        <p v-else-if="loading" class="main__preloader">Поиск проектов...</p>
        <p v-else class="main__preloader">Список проектов пуст</p>
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer__body">
          <div class="footer__row">
            <div class="footer__select">
              <VSelect :options="options" @on-change-option="onChangeOption" />
            </div>
            <div class="footer__pagination">
              <VPagination
                @on-change-page="onChangePage"
                :pages="totalPages"
                :currentPage="page" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import VInputSearch from "@/components/UI/VInputSearch.vue"
import VSelect from '@/components/UI/VSelect.vue'
import VPagination from '@/components/UI/VPagination.vue'
import VCardItem from "./components/VCardItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    VInputSearch,
    VCardItem,
    VSelect,
    VPagination
  },
  data() {
    return {
      query: '',
      page: 1,
      limit: 10,
      options: [10, 25, 50],
    }
  },
  computed: {
    ...mapGetters('cardItems', {
      items: 'cardItems',
      totalCountItems: 'totalCount',
      loading: 'stateLoading'
    }),
    totalPages() {
      const total = Math.ceil(this.totalCountItems / this.limit);
      return (total > 6 ? 6 : total)
    }
  },
  methods: {
    gotCardsApp() {
      this.$refs.cardItem.forEach(card => {
        card.displayComment()
      })
    },
    onChangeOption(option) {
      this.limit = Number(option)
    },
    onChangePage(page) {
      this.page = page
      this.$refs.inputSearch.sendQuery()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/settings.scss';
@import '@/assets/scss/UI/base-field.scss';

.header {
  background: #DDDDDD;

  &__search {
    padding: 32px 0 47px 0;
  }
}

.cards-main {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
  padding: 34px 0 24px 0;

  &__item {
    padding: 15px;
    flex: 0 0 33.333%;

    @include to(1150px) {
      flex: 0 0 50%;
    }

    @include to(850px) {
      flex: 0 0 100%;
    }

    @include to(450px) {
      padding: 15px 5px;
    }
  }


}

.main__preloader {
  padding: 62px;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
}

.footer {
  &__body {
    padding: 24px 0 57px 0;

  }

  &__row {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__select {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__pagination {}
}
</style>

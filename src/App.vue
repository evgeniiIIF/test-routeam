<template>
  <div id="app" class="wrapper">
    <header class="header">
      <div class="container">
        <div class="header__search">
          <VInputSearch
            name="search"
            placeholder="Начните вводить текст для поиска (не менее трех символов)"
            :limit="limit"
            :page="page" />
        </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <ul class="main__cards cards-main">
          <li class="cards-main__item" v-for="item in items">
            <VCardItem
              :author="item.owner.login"
              :projectName="item.name"
              :projectId="item.id"
              :stargazersCount="item.stargazers_count"
              :watchersCount="item.watchers_count"
              :htmlUrl="item.html_url"
              :avatarUrl="item.owner.avatar_url" />
          </li>
        </ul>
      </div>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer__row">
          <div class="footer__select">
          </div>
          <div class="footer__pagination">
            <VPagination :pages="3" />
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
      options: [10, 25, 50]
    }
  },
  computed: {
    ...mapGetters('cardItems', {
      items: 'cardItems'
    })
  },
  methods: {
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

.footer {
  &__row {
    padding: 24px 0 57px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__select {}

  &__pagination {}
}
</style>

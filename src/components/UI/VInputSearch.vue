<template>
  <form class='base-field v-input-search' @submit.prevent="sendQuery">
    <div class="base-field__row">
      <input class="base-field__input"
        type="text"
        autocomplete="off"
        :name="name"
        :placeholder="placeholder"
        v-model="queryText">
      <div class="base-field__action action-base-field">
        <button class="action-base-field__button">
          <img class="action-base-field__icon"
            src="@/assets/img/search.svg"
            alt="search"
            v-if="!loading">
          <span class="v-input-search__loading" v-else></span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      queryText: ''
    }
  },
  computed: {
    ...mapGetters('cardItems', {
      loading: 'stateLoading'
    })
  },

  methods: {
    ...mapActions('cardItems', {
      getCards: 'getCardItems'
    }),
    async sendQuery() {
      const queryData = {
        queryText: this.queryText,
        limit: this.limit,
        page: this.page
      }
      await this.getCards(queryData);
      this.$emit('gotCards')
    }
  }
}
</script>

<style lang='scss'>
.v-input-search {
  &__loading {
    width: 40px;
    height: 40px;
    border: 7px solid #fff;
    border-right-color: transparent;
    border-radius: 50%;
    animation: loading 1s linear infinite;
  }

  .base-field__input {
    padding: 25px 100px 23px 23px;
  }

  .action-base-field__button {
    width: 80px;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
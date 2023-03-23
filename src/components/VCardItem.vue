<template>
  <a class='v-card-item' :href="htmlUrl" target="_blank">
    {{ projectId }}
    <h3 class="v-card-item__title"> {{
      projectName }}</h3>
    <div class="v-card-item__info info-card-item">
      <div class="info-card-item__top top-card-info">
        <img class="top-card-info__image"
          :src="avatarUrl" alt="avatar">
        <p class="top-card-info__name">{{ author }}</p>
      </div>
      <div class="info-card-item__bottom bottom-card-info">
        <div class="bottom-card-info__item">
          <img class="bottom-card-info__icon"
            src="@/assets/img/star.svg" alt="star">
          <span class="bottom-card-info__value">{{ stargazersCount }}</span>
        </div>
        <div class="bottom-card-info__item">
          <img class="bottom-card-info__icon"
            src="@/assets/img/eye.svg" alt="star">
          <span class="bottom-card-info__value">{{ watchersCount }}</span>
        </div>
      </div>
    </div>
    <div class="v-card-item__input" @click.prevent>
      <VInputWrite
        placeholder="Комментарий к проекту"
        name="coment"
        :comment="comment"
        @on-save-comment="onSaveComment" />
    </div>
  </a>
</template>

<script>
import VInputWrite from './UI/VInputWrite.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'v-card-item',
  props: {
    projectId: {
      type: Number,
      requited: true
    },
    projectName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: true
    },
    htmlUrl: {
      type: String,
      required: true
    },
    stargazersCount: {
      type: Number,
      required: true
    },
    watchersCount: {
      type: Number,
      required: true
    }
  },
  components: {
    VInputWrite
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
    ...mapGetters('savedComments', {
      commentsAll: 'commentsForProjects'
    })
  },
  methods: {
    ...mapActions('savedComments', {
      saveCommentData: 'saveComment',
      initComment: 'init'
    }),
    onSaveComment(commentText) {
      const commentData = {
        commentText,
        projectId: this.projectId,
        projectName: this.projectName
      }
      this.saveCommentData(commentData)
      this.displayComment()
    },
    displayComment() {
      this.initComment()
      this.commentsAll.forEach(comment => {
        if (comment.projectId === this.projectId) {
          this.comment = comment.commentText
        }
      })
    }
  },
  mounted() {
    this.displayComment()
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/mixins.scss';

.v-card-item {
  display: block;
  padding: 7px 15px 12px;
  border: 1px solid #A2A3A4;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: inherit;
  background: #FFFFFF;

  &__title {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 18px;
  }

  &__info {
    margin-bottom: 15px;
  }

  &__input {}
}

.info-card-item {

  &__top {
    margin-bottom: 12px;
  }

  &__bottom {}
}

.top-card-info {
  display: flex;
  align-items: center;

  &__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 26px;

    img {
      max-width: 100%;
    }
  }

  &__name {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
  }
}

.bottom-card-info {
  display: flex;
  align-items: center;
  @include mr(36px);

  &__item {
    display: flex;
    align-items: center;
  }


  &__icon {
    margin-right: 18px;
  }

  &__value {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }

}
</style>
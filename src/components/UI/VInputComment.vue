<template>
  <div class='base-field v-input-comment'>
    <div class="base-field__row" :style="writingProcess ? 'z-index: 10' : 'z-index: 0'">
      <textarea class="base-field__input"
        type="text"
        :name="name"
        :placeholder="placeholder"
        :value="comment"
        @focus="focusTextArea"
        @input="writeComment"
        @blur="saveComment"></textarea>
      <div class="base-field__action action-base-field">
        <button class="action-base-field__button">
          <img class="action-base-field__icon"
            v-if="!writingProcess"
            src="@/assets/img/pencil.svg"
            alt="pencil"
            @click="focusToTextArea">
          <span class="v-input-comment__button-inner"
            v-else>ok</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    comment: {
      type: String,
      required: true
    }
  },

  data() {

    return {
      writingProcess: false,
    }
  },
  methods: {
    focusTextArea(e) {
      this.writingProcess = true
      this.setHeightTextArea(e)
    },

    writeComment(e) {
      this.setHeightTextArea(e)
    },
    saveComment(e) {
      const textArea = e.target
      textArea.style.height = 54 + 'px'
      this.$emit('on-save-comment', textArea.value)
      this.writingProcess = false

    },
    focusToTextArea(e) {
      const textArea = e.target.closest('.base-field__row').querySelector('.base-field__input')
      textArea.focus()
    },
    setHeightTextArea(e) {
      const textArea = e.target
      textArea.style.height = 54 + 'px'
      textArea.style.height = textArea.scrollHeight + 'px'
    }
  }
}
</script>

<style lang='scss'>
.v-input-comment {
  position: relative;
  height: 54px;

  &__button-inner {
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
  }

  .base-field__row {
    position: absolute;
    width: 100%;
  }

  .base-field__input {
    height: 54px;
    min-height: 54px;
    padding: 16px 70px 16px 14px;
  }

  .action-base-field__button {
    padding: 6px 11px;
    width: 64px;
  }
}
</style>
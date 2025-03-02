<template>
  <div
      class="card"
      :class="[...Array.isArray(customClass) ? customClass : [customClass], { 'card-plain': plain, 'card-raised': raised }, `card-${type}`]"
      :style="{ ...defaultStyle, ...customStyle }"
      :data-background-color="color"
  >
    <h6 class="card-category" v-if="$slots.category || category">
      <slot name="category">{{ category }}</slot>
    </h6>
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-avatar" v-if="$slots.avatar">
      <slot name="avatar"></slot>
    </div>
    <div class="info" v-if="$slots.info">
      <slot name="info"></slot>
    </div>
    <div class="card-header" v-if="$slots.header || title" :class="headerClasses">
      <slot name="header">
        <h1 v-if="title" class="card-title">{{ title }}</h1>
        <h3 v-if="subTitle" class="card-category">{{ subTitle }}</h3>
        <p v-if="description" class="card-description">{{ description }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="card-body" :class="cardBodyClasses">
      <slot></slot>
    </div>
    <slot name="raw-content"></slot>
    <hr v-if="$slots.footer && !noFooterLine" />
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    type: String,
    title: String,
    subTitle: String,
    category: String,
    color: String,
    description: String,
    noFooterLine: Boolean,
    plain: Boolean,
    raised: Boolean,
    cardBodyClasses: [String, Object, Array],
    headerClasses: [String, Object, Array],
    customClass: {
      type: [String, Array],
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      defaultStyle: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }
    };
  }
};
</script>

<style scoped>
.card {
  font-family: Arial, sans-serif;
}
</style>

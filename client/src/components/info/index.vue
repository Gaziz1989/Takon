<style src="./style.css" scoped></style>
<template>
  <div :class="getStyle">
    <p class="greyFont">{{title}}</p>
    {{getText}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Титул'
    },
    text: String,
    full: Boolean
  },
  computed: {
    getStyle () {
      return this.full ? 'fullOf' : 'halfOf'
    },
    getText () {
      return this.text ? this.text : 'Нет данных'
    }
  }
}
</script>

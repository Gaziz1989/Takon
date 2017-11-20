<style src="./style.css" scoped></style>
<template>
  <div :class="getStyle">
    <p class="greyFont">{{title}}</p>
    <input :type="type" :placeholder="getText" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Титул'
    },
    placeholder: String,
    type: String,
    full: Boolean,
    value: String
  },
  computed: {
    getStyle () {
      return this.full ? 'fullOf' : 'halfOf'
    },
    getText () {
      return this.placeholder ? this.placeholder : 'Нет данных'
    }
  }
}
</script>

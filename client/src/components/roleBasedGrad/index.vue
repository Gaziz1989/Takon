<style src="./style.css" scoped></style>
<template>
  <div :class="getStyle">
    <p class="greyFont">{{title}}</p>
    <select>
      <option value=""></option>
      <option value="Джуниор">Джуниор</option>
      <option value="Мидл">Мидл</option>
      <option value="Синьор">Синьор</option>
    </select>
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
    full: Boolean,
    role: String
  },
  computed: {
    getStyle () {
      return this.full ? 'fullOf' : 'halfOf'
    },
    getText () {
      return this.text ? this.text : 'Нет данных'
    }
  },
  methods: {}
}
</script>

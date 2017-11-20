<style src="./style.css" scoped></style>
<template>
  <v-layout column> 
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
          {{title}}
        <div class="pl-4 pr-4 pt-2 pb-2">
          <slot>
            No slot content!
          </slot>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

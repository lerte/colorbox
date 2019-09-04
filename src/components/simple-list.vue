<template>
  <div>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="item in items" :key="item.objectID">
        <a class="hover:tw-underline" :url="item.url">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import wepy from '@wepy/core';

wepy.component({
  props: {
    items: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

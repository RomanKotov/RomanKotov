<template>
<section v-if="shouldShowComments">
  <h2>
    Comments
  </h2>
  <ul>
    <li v-for="comment in frontmatter.comments" :key="comment._id">
      <pre>
      {{JSON.stringify(comment, null, 2)}}
      </pre>
    </li>
  </ul>
</section>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import type { DefaultThemePageFrontmatter } from "@vuepress/theme-default/shared";

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const shouldShowComments = computed(() => frontmatter.value.comments !== false);
</script>

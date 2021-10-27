<template>
<section v-if="shouldShowComments" class="giscus">
</section>
</template>

<script setup lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import type { DefaultThemePageFrontmatter } from "@vuepress/theme-default/shared";

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const shouldShowComments = computed(() => frontmatter.value.comments === true);
</script>

<style lang="scss">
.giscus {
  width: 98%;
  margin: 0 auto;
}
</style>

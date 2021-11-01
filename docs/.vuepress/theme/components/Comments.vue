<template>
  <Giscus
    :key="theme"
    v-if="shouldShowComments"
    repo="RomanKotov/RomanKotov"
    repoId="MDEwOlJlcG9zaXRvcnkyNjEwMDA5MDQ="
    category="Comments"
    categoryId="DIC_kwDOD46OyM4B_qzg"
    mapping="og:title"
    reactionsEnabled="1"
    :theme="theme"
    lang="en"
    emitMetadata="0"
  />
</template>

<script setup lang="ts">
import { Giscus } from '@giscus/vue';
import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import type { DefaultThemePageFrontmatter } from "@vuepress/theme-default/shared";
import { useDarkMode } from "@vuepress/theme-default/lib/client";

const isDarkMode = useDarkMode();
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const shouldShowComments = computed(() => frontmatter.value.comments === true);
const theme = computed(() => isDarkMode.value ? "dark" : "preferred_color_scheme");
</script>

<style lang="scss">
.giscus {
  width: 98%;
  margin: 0 auto;
}
</style>

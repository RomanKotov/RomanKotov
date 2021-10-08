<template>
<Layout>
  <template #page-bottom>
    <div class="my-footer">
      <ul class="social-media-list">
        <li>
          <a rel="me" href="https://github.com/RomanKotov" title="RomanKotov">
            <svg class="svg-icon grey"><use xlink:href="/assets/minima-social-icons.svg#github"></use></svg>
          </a>
        </li>
        <li>
          <a rel="me" href="https://stackoverflow.com/users/8013693" title="8013693">
            <svg class="svg-icon grey"><use xlink:href="/assets/minima-social-icons.svg#stackoverflow"></use></svg>
          </a>
        </li>
        <li>
          <a rel="me" href="https://www.linkedin.com/in/kotovr" title="kotovr">
            <svg class="svg-icon grey"><use xlink:href="/assets/minima-social-icons.svg#linkedin"></use></svg>
          </a>
        </li>
        <li>
          <a rel="me" href="https://twitter.com/kotovr" title="kotovr">
            <svg class="svg-icon grey"><use xlink:href="/assets/minima-social-icons.svg#twitter"></use></svg>
          </a>
        </li>
      </ul>
      <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">
        <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png">
      </a>
    </div>
  </template>
</Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

export default {
    components: {
        Layout,
    },
}
</script>

<style lang="scss">
.my-footer {
    text-align: center;
}

.social-media-list {
    display: table;
    margin: 0 auto;
    list-style-type: none;

    & li {
        float: left;
        margin: 5px 10px 5px 0;

        & a {
            display: block;
            padding: 7.5px;
            border: 1px solid var(--c-text);
            border-radius: 5px;
        }
    }

    .svg-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        fill: var(--c-text);
        padding: 5px 3px 2px 5px;
        vertical-align: text-bottom;
    }
}
</style>

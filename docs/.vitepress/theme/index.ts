// https://vitepress.dev/guide/custom-theme
import {h, watchEffect} from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import {inBrowser, useData, useRouter} from 'vitepress'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  setup() {
    const { lang } = useData()
    watchEffect(async () => {
      if (inBrowser) {
        document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`
      }
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}

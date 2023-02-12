const {description} = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'CaraDoc',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', {name: 'theme-color', content: '#3eaf7c'}],
    ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    smoothScroll: true,
    logo: '/hero.png',
    nav: [
      {
        text: 'Toutes les formations',
        link: '/',
      },
      {
        text: 'Contribuer',
        link: 'https://github.com/paulinegilg/caradoc',
      },
    ],
    sidebar: {
      '/accessibilite/': [
        '',
        'qu-est-ce-que-l-accessibilite',
        'pourquoi-l-accessibilite-est-importante',
        'les-differents-handicaps',
        'les-technologies-d-assistance',
        'couleurs-et-contraste',
        'images',
        'video-et-audio',
        'animations',
        'contenus-textuels',
        'html-et-aria',
        'formulaires',
        'referentiels-et-lois',
        'tester-l-accessibilite',
        'accessibilite-en-projet-web',
        'conclusion',
        'webographie-et-ressources-a-explorer'
      ],
      '/rgpd-fondamentaux/': [
        '',
        'definition-donnee-personnelle',
        'pourquoi-proteger-les-donnees',
        'historique-protection-donnees-personnelles',
        'definition-traitement-responsable-finalite',
        'champ-d-application',
        'bases-legales',
        'consentement',
        'minimisation-donnees',
        'duree-conservation',
        'information-droits-des-personnes',
        'securite',
        'donnees-sensibles',
        'transfert-hors-ue',
        'sanctions',
        'enjeux-opportunites-rgpd',
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

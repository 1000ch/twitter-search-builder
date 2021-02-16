import {NuxtConfig} from '@nuxt/types';

const nuxtConfig: NuxtConfig = {
  ssr: false,
  srcDir: 'src',
  head: {
    title: 'Twitter Search Builder',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description ?? ''},
      {property: 'og:title', content: 'Twitter Search Builder'},
      {property: 'og:description', content: 'GUI Tool to build a search query for Twitter'},
      {property: 'og:url', content: 'https://twitter-search-builder.netlify.com/'},
      {property: 'twitter:card', content: 'summary'}
    ]
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ]
};

export default nuxtConfig;

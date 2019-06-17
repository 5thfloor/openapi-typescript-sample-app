import { Context } from '@nuxt/vue-app'
import { DefaultApi, Configuration } from '../../book-api-client'

declare global {
  namespace NodeJS {
    interface Global {
      FormData: any
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $bookApi: DefaultApi
  }
}

declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $bookApi: DefaultApi
  }
}

export default (ctx: Context, inject: Function): void => {
  let config = new Configuration()
  if (process.server) {
    global.FormData = require('form-data')
    config = new Configuration({ fetchApi: fetch })
  }
  const bookApi = new DefaultApi(config)
  inject('bookApi', bookApi)
}

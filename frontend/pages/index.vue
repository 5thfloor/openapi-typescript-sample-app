<template>
  <div class="container">
    <h1 class="title">本一覧</h1>
    <ul>
      <li
        v-for="(book, i) in books"
        :key="i"
      >
        {{ book.title }} <small>{{ formatDate(book.publishedAt) }}</small>
      </li>
    </ul>
    <a href="#" @click.prevent="load">もっと読み込む...</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Book } from '../../book-api-client'
import { formatDate } from '@/utils'

interface Data {
  books: Book[],
}

export default Vue.extend({
  data: (): Data => ({
    books: [],
  }),
  computed: {
    formatDate: () => formatDate,
  },
  async asyncData({ app }): Promise<Data> {
    const { books } = await app.$bookApi.getBooks()
    return { books }
  },
  methods: {
    async load(): Promise<void> {
      const { books } = await this.$bookApi.getBooks()
      this.books = this.books.concat(books)
    },
  },
})
</script>

<style>
.container {
  padding: 32px 40px;
  min-height: 100vh;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 36px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>

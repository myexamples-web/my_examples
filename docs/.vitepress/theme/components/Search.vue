<template>
  <div>
    <input
        v-model="query"
        @input="search"
        placeholder="Suche..."
        class="search-input"
    />

    <div v-if="results.length" class="results">
      <a
          v-for="result in results"
          :key="result.url"
          :href="result.url"
          class="result"
      >
        <strong>{{ result.meta.title }}</strong>
        <p v-html="result.excerpt"></p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const results = ref([])
let pagefind = null

async function loadPagefind() {
  if (!pagefind) {
    pagefind = await import('/pagefind/pagefind.js')
  }
}

async function search() {
  if (!query.value.trim()) {
    results.value = []
    return
  }

  await loadPagefind()

  const search = await pagefind.search(query.value)
  const data = await Promise.all(
      search.results.slice(0, 10).map(r => r.data())
  )

  results.value = data
}
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.results {
  margin-top: 16px;
}

.result {
  display: block;
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: inherit;
}

.result p {
  margin: 4px 0 0;
  color: #666;
}
</style>
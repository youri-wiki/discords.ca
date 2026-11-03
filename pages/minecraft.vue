<template>
  <main class="minecraft-page">
    <header class="site-header">
      <NuxtLink to="/" class="brand" aria-label="Retour à discords.ca">
        <span class="brand-mark" aria-hidden="true">
          <span class="grass"></span>
          <span class="dirt"></span>
        </span>
        <span>discords.ca</span>
      </NuxtLink>
      <a
        href="https://minecraft.wiki/"
        target="_blank"
        rel="noopener noreferrer"
        class="wiki-link"
      >
        Minecraft Wiki ↗
      </a>
    </header>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">EXPLORATEUR DE CONNAISSANCES</p>
        <h1>Trouve tout ce que tu veux savoir sur Minecraft.</h1>
        <p class="lead">
          Blocs, créatures, recettes, enchantements ou mécaniques : cherche
          directement dans le Minecraft Wiki.
        </p>
      </div>

      <form class="search-shell" role="search" @submit.prevent="submitSearch">
        <label for="minecraft-search" class="sr-only">
          Rechercher dans le Minecraft Wiki
        </label>
        <span class="search-icon" aria-hidden="true"></span>
        <input
          id="minecraft-search"
          ref="searchInput"
          v-model="searchTerm"
          type="search"
          minlength="2"
          maxlength="80"
          autocomplete="off"
          placeholder="Ex. Comment trouver des diamants ?"
          :disabled="isLoading"
        >
        <button type="submit" :disabled="isLoading || searchTerm.trim().length < 2">
          <span v-if="isLoading" class="loader" aria-hidden="true"></span>
          <span>{{ isLoading ? "Recherche…" : "Rechercher" }}</span>
        </button>
      </form>

      <div class="suggestions" aria-label="Recherches populaires">
        <span>Essaie :</span>
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          type="button"
          @click="searchSuggestion(suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
    </section>

    <section class="results-section" aria-live="polite" :aria-busy="isLoading">
      <div v-if="hasSearched" class="results-heading">
        <div>
          <p class="section-label">RÉSULTATS</p>
          <h2>
            <template v-if="!isLoading && !errorMessage">
              {{ resultCount }} résultat{{ resultCount === 1 ? "" : "s" }} pour
              « {{ lastSearch }} »
            </template>
            <template v-else>Recherche dans le wiki…</template>
          </h2>
        </div>
        <span v-if="!isLoading && results.length" class="source-pill">
          Source officielle du wiki
        </span>
      </div>

      <div v-if="isLoading" class="results-grid" aria-label="Chargement des résultats">
        <article v-for="item in 6" :key="item" class="result-card skeleton-card">
          <div class="skeleton image-skeleton"></div>
          <div class="card-body">
            <div class="skeleton title-skeleton"></div>
            <div class="skeleton line-skeleton"></div>
            <div class="skeleton line-skeleton short"></div>
          </div>
        </article>
      </div>

      <div v-else-if="errorMessage" class="state-card error-card">
        <span class="state-icon" aria-hidden="true">!</span>
        <div>
          <h2>Impossible de terminer la recherche</h2>
          <p>{{ errorMessage }}</p>
        </div>
      </div>

      <div v-else-if="hasSearched && !results.length" class="state-card">
        <span class="state-icon creeper" aria-hidden="true">?</span>
        <div>
          <h2>Aucun résultat trouvé</h2>
          <p>Essaie un nom d’objet, de bloc ou de créature plus précis.</p>
        </div>
      </div>

      <div v-else-if="results.length" class="results-grid">
        <a
          v-for="result in results"
          :key="result.id"
          :href="result.url"
          target="_blank"
          rel="noopener noreferrer"
          class="result-card"
        >
          <div class="result-image">
            <img
              v-if="result.thumbnail"
              :src="result.thumbnail"
              :alt="`Illustration de ${result.title}`"
              loading="lazy"
            >
            <span v-else class="fallback-block" aria-hidden="true"></span>
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3>{{ result.title }}</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p>{{ result.description }}</p>
            <span class="read-more">Lire sur le wiki</span>
          </div>
        </a>
      </div>

      <div v-else class="welcome-grid">
        <article>
          <span class="feature-icon pickaxe" aria-hidden="true">⛏</span>
          <h2>Recherche rapide</h2>
          <p>Obtiens les pages les plus pertinentes sans quitter discords.ca.</p>
        </article>
        <article>
          <span class="feature-icon" aria-hidden="true">▦</span>
          <h2>Wiki à jour</h2>
          <p>Les réponses viennent directement du Minecraft Wiki à chaque recherche.</p>
        </article>
        <article>
          <span class="feature-icon" aria-hidden="true">↗</span>
          <h2>Sources accessibles</h2>
          <p>Ouvre l’article complet du wiki pour vérifier les détails et les versions.</p>
        </article>
      </div>
    </section>

    <footer>
      <p>
        Résultats fournis par
        <a href="https://minecraft.wiki/" target="_blank" rel="noopener noreferrer">
          Minecraft Wiki
        </a>.
        Minecraft est une marque de Mojang Studios. Ce projet n’est ni affilié ni
        approuvé par Mojang ou Microsoft.
      </p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string | null;
}

interface SearchResponse {
  query: string;
  count: number;
  results: SearchResult[];
}

useHead({
  title: "Recherche Minecraft — discords.ca",
  meta: [
    {
      name: "description",
      content:
        "Recherche des blocs, objets, créatures et mécaniques dans le Minecraft Wiki.",
    },
    { name: "theme-color", content: "#17251a" },
    { property: "og:title", content: "Recherche Minecraft — discords.ca" },
    {
      property: "og:description",
      content: "Trouve rapidement des réponses basées sur le Minecraft Wiki.",
    },
  ],
});

const route = useRoute();
const router = useRouter();
const searchInput = ref<HTMLInputElement | null>(null);
const searchTerm = ref("");
const lastSearch = ref("");
const results = ref<SearchResult[]>([]);
const resultCount = ref(0);
const isLoading = ref(false);
const hasSearched = ref(false);
const errorMessage = ref("");

const suggestions = ["Diamant", "Redstone", "Enchantement", "Villageois", "Netherite"];

async function runSearch(rawSearch: string) {
  const query = rawSearch.trim();
  if (query.length < 2 || isLoading.value) return;

  searchTerm.value = query;
  lastSearch.value = query;
  hasSearched.value = true;
  isLoading.value = true;
  errorMessage.value = "";

  await router.replace({ query: { ...route.query, q: query } });

  try {
    const response = await $fetch<SearchResponse>("/api/minecraft/search", {
      query: { q: query },
    });
    results.value = response.results;
    resultCount.value = response.count;
  } catch (error: any) {
    results.value = [];
    resultCount.value = 0;
    errorMessage.value =
      error?.data?.statusMessage ||
      error?.statusMessage ||
      "Le service de recherche est temporairement indisponible.";
  } finally {
    isLoading.value = false;
  }
}

function submitSearch() {
  runSearch(searchTerm.value);
}

function searchSuggestion(suggestion: string) {
  if (isLoading.value) return;
  searchTerm.value = suggestion;
  runSearch(suggestion);
}

onMounted(async () => {
  const initialQuery = typeof route.query.q === "string" ? route.query.q.trim() : "";
  if (initialQuery.length >= 2) {
    await runSearch(initialQuery);
  } else {
    await nextTick();
    searchInput.value?.focus();
  }
});
</script>

<style scoped>
:global(body) {
  background: #f3f0e5;
}

.minecraft-page {
  --ink: #17251a;
  --muted: #647065;
  --cream: #f3f0e5;
  --paper: #fffdf5;
  --green: #34763f;
  --green-dark: #1e4e2a;
  --lime: #83b54c;
  min-height: 100vh;
  color: var(--ink);
  background:
    linear-gradient(rgba(31, 59, 36, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 59, 36, 0.035) 1px, transparent 1px),
    var(--cream);
  background-size: 32px 32px;
  font-family: Inter, "Nunito Sans", system-ui, sans-serif;
}

.site-header {
  max-width: 1180px;
  margin: 0 auto;
  min-height: 78px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(23, 37, 26, 0.13);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: grid;
  grid-template-rows: 10px 1fr;
  transform: rotate(-3deg);
  box-shadow: 4px 4px 0 rgba(23, 37, 26, 0.2);
}

.brand-mark .grass {
  background: #65a846;
  border: 2px solid #24472a;
  border-bottom: 0;
}

.brand-mark .dirt {
  background:
    linear-gradient(135deg, transparent 45%, #745139 45% 55%, transparent 55%),
    #956c48;
  background-size: 11px 11px;
  border: 2px solid #24472a;
  border-top: 0;
}

.wiki-link {
  color: var(--green-dark);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 800;
  padding: 9px 13px;
  border: 1px solid rgba(30, 78, 42, 0.24);
  border-radius: 8px;
  background: rgba(255, 253, 245, 0.72);
}

.hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 88px 28px 64px;
  text-align: center;
}

.hero-copy {
  max-width: 760px;
  margin: 0 auto;
}

.eyebrow,
.section-label {
  margin: 0 0 13px;
  color: var(--green);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.hero h1 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.65rem, 7vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.lead {
  max-width: 620px;
  margin: 25px auto 0;
  color: var(--muted);
  font-size: clamp(1rem, 2.2vw, 1.18rem);
  line-height: 1.7;
}

.search-shell {
  margin-top: 42px;
  padding: 7px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 13px;
  box-shadow: 7px 7px 0 rgba(23, 37, 26, 0.18);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.search-shell:focus-within {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 rgba(23, 37, 26, 0.18);
}

.search-icon {
  width: 17px;
  height: 17px;
  margin-left: 11px;
  border: 2px solid var(--green-dark);
  border-radius: 50%;
  position: relative;
}

.search-icon::after {
  content: "";
  width: 8px;
  height: 2px;
  position: absolute;
  right: -6px;
  bottom: -3px;
  background: var(--green-dark);
  transform: rotate(45deg);
}

.search-shell input {
  min-width: 0;
  padding: 15px 8px;
  border: 0;
  outline: 0;
  color: var(--ink);
  background: transparent;
  font: inherit;
  font-size: 1rem;
}

.search-shell input::placeholder {
  color: #8a948b;
}

.search-shell button {
  min-height: 48px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: var(--green-dark);
  font: inherit;
  font-weight: 900;
  cursor: pointer;
}

.search-shell button:hover:not(:disabled) {
  background: #153c20;
}

.search-shell button:disabled {
  opacity: 0.62;
  cursor: not-allowed;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.suggestions {
  margin-top: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--muted);
  font-size: 0.83rem;
}

.suggestions button {
  padding: 6px 10px;
  border: 1px solid rgba(30, 78, 42, 0.2);
  border-radius: 999px;
  color: var(--green-dark);
  background: rgba(255, 253, 245, 0.72);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.suggestions button:hover {
  border-color: var(--green);
  background: #fffdf5;
}

.results-section {
  max-width: 1180px;
  min-height: 330px;
  margin: 0 auto;
  padding: 28px 28px 78px;
}

.results-heading {
  margin-bottom: 24px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
}

.results-heading h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.5rem, 3vw, 2.15rem);
  letter-spacing: -0.025em;
}

.source-pill {
  flex: 0 0 auto;
  padding: 7px 10px;
  color: var(--green-dark);
  background: #dcebcf;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 900;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.result-card {
  min-width: 0;
  display: grid;
  grid-template-columns: 145px 1fr;
  overflow: hidden;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid rgba(23, 37, 26, 0.16);
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 0 rgba(23, 37, 26, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

a.result-card:hover {
  transform: translateY(-3px);
  border-color: rgba(52, 118, 63, 0.48);
  box-shadow: 0 8px 0 rgba(23, 37, 26, 0.09);
}

.result-image {
  min-height: 188px;
  display: grid;
  place-items: center;
  background:
    linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25% 75%, rgba(255, 255, 255, 0.05) 75%),
    #dce8d0;
  background-size: 22px 22px;
  border-right: 1px solid rgba(23, 37, 26, 0.11);
}

.result-image img {
  max-width: 108px;
  max-height: 108px;
  object-fit: contain;
  image-rendering: auto;
  filter: drop-shadow(4px 5px 0 rgba(23, 37, 26, 0.13));
}

.fallback-block {
  width: 70px;
  height: 70px;
  display: block;
  background:
    linear-gradient(135deg, transparent 42%, rgba(255, 255, 255, 0.13) 42% 55%, transparent 55%),
    #739557;
  background-size: 20px 20px;
  border: 4px solid #456534;
  box-shadow: 8px 8px 0 rgba(23, 37, 26, 0.15);
}

.card-body {
  min-width: 0;
  padding: 21px;
  display: flex;
  flex-direction: column;
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.card-title-row h3 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.38rem;
  line-height: 1.15;
}

.card-title-row > span {
  color: var(--green);
  font-weight: 900;
}

.card-body p {
  margin: 12px 0 18px;
  display: -webkit-box;
  overflow: hidden;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.read-more {
  margin-top: auto;
  color: var(--green-dark);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.welcome-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.welcome-grid article,
.state-card {
  padding: 25px;
  background: rgba(255, 253, 245, 0.7);
  border: 1px solid rgba(23, 37, 26, 0.14);
  border-radius: 12px;
}

.welcome-grid h2,
.state-card h2 {
  margin: 14px 0 7px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.2rem;
}

.welcome-grid p,
.state-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}

.feature-icon,
.state-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: #fff;
  background: var(--green-dark);
  border-radius: 6px;
  font-weight: 900;
  box-shadow: 4px 4px 0 #a7c78b;
}

.state-card {
  max-width: 620px;
  margin: 20px auto;
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.state-card h2 {
  margin-top: 0;
}

.error-card .state-icon {
  background: #8e392f;
  box-shadow: 4px 4px 0 #ddb3a6;
}

.skeleton-card {
  min-height: 188px;
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: #e1e1d7;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.25s infinite;
}

.image-skeleton {
  min-height: 188px;
  border-radius: 0;
}

.title-skeleton {
  width: 62%;
  height: 24px;
  border-radius: 4px;
}

.line-skeleton {
  width: 100%;
  height: 12px;
  margin-top: 18px;
  border-radius: 3px;
}

.line-skeleton.short {
  width: 74%;
  margin-top: 9px;
}

footer {
  padding: 24px 28px 34px;
  border-top: 1px solid rgba(23, 37, 26, 0.13);
  text-align: center;
}

footer p {
  max-width: 850px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.55;
}

footer a {
  color: var(--green-dark);
  font-weight: 900;
}

.sr-only {
  width: 1px;
  height: 1px;
  padding: 0;
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

@media (max-width: 900px) {
  .results-grid {
    grid-template-columns: 1fr;
  }

  .welcome-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .site-header {
    min-height: 68px;
    padding: 0 18px;
  }

  .wiki-link {
    padding: 8px;
    font-size: 0.78rem;
  }

  .hero {
    padding: 62px 18px 45px;
  }

  .search-shell {
    grid-template-columns: auto 1fr;
  }

  .search-shell button {
    grid-column: 1 / -1;
    justify-content: center;
  }

  .results-section {
    padding: 25px 18px 55px;
  }

  .results-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .result-card {
    grid-template-columns: 105px 1fr;
  }

  .result-image,
  .image-skeleton {
    min-height: 170px;
  }

  .result-image img {
    max-width: 76px;
    max-height: 76px;
  }

  .card-body {
    padding: 16px;
  }

  .card-body p {
    -webkit-line-clamp: 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

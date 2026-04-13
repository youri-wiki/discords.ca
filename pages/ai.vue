<template>
  <div class="ai-page">
    <section class="hero">
      <div class="hero-row">
        <div>
          <h1>Local AI Assistant</h1>
          <p>Chat with your assistant and manage its knowledge base.</p>
        </div>

        <div class="health" :class="healthStatusClass">
          <span class="dot" />
          <span class="label">
            API:
            <strong>
              {{
                healthStatus === "online"
                  ? "Online"
                  : healthStatus === "offline"
                  ? "Offline"
                  : "Checking..."
              }}
            </strong>
          </span>
          <button
            class="secondary small"
            @click="checkHealth"
            :disabled="isCheckingHealth"
          >
            {{ isCheckingHealth ? "Checking..." : "Recheck" }}
          </button>
        </div>
      </div>
    </section>

    <div class="layout">
      <section class="chat-card">
        <header class="chat-header">
          <h2>Chat</h2>
          <button class="secondary" @click="clearMessages" :disabled="isAsking">
            Clear chat
          </button>
        </header>

        <div class="messages" ref="messagesContainer">
          <div v-if="messages.length === 0" class="empty">
            Ask something to get started.
          </div>

          <article
            v-for="(msg, index) in messages"
            :key="`${msg.role}-${index}`"
            :class="['message', msg.role]"
          >
            <div class="bubble">
              <p>{{ msg.content }}</p>

              <details
                v-if="
                  msg.role === 'assistant' && msg.context && msg.context.length
                "
                class="context"
              >
                <summary>Retrieved context ({{ msg.context.length }})</summary>
                <ul>
                  <li
                    v-for="(ctx, cIndex) in msg.context"
                    :key="`ctx-${index}-${cIndex}`"
                  >
                    <pre>{{ formatContext(ctx) }}</pre>
                  </li>
                </ul>
              </details>
            </div>
          </article>
        </div>

        <form class="chat-form" @submit.prevent="askQuestion">
          <textarea
            v-model="question"
            placeholder="Type your question..."
            rows="3"
            :disabled="isAsking"
            required
          />
          <div class="actions">
            <button
              type="submit"
              :disabled="
                isAsking || !question.trim() || healthStatus === 'offline'
              "
            >
              {{ isAsking ? "Thinking..." : "Send" }}
            </button>
          </div>
        </form>

        <p v-if="chatError" class="error">{{ chatError }}</p>
      </section>

      <section class="knowledge-card">
        <header class="knowledge-header">
          <h2>Knowledge</h2>
          <button
            class="secondary"
            @click="fetchKnowledge"
            :disabled="isKnowledgeLoading"
          >
            Refresh
          </button>
        </header>

        <form class="knowledge-form" @submit.prevent="addKnowledge">
          <label>
            <span>Text</span>
            <textarea
              v-model="knowledgeText"
              placeholder="Add a fact, note, or context..."
              rows="4"
              :disabled="isKnowledgeMutating"
              required
            />
          </label>

          <label>
            <span>Metadata (JSON object, required)</span>
            <textarea
              v-model="knowledgeMetadataRaw"
              placeholder='{"source":"manual","tag":"demo"}'
              rows="3"
              :disabled="isKnowledgeMutating"
              required
            />
          </label>

          <button
            type="submit"
            :disabled="
              isKnowledgeMutating ||
              !knowledgeText.trim() ||
              !knowledgeMetadataRaw.trim() ||
              healthStatus === 'offline'
            "
          >
            {{ isKnowledgeMutating ? "Saving..." : "Add Knowledge" }}
          </button>
        </form>

        <div class="knowledge-tools">
          <form class="search-delete" @submit.prevent="deleteBySearch">
            <input
              v-model="deleteQuery"
              type="text"
              placeholder="Delete entries matching text..."
              :disabled="isKnowledgeMutating"
            />
            <button
              type="submit"
              class="danger"
              :disabled="
                isKnowledgeMutating ||
                !deleteQuery.trim() ||
                healthStatus === 'offline'
              "
            >
              Delete Matching
            </button>
          </form>

          <button
            class="danger-outline"
            @click="deleteAllKnowledge"
            :disabled="isKnowledgeMutating || healthStatus === 'offline'"
          >
            Delete All Knowledge
          </button>
        </div>

        <p v-if="knowledgeError" class="error">{{ knowledgeError }}</p>
        <p v-if="knowledgeSuccess" class="success">{{ knowledgeSuccess }}</p>

        <div class="knowledge-list">
          <h3>Stored entries ({{ knowledgeCount }})</h3>
          <div v-if="isKnowledgeLoading" class="muted">
            Loading knowledge...
          </div>
          <div v-else-if="knowledgeItems.length === 0" class="muted">
            No knowledge stored yet.
          </div>
          <ul v-else>
            <li v-for="(item, idx) in knowledgeItems" :key="item.id ?? idx">
              <pre>{{ formatContext(item) }}</pre>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "AI Assistant - discords.ca",
  meta: [
    {
      name: "description",
      content: "Chat with a local AI assistant and manage knowledge entries.",
    },
    {
      name: "theme-color",
      content: "#6b6a8f",
    },
  ],
});

const messages = ref([]);
const question = ref("");
const isAsking = ref(false);
const chatError = ref("");

const messagesContainer = ref(null);

const knowledgeText = ref("");
const knowledgeMetadataRaw = ref("");
const deleteQuery = ref("");

const knowledgeItems = ref([]);
const knowledgeCount = ref(0);
const isKnowledgeLoading = ref(false);
const isKnowledgeMutating = ref(false);
const knowledgeError = ref("");
const knowledgeSuccess = ref("");

const healthStatus = ref("checking");
const isCheckingHealth = ref(false);

const healthStatusClass = computed(() => {
  if (healthStatus.value === "online") return "online";
  if (healthStatus.value === "offline") return "offline";
  return "checking";
});

const readErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json();
    return data?.statusMessage || data?.message || data?.detail || fallback;
  } catch {
    return fallback;
  }
};

const scrollMessagesToBottom = async () => {
  await nextTick();
  const el = messagesContainer.value;
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
};

const clearStatus = () => {
  knowledgeError.value = "";
  knowledgeSuccess.value = "";
};

const parseMetadata = () => {
  const raw = knowledgeMetadataRaw.value.trim();

  if (!raw) {
    throw new Error("Metadata is required and cannot be empty.");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Invalid metadata JSON. Please provide a valid object.");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Metadata must be a JSON object.");
  }

  if (Object.keys(parsed).length === 0) {
    throw new Error("Metadata must be a non-empty JSON object.");
  }

  return parsed;
};

const checkHealth = async () => {
  isCheckingHealth.value = true;
  try {
    const res = await fetch("/api/ai/health", { method: "GET" });
    if (!res.ok) {
      healthStatus.value = "offline";
      return;
    }
    const data = await res.json().catch(() => ({}));
    healthStatus.value = data?.status === "running" ? "online" : "offline";
  } catch {
    healthStatus.value = "offline";
  } finally {
    isCheckingHealth.value = false;
  }
};

const askQuestion = async () => {
  if (!question.value.trim() || isAsking.value) return;

  chatError.value = "";
  const userText = question.value.trim();
  messages.value.push({ role: "user", content: userText });
  question.value = "";
  await scrollMessagesToBottom();

  isAsking.value = true;
  try {
    const res = await fetch("/api/ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userText }),
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to ask AI (${res.status}).`
      );
      throw new Error(msg);
    }

    const data = await res.json();
    messages.value.push({
      role: "assistant",
      content: data?.answer ?? "No answer returned.",
      context: Array.isArray(data?.context) ? data.context : [],
    });
  } catch (err) {
    chatError.value = err?.message || "Failed to contact AI service.";
    messages.value.push({
      role: "assistant",
      content: `Error: ${chatError.value}`,
      context: [],
    });
  } finally {
    isAsking.value = false;
    await scrollMessagesToBottom();
  }
};

const fetchKnowledge = async () => {
  clearStatus();
  isKnowledgeLoading.value = true;

  try {
    const res = await fetch("/api/ai/knowledge", {
      method: "GET",
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to load knowledge (${res.status}).`
      );
      throw new Error(msg);
    }

    const data = await res.json();
    knowledgeCount.value = Number(data?.count ?? 0);
    knowledgeItems.value = Array.isArray(data?.data) ? data.data : [];
  } catch (err) {
    knowledgeError.value = err?.message || "Failed to load knowledge entries.";
  } finally {
    isKnowledgeLoading.value = false;
  }
};

const addKnowledge = async () => {
  if (!knowledgeText.value.trim() || isKnowledgeMutating.value) return;

  clearStatus();
  isKnowledgeMutating.value = true;

  try {
    const metadata = parseMetadata();

    const res = await fetch("/api/ai/knowledge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: knowledgeText.value.trim(),
        metadata,
      }),
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to store knowledge (${res.status}).`
      );
      throw new Error(msg);
    }

    knowledgeSuccess.value = "Knowledge stored successfully.";
    knowledgeText.value = "";
    knowledgeMetadataRaw.value = "";
    await fetchKnowledge();
  } catch (err) {
    knowledgeError.value = err?.message || "Failed to store knowledge.";
  } finally {
    isKnowledgeMutating.value = false;
  }
};

const deleteBySearch = async () => {
  if (!deleteQuery.value.trim() || isKnowledgeMutating.value) return;

  clearStatus();
  isKnowledgeMutating.value = true;

  try {
    const q = encodeURIComponent(deleteQuery.value.trim());
    const res = await fetch(`/api/ai/knowledge/search?text=${q}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to delete matching entries (${res.status}).`
      );
      throw new Error(msg);
    }

    const data = await res.json();
    const deleted = Array.isArray(data?.deleted_ids)
      ? data.deleted_ids.length
      : 0;
    knowledgeSuccess.value = `Deleted ${deleted} matching entr${
      deleted === 1 ? "y" : "ies"
    }.`;
    deleteQuery.value = "";
    await fetchKnowledge();
  } catch (err) {
    knowledgeError.value =
      err?.message || "Failed to delete matching knowledge entries.";
  } finally {
    isKnowledgeMutating.value = false;
  }
};

const deleteAllKnowledge = async () => {
  if (isKnowledgeMutating.value) return;

  clearStatus();
  isKnowledgeMutating.value = true;

  try {
    const res = await fetch("/api/ai/knowledge", {
      method: "DELETE",
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to delete all knowledge (${res.status}).`
      );
      throw new Error(msg);
    }

    knowledgeSuccess.value = "All knowledge deleted.";
    await fetchKnowledge();
  } catch (err) {
    knowledgeError.value = err?.message || "Failed to delete all knowledge.";
  } finally {
    isKnowledgeMutating.value = false;
  }
};

const formatContext = (value) => {
  try {
    return typeof value === "string" ? value : JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const clearMessages = () => {
  messages.value = [];
  chatError.value = "";
};

onMounted(async () => {
  await checkHealth();
  await fetchKnowledge();
});
</script>

<style scoped>
.ai-page {
  padding: 24px;
  color: #1f2937;
  font-family: "QuickSand", sans-serif;
}

.hero {
  margin: 0 auto 24px;
  max-width: 1200px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, #6b6a8f, #11998e);
  color: #fff;
}

.hero-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.hero p {
  margin: 0;
  opacity: 0.95;
}

.health {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  padding: 8px 10px;
}

.health .dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #fbbf24;
}

.health.online .dot {
  background: #22c55e;
}

.health.offline .dot {
  background: #ef4444;
}

.health .label {
  font-size: 0.95rem;
}

.layout {
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

.chat-card,
.knowledge-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
}

.chat-header,
.knowledge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.chat-header h2,
.knowledge-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.messages {
  min-height: 320px;
  max-height: 56vh;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #edf2f7;
  border-radius: 10px;
  background: #fafafa;
}

.empty {
  color: #6b7280;
  text-align: center;
  padding: 32px 8px;
}

.message {
  display: flex;
  margin: 10px 0;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 85%;
  padding: 10px 12px;
  border-radius: 12px;
  word-break: break-word;
}

.message.user .bubble {
  background: #6b6a8f;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.message.assistant .bubble {
  background: #eef2ff;
  color: #111827;
  border-bottom-left-radius: 4px;
}

.context {
  margin-top: 8px;
  font-size: 0.9rem;
}

.context pre {
  white-space: pre-wrap;
  margin: 8px 0 0;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 8px;
}

.chat-form {
  margin-top: 12px;
}

.chat-form textarea,
.knowledge-form textarea,
.search-delete input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px;
  font: inherit;
  resize: vertical;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  background: #6b6a8f;
  color: #fff;
}

button.small {
  padding: 6px 10px;
  font-size: 0.85rem;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

button.secondary {
  background: #e5e7eb;
  color: #111827;
}

button.danger {
  background: #dc2626;
  color: #fff;
}

button.danger-outline {
  background: transparent;
  border: 1px solid #dc2626;
  color: #dc2626;
}

.knowledge-form label {
  display: block;
  margin-bottom: 10px;
}

.knowledge-form span {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.knowledge-tools {
  margin-top: 10px;
  display: grid;
  gap: 10px;
}

.search-delete {
  display: flex;
  gap: 8px;
}

.search-delete input {
  flex: 1;
}

.knowledge-list {
  margin-top: 16px;
}

.knowledge-list h3 {
  margin: 0 0 10px;
  font-size: 1rem;
}

.knowledge-list ul {
  margin: 0;
  padding-left: 18px;
}

.knowledge-list li {
  margin-bottom: 8px;
}

.knowledge-list pre {
  white-space: pre-wrap;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
}

.error {
  color: #b91c1c;
  margin-top: 10px;
}

.success {
  color: #047857;
  margin-top: 10px;
}

.muted {
  color: #6b7280;
}

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .messages {
    max-height: 45vh;
  }
}
</style>

<template>
  <div class="ai-page">
    <section class="hero">
      <div class="hero-row">
        <div>
          <h1>Local AI Assistant</h1>
          <p>Chat with your assistant and manage its knowledge base</p>
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

      <nav class="tabs" aria-label="AI pages">
        <button
          class="tab"
          :class="{ active: activeTab === 'chat' }"
          @click="activeTab = 'chat'"
          type="button"
        >
          Chat
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'knowledge' }"
          @click="activeTab = 'knowledge'"
          type="button"
        >
          Model Knowledge
        </button>
      </nav>
    </section>

    <div class="layout single-column">
      <section v-if="activeTab === 'chat'" class="chat-card">
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
              <p v-if="msg.role === 'user'">{{ msg.content }}</p>
              <div
                v-else-if="msg.isLoading"
                class="assistant-loading"
                aria-label="Assistant is typing"
              >
                <span class="loading-dot" />
                <span class="loading-dot" />
                <span class="loading-dot" />
              </div>
              <div
                v-else
                class="markdown-content"
                v-html="renderAssistantMessage(msg.content)"
              />
              <p
                v-if="
                  msg.role === 'assistant' && !msg.isLoading && msg.footerMeta
                "
                class="assistant-meta"
              >
                {{ msg.footerMeta }}
              </p>

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

      <section v-else class="knowledge-card">
        <header class="knowledge-header">
          <h2>Model Knowledge</h2>
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
import { marked } from "marked";
import DOMPurify from "dompurify";

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

const activeTab = ref("chat");

const STREAM_DEBUG =
  typeof window !== "undefined" &&
  (window.location.search.includes("debugStream=1") ||
    window.localStorage.getItem("debugStream") === "1");

const debugStreamLog = (...args) => {
  if (!STREAM_DEBUG) return;
  console.debug("[ai-stream]", ...args);
};

marked.setOptions({
  gfm: true,
  breaks: true,
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

const pendingKnowledgeCandidate = ref(null);
const awaitingKnowledgeConfirmation = ref(false);

const healthStatus = ref("checking");
const isCheckingHealth = ref(false);
const ENABLE_KNOWLEDGE_CONFIRMATION = false;

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

const extractKnowledgeCandidate = (text) => {
  const raw = String(text || "").trim();
  if (!raw) return null;

  const hasSpecSignal =
    /(cpu|cores?|threads?|ram|memory|gb|tb|nvme|ssd|hdd|gpu|nvidia|amd|intel|xeon|i[3579]-\d{3,5}|ryzen|pve\d+|proxmox|vm|lxc|zfs|raid)/i.test(
      raw
    );

  if (!hasSpecSignal) return null;

  const normalizeSpace = (s) => s.replace(/\s+/g, " ").trim();

  // Host / node
  const hostMatch =
    raw.match(/\b(pve\d+)\b/i) ||
    raw.match(/\b(main host|primary host|host|node)\b/i);

  // CPU model: prioritize explicit "cpu: ..."
  const cpuLabelMatch = raw.match(/\bcpu\b\s*[:=-]?\s*([^\n,;|]+)/i);
  const cpuModelMatch =
    (cpuLabelMatch && cpuLabelMatch[1]) ||
    (raw.match(
      /\b(?:intel|amd)\s+(?:core\s+)?(?:i[3579]-\d{3,5}[a-z]*|xeon\s+[a-z0-9\- ]+|ryzen\s+[a-z0-9\- ]+)\b/i
    ) || [])[0] ||
    (raw.match(/\bxeon\s+[a-z0-9\- ]+\b/i) || [])[0] ||
    null;

  // Cores / threads
  const coresMatch =
    raw.match(/\b(\d{1,2})\s*(?:cores?|c)\b/i) ||
    raw.match(/\b(\d{1,2})c\/\d{1,2}t\b/i);

  const threadsMatch =
    raw.match(/\b(\d{1,2})\s*(?:threads?|t)\b/i) ||
    raw.match(/\b\d{1,2}c\/(\d{1,2})t\b/i);

  // RAM
  const ramMatch =
    raw.match(/\b(?:ram|memory)\b\s*[:=-]?\s*(\d+(?:\.\d+)?)\s*(gb|tb)\b/i) ||
    raw.match(/\b(\d+(?:\.\d+)?)\s*(gb|tb)\s*(?:ram|memory)\b/i);

  // Storage (first strong hit)
  const storageMatch =
    raw.match(
      /\b(?:storage|disk)\b\s*[:=-]?\s*(\d+(?:\.\d+)?)\s*(gb|tb)\s*(nvme|ssd|hdd)?\b/i
    ) ||
    raw.match(/\b(\d+(?:\.\d+)?)\s*(gb|tb)\s*(nvme|ssd|hdd)\b/i) ||
    raw.match(/\b(\d+(?:\.\d+)?)\s*(gb|tb)\b/i);

  // GPU
  const gpuLabelMatch = raw.match(/\bgpu\b\s*[:=-]?\s*([^\n,;|]+)/i);
  const gpuModelMatch =
    (gpuLabelMatch && gpuLabelMatch[1]) ||
    (raw.match(/\b(?:rtx|gtx|quadro|tesla|radeon|rx)\s*[a-z0-9\- ]+\b/i) ||
      [])[0] ||
    null;

  const extracted = {
    host: hostMatch
      ? normalizeSpace(hostMatch[1] || hostMatch[0]).toLowerCase()
      : null,
    cpu_model: cpuModelMatch ? normalizeSpace(cpuModelMatch) : null,
    cpu_cores: coresMatch ? Number(coresMatch[1]) : null,
    cpu_threads: threadsMatch ? Number(threadsMatch[1]) : null,
    ram_size: ramMatch ? Number(ramMatch[1]) : null,
    ram_unit: ramMatch ? String(ramMatch[2]).toUpperCase() : null,
    storage_size: storageMatch ? Number(storageMatch[1]) : null,
    storage_unit: storageMatch ? String(storageMatch[2]).toUpperCase() : null,
    storage_type:
      storageMatch && storageMatch[3]
        ? String(storageMatch[3]).toUpperCase()
        : null,
    gpu_model: gpuModelMatch ? normalizeSpace(gpuModelMatch) : null,
  };

  const meaningfulFields = Object.values(extracted).filter(
    (v) => v !== null && v !== "" && !(typeof v === "number" && Number.isNaN(v))
  );

  if (meaningfulFields.length === 0) return null;

  const summaryLines = [
    "Chat-confirmed infrastructure specs:",
    extracted.host ? `- Host: ${extracted.host}` : null,
    extracted.cpu_model ? `- CPU: ${extracted.cpu_model}` : null,
    extracted.cpu_cores ? `- Cores: ${extracted.cpu_cores}` : null,
    extracted.cpu_threads ? `- Threads: ${extracted.cpu_threads}` : null,
    extracted.ram_size && extracted.ram_unit
      ? `- RAM: ${extracted.ram_size} ${extracted.ram_unit}`
      : null,
    extracted.storage_size && extracted.storage_unit
      ? `- Storage: ${extracted.storage_size} ${extracted.storage_unit}${
          extracted.storage_type ? ` ${extracted.storage_type}` : ""
        }`
      : null,
    extracted.gpu_model ? `- GPU: ${extracted.gpu_model}` : null,
    `- Raw input: ${raw}`,
  ].filter(Boolean);

  return {
    text: summaryLines.join("\n"),
    metadata: {
      source: "chat-confirmed",
      topic: "infrastructure",
      kind: "host_specs",
      created_at: new Date().toISOString(),
      extracted,
    },
  };
};

const isYes = (value) =>
  /^(y|yes|yeah|yep|sure|ok|okay|confirm)$/i.test(String(value || "").trim());
const isNo = (value) =>
  /^(n|no|nope|cancel|stop)$/i.test(String(value || "").trim());

const confirmPendingKnowledge = async () => {
  if (!pendingKnowledgeCandidate.value) return;

  clearStatus();
  isKnowledgeMutating.value = true;

  try {
    const candidate = pendingKnowledgeCandidate.value;
    const res = await fetch("/api/ai/knowledge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: candidate.text,
        metadata: candidate.metadata,
      }),
    });

    if (!res.ok) {
      const msg = await readErrorMessage(
        res,
        `Failed to store confirmed knowledge (${res.status}).`
      );
      throw new Error(msg);
    }

    knowledgeSuccess.value = "Confirmed specs added to model knowledge.";
    pendingKnowledgeCandidate.value = null;
    awaitingKnowledgeConfirmation.value = false;
    await fetchKnowledge();

    messages.value.push({
      role: "assistant",
      content: "Great — I added that to my knowledge.",
      context: [],
    });
  } catch (err) {
    knowledgeError.value =
      err?.message || "Failed to store confirmed knowledge.";
    messages.value.push({
      role: "assistant",
      content: `I couldn't save that yet: ${knowledgeError.value}`,
      context: [],
    });
  } finally {
    isKnowledgeMutating.value = false;
    await scrollMessagesToBottom();
  }
};

const askQuestion = async () => {
  if (!question.value.trim() || isAsking.value) return;

  chatError.value = "";
  const userText = question.value.trim();
  messages.value.push({ role: "user", content: userText });
  question.value = "";
  await scrollMessagesToBottom();

  if (ENABLE_KNOWLEDGE_CONFIRMATION && awaitingKnowledgeConfirmation.value) {
    if (isYes(userText)) {
      await confirmPendingKnowledge();
      return;
    }

    /*if (isNo(userText)) {
      pendingKnowledgeCandidate.value = null;
      awaitingKnowledgeConfirmation.value = false;
      messages.value.push({
        role: "assistant",
        content: "Understood — I will not add that to my knowledge.",
        context: [],
      });
      await scrollMessagesToBottom();
      return;
    }

    messages.value.push({
      role: "assistant",
      content:
        "Please answer with **yes** or **no**. Do you want to add that to my knowledge?",
      context: [],
    });*/
    await scrollMessagesToBottom();
    return;
  }

  const candidate = ENABLE_KNOWLEDGE_CONFIRMATION
    ? extractKnowledgeCandidate(userText)
    : null;

  if (candidate) {
    pendingKnowledgeCandidate.value = candidate;
    awaitingKnowledgeConfirmation.value = true;
    messages.value.push({
      role: "assistant",
      content:
        "I extracted infrastructure specs from your message.\n\nDo you want to add this to my knowledge? (**yes/no**)",
      context: [],
    });
    await scrollMessagesToBottom();
    return;
  }

  isAsking.value = true;
  try {
    const assistantMessage = {
      role: "assistant",
      content: "",
      context: [],
      isLoading: true,
      footerMeta: "",
    };
    messages.value.push(assistantMessage);
    let assistantIndex = messages.value.length - 1;
    await scrollMessagesToBottom();

    let streamCompleted = false;
    const streamStartedAt = Date.now();

    try {
      const streamRes = await fetch("/api/ai/ask/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userText }),
      });

      debugStreamLog("stream response", {
        status: streamRes.status,
        ok: streamRes.ok,
        contentType: streamRes.headers.get("content-type"),
      });

      if (!streamRes.ok || !streamRes.body) {
        const msg = await readErrorMessage(
          streamRes,
          `Failed to stream AI answer (${streamRes.status}).`
        );
        debugStreamLog("stream unavailable, fallback reason:", msg);
        throw new Error(msg);
      }

      const reader = streamRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let eventType = "message";
      let dataBuffer = "";

      const processEvent = async () => {
        const raw = dataBuffer.trim();
        dataBuffer = "";
        if (!raw) return;

        let parsed = {};
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = { text: raw };
        }

        debugStreamLog("event", eventType, parsed);

        if (eventType === "chunk") {
          const text = typeof parsed?.text === "string" ? parsed.text : "";
          if (text) {
            const nextContent = `${assistantMessage.content}${text}`;
            const nextMessage = {
              ...assistantMessage,
              content: nextContent,
              isLoading: false,
            };
            assistantMessage.content = nextContent;
            messages.value = messages.value.map((msg, idx) =>
              idx === assistantIndex ? nextMessage : msg
            );
            debugStreamLog("chunk appended", {
              chunkLength: text.length,
              totalLength: nextContent.length,
            });
            await scrollMessagesToBottom();
          }
        } else if (eventType === "done") {
          assistantMessage.isLoading = false;

          if (
            Array.isArray(parsed?.context) &&
            parsed.context.length &&
            (!assistantMessage.context || assistantMessage.context.length === 0)
          ) {
            assistantMessage.context = parsed.context;
          }

          const elapsedMs = Math.max(0, Date.now() - streamStartedAt);
          const elapsedSec = (elapsedMs / 1000).toFixed(2);
          const modelName =
            typeof parsed?.model === "string" && parsed.model.trim()
              ? parsed.model.trim()
              : "unknown model";
          assistantMessage.footerMeta = `${modelName} • ${elapsedSec}s`;

          messages.value = messages.value.map((msg, idx) =>
            idx === assistantIndex ? { ...assistantMessage } : msg
          );

          streamCompleted = true;
          debugStreamLog("done received", {
            totalLength: assistantMessage.content.length,
            contextCount: Array.isArray(assistantMessage.context)
              ? assistantMessage.context.length
              : 0,
            footerMeta: assistantMessage.footerMeta,
            isLoading: assistantMessage.isLoading,
          });
        } else if (eventType === "error") {
          const message =
            parsed?.message ||
            parsed?.error ||
            "Streaming failed while generating response.";
          debugStreamLog("error event", message);
          throw new Error(message);
        }

        eventType = "message";
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;

        const decoded = decoder.decode(value, { stream: true });
        if (!decoded) continue;

        debugStreamLog("raw chunk", {
          byteLength: value.byteLength,
          preview: decoded.slice(0, 200),
        });

        buffer += decoded;

        let frameEnd = buffer.search(/\r?\n\r?\n/);
        while (frameEnd !== -1) {
          const frame = buffer.slice(0, frameEnd);
          const separatorMatch = buffer.slice(frameEnd).match(/^\r?\n\r?\n/);
          const sepLen = separatorMatch ? separatorMatch[0].length : 2;
          buffer = buffer.slice(frameEnd + sepLen);

          const lines = frame.split(/\r?\n/);
          for (const line of lines) {
            if (!line) continue;
            if (line.startsWith(":")) continue;
            if (line.startsWith("event:")) {
              eventType = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              const payload = line.slice(5).trimStart();
              dataBuffer = dataBuffer ? `${dataBuffer}\n${payload}` : payload;
            }
          }

          await processEvent();
          frameEnd = buffer.search(/\r?\n\r?\n/);
        }
      }

      const tail = decoder.decode();
      if (tail) {
        buffer += tail;
      }

      if (buffer.trim()) {
        debugStreamLog("processing trailing buffer", buffer.slice(0, 200));
        const trailingLines = buffer.split(/\r?\n/);
        for (const line of trailingLines) {
          if (!line) continue;
          if (line.startsWith(":")) continue;
          if (line.startsWith("event:")) {
            eventType = line.slice(6).trim();
          } else if (line.startsWith("data:")) {
            const payload = line.slice(5).trimStart();
            dataBuffer = dataBuffer ? `${dataBuffer}\n${payload}` : payload;
          }
        }
      }

      if (dataBuffer.trim()) {
        await processEvent();
      }

      if (!assistantMessage.content.trim()) {
        assistantMessage.content = "No answer returned.";
        assistantMessage.isLoading = false;
        messages.value = messages.value.map((msg, idx) =>
          idx === assistantIndex ? { ...assistantMessage } : msg
        );
      }
    } catch (streamErr) {
      debugStreamLog("stream failed, using fallback /api/ai/ask", streamErr);
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
      assistantMessage.content = data?.answer ?? "No answer returned.";
      assistantMessage.content = data?.answer ?? "No answer returned.";
      assistantMessage.context = Array.isArray(data?.context)
        ? data.context
        : [];
      assistantMessage.isLoading = false;
      const fallbackElapsedMs = Math.max(0, Date.now() - streamStartedAt);
      const fallbackElapsedSec = (fallbackElapsedMs / 1000).toFixed(2);
      const fallbackModel =
        typeof data?.model === "string" && data.model.trim()
          ? data.model.trim()
          : "fallback";
      assistantMessage.footerMeta = `${fallbackModel} • ${fallbackElapsedSec}s`;
      messages.value = messages.value.map((msg, idx) =>
        idx === assistantIndex ? { ...assistantMessage } : msg
      );
      streamCompleted = true;
    }

    if (!streamCompleted && !assistantMessage.content.trim()) {
      assistantMessage.content = "No answer returned.";
    }
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

const renderAssistantMessage = (content) => {
  try {
    const raw = typeof content === "string" ? content : String(content ?? "");
    const html = marked.parse(raw);
    return DOMPurify.sanitize(html);
  } catch {
    const fallback =
      typeof content === "string" ? content : String(content ?? "");
    return DOMPurify.sanitize(`<p>${fallback}</p>`);
  }
};

const clearMessages = () => {
  messages.value = [];
  chatError.value = "";
  pendingKnowledgeCandidate.value = null;
  awaitingKnowledgeConfirmation.value = false;
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

.tabs {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab {
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 999px;
  padding: 8px 14px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab:hover {
  background: rgba(255, 255, 255, 0.25);
}

.tab.active {
  background: #fff;
  color: #374151;
  border-color: #fff;
}

.layout {
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  gap: 20px;
}

.single-column {
  grid-template-columns: 1fr;
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

.markdown-content :deep(*) {
  margin-top: 0;
}

.markdown-content :deep(p) {
  margin: 0 0 10px;
  line-height: 1.5;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  margin: 0 0 10px;
  line-height: 1.3;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0 0 10px 20px;
  padding: 0;
}

.markdown-content :deep(li) {
  margin: 4px 0;
}

.markdown-content :deep(blockquote) {
  margin: 0 0 10px;
  padding: 8px 12px;
  border-left: 4px solid #c7d2fe;
  background: #f8faff;
  color: #374151;
  border-radius: 6px;
}

.markdown-content :deep(code) {
  background: #e5e7eb;
  border-radius: 4px;
  padding: 1px 5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  margin: 0 0 10px;
  background: #111827;
  color: #f9fafb;
  border-radius: 8px;
  padding: 10px;
  overflow-x: auto;
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

.markdown-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid #d1d5db;
  margin: 12px 0;
}

.assistant-loading {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 18px;
}

.assistant-meta {
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 0.82rem;
  font-style: italic;
}

.loading-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #9ca3af;
  animation: ai-loading-bounce 1s infinite ease-in-out;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.15s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes ai-loading-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
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
  .messages {
    max-height: 45vh;
  }
}
</style>

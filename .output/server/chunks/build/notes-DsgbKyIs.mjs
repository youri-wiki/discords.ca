import { s as setInterval } from './interval-gl53xdpR.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  data() {
    return {
      notes: []
    };
  },
  methods: {
    fetchNote() {
      fetch("https://discords.ca/ts/note/get").then((response) => response.json()).then((data) => {
        const notesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        const reversedNotesArray = notesArray.reverse();
        this.notes = reversedNotesArray;
      });
    },
    sendNote(username, content) {
      if (!username || !content)
        return alert("Please fill out all fields");
      const formdata = new FormData();
      formdata.append("author", username);
      formdata.append("content", content);
      fetch("https://discords.ca/ts/note/add", {
        method: "POST",
        body: formdata,
        redirect: "follow"
      }).then(() => {
        this.fetchNote();
      });
    },
    copynote(id) {
      (void 0).clipboard.writeText(
        `https://discords.ca/ts/note/getanote/${id}`
      );
      alert("Link copied to clipboard");
    }
  },
  mounted() {
    this.fetchNote();
    setInterval();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wtf-container" }, _attrs))} data-v-0625f23a><h1 data-v-0625f23a>Notes</h1><form data-v-0625f23a><input type="text"${ssrRenderAttr("value", _ctx.username)} placeholder="Username" data-v-0625f23a><input type="text"${ssrRenderAttr("value", _ctx.content)} placeholder="Content" data-v-0625f23a><button type="submit" data-v-0625f23a>Submit</button></form><div class="note-container" data-v-0625f23a><!--[-->`);
  ssrRenderList($data.notes, (note, index) => {
    _push(`<div class="note" data-v-0625f23a><h3 class="hidden" data-v-0625f23a>Click to copy link</h3><div class="note_data" data-v-0625f23a><h3 data-v-0625f23a>${ssrInterpolate(note.author)}:</h3><p data-v-0625f23a>${ssrInterpolate(note.content)}</p></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const notes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0625f23a"]]);

export { notes as default };
//# sourceMappingURL=notes-DsgbKyIs.mjs.map

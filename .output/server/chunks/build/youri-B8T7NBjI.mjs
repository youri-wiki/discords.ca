import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _imports_0 = "" + buildAssetsURL("PageYouriTop.Dn6wqIAC.jpg");
const _imports_1 = "" + buildAssetsURL("PageYouriClient.Mt8k5RgL.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-51241b68><div class="top-container" data-v-51241b68><div class="top-bg" data-v-51241b68><img${ssrRenderAttr("src", _imports_0)} alt="img" class="top-bg-img" data-v-51241b68></div><div class="info" data-v-51241b68><h1 class="title" data-v-51241b68>Youri Belanger</h1><div class="fullstack" data-v-51241b68><h2 data-v-51241b68>Developpeur fullstack</h2><p data-v-51241b68> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, magni! Necessitatibus culpa quaerat provident quo odit cupiditate ut inventore quidem unde error officia, alias deleniti at assumenda, iure fugiat? Iste velit consequuntur ea quibusdam perferendis, consequatur, blanditiis commodi nobis omnis, odit quisquam vel vero! Pariatur reiciendis deleniti doloribus assumenda vero. </p></div></div></div><div class="idea-wrapper" data-v-51241b68><div class="idea" data-v-51241b68><div class="idea-info" data-v-51241b68><h2 class="idea-h2" data-v-51241b68>Vous avez un projet?</h2><p data-v-51241b68> Chaque projet m\xE9rite d\u2019avoir sa propre page web pour le mettre en valeur. Une page web permet aussi d\u2019afficher les informations pour que de potentiel clients puisse s\u2019y retrouv\xE9 facilement. </p></div><div class="gradient" data-v-51241b68><img${ssrRenderAttr("src", _imports_1)} alt="img" class="idea-img" data-v-51241b68></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/youri.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const youri = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-51241b68"]]);

export { youri as default };
//# sourceMappingURL=youri-B8T7NBjI.mjs.map

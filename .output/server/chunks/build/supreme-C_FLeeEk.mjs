import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './index-BabADJUJ.mjs';
import { T as TopBar, R as Reseau, H as Horraire, F as FbPage, M as MapSee } from './TrucEnHautLa-DfWZbuyU.mjs';
import { useSSRContext } from 'vue';
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

const _imports_0 = "" + buildAssetsURL("econo.wHJyG7eu.png");
const __default__ = {
  components: {
    Reseau,
    Horraire,
    FbPage,
    MapSee,
    TopBar
  },
  data() {
    return {
      schedule: {
        Monday: "10:00 - 17:00",
        Tuesday: "10:00 - 17:00",
        Wednesday: "10:00 - 17:00",
        Thursday: "10:00 - 19:00",
        Friday: "10:00 - 19:00",
        Saturday: "10:00 - 17:00",
        Sunday: "10:00 - 17:00"
      },
      isMapHovered: false,
      showMap: false,
      mapInstance: null,
      showClipboardIcon: false,
      isMenuOpen: false,
      isMenuIconRotated: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.toggleIconRotation();
    },
    toggleIconRotation() {
      this.isMenuIconRotated = !this.isMenuIconRotated;
    }
  },
  mounted() {
    (void 0).addEventListener("resize", () => {
      this.width = (void 0).innerWidth;
      this.height = (void 0).innerHeight;
    });
  },
  computed: {
    isStoreOpen() {
      const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long" });
      let openHours = "";
      switch (today) {
        case "Monday":
          openHours = this.schedule.Monday;
          break;
        case "Tuesday":
          openHours = this.schedule.Tuesday;
          break;
        case "Wednesday":
          openHours = this.schedule.Wednesday;
          break;
        case "Thursday":
          openHours = this.schedule.Thursday;
          break;
        case "Friday":
          openHours = this.schedule.Friday;
          break;
        case "Saturday":
          openHours = this.schedule.Saturday;
          break;
        case "Sunday":
          openHours = this.schedule.Sunday;
          break;
        default:
          return false;
      }
      const [openTime, closeTime] = openHours.split(" - ");
      const [openHour, openMinute] = openTime.split(":").map(Number);
      const [closeHour, closeMinute] = closeTime.split(":").map(Number);
      const currentTime = /* @__PURE__ */ new Date();
      const storeOpen = /* @__PURE__ */ new Date();
      const storeClose = /* @__PURE__ */ new Date();
      storeOpen.setHours(openHour, openMinute, 0);
      storeClose.setHours(closeHour, closeMinute, 0);
      return currentTime >= storeOpen && currentTime <= storeClose;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "supreme",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u{1F6D2} Suprem'\xE9cono",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://discords.ca/api/image/displays"
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
          integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
          crossorigin: ""
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wdth,wght,YTLC@0,6..12,75..125,200..1000,440..540;1,6..12,75..125,200..1000,440..540&display=swap",
          rel: "stylesheet"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<body${ssrRenderAttrs(_attrs)} data-v-04a0706e><div class="upper-container" data-v-04a0706e><div class="logo" data-v-04a0706e><img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-04a0706e></div><nav class="menu" data-v-04a0706e><ul data-v-04a0706e><li data-v-04a0706e><a href="#" data-v-04a0706e><i class="fas fa-home" data-v-04a0706e></i> Accueil</a></li></ul></nav></div>`);
      _push(ssrRenderComponent(TopBar, null, null, _parent));
      _push(`<div class="mobile-bar" data-v-04a0706e><button class="navbar-toggle" data-v-04a0706e><h1 data-v-04a0706e></h1></button><ul class="${ssrRenderClass({ "show-menu": _ctx.isMenuOpen })}" data-v-04a0706e><li data-v-04a0706e><a href="#" data-v-04a0706e><i class="fas fa-home" data-v-04a0706e></i> Accueil</a></li></ul></div><div class="center" data-v-04a0706e><p class="${ssrRenderClass({ "green-text": _ctx.isStoreOpen, "red-text": !_ctx.isStoreOpen })}" data-v-04a0706e> \u231A| La boutique est ${ssrInterpolate(_ctx.isStoreOpen ? "ouverte" : "ferm\xE9")}. </p><p data-v-04a0706e>Suivez-nous sur nos page pour \xEAtre au courant des nouveaut\xE9 !</p></div><div class="container" data-v-04a0706e><div class="info-container" data-v-04a0706e><div class="adresse-container" data-v-04a0706e><h3 data-v-04a0706e></h3><div class="adresse" data-v-04a0706e>`);
      _push(ssrRenderComponent(Reseau, null, null, _parent));
      _push(`</div></div><div class="horraire" data-v-04a0706e>`);
      _push(ssrRenderComponent(Horraire, null, null, _parent));
      _push(`</div></div><div class="post-container" data-v-04a0706e>`);
      _push(ssrRenderComponent(FbPage, null, null, _parent));
      _push(`</div></div><div class="main-container" data-v-04a0706e><p data-v-04a0706e>Venez nous voir en vrai !</p>`);
      _push(ssrRenderComponent(MapSee, null, null, _parent));
      _push(`</div></body>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/supreme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const supreme = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-04a0706e"]]);

export { supreme as default };
//# sourceMappingURL=supreme-C_FLeeEk.mjs.map

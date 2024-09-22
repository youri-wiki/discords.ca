import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { u as useHead } from './index-BabADJUJ.mjs';
import { T as TopBar, F as FbPage, M as MapSee, R as Reseau, H as Horraire } from './TrucEnHautLa-DfWZbuyU.mjs';
import { useSSRContext, mergeProps } from 'vue';
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

const _imports_0 = "" + buildAssetsURL("marie.BTs_F0GJ.svg");
const _sfc_main$2 = {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      console.log("Menu toggled");
    },
    closeMenu() {
      this.isOpen = false;
      console.log("Menu closed");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-62dae517><aside class="${ssrRenderClass([{ "side-menu--open": $data.isOpen }, "side-menu"])}" data-v-62dae517><div class="side-menu__content" data-v-62dae517><h1 data-v-62dae517>Magasins <i class="fas fa-level-down-alt" data-v-62dae517></i></h1><ul data-v-62dae517><li data-v-62dae517><a href="?valleyfield" data-v-62dae517>Valleyfield</a></li><li data-v-62dae517><a href="?mascouche" data-v-62dae517>Mascouche</a></li><li data-v-62dae517><a href="?st-zotique" data-v-62dae517>St-zotique</a></li></ul><h1 data-v-62dae517>Information <i class="fas fa-level-down-alt" data-v-62dae517></i></h1><ul data-v-62dae517><li data-v-62dae517><a href="#schedule" data-v-62dae517>Horraire</a></li><li data-v-62dae517><a href="#info" data-v-62dae517>Coordon\xE9</a></li></ul></div></aside>`);
  if ($data.isOpen) {
    _push(`<div class="side-menu__overlay" data-v-62dae517></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/sidemenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SideMenu = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-62dae517"]]);
const _sfc_main$1 = {
  methods: {
    redirect() {
      (void 0).location.href = "https://youri.wiki/";
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-42c4419b><div class="credit" data-v-42c4419b><p data-v-42c4419b>Liquidation Marie \xA9 2024</p><p data-v-42c4419b>Fais par <i style="${ssrRenderStyle({ "color": "#5cabb4", "cursor": "pointer" })}" data-v-42c4419b>youri</i></p></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-42c4419b"]]);
const __default__ = {
  components: {
    Reseau,
    Horraire,
    FbPage,
    MapSee,
    TopBar,
    SideMenu,
    Footer
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
      this.$refs.sideMenu.toggleMenu();
      console.log("truc");
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
  __name: "marie",
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
          href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wdth,wght,YTLC@0,6..12,75..125,200..1000,440..540;1,6..12,75..125,200..1000,440..540&display=swap",
          rel: "stylesheet"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="upperthing" data-v-767d5efb><p data-v-767d5efb><i class="fas fa-bars" data-v-767d5efb></i></p><p data-v-767d5efb>Centre de liquidation</p><img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-767d5efb></div><div class="page-container" data-v-767d5efb>`);
      _push(ssrRenderComponent(SideMenu, { ref: "sideMenu" }, null, _parent));
      _push(ssrRenderComponent(TopBar, null, null, _parent));
      _push(`<div class="center" data-v-767d5efb><p class="${ssrRenderClass({ "green-text": _ctx.isStoreOpen, "red-text": !_ctx.isStoreOpen })}" data-v-767d5efb> \u231A| La boutique est ${ssrInterpolate(_ctx.isStoreOpen ? "ouverte" : "ferm\xE9")}. </p></div><div class="mobile-text" data-v-767d5efb><h3 data-v-767d5efb>Vous cherchez</h3><ul data-v-767d5efb><li data-v-767d5efb><p data-v-767d5efb>Des aliments ?</p></li><li data-v-767d5efb><p data-v-767d5efb>Des produits de beaut\xE9 ?</p></li><li data-v-767d5efb><p data-v-767d5efb>Des objects de tout les jours ?</p></li></ul><p class="sub" data-v-767d5efb>Liquidation Marie a tout \xE7a, a un prix imbattable !</p></div><div class="container" data-v-767d5efb><div class="post-container" data-v-767d5efb>`);
      _push(ssrRenderComponent(FbPage, null, null, _parent));
      _push(`</div><div class="main-container" data-v-767d5efb><p data-v-767d5efb>Venez nous voir en vrai!</p>`);
      _push(ssrRenderComponent(MapSee, null, null, _parent));
      _push(`</div><div class="info-container" data-v-767d5efb><div class="adresse-container" data-v-767d5efb><div class="adresse" id="info" data-v-767d5efb>`);
      _push(ssrRenderComponent(Reseau, null, null, _parent));
      _push(`</div></div><div class="horraire" id="schedule" data-v-767d5efb>`);
      _push(ssrRenderComponent(Horraire, null, null, _parent));
      _push(`</div></div></div><footer data-v-767d5efb>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</footer></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/marie.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const marie = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-767d5efb"]]);

export { marie as default };
//# sourceMappingURL=marie-GqCG-TDx.mjs.map

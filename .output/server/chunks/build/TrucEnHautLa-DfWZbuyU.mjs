import { ssrRenderClass, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { useSSRContext, mergeProps } from 'vue';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$4 = {
  data() {
    return {
      showClipboardIcon: false,
      // Initially set to false
      location: "515 mont\xE9e Masson, Mascouche",
      phone: "(450) 474-7774",
      mapLink: "https://www.google.com/maps/place/515+mont\xE9e+Masson,+Mascouche"
    };
  },
  methods: {
    HandleCopyPhone() {
      {
        console.warn("Clipboard API is not available.");
        this.showClipboardIcon = false;
      }
    },
    async getLocation() {
      const place = (void 0).location.search.split("?")[1];
      if (!place) {
        try {
          const closestLocation = await getClosestLocation();
          if (closestLocation.place) {
            (void 0).history.pushState({}, "", `?${closestLocation.place}`);
            this.getInfo(closestLocation.place);
          }
        } catch (error) {
          console.error("error" + error);
        }
      } else {
        this.getInfo(place);
      }
    },
    getInfo(place) {
      if (place === "st-zotique") {
        this.location = "332 rue Principale, st-zotique";
        this.phone = "(450) 217-1550";
        this.mapLink = "https://www.google.com/maps/place/332+rue+Principale,+st+zotique";
      } else if (place === "valleyfield") {
        this.location = "45 rue Alphonse desjardins, Valleyfield";
        this.phone = "(450) 370-4445";
        this.mapLink = "https://www.google.com/maps/place/45+rue+Alphonse+desjardins";
      } else if (place === "mascouche") {
        this.location = "515 mont\xE9e Masson, Mascouche";
        this.phone = "(450) 474-7774";
        this.mapLink = "https://www.google.com/maps/place/515+mont\xE9e+Masson,+Mascouche";
      }
    },
    HandleRedirectGoogleMap() {
      (void 0).location.href = this.mapLink;
    },
    HandleMessengerClick() {
      (void 0).location.href = "https://www.facebook.com/messages/t/Liquidationmarieinc/";
    },
    HandleFacebookClick() {
      (void 0).location.href = "https://www.facebook.com/Liquidationmarieinc/";
    },
    HandleInstagramClick() {
      (void 0).location.href = "https://www.instagram.com/liquidationmarie/";
    }
  },
  mounted() {
    this.getLocation();
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="info" data-v-8f8be075><div class="phone-number" data-v-8f8be075><p class="${ssrRenderClass([{ "number--show": !$data.showClipboardIcon, "number": $data.showClipboardIcon }, "number"])}" data-v-8f8be075><i class="fas fa-phone" data-v-8f8be075></i> ${ssrInterpolate($data.phone)}</p><div class="${ssrRenderClass([{ "clipboard-icon--show": $data.showClipboardIcon }, "clipboard-icon"])}" data-v-8f8be075><p data-v-8f8be075>\u{1F4CB}</p></div></div><div class="google-map" data-v-8f8be075><p class="mice" data-v-8f8be075><i class="fas fa-map-marker-alt" data-v-8f8be075></i> ${ssrInterpolate($data.location)}</p></div></div><div class="reseau-social" data-v-8f8be075><div class="messenger" data-v-8f8be075><p class="mice" data-v-8f8be075><i class="fab fa-facebook-messenger" data-v-8f8be075></i></p></div><div class="facebook" data-v-8f8be075><p class="mice" data-v-8f8be075><i class="fab fa-facebook" data-v-8f8be075></i></p></div><div class="instagram" data-v-8f8be075><p class="mice" data-v-8f8be075><i class="fab fa-instagram" data-v-8f8be075></i></p></div></div><!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/reseau.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Reseau = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-8f8be075"]]);
const _sfc_main$3 = {
  data() {
    return {
      horraire: {}
    };
  },
  methods: {
    getLocation() {
      const place = (void 0).location.search.split("?")[1];
      this.getSchedule(place);
    },
    getSchedule(place) {
      if (place === "valleyfield") {
        this.horraire = {
          "Lundi - Mardi - Mercredi": "10:00 - 17:00",
          "Jeudi - Vendredi": "10:00 - 20:00",
          "Samedi - Dimanche": "10:00 - 17:00"
        };
      } else {
        this.horraire = {
          "Lundi - Mardi - Mercredi": "10:00 - 17:00",
          "Jeudi - Vendredi": "10:00 - 19:00",
          "Samedi - Dimanche": "10:00 - 17:00"
        };
      }
    }
  },
  mounted() {
    this.getLocation();
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-3d96e074><h3 class="title" data-v-3d96e074>Horraire</h3><div class="schedule-columns" data-v-3d96e074><!--[-->`);
  ssrRenderList($data.horraire, (value, day) => {
    _push(`<div class="schedule-item" data-v-3d96e074><p class="days" data-v-3d96e074>${ssrInterpolate(day)}</p><p class="hours" data-v-3d96e074>${ssrInterpolate(value)}</p></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/horraire.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Horraire = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-3d96e074"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-5a912097><h3 class="rolling-color" data-v-5a912097>Le prix avant tout</h3><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLiquidationmarieinc&amp;tabs=timeline&amp;width=300&amp;height=500&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=922128692136481" width="300" height="500" style="${ssrRenderStyle({ "border": "none", "overflow": "hidden", "margin": "auto", "display": "block" })}" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" data-v-5a912097></iframe></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/pageFb.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FbPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-5a912097"]]);
const _sfc_main$1 = {
  data() {
    return {
      mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.877053399117!2d-73.6136361!3d45.733560399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8dd1052dfdc99%3A0x460ac98398bbff3f!2s515%20Mnt%20Masson%2C%20Mascouche%2C%20QC%20J7K%202L6!5e0!3m2!1sfr!2sca!4v1717715964970!5m2!1sfr!2sca"
    };
  },
  methods: {
    async getLocation() {
      const place = (void 0).location.search.split("?")[1];
      if (!place)
        return "mascouche";
      return place;
    },
    getMap(place) {
      if (place === "mascouche") {
        this.mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.877053399117!2d-73.6136361!3d45.733560399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc8dd1052dfdc99%3A0x460ac98398bbff3f!2s515%20Mnt%20Masson%2C%20Mascouche%2C%20QC%20J7K%202L6!5e0!3m2!1sfr!2sca!4v1717715964970!5m2!1sfr!2sca";
      } else if (place === "valleyfield") {
        this.mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.486915448448!2d-74.12872589999999!3d45.258167199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc94e2e34173be3%3A0xee3b21d711746642!2s45%20Rue%20Alphonse-Desjardins%2C%20Salaberry-de-Valleyfield%2C%20QC%20J6S%202M2!5e0!3m2!1sfr!2sca!4v1717716180181!5m2!1sfr!2sca";
      } else if (place === "st-zotique") {
        this.mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.7221772765783!2d-74.2253657!3d45.2534105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc95262ca4e5c15%3A0x29eb893d33e74eaf!2s332%20Rue%20Principale%2C%20Saint-Zotique%2C%20QC%20J0P%201Z0!5e0!3m2!1sfr!2sca!4v1717716261421!5m2!1sfr!2sca";
      }
    },
    //make a methode to add an iframe to the page with the mapLink as src
    addIframe() {
      const iframe = (void 0).getElementById("mapIframe");
      iframe.src = this.mapLink;
    }
  },
  mounted() {
    this.getLocation().then((place) => {
      this.getMap(place);
      this.addIframe();
    });
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<iframe${ssrRenderAttrs(mergeProps({
    id: "mapIframe",
    src: "",
    style: { "border": "0" },
    loading: "lazy",
    class: "hidden-map"
  }, _attrs))} data-v-1cfcea9a></iframe>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/map.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MapSee = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1cfcea9a"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner" }, _attrs))} data-v-d3227613><div class="container" data-v-d3227613><div class="row" data-v-d3227613><div class="col-12" data-v-d3227613><h1 data-v-d3227613>Nouveau produit chaque jour !!!</h1></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/compoSupreme/TrucEnHautLa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TopBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d3227613"]]);

export { FbPage as F, Horraire as H, MapSee as M, Reseau as R, TopBar as T };
//# sourceMappingURL=TrucEnHautLa-DfWZbuyU.mjs.map

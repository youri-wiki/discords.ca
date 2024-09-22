import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './index-BabADJUJ.mjs';
import { _ as _export_sfc, a as useRuntimeConfig } from './server.mjs';
import { useSSRContext, mergeProps } from 'vue';
import '@unhead/shared';
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
import 'vue-router';

const _sfc_main$6 = {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const runtimeConfig = useRuntimeConfig();
      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/db/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: this.username,
              password: this.password
            })
          }
        );
        if (response.ok) {
          console.log("Login successful");
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("password", this.password);
          sessionStorage.setItem("view", "home");
          (void 0).reload();
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-6eadddca><input type="text"${ssrRenderAttr("value", $data.username)} placeholder="Username" data-v-6eadddca><input type="password"${ssrRenderAttr("value", $data.password)} placeholder="Password" data-v-6eadddca><button data-v-6eadddca>Login</button></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/log-in.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-6eadddca"]]);
const _sfc_main$5 = {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async signin() {
      const runtimeConfig = useRuntimeConfig();
      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/db/create/${this.username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: this.username,
              password: this.password
            })
          }
        );
        if (response.ok) {
          console.log("signin successful");
          sessionStorage.setItem("username", this.username);
          sessionStorage.setItem("password", this.password);
          sessionStorage.setItem("view", "home");
          (void 0).reload();
        } else {
          console.error("signin failed");
        }
      } catch (error) {
        console.error("Error during signin:", error);
      }
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-bda85e89><input type="text"${ssrRenderAttr("value", $data.username)} placeholder="Username" data-v-bda85e89><input type="password"${ssrRenderAttr("value", $data.password)} placeholder="Password" data-v-bda85e89><button data-v-bda85e89>signin</button></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/sign-in.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const signin = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-bda85e89"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1 data-v-93f6a1b2> Home </h1><div class="content" data-v-93f6a1b2><p data-v-93f6a1b2> Welcome to the home page. This is where you can find all the information you need about our website. </p><p data-v-93f6a1b2> You can find information about our API, view data, and log out from here. </p></div><!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/homeDisplay.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const homeDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-93f6a1b2"]]);
const _sfc_main$3 = {
  data() {
    return {
      username: "",
      password: "",
      noImage: true,
      images: []
    };
  },
  methods: {
    async getImages() {
      const runtimeConfig = useRuntimeConfig();
      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/image/download`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: sessionStorage.getItem("username")
            })
          }
        );
        if (response.ok) {
          const imageData = await response.json();
          this.noImage = false;
          console.log(imageData);
          this.images = imageData;
        } else {
          console.error("No images");
        }
      } catch (error) {
        console.error("Error during fetching:", error);
      }
    },
    imageSize(b64) {
      const char = atob(b64);
      var byteArray = new ArrayBuffer(char.length);
      var byteNumbers = new Array(char.length);
      for (let i = 0; i < char.length; i++) {
        byteNumbers[i] = char.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var blob = new Blob([byteArray]);
      var fileSize = blob.size;
      var size = fileSize / 1024;
      size = Math.round(size * 100) / 100;
      return size;
    },
    copyToClipboard(text) {
      (void 0).clipboard.writeText(text);
    },
    truncateFilename(filename) {
      const maxLength = 15;
      return filename.length > maxLength ? filename.slice(0, maxLength) + "..." : filename;
    },
    handleImageError(image) {
      image.error = true;
    }
  },
  mounted() {
    this.getImages();
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($data.noImage) {
    _push(`<div${ssrRenderAttrs(_attrs)} data-v-fd9c9fcc><h1 data-v-fd9c9fcc>There are no images</h1></div>`);
  } else {
    _push(`<div${ssrRenderAttrs(_attrs)} data-v-fd9c9fcc><h1 data-v-fd9c9fcc>Images</h1><div class="image-container" data-v-fd9c9fcc><!--[-->`);
    ssrRenderList($data.images, (image) => {
      _push(`<div class="image-wrapper" data-v-fd9c9fcc>`);
      if (image.fileExtension === "mp4" || image.error) {
        _push(`<div class="image-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-fd9c9fcc></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("src", `data:image/${image.fileExtension};base64,${image.base64}`)} alt="image" class="image" data-v-fd9c9fcc><div class="info" data-v-fd9c9fcc><p class="filename" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-fd9c9fcc><i class="fas fa-search" data-v-fd9c9fcc></i> ${ssrInterpolate($options.truncateFilename(image.Filename))}</p><p class="filename" data-v-fd9c9fcc><i class="fas fa-database" data-v-fd9c9fcc></i> ${ssrInterpolate($options.imageSize(image.base64))} K </p></div></div>`);
    });
    _push(`<!--]--></div></div>`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/displayImg.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const displayImg = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-fd9c9fcc"]]);
var define_import_meta_env_default = { BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const _sfc_main$2 = {
  data() {
    return {
      username: "",
      key: ""
    };
  },
  methods: {
    async createKey() {
      const runtimeConfig = useRuntimeConfig();
      try {
        const response = await fetch(
          `${runtimeConfig.public.API_BASE_URL}/user/create/key/${this.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.ok) {
          const json = await response.json();
          const key = json.key;
          this.key = key;
          sessionStorage.setItem("key", key);
        } else {
          console.error("createKey failed");
        }
      } catch (error) {
        console.error("Error during createKey:", error);
      }
    }
  },
  async mounted() {
    this.username = sessionStorage.getItem("username");
    await this.createKey();
    this.key = sessionStorage.getItem("key");
    console.log(define_import_meta_env_default.VITE_API_URL);
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 data-v-f99f6ed4>API</h1><div data-v-f99f6ed4><p data-v-f99f6ed4>Key <i class="fas fa-hashtag" data-v-f99f6ed4></i>${ssrInterpolate($data.key)}</p></div><div class="shareX" data-v-f99f6ed4><h1 data-v-f99f6ed4>How to Setup ShareX</h1><p data-v-f99f6ed4>1. Start by opening shareX (easy step)</p><p data-v-f99f6ed4> 2. Click on <strong data-v-f99f6ed4>Destination</strong> and then <strong data-v-f99f6ed4>Custom uploader settings</strong></p><img src="https://discords.ca/api/image/s7lv0u8.png" alt="ShareX1" data-v-f99f6ed4><p data-v-f99f6ed4>3. In the left upper corner, click on <strong data-v-f99f6ed4>New</strong></p><img src="https://discords.ca/api/image/m2lyny1.png" alt="ShareX2" style="${ssrRenderStyle({ "height": "400px", "width": "auto" })}" data-v-f99f6ed4><p data-v-f99f6ed4> 4. Change the name for whatever you want, it doesn&#39;t matter, set the destination type to <strong data-v-f99f6ed4>image uploader</strong></p><p data-v-f99f6ed4> 5. Set the method to <strong data-v-f99f6ed4>post</strong> and inster the Url to your API (the one that we made earlier). and add /upload at the end </p><p data-v-f99f6ed4> 6. In the body part, add a data called <strong data-v-f99f6ed4>secret</strong>, with the value of your choice, need to be the same as the one you put in the code, in your case <strong data-v-f99f6ed4>${ssrInterpolate($data.key)}</strong></p><p data-v-f99f6ed4> 7. Finally, For the <strong data-v-f99f6ed4>File form name</strong>, put <strong data-v-f99f6ed4>sharex</strong></p><p data-v-f99f6ed4>It should look like this...</p><img src="https://cdn.discords.ca/b6byoe4.png" alt="ShareX3" style="${ssrRenderStyle({ "height": "400px", "width": "auto" })}" data-v-f99f6ed4></div><!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/apiInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const apiInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f99f6ed4"]]);
const _sfc_main$1 = {
  data() {
    return {};
  },
  methods: {
    changeView(view) {
      if (view === "logout") {
        sessionStorage.clear();
        (void 0).reload();
        return;
      }
      sessionStorage.setItem("view", view);
      this.$emit("viewChanged", view);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space" }, _attrs))} data-v-ad153122><div class="sidebar" data-v-ad153122><ul data-v-ad153122><li style="${ssrRenderStyle({ "cursor": "default" })}" data-v-ad153122><i class="fas fa-home" data-v-ad153122></i> Home </li><li style="${ssrRenderStyle({ "cursor": "default" })}" data-v-ad153122><i class="fas fa-file-image" data-v-ad153122></i> data </li><li style="${ssrRenderStyle({ "cursor": "default" })}" data-v-ad153122><i class="fas fa-server" data-v-ad153122></i> API </li><li data-v-ad153122><i class="fas fa-sign-out-alt" data-v-ad153122></i> Logout</li></ul></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/displays/sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ad153122"]]);
const __default__ = {
  data() {
    return {
      loggedIn: false,
      view: "home"
    };
  },
  head() {
    return {
      title: "Displays",
      //change the website icon to an image
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://cdn.discords.ca/4b8rxpo.png"
        }
      ],
      meta: [
        {
          name: "twitter:title",
          content: "Discords.ca image hosting"
        },
        {
          name: "twitter:description",
          content: "host your images on discords.ca!"
        },
        {
          //change the color
          name: "theme-color",
          content: "#6b6a8f"
        }
      ]
    };
  },
  methods: {
    checkLogin() {
      if (sessionStorage.getItem("username") && sessionStorage.getItem("password")) {
        console.log("Logged in as:", sessionStorage.getItem("username"));
        this.loggedIn = true;
      }
    },
    checkView() {
      if (sessionStorage.getItem("view")) {
        console.log("view:", sessionStorage.getItem("view"));
        this.view = sessionStorage.getItem("view");
      }
    },
    handleViewChange(newView) {
      console.log("View changed to: " + newView);
      this.view = newView;
    }
  },
  mounted() {
    this.checkLogin();
    this.checkView();
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "displays",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Displays",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://discords.ca/api/image/displays"
        }
      ],
      meta: [
        {
          name: "twitter:title",
          content: "Discords.ca image hosting"
        },
        {
          name: "twitter:description",
          content: "host your images on discords.ca!"
        },
        {
          //change the color
          name: "theme-color",
          content: "#6b6a8f"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><header data-v-4afac934></header><body data-v-4afac934>`);
      if (!_ctx.loggedIn) {
        _push(`<div data-v-4afac934><div data-v-4afac934> log-in `);
        _push(ssrRenderComponent(login, null, null, _parent));
        _push(`</div><div data-v-4afac934><div data-v-4afac934>sign-in</div>`);
        _push(ssrRenderComponent(signin, null, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.loggedIn) {
        _push(`<div class="logged" data-v-4afac934>`);
        _push(ssrRenderComponent(sidebar, {
          onViewChanged: _ctx.handleViewChange,
          style: { "position": "fixed" }
        }, null, _parent));
        _push(`<div class="content" data-v-4afac934>`);
        if (_ctx.view === "home") {
          _push(`<div class="info" data-v-4afac934>`);
          _push(ssrRenderComponent(homeDisplay, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.view === "data") {
          _push(`<div class="info" data-v-4afac934>`);
          _push(ssrRenderComponent(displayImg, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.view === "api") {
          _push(`<div class="info" data-v-4afac934>`);
          _push(ssrRenderComponent(apiInfo, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</body><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/displays.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const displays = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4afac934"]]);

export { displays as default };
//# sourceMappingURL=displays-CieBh4cj.mjs.map

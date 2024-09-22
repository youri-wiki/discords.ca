import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { useSSRContext, createVNode, resolveDynamicComponent, ref, mergeProps } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderVNode, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { u as useHead } from './index-BabADJUJ.mjs';
import { _ as _export_sfc } from './server.mjs';
import { s as setInterval } from './interval-gl53xdpR.mjs';
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

const _sfc_main$6 = {
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-88902f47><aside class="${ssrRenderClass([{ "side-menu--open": $data.isOpen }, "side-menu"])}" data-v-88902f47><div class="side-menu__content" data-v-88902f47><h1 data-v-88902f47>Randoms <i class="fas fa-level-down-alt" data-v-88902f47></i></h1><ul data-v-88902f47><li data-v-88902f47><a href="?home" data-v-88902f47>Home</a></li><li data-v-88902f47><a href="?who" data-v-88902f47>Who ?</a></li><li data-v-88902f47><a href="?what" data-v-88902f47>What ?</a></li><li data-v-88902f47><a href="?snake" data-v-88902f47>Snake</a></li></ul></div></aside>`);
  if ($data.isOpen) {
    _push(`<div class="side-menu__overlay" data-v-88902f47></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/sidebar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-88902f47"]]);
const sidebar$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: sidebar
});
const _imports_0 = "" + buildAssetsURL("youyoulepan.BOd2ZjLW.svg");
const _imports_1 = "" + buildAssetsURL("Vue.D-pvmOEH.png");
const _imports_2 = "" + buildAssetsURL("js.B2gqmNKf.png");
const _imports_3 = "" + buildAssetsURL("py.CTJsvUCz.png");
const _imports_4 = "" + buildAssetsURL("cpp.K58JSrZE.png");
const _imports_5 = "" + buildAssetsURL("ts.DwfpNOHv.png");
const _imports_6 = "" + buildAssetsURL("react.D6PlakiV.png");
const _sfc_main$5 = {
  data() {
    return {
      posts: [],
      width: (void 0).innerWidth,
      height: (void 0).innerHeight
    };
  },
  methods: {
    HandleRedirectDiscord() {
      (void 0).location.href = "https://discord.gg/nbFMXcC3tf";
    },
    HandleRedirectkofi() {
      (void 0).location.href = "https://ko-fi.com/masterdpro";
    },
    updateDimensions() {
      this.width = (void 0).innerWidth;
      this.height = (void 0).innerHeight;
    }
  },
  mounted() {
    (void 0).addEventListener("resize", this.updateDimensions);
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><header data-v-76d5d131><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" data-v-76d5d131></header><body data-v-76d5d131><div class="top-content" data-v-76d5d131><div class="names" data-v-76d5d131><img${ssrRenderAttr("src", _imports_0)} alt="youyoulepan" class="youyoulepan" data-v-76d5d131><div class="row" data-v-76d5d131><h1 class="Masterdpro" data-v-76d5d131>masterdpro</h1><div class="badges" data-v-76d5d131><img${ssrRenderAttr("src", _imports_1)} data-v-76d5d131><img${ssrRenderAttr("src", _imports_2)} data-v-76d5d131><img${ssrRenderAttr("src", _imports_3)} data-v-76d5d131><img${ssrRenderAttr("src", _imports_4)} data-v-76d5d131><img${ssrRenderAttr("src", _imports_5)} data-v-76d5d131><img${ssrRenderAttr("src", _imports_6)} data-v-76d5d131></div></div></div><div class="bio" data-v-76d5d131><p data-v-76d5d131> Hi ! I&#39;m Youri, a young canadian fullstack developper (No, I can&#39;t hack anyone. I don&#39;t even remember my own passwords..). I started learning Javascript in 2021 at the age of 12. If you want to support me you can make a donnation and leave me a message on my ko-fi page &lt;3. </p></div><div class="terminal" data-v-76d5d131><h1 data-v-76d5d131>C:\\user\\youri\\workspace: <span class="flash" data-v-76d5d131>_</span></h1><h1 data-v-76d5d131> C:\\user\\youri\\workspace\\discord: <span class="flash-disc" data-v-76d5d131> discord.gg/nbFMXcC3tf <i class="fab fa-discord discord-icon" data-v-76d5d131></i></span></h1><h1 data-v-76d5d131>C:\\user\\youri\\workspace\\get-money\\job: <span data-v-76d5d131>undefined</span></h1><h1 data-v-76d5d131> C:\\user\\youri\\workspace\\get-money\\support-me: <span class="kofi" data-v-76d5d131> Ko-fi <i class="fas fa-hand-holding-usd" data-v-76d5d131></i></span></h1></div></div></body><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/who.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const who = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-76d5d131"]]);
const who$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: who
});
const _sfc_main$4 = {
  data() {
    return {
      rangeValue: 50,
      speed: 1,
      emoji: "\u{1F414}"
    };
  },
  computed: {
    rollStyle() {
      return {
        animationDuration: `${this.speed}s`
      };
    }
  },
  methods: {
    logRangeValue() {
      const speed = 25 / this.rangeValue;
      this.speed = speed.toFixed(2);
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "what" }, _attrs))} data-v-e5aaab77><h1 data-v-e5aaab77>What ???</h1><div class="content" data-v-e5aaab77><p data-v-e5aaab77>chicken butt</p><span style="${ssrRenderStyle($options.rollStyle)}" class="roll" data-v-e5aaab77>${ssrInterpolate($data.emoji)}</span></div><div class="range-container" data-v-e5aaab77><label for="rangeInput" data-v-e5aaab77>Speed: ${ssrInterpolate($data.rangeValue)}</label><input type="range" id="rangeInput"${ssrRenderAttr("value", $data.rangeValue)} data-v-e5aaab77></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/what.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const what = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-e5aaab77"]]);
const what$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: what
});
const _sfc_main$3 = {
  data() {
    return {
      canvasWidth: 400,
      canvasHeight: 400,
      context: null,
      snake: [{ x: 10, y: 10 }],
      direction: "RIGHT",
      food: { x: 0, y: 0 },
      gridSize: 20,
      gameInterval: null,
      snakeEmoji: "\u{1F7E9}",
      foodEmoji: "\u{1F34E}",
      failed: false
    };
  },
  mounted() {
    this.createGame();
  },
  methods: {
    gameLoop() {
      this.moveSnake();
      this.checkCollision();
      this.drawGame();
    },
    moveSnake() {
      const head = { ...this.snake[0] };
      switch (this.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }
      this.snake.unshift(head);
      if (head.x === this.food.x && head.y === this.food.y) {
        this.placeFood();
      } else {
        this.snake.pop();
      }
    },
    checkCollision() {
      const head = this.snake[0];
      if (head.x < 0 || head.x >= this.canvasWidth / this.gridSize || head.y < 0 || head.y >= this.canvasHeight / this.gridSize || this.snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
        clearInterval(this.gameInterval);
        this.failed = true;
      }
    },
    drawGame() {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.snake.forEach((segment) => {
        this.context.fillText(
          this.snakeEmoji,
          (segment.x + 0.5) * this.gridSize,
          (segment.y + 0.5) * this.gridSize
        );
      });
      this.context.fillText(
        this.foodEmoji,
        (this.food.x + 0.5) * this.gridSize,
        (this.food.y + 0.5) * this.gridSize
      );
    },
    placeFood() {
      this.food.x = Math.floor(
        Math.random() * (this.canvasWidth / this.gridSize)
      );
      this.food.y = Math.floor(
        Math.random() * (this.canvasHeight / this.gridSize)
      );
    },
    changeDirection(event) {
      const key = event.keyCode;
      if (key === 82)
        this.restartGame();
      const directions = {
        37: "LEFT",
        65: "LEFT",
        38: "UP",
        87: "UP",
        39: "RIGHT",
        68: "RIGHT",
        40: "DOWN",
        83: "DOWN"
      };
      const oppositeDirections = {
        LEFT: "RIGHT",
        UP: "DOWN",
        RIGHT: "LEFT",
        DOWN: "UP"
      };
      if (directions[key] && directions[key] !== oppositeDirections[this.direction]) {
        this.direction = directions[key];
      }
    },
    restartGame() {
      this.failed = false;
      this.snake = [{ x: 10, y: 10 }];
      this.direction = "RIGHT";
      this.placeFood();
      this.gameInterval = setInterval(this.gameLoop);
    },
    createGame() {
      this.context = this.$refs.gameCanvas.getContext("2d");
      this.placeFood();
      (void 0).addEventListener("keydown", this.changeDirection);
      this.gameInterval = setInterval(this.gameLoop);
    }
  },
  beforeDestroy() {
    clearInterval(this.gameInterval);
    (void 0).removeEventListener("keydown", this.changeDirection);
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "center" }, _attrs))}><h2>Snake Game</h2>`);
  if ($data.failed) {
    _push(`<p>You lost</p>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div><canvas${ssrRenderAttr("width", $data.canvasWidth)}${ssrRenderAttr("height", $data.canvasHeight)}></canvas></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/snake.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const snake = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const snake$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: snake
});
const _sfc_main$2 = {
  data() {
    return {
      notes: []
    };
  },
  methods: {
    fetchNote() {
      fetch("https://discords.ca/ts/note/get").then((response) => response.json()).then((data) => {
        console.log(data);
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
    }
  },
  mounted() {
    this.fetchNote();
    setInterval();
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "wtf-container" }, _attrs))} data-v-ebfe7e4b><h1 data-v-ebfe7e4b>WTF!</h1><form data-v-ebfe7e4b><input type="text"${ssrRenderAttr("value", _ctx.username)} placeholder="Username" data-v-ebfe7e4b><input type="text"${ssrRenderAttr("value", _ctx.content)} placeholder="Content" data-v-ebfe7e4b><button type="submit" data-v-ebfe7e4b>Submit</button></form><div class="note-container" data-v-ebfe7e4b><!--[-->`);
  ssrRenderList($data.notes, (note, index2) => {
    _push(`<div class="note" data-v-ebfe7e4b><h3 data-v-ebfe7e4b>${ssrInterpolate(note.author)}:</h3><p data-v-ebfe7e4b>${ssrInterpolate(note.content)}</p></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/wtf.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const wtf = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-ebfe7e4b"]]);
const wtf$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: wtf
});
const _sfc_main$1 = {
  data() {
    return {
      username: "",
      password: "",
      text: "Enter your password",
      anim: false
    };
  },
  methods: {
    login() {
      if (this.password === "your password") {
        this.text = "Password is incorrect";
      } else if (this.password === "incorrect") {
        this.text = "Try again";
      } else if (this.password === "again") {
        this.text = "hell nah";
        setTimeout(() => {
          this.text = "I quit this job";
        }, 2e3);
        setTimeout(() => {
          this.text = "I'm out";
        }, 3e3);
        setTimeout(() => {
          this.text = "\u{1F464}\u{1F52B}";
          this.anim = true;
        }, 4e3);
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["login-container", ""]
  }, _attrs))} data-v-d1f3aa1c><p class="${ssrRenderClass([{ leave: $data.anim }, "stay"])}" data-v-d1f3aa1c>${ssrInterpolate($data.text)}</p><form data-v-d1f3aa1c><input type="text"${ssrRenderAttr("value", $data.username)} placeholder="Username" data-v-d1f3aa1c><input type="text"${ssrRenderAttr("value", $data.password)} placeholder="Password" data-v-d1f3aa1c><button type="submit" data-v-d1f3aa1c>Login</button></form></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/youri.wiki/login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d1f3aa1c"]]);
const login$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: login
});
const __default__ = {
  components: {
    sidebar,
    who,
    what,
    snake,
    wtf,
    login
  },
  data() {
    return {
      projects: [
        {
          name: "Displays \u{1F5BC}\uFE0F",
          description: "Displays is a website that allows you to host images and share them with an esay to use API !",
          color: "rgb(119, 126, 218)",
          logo: "https://discords.ca/api/image/displays",
          link: "/displays"
        },
        {
          name: "Counto \u{1F9EE}",
          description: "Counto, a discord that going to make your server counting to the infinite!",
          color: "#188b76",
          logo: "https://discords.ca/api/image/counto",
          link: "/counto"
        },
        {
          name: "Pro's & co \u{1F3AD}",
          description: "My own community discord server ! Mostly french, but everyone is welcome !",
          color: "#7468af",
          logo: "https://cdn.discordapp.com/icons/807434421279916034/dcc8c9be68ab7b23267b3de83291f612.webp",
          link: "https://discord.gg/rJN5cwR3pf"
        }
      ],
      module: "",
      pName: "Discords.ca"
    };
  },
  methods: {
    redirect(link) {
      (void 0).location.href = link;
    },
    toggleMenu() {
      this.$refs.sideMenu.toggleMenu();
    },
    getModule() {
      const modules = ref([]);
      let module = (void 0).location.search.split("?")[1];
      if (!module) {
        module = "home";
      }
      const files = /* @__PURE__ */ Object.assign({ "../components/youri.wiki/exemple.vue": () => import('./exemple-BSRyHkYV.mjs'), "../components/youri.wiki/login.vue": () => Promise.resolve().then(function() {
        return login$1;
      }), "../components/youri.wiki/sidebar.vue": () => Promise.resolve().then(function() {
        return sidebar$1;
      }), "../components/youri.wiki/snake.vue": () => Promise.resolve().then(function() {
        return snake$1;
      }), "../components/youri.wiki/what.vue": () => Promise.resolve().then(function() {
        return what$1;
      }), "../components/youri.wiki/who.vue": () => Promise.resolve().then(function() {
        return who$1;
      }), "../components/youri.wiki/wtf.vue": () => Promise.resolve().then(function() {
        return wtf$1;
      }) });
      modules.value = Object.keys(files).map(
        (key) => key.replace(/.*\/(.+)\.vue$/, "$1")
      );
      if (modules.value.includes(module)) {
        return module;
      } else {
        return "home";
      }
    }
  },
  mounted() {
    this.module = this.getModule();
    if (this.module == "home") {
      this.pName = "Discords.ca";
    } else {
      this.pName = this.module;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u{1F965} discords.ca",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://discords.ca/api/image/displays"
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        }
      ],
      meta: [
        {
          name: "twitter:title",
          content: "discords.ca, a place where web meets humans!"
        },
        {
          name: "twitter:description",
          content: "This website ain't useful at all"
        },
        {
          //change the color
          name: "theme-color",
          content: "#6b6a8f"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" data-v-43dfb8ca><p class="sidebar" data-v-43dfb8ca><i class="fas fa-bars" data-v-43dfb8ca></i></p>`);
      _push(ssrRenderComponent(sidebar, { ref: "sideMenu" }, null, _parent));
      _push(`<div class="Top" data-v-43dfb8ca><h1 data-v-43dfb8ca>${ssrInterpolate(_ctx.pName)}</h1><p data-v-43dfb8ca><i data-v-43dfb8ca>youri&#39;s messing up space</i></p></div>`);
      if (_ctx.module == "home") {
        _push(`<div data-v-43dfb8ca><div class="center" data-v-43dfb8ca><h2 data-v-43dfb8ca>Social</h2><div class="social-wrapper" data-v-43dfb8ca><div class="social" data-v-43dfb8ca><i class="fab fa-instagram" data-v-43dfb8ca></i><p data-v-43dfb8ca> masterdpro </p></div><div class="social" data-v-43dfb8ca><i class="fab fa-discord" data-v-43dfb8ca></i><p data-v-43dfb8ca> masterdpro </p></div><div class="social" data-v-43dfb8ca><i class="fab fa-github" data-v-43dfb8ca></i><p data-v-43dfb8ca>masterdpro</p></div></div><h2 data-v-43dfb8ca>Projects</h2><div class="project-wrapper" data-v-43dfb8ca><!--[-->`);
        ssrRenderList(_ctx.projects, (feature, index2) => {
          _push(`<div class="project" style="${ssrRenderStyle({ backgroundColor: feature.color })}" data-v-43dfb8ca><a class="project" id="lui"${ssrRenderAttr("href", feature.link)} data-v-43dfb8ca><img${ssrRenderAttr("src", feature.logo)} alt="logo" data-v-43dfb8ca><div style="${ssrRenderStyle({ "flex-direction": "column" })}" data-v-43dfb8ca><h3 data-v-43dfb8ca><a${ssrRenderAttr("href", feature.link)} data-v-43dfb8ca>${ssrInterpolate(feature.name)}</a></h3><p data-v-43dfb8ca>${ssrInterpolate(feature.description)}</p></div></a></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div data-v-43dfb8ca>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.module), null, null), _parent);
        _push(`</div>`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43dfb8ca"]]);

export { index as default };
//# sourceMappingURL=index-BJ0UhPUC.mjs.map

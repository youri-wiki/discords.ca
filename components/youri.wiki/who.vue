<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
    </header>
  
    <body>
      <div class="top-content">
        <img src="../../assets/img/youyoulepan.svg" alt="youyoulepan" class="youyoulepan" />
        <div class="names">
          <h1 class="Masterdpro">masterdpro</h1>
          <div class="badges">
            <img src="../../assets/img/vue.png" />
            <img src="../../assets//img/js.png" />
            <img src="../../assets//img/py.png" />
            <img src="../../assets//img/cpp.png" />
            <img src="../../assets//img/ts.png" />
            <img src="../../assets//img/react.png" />
          </div>
          <div class="bio">
            <p>
              Hi ! I'm Youri, a young canadian fullstack developper (No, I can't hack anyone. I don't
              even remember my own passwords..). I started learning Javascript in 2021 at the age of
              12. If you want to support me you can make a donnation and leave me a message on my
              ko-fi page &lt;3.
            </p>
          </div>
        </div>
      </div>
  
      <div class="terminal">
        <h1>C:\user\youri\workspace: <span class="flash">_</span></h1>
        <h1>
          C:\user\youri\workspace\discord:
          <span @click="HandleRedirectDiscord" class="flash-disc">
            discord.gg/nbFMXcC3tf
            <i class="fab fa-discord discord-icon"></i>
          </span>
        </h1>
        <h1>C:\user\youri\workspace\get-money\job: <span>undefined</span></h1>
        <h1>
          C:\user\youri\workspace\get-money\support-me:
          <span @click="HandleRedirectkofi" class="kofi">
            Ko-fi <i class="fas fa-hand-holding-usd"></i>
          </span>
        </h1>
      </div>
    </body>
    <div class="wtf">
      <h1 class="wtf">
        Do you find yourself funny or ? no I won't make my website fit in {{ width }}px..
      </h1>
      <img src="../assets/img/troll_1f9cc.png" />
      <h1 class="wtf"><strong>BUT</strong>I could fit a toilet paper roll</h1>
      <img src="../../assets/img/pq.png" :style="{ width: width + 'px' }" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [],
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    methods: {
      HandleRedirectDiscord() {
        window.location.href = 'https://discord.gg/nbFMXcC3tf'
      },
      HandleRedirectkofi() {
        window.location.href = 'https://ko-fi.com/masterdpro'
      },
      updateDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
      }
    },
    mounted() {
      window.addEventListener('resize', this.updateDimensions)
    }
  }
  </script>
  
  <style scoped lang="css">
  body {
    font-family: sans-serif;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .wtf {
    display: none;
  }
  
  .top-content {
    display: flex;
    justify-content: center;
    align-items: start;
    max-height: 15rem;
    position: relative;
    bottom: 7rem;
    padding: 10px;
  }
  
  .names {
    display: flex;
    justify-content: center;
    align-items: start;
    position: relative;
    margin-bottom: 10%;
    flex-direction: column;
  }
  
  .bio {
    max-width: 800px;
    min-width: 200px;
  }
  
  .badges {
    position: relative;
    bottom: 50px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: auto;
  }
  
  .badges img {
    width: 30px;
    height: auto;
    margin-right: 10px;
  }
  
  .names p {
    color: black;
  }
  
  .youyoulepan {
    width: 200px;
    height: auto;
  }
  
  .top-content i {
    font-size: 3rem;
    margin-left: 10px;
    color: #ffffff;
  }
  
  .Youri {
    font-size: 3rem;
    margin-left: 10px;
    color: #ff6eff;
    text-shadow:
      1px 1px 0 #ff00ff,
      /* Pink shadow */ 2px 2px 0 #cc00ff,
      /* Purple shadow */ 3px 3px 0 #9900ff,
      /* Deeper purple shadow */ 4px 4px 0 #6600ff,
      /* Even deeper purple shadow */ 5px 5px 0 #3300ff;
    /* Deepest purple shadow */
  }
  
  .Masterdpro {
    background: linear-gradient(45deg, #ff00ff, #cc00ff, #9900ff, #6600ff, #3300ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;
    margin-left: 10px;
  }
  
  p {
    font-size: 1.5rem;
    margin-left: 10px;
    color: #ff6eff;
  }
  
  .terminal {
    background-color: black;
    position: relative;
    margin-top: 10rem;
    min-width: 40rem;
    max-width: 80rem;
    height: 25rem;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    display: flex;
    padding: 10px;
    border: 2px solid #616161;
    border-radius: 10px;
    overflow: scroll;
  }
  
  h1 {
    font-family: sans-serif;
    color: rgb(17, 196, 17);
    padding: 10px;
    width: auto;
    height: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  iframe {
    border: none;
    width: 100%;
    padding: 4px;
    background: #000000;
    height: 712px;
  }
  
  #kofiframe {
    border: none;
    width: 100%;
    padding: 4px;
    background: #000000;
    height: 712px;
  }
  
  .post-image {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 10px;
    background-color: #7289da;
  }
  
  .Image {
    width: 100%;
    height: auto;
    max-width: 500px;
    max-height: 500px;
    border-radius: 10px;
  }
  
  .flash {
    display: inline-block;
    animation: flash 0.7s infinite alternate;
  }
  
  .flash-disc {
    display: inline-block;
    color: #7289da;
    cursor: pointer;
  }
  
  .discord {
    color: #7289da;
  }
  
  .kofi {
    color: #f16061;
    cursor: pointer;
  }
  
  @keyframes flash {
    from {
      opacity: 1;
    }
  
    to {
      opacity: 0;
    }
  }
  
  .discord-icon {
    color: #7289da;
  }
  
  .icon-outline {
    color: black;
    position: relative;
    z-index: 1;
  }
  
  .router-link {
    text-decoration: none;
    color: #7289da;
  }
  
  .router-link:hover {
    text-decoration: underline;
  }
  
  @media screen and (min-width: 982px) {
    body {
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .top-content {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 15rem;
      margin-bottom: 10rem;
      flex-direction: column;
    }
  
    .names {
      display: flex;
      justify-content: center;
      align-items: start;
      position: relative;
      margin-bottom: 0rem;
      flex-direction: column;
    }
  
    .Masterdpro {
      position: relative;
      left: 50%;
      top: 15%;
      transform: translate(-50%, -50%);
    }
    .bio {
      position: relative;
      bottom: 10%;
    }
  
    .badges {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: auto;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    .badges img {
      width: 30px;
      height: auto;
    }
  
    .youyoulepan {
      width: 300px;
      height: auto;
    }
  
    .terminal {
      background-color: black;
      position: relative;
      margin-top: 20rem;
      width: 80%;
      height: 30rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 10px;
      border: 2px solid #616161;
      border-radius: 10px;
    }
  
    h1 {
      font-size: 2rem;
    }
  }
  
  @media screen and (max-width: 657px) {
    body {
      display: none;
    }
  
    .wtf {
      display: flex;
      font-size: 2rem;
      color: rgb(0, 0, 0);
      position: relative;
      max-width: 90%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-align: center;
      justify-content: center;
      flex-direction: column;
    }
  
    .wtf img {
      width: 100px;
      height: auto;
      display: block;
      margin: auto;
    }
  }
  </style>
  
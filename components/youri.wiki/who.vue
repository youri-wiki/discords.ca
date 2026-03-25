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
        <div class="names">
        <img src="../../assets/img/youyoulepan.svg" alt="youyoulepan" class="youyoulepan" />
        <div class="row">
        <h1 class="Masterdpro">masterdpro</h1>
          <div class="badges">
            <img src="../../assets/img/Vue.png" />
            <img src="../../assets//img/js.png" />
            <img src="../../assets//img/py.png" />
            <img src="../../assets//img/cpp.png" />
            <img src="../../assets//img/ts.png" />
            <img src="../../assets//img/react.png" />
          </div>
          </div>
        </div>
          <div class="bio">
            <p>
              Hi ! I'm Youri, a young canadian fullstack developper (No, I can't hack anyone. I don't
              even remember my own passwords..). I started learning Javascript in 2021 at the age of
              12. If you want to support me you can make a donnation and leave me a message on my
              ko-fi page &lt;3.
            </p>
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
      </div>
  
    
    </body>
   
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
        window.location.href = ''
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
 
  
  .top-content {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    position: relative;
    bottom: 7rem;
    padding: 10px;
  }
  
  .names {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: row;
  }

  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  
  .bio {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
  }
  
  .badges {
    position: relative;
    display: flex;
    align-items: center;
    height: 80px;
    width: auto;
  }
  
  .badges img {
    width: 30px;
    height: auto;
    align-self: flex-start;
    justify-self: start;
    margin-right: 10px;
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
  
  .Masterdpro {
    background: linear-gradient(45deg, #ff00ff, #cc00ff, #9900ff, #6600ff, #3300ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;
    margin-bottom: 0;
  }
  
  p {
    font-size: 1.5rem;
    margin-left: 10px;
    color: #000000;
  }
  
  .terminal {
    background-color: black;
    display: flex;
    position: relative;
    margin-top: 10rem;
    min-width: 40rem;
    max-width: 80rem;
    height: 25rem;
    flex-direction: column;
    justify-content: center;
    align-items: start;
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
  
  @media screen and (max-width: 982px) {
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
      max-height: none;
      flex-direction: column;
    }
  
    .names {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 0rem;
      flex-direction: column;
    }
  
    .Masterdpro {
      position: relative;
      left: 50%;
      top: 15%;
      margin-bottom: 0%;
      transform: translate(-50%, -50%);
    }
    .bio {
      display: flex;
      position: relative;
      font-size: 200px;
      width: 80%;
      justify-self: center;
      align-self: center;
    }
    
    .bio p {
      font-size: 20px;
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
      align-self: start;
      justify-self: center;
    }
  
    .youyoulepan {
      width: 300px;
      height: auto;
    }
  
    .terminal {
      background-color: rgb(0, 0, 0);
      position: relative;
      margin-top: 5rem;
      width: 90%;
      min-width: auto;
      max-width: 80rem;
      height: auto;
      max-height: auto;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      display: flex;
      padding: unset;
      border: 2px solid #616161;
      border-radius: 10px;
      overflow: scroll;
    }
  
    h1 {
      margin-left: 20px;
      font-size: 2rem;
    }
  }
  
  </style>
  
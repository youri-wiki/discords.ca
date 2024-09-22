<template>
    <div class="container">
      <div class="credit">
        <p>Liquidation Marie © 2024</p>
        <p @click="redirect">Fais par <i style="color: #5cabb4; cursor: pointer; ">youri</i></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirect() {
        window.location.href = "https://youri.wiki/";
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    background-color: rgb(221, 221, 221);
    height: 100px;
    position: static;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .credit {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* Keep flex-direction column to stack the paragraphs */
    padding: 10px; /* Added padding for spacing within the credit div */
    margin: auto; /* Center the credit div horizontally and vertically */
    text-align: flex-start; /* Center the text within the credit div */
  }
  
  .credit p {
    font-size: 15px;
    margin: 0;
    padding: 0;
    text-align: start;
  }
  </style>
  
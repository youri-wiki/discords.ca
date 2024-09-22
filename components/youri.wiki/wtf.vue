<template>
  <div class="wtf-container">
    <h1>WTF</h1>
    <form @submit.prevent="sendNote(username, content)">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="text" v-model="content" placeholder="Content" />
      <button type="submit">Submit</button>
    </form>
    <div class="note-container">
      <div class="note" v-for="(note, index) in notes" :key="index">
        <h3>{{ note.author }}:</h3>
        <p>{{ note.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [],
    };
  },
  methods: {
    fetchNote() {
      fetch("https://discords.ca/ts/note/get")
        .then((response) => response.json())
        .then((data) => {

          console.log(data);
          const notesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const reversedNotesArray = notesArray.reverse();

          this.notes = reversedNotesArray;
        });
    },
    sendNote(username, content) {
      if(!username || !content) return alert("Please fill out all fields");
      const formdata = new FormData();
      formdata.append("author", username);
      formdata.append("content", content);
      fetch("https://discords.ca/ts/note/add", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }).then(() => {
        this.fetchNote();
      });
    },
  },
  mounted() {
    //fetch notes every 3 seconds
    this.fetchNote();
    setInterval(() => {
      this.fetchNote();
      clearInterval();
    }, 3000);
  },
};
</script>

<style scoped>
.wtf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.5s ease;
  margin: 0 auto;
}

input {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #000;
  transition: all 0.5s ease;
  background-color: #000;
  color: #fff;
  font-size: 16px; /* Ensure font size is 16px or larger */
}

input:focus {
  border-radius: 0%;
  outline: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  color: #000000;
}

button {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #000;
  transition: all 0.5s ease;
  background-color: #000;
  color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

button:active {
  transform: translateY(5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.note-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.5s ease;
}

.note {
  margin: 10px;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  width: 50%;
}
</style>

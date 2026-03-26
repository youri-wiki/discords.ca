<template>
  <div class="portfolio">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to My Developer Portfolio</h1>
      <p>Building innovative web solutions and turning ideas into reality.</p>
      <button @click="scrollToSection('contact')" class="cta-button">
        Get In Touch
      </button>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <h2>About Me</h2>
      <p>
        I'm a passionate full-stack developer with expertise in modern web
        technologies. I specialize in creating scalable, user-friendly
        applications that drive business growth. With years of experience in
        Vue.js, Nuxt, and backend development, I help clients bring their
        visions to life.
      </p>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
      <h2>Skills</h2>
      <div class="skills-grid">
        <div class="skill">
          <i class="fab fa-vuejs"></i>
          <h3>Vue.js / Nuxt</h3>
          <p>Building reactive and performant frontends.</p>
        </div>
        <div class="skill">
          <i class="fab fa-node-js"></i>
          <h3>Node.js</h3>
          <p>Server-side development and APIs.</p>
        </div>
        <div class="skill">
          <i class="fab fa-react"></i>
          <h3>React</h3>
          <p>Component-based UI development.</p>
        </div>
        <div class="skill">
          <i class="fab fa-python"></i>
          <h3>Python</h3>
          <p>Scripting and backend logic.</p>
        </div>
        <div class="skill">
          <i class="fas fa-database"></i>
          <h3>Databases</h3>
          <p>SQL and NoSQL solutions.</p>
        </div>
        <div class="skill">
          <i class="fab fa-git"></i>
          <h3>Version Control</h3>
          <p>Git and collaborative workflows.</p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <img
            src="https://via.placeholder.com/300x200?text=Project+1"
            alt="Project 1"
          />
          <h3>Displays Image Hosting</h3>
          <p>A web app for hosting and sharing images via API.</p>
          <a href="/displays" class="project-link">View Project</a>
        </div>
        <div class="project-card">
          <img
            src="https://via.placeholder.com/300x200?text=Project+2"
            alt="Project 2"
          />
          <h3>Counto Discord Bot</h3>
          <p>A bot for infinite counting in Discord servers.</p>
          <a href="/counto" class="project-link">View Project</a>
        </div>
        <div class="project-card">
          <img
            src="https://via.placeholder.com/300x200?text=Project+3"
            alt="Project 3"
          />
          <h3>Community Server</h3>
          <p>Managing and growing a vibrant Discord community.</p>
          <a href="https://discord.gg/rJN5cwR3pf" class="project-link"
            >Join Server</a
          >
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <h2>Services</h2>
      <div class="services-grid">
        <div class="service">
          <i class="fas fa-code"></i>
          <h3>Web Development</h3>
          <p>Custom websites and web apps tailored to your needs.</p>
        </div>
        <div class="service">
          <i class="fas fa-mobile-alt"></i>
          <h3>Mobile Apps</h3>
          <p>Responsive and native mobile applications.</p>
        </div>
        <div class="service">
          <i class="fas fa-server"></i>
          <h3>Backend Solutions</h3>
          <p>Robust APIs and server-side logic.</p>
        </div>
        <div class="service">
          <i class="fas fa-chart-line"></i>
          <h3>Consulting</h3>
          <p>Technical advice and project planning.</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <h2>Contact Me</h2>
      <p>Ready to start your project? Let's discuss your ideas!</p>
      <div class="contact-info">
        <p><i class="fab fa-discord"></i> masterdpro</p>
        <p>
          <i class="fab fa-github"></i>
          <a href="https://github.com/masterdpro">github.com/masterdpro</a>
        </p>
        <p>
          <i class="fab fa-instagram"></i>
          <a href="https://www.instagram.com/masterdpro/"
            >instagram.com/masterdpro</a
          >
        </p>
      </div>
      <form class="contact-form" @submit.prevent="sendEmail">
        <input type="text" placeholder="Your Name" required v-model="name" />
        <input type="email" placeholder="Your Email" required v-model="email" />
        <textarea
          placeholder="Your Message"
          required
          v-model="message"
        ></textarea>
        <button type="submit" class="cta-button">Send Message</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { useHead } from "@unhead/vue";

useHead({
  title: "Developer Portfolio - discords.ca",
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "https://discords.ca/api/image/displays",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Portfolio of a skilled developer offering web development, mobile apps, and consulting services.",
    },
    {
      name: "theme-color",
      content: "#6b6a8f",
    },
  ],
});

import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const sendEmail = async () => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    alert("Failed to send message. Please try again.");
  }
};
</script>

<style scoped>
.portfolio {
  font-family: "QuickSand", sans-serif;
  color: #333;
  line-height: 1.6;
}

.hero {
  background: linear-gradient(135deg, #6b6a8f, #11998e);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.cta-button {
  background: #fff;
  color: #6b6a8f;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.cta-button:hover {
  background: #f0f0f0;
}

section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #6b6a8f;
}

.about p {
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.skills-grid,
.projects-grid,
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.skill,
.service {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
  transition: transform 0.3s;
}

.skill:hover,
.service:hover {
  transform: translateY(-5px);
}

.skill i,
.service i {
  font-size: 3rem;
  color: #6b6a8f;
  margin-bottom: 10px;
}

.project-card {
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-card h3 {
  margin: 20px 0 10px;
}

.project-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #6b6a8f;
  text-decoration: none;
  font-weight: bold;
}

.project-link:hover {
  text-decoration: underline;
}

.contact {
  background: #f9f9f9;
  text-align: center;
}

.contact-info p {
  margin: 10px 0;
}

.contact-info a {
  color: #6b6a8f;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-form input,
.contact-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: inherit;
}

.contact-form textarea {
  height: 100px;
  resize: vertical;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 2rem;
  }

  .skills-grid,
  .projects-grid,
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>

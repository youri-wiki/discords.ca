<template>
  <div class="tech-page">
    <nav class="page-switch">
      <NuxtLink to="/tech" class="nav-link active">Tech Hunting Guide</NuxtLink>
      |
      <NuxtLink to="/tech/teams" class="nav-link">Teams Lore</NuxtLink>
    </nav>

    <h1><strong>The Art of Tech Hunting</strong></h1>

    <p>
      To learn how to hunt tech, you'll need three fundamental pieces of
      knowledge: how the game works, how states work, and how setups work.
    </p>

    <h2 id="1">1. Learning the Game</h2>
    <p>
      Learning how the game works isn't hard - it's just a long process. You
      need to learn how each move interacts with another. Learn why, when you do
      one thing, another happens. Most techs are discovered by stacking those
      interactions on top of each other, resulting in unintended mechanics - a
      tech.
    </p>

    <h2 id="2">2. The States</h2>
    <p>
      While learning how the game works, you'll encounter different
      <em>states</em>. States are different <em>modes</em> that your character
      can be in - some are intended, and some are discovered, like certain
      techs. Each state has its own specificities and allows you to do different
      things. Aside from a few exceptions, most states will be canceled if you
      drop by a bit or respawn.
    </p>

    <p>
      The main states you'll be using during tech hunting are
      <strong>Charge State</strong> and <strong>Flow State</strong>. These two
      are similar yet different:
    </p>

    <ul>
      <li id="charge">
        <a href="https://youtu.be/8gKfXwQc3Aw"><strong>Charge State</strong></a
        ><br>
        Charge State can be enabled by perfectly landing a 360. When you are in
        Charge State, your character will be able to jump higher than usual and
        cancel tricks, allowing you to reach spots you couldn't otherwise.
      </li>
      <li id="flow">
        <strong>Flow State</strong><br>
        Flow State is what allows you to trick. There's currently no known tech
        to <em>enter</em> Flow State directly, but you can mess with it to trick
        when you shouldn't be able to. A perfect example is a
        <em>trick slide</em>, where you trick right as you touch the ground,
        entering Flow State and tricking without being in the air.
        <em>Illusion chaining</em>, where you chain multiple Illusion Twists
        without stopping, is another example of Flow State.
      </li>
    </ul>

    <p>
      Some states are built-in, like <strong>Pipe State</strong> and
      <strong>Climb State</strong>. These aren't hard to use if used the
      intended way, but hunters often try to abuse those states to use them
      everywhere. <em>Gear 1</em> and <em>Gear 2</em> are techs that allow you
      to move with Climb State, letting you climb wherever you want. Pipe State,
      which also had a way to move around, allowed you to teleport back to the
      pipe where you activated the state.
    </p>

    <p>
      You may also encounter some nitwit states. They often act differently but
      share one thing: they limit your abilities without adding anything new.
      They will stay "Nitwit state" until people find a real purpose for them.
    </p>

    <h2 id="3">3. Hunting</h2>
    <p>
      Now that you fairly understand how the game works and know your main
      states, you need to learn about setups. Setups are combinations of states,
      tricks, and/or tech. A good example would be the famous
      <em>Nerve Jump</em> (Double Jump), where the setup is an
      <em>Illusion Cartwheel</em>. Some other techs also use Illusion Cartwheel
      as a setup since it opens the door to many interactions. Some techs
      require Charge State as a setup - like the <em>Super Jump</em>.
    </p>

    <p>
      Combining setups, states, weird spots, and tricks is likely to result in a
      new tech - all you need to do is know how to combine them properly.
      Sometimes the most game-breaking techs come from the dumbest random
      interactions that are so easy people overlook them. Some techs might seem
      useless at first glance - don't ignore them. Sometimes, those "useless"
      techs become setups for other techs, or they simply help you better
      understand how the game behaves.
    </p>

    <p>In brief: try everything, everywhere.</p>

    <h3 id="3-1">3.1 Practicing</h3>
    <p>
      A good way to become better at hunting or tech in general is to reproduce
      techs you see in clips. Reproducing them without knowing how they work -
      or with just a few hints - will force you to apply the hunting process and
      will teach you more about tech and its timing.
      <em>That's how masterdpro (me) learned.</em>
    </p>

    <p>
      FPS is also an important factor - most tech timings are frame-based.
      Capping your FPS will help you perform techs more consistently. The more
      FPS you have, the less time you have to hit your trick.
    </p>

    <h3 id="3-2">3.2 Discovery</h3>
    <p>
      Oh, you think you discovered a tech? That's great! You should first check
      if you really discovered it or just <em>found</em> it, by sharing it in
      the tech channel - people will tell you if it's new or not. If it is,
      well, congratulations - you're an official tech hunter!
    </p>

    <hr>

    <p class="footer">
      With all that knowledge, you're ready to hunt.<br>
      <strong>Good luck!</strong>
    </p>

    <div id="references" class="references">
      <h2>References</h2>
      <ul>
        <li>
          <a href="https://youtu.be/1VXxooI2Ugg"
            ><strong>Illusion Cartwheel</strong></a
          >
          - One of the oldest and most useful techs. You start an Illusion Twist
          and cancel it immediately with a Cartwheel.
        </li>
        <li>
          <a href="https://youtu.be/jH6xif6We_Q"
            ><strong>Double Jump / Nerve Jump</strong></a
          >
          - Originally found by Nerve. This tech consists of performing an
          Illusion Cartwheel, landing precisely, then doing any gymnastic move
          and canceling it by jumping.
        </li>
        <li>
          <strong>Superjump</strong> - Enter Charge State, fully charge your
          jump by holding the jump input, and right as you jump, perform a 360.
        </li>
      </ul>
    </div>

    <hr>
    <p class="produced">Produced by Impact - Orbit - Techina</p>
  </div>
</template>

<script setup>
useHead({
  title: "The Art of Tech Hunting",
  meta: [
    { property: "og:title", content: "The Art of Tech Hunting" },
    {
      property: "og:description",
      content: "How to tech hunt in Rooftops & Alleys 101.",
    },
    { property: "og:url", content: "https://discords.ca/tech/" },
    { property: "og:image", content: "https://i.imgur.com/wpZs6Mg.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "theme-color", content: "#6281FF" },
  ],
});
</script>

<style src="~/assets/css/tech.css"></style>


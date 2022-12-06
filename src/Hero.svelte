<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    // This will be called when the component is mounted,
    // which will display space particles in the background
    // of the hero section.
    particlesJS("space_particles", { "particles": { "number": { "value": 175, "density": { "enable": true, "value_area": 1600 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "polygon": { "nb_sides": 5 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 1000, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
    var update = function () {
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
</script>

<section class="hero is-dark is-fullheight is-bold">
  <div id="space_particles">
    <div class="hero-body" style="position: absolute;  width: 100%; height: 100%;">
      <div class="container is-fluid">
        <h1 class="title">
          Kent Gruber
        </h1>
        <h2 class="subtitle">
          Security Engineer
        </h2>
        <a href="https://github.com/picatz" class="button is-primary is-inverted is-outlined">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
        </a>
        <a href="https://twitter.com/KentGruber" class="button is-primary is-inverted is-outlined">
          <span class="icon">
            <i class="fab fa-twitter"></i>
          </span>
        </a>
        <a href="https://medium.com/@KentGruber" class="button is-primary is-inverted is-outlined">
          <span class="icon">
            <i class="fab fa-medium"></i>
          </span>
        </a>
        <a href="/rss.xml" class="button is-primary is-inverted is-outlined">
          <span class="icon">
            <i class="fas fa-rss"></i>
          </span>
        </a>
        <p style="padding-top: 1.5rem">Check out my <a class="has-text-primary"
            href="https://github.com/picatz/picatz.github.io/blob/master/Resume.pdf"><i class="fas fa-file-alt"></i>
            <strong>résumé</strong></a>!</p>
      </div>
    </div>
  </div>
</section>
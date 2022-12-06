<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    particlesJS("space_particles", { "particles": { "number": { "value": 175, "density": { "enable": true, "value_area": 1600 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "polygon": { "nb_sides": 5 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1.5, "opacity_min": 0, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 1000, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true });
    var update = function () {
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
</script>

<div class="hero is-dark is-fullheight is-bold">
  <div id="space_particles" >
    <div class="hero-body" style="position: absolute;  width: 100%; height: 100%;">
        <div class="container">
            <h1 class="title">
                Not Found
            </h1>
            <h2 class="subtitle">
                The page you are looking for does not exist.
            </h2>
            <button class="is-large">
                <p class="is-clickable">
                    <span class="icon">
                        <i class="fas fa-home"></i>
                    </span>
                    <a href="/">Go back home</a>
                </p>
            </button>
        </div>
    </div>
  </div>
</div>
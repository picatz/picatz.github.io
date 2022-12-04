<script>
  import OpenSourceProject from './OpenSourceProject.svelte';

  let projects = [
    {
      name: 'Shodanz',
      link: 'https://github.com/picatz/shodanz',
      description: 'A command line tool and Ruby gem for searching Shodan.',
      install: 'gem install shodanz'
    },
    {
      name: 'iface',
      link: 'https://github.com/picatz/iface',
      description: 'A command line tool for managing network interfaces.',
      install: 'go install github.com/picatz/iface@latest'
    },
    {
      name: 'ocr',
      link: 'https://github.com/picatz/ocr',
      description: 'Ocular character recognition command-line utility using <a href="https://github.com/tesseract-ocr/tesseract">tesseract</a>',
      install: 'go install github.com/picatz/ocr@latest'
    }
  ];
</script>

<section class="section">
    <div class="container is-fluid">
      <div class="content">
        <h1>Open Source Projects</h1>
        <p>You can find them all on <strong><a href="https://github.com/picatz">GitHub</a></strong>!</p>
      </div>
      {#each projects as project}
        <OpenSourceProject
          name={project.name}
          link={project.link}
          description={project.description}
          install={project.install}
        />
        <br>
      {/each}
    </div>
</section>
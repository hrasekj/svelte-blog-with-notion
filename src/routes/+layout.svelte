<script>
  import '../app.css';
  // something wrong with eslint, when i use Footer instead of FooterComponent,
  // the component as tag is lowercased.
  import FooterComponent from '../components/footer/Footer.svelte';
</script>

<main class="flex flex-col h-screen justify-between">
  <slot />
  <FooterComponent />
</main>

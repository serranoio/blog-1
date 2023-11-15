<script>
  import { onMount } from "svelte";
  import Footer from "../components/landing/Footer.svelte";
  import Hero from "../components/landing/Hero.svelte";
  import Nav from "../components/nav/Nav.svelte";

  export let data;
  console.log(data)


</script>

<Nav position="horizontal"/>
<Hero records={data.hero}/>
<Footer records={data.contact} name="David Serrano"/>

<style>
</style>
<script>
  import { onMount } from "svelte";
  import Footer from "../components/landing/Footer.svelte";


import Hero from "../components/landing/Hero.svelte";
  import Nav from "../components/nav/Nav.svelte";
  import { CreateAccount, pb } from "../model/pocketbase";
  onMount(() => {

    CreateAccount()
  })



</script>

<Nav position="horizontal"/>
<Hero/>
<Footer name="David Serrano"/>

<style>
</style>
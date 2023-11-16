<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "../components/landing/Footer.svelte";
  import Hero from "../components/landing/Hero.svelte";
  import Nav from "../components/nav/Nav.svelte";
  import { CreateAccount, pb } from "../model/pocketbase";
  import { ContactColection, HeroCollection } from "../model/model";

  
  let hero: any;
  let contact: any;

  onMount(async () => {

    CreateAccount()
    
    
    
    hero = await pb.collection(HeroCollection).getFullList();
    contact = await pb.collection(ContactColection).getFullList();

    // fetchAll()
  })
  


</script>

<Nav position="horizontal"/>
<Hero records={hero}/>
<Footer records={contact} name="David Serrano"/>

<style>
</style>
<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "../components/landing/Footer.svelte";
  import Hero from "../components/landing/Hero.svelte";
  import Nav from "../components/nav/Nav.svelte";
  import { CreateAccount, pb } from "../model/pocketbase";
  import { ContactColection, HeroCollection, MetadataCollection } from "../model/model";
  import { makeColorChange } from "../model/util";

  
  let hero: any;
  let contact: any;
  let metadata: any;

  onMount(async () => {
    
    hero = await pb.collection(HeroCollection).getFullList();
    contact = await pb.collection(ContactColection).getFullList();
    const records = await pb.collection(MetadataCollection).getFullList();
    metadata = records[0];
    makeColorChange(metadata?.accents)
  

    console.log(contact)
    console.log(hero)
    // fetchAll()
  })
  


</script>

<Nav position="horizontal"/>
<Hero records={hero}/>
<Footer records={contact}/>

<style>
</style>
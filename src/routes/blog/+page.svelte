

<script>


import Footer from "../../components/landing/Footer.svelte";
import MainPage from "../../components/blog/MainPage.svelte";
  import Nav from "../../components/nav/Nav.svelte";
  import { onMount } from "svelte";
  import { pb } from "../../model/pocketbase";
  import { MetadataCollection } from "../../model/model";
  import { makeColorChange } from "../../model/util";


  let metadata;
  onMount(async () => {

    const records = await pb.collection(MetadataCollection).getFullList();
    metadata = records[0];
    makeColorChange(metadata?.accents)
  })

</script>



<Nav position="horizontal"/>
<MainPage></MainPage>
<Footer/>
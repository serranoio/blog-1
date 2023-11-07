<script lang="ts">
  import { onMount } from "svelte";
import "../modules/Text.svelte"
import {pb} from "../../model/pocketbase"
  import { HeroCollection } from "../../model/model";

let title = `
Sup folks.
`;

let description = `
Lorem ipsum dolor
sit amet consectetur 
adipisicing elit. Aut 
pariatur modi aperiam
quibusdam ad ut cumque 
aliquid nulla nesciunt.
Iusto impedit quidem 
aperiam nam neque distinctio optio nisi debitis hic!
`;
let subtitle = "Nice to meet yall";

let records: any;

onMount(async () => {
    try {
    // you can also fetch all records at once via getFullList
    records = await pb.collection(HeroCollection).getFullList();

    description = records[0].description
    title = records[0].title
    subtitle = records[0].subtitle

    } catch(e) {
        console.log(e)
    } finally {

    }

})
</script>

<section class="hero-section">

<div class="container">

    
    <div class="title-box">
        <input-box 
        class="title"
        records={records}
        column="title"
        collection={HeroCollection}
        size="6" 
        mB="2.4" 
        inputValue={title}>
    </input-box>
    <input-box 
    class="subtitle" 
    records={records}
    column="subtitle"
    collection={HeroCollection}
    size="3" 
    mB="1.2" 
    inputValue={subtitle}>
</input-box>
<input-box 
class="description" 
records={records}
column="description"
collection={HeroCollection}
size="2.4" 
inputValue={description}>
    </input-box>
    </div>    
    <div class="hero-box">
        <img src="./sup.jpg" alt="you"/>
    </div>
    
    <div class="accent"></div>
    <div class="accent-2"></div>
</div>
</section>





<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .accent {
        height: 450%;
        width: 500px;
        background-color: var(--primary);
        position: absolute;
        right: -5%;
        z-index: -1;
        transform: rotate(45deg);
    }
    .accent-2 {
        height: 470%;
        width: 250px;
        background-color: var(--secondary);
        position: absolute;
        right: 0%;
        z-index: -1;
        transform: rotate(45deg);
    }
    
    .container {
        position: relative;
        display: grid;
        min-height: calc(100vh - 80px);
        grid-template-columns: 1fr 1fr;
        gap: 2.4rem;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        max-width: 130rem;
    }


    .title {
        font-size: 9rem;
        color: var(--primary);
        margin-bottom: 2.4rem;
    }

    .subtitle {
        font-size: 3rem;
        margin-bottom: 1.2rem;
        color: var(--gray45);
    }
    .description {
        font-size: 2.4rem;
        line-height: 1.5;
        color: var(--gray20);
    }

    .hero-box {
        width: 100%;
    }
    .hero-box img {
        width: 100%;
        border-radius: var(--br);
    }

    .hero-section {
       overflow-y: hidden; 
       overflow-x: hidden;
    }

</style>
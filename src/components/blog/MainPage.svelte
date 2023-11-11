<script>


const posts = ["1", "2", "3", "4", "5", "6"];
import {pb} from "../../model/pocketbase"

import "../modules/Drawer.svelte"

let creatingPost = false;


import "../modules/Button.svelte"

const openCreatePost = () => {

    console.log("hello!")
}


</script>



<drawer-component>

    <h3>Let Freedom Ring</h3>
    <p>oij</p>

</drawer-component>
<section class="main-page">
    <div class="container">

        <div class="title-section">
            <h2>Welcome to the blog!</h2>
            <p style="margin-bottom: 1.2rem;">metadata</p>
            {#if pb.authStore.isValid}
               <button-component on:click={openCreatePost}>Create Post</button-component>
            {/if}
        </div>
        <navigation class="grid">
            {#each posts as post}

                <figure class="article">
                    <div class="article-image-box">

                    </div>
                    <div class="article-text-box">
                        <p>post</p>
                    </div>
                </figure>
                
            {/each}
            

        </navigation>
        
        
        
    </div>
</section>




<style>

    
    .title-section {
        margin-bottom: 4.2rem;
    }
    .article-image-box {
        background-color: green;
        height: 75%;
        box-shadow: 0 0 0 2px var(--gray20);
        border-radius: var(--br);
}

.container {
    max-width: 130rem;
    margin: 0 auto;
}

h2 {
    font-size: 6.4rem;
}

    .main-page {
        padding: 9.8rem 0;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: 2.4rem;
    }

    .article {
        height: 30rem;
    }

    .article-text-box {
        padding: 0 2.4rem;
    }
</style>

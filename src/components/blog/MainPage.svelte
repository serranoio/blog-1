<script lang="ts">
const posts = ["1", "2", "3", "4", "5", "6"];
import {pb} from "../../model/pocketbase"
import "../modules/Drawer.svelte"
import "../modules/Button.svelte"
import DrawerForm from "./DrawerForm.svelte";

let isOpened = false;

function switchOpen() {
    isOpened = !isOpened;
    console.log(isOpened)
}

</script>


<DrawerForm isOpened={isOpened}></DrawerForm>

<section class="main-page">

    <div class="container">
        <div class="title-section">
            <h2>Welcome to the blog!</h2>
            <p style="margin-bottom: 1.2rem;">metadata</p>
            {#if pb.authStore.isValid}
               <button-component on:click={switchOpen}>Create Post</button-component>
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



* {
    box-sizing: border-box;

}

#editorjs-container {
    /* overflow-y: scroll; */
    height: 100%;
    overflow-y: hidden;
    /* flex-shrink: 0; */
}

.create-post-title {
    font-size: 3.2rem;
    margin-bottom: 1.2rem;
}
    

.create-post-desc {
    font-size: 2rem;
}

#editorjs {
    /* height: 100%;  */
    height:  46.5rem;
    border: 1px solid var(--gray80);
    overflow: auto;
    overflow-x: hidden;
    width: calc(50vw - 8rem);
}

form {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 11fr  1fr;
}

.label-box {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    gap: .6rem;
    margin-bottom: 2rem;
    height: auto;
    /* overflow-y: scroll; */
}
    
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

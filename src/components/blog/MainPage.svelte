<script lang="ts">
let posts: any = [];
import {pb} from "../../model/pocketbase"
import "../modules/Drawer.svelte"
import "../modules/Button.svelte"
import DrawerForm from "./DrawerForm.svelte";
  import { onMount } from "svelte";
  import { Routes } from "../../model/api";

let isOpened = false;

function switchOpen() {
    isOpened = !isOpened;
    console.log(isOpened)
}

onMount(async () => {
    try {
        // you can also fetch all records at once via getFullList
        posts = await pb.collection('blog').getFullList({
            sort: '-created',
        });
        console.log(posts)
        // console.log(records)
    } catch (err) {
        console.log(err)
    }
})

let gtc = "grid-template-columns: "
$: gridColumns = posts.length >= 6 ? `${gtc} repeat(6, 1fr)` : `${gtc} repeat(${posts.length}, 1fr)`;

</script>

<DrawerForm isOpened={isOpened}></DrawerForm>

<section class="main-page">
    <div class="container">
        <div class="title-section">
            <h2>Welcome to my blog!</h2>
            {#if pb.authStore.isValid}
               <button-component on:click={switchOpen}>Create Post</button-component>
            {/if}
        </div>
        {#if posts.length === 0}
            {#if pb.authStore.isValid}
            <p>Create&nbsp;your&nbsp;first&nbsp;post!</p>
            {:else}
            <p>No posts have been made yet!</p>
            {/if}
        {/if}
        <navigation class="grid" style={gridColumns}>

            {#each posts as post}
                <figure class="article">
                    <a href={`/blog/${post.title}`}>
                        <div class="article-image-box">
                            <img src={Routes + `api/files/blog/${post.id}/${post.titleImg}`}/>
                        </div>
                        <div class="article-text-box">
                            <p>{post.title}</p>
                        </div>
                    </a>
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

.article {
    cursor: pointer;
    transition: all .2s;
}

.article:hover {
    box-shadow: 0 2px 2px 2px rgba(0,0,0,.5);
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

h2 {
    color: var(--gray22);
    margin-bottom: 2.4rem;
}

p {
    text-align: center;
    color: var(--gray25);
    
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
    margin-bottom: 9.8rem;
}

.article-image-box {
    height: 75%;
    box-shadow: 0 0 0 2px var(--gray20);
    border-radius: var(--br);
    display: flex;
    justify-content: center;
}

img {
    height: 100%;
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
        min-height: calc(100vh - 80px);
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

@media (max-width: 47em) {

    h2 {
        text-align: center;
    }

    .title-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .grid {
        grid-template-columns: 1fr !important;
    }
}
</style>

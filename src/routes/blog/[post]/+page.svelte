
<script>
    import { Routes } from "../../../model/api"
    export let data;
</script>


<div class="container">
    <div class="center">
        <a class="back" href="/blog">&larr;</a>
        <img src={Routes + `api/files/blog/${data.id}/${data.titleImg}`}/>
    </div>
    <h1>{data.title}</h1>
    <p class="subtitle">{data.subtitle}</p>

    <div class="space-between">
        <p>{data.author}</p>
        <p>{data.date}</p>
    </div>
    <figure>

        {#each data.md.blocks as block}

        {#if block.type === "paragraph"}
            <p>{block.data.text}</p>
        {:else if block.type === "image"}
        <div class="restrict">
            <img src={block.data.file.url}/>
            <figcaption>{block.data.caption}</figcaption>
        </div>
        {:else if block.type === "header"}
            <h3>{block.data.text}</h3>
        {/if}

        {/each}

    </figure>
</div>

<style>


.back {
    font-size: 4rem;
    text-decoration: none;
    position: absolute;
    left: 5%;
    top: 5%;
    color: var(--gray60);
}

.restrict img {
    width: 100%;
}
.restrict {
    width: 100%;
}

    .container {
        max-width: 130rem;
        margin: 0 auto;  
    }
    
    .center {
        max-width: 130rem;
        margin: 0 auto;  
        justify-content: center;
        display: flex;
        max-height: 50rem;
    }

    .center img {
        box-shadow: 0 0 2px 1px rgba(0,0,0,.5);
        width: 100%;
        object-fit: cover;
        object-position: center;

        /* max-height: 20vh; */
    }

    h3 {
        font-size: 4.2rem;
        margin-bottom: 2rem;
    }

    .subtitle {
        text-align: center;
        margin-bottom: 2.4rem;
        color: var(--gray60);
    }
    .space-between {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3.2rem;
        color: var(--gray45);
    }

    h1 {
        font-size: 6rem;
        text-align: center;
        margin-bottom: 1.2rem;
        color: var(--gray20);
    }



    figure p {
        margin-bottom: 2rem;
        color: var(--gray30);
    }

    figcaption {
        font-size: 2rem;
        margin-bottom: 6rem;
    }


</style>
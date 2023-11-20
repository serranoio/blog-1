<script>
import { pb } from "../../model/pocketbase";
import {SiteName, TABS} from  "../../model/util"
import DarkMode from "../modules/DarkMode/DarkMode.svelte";

export let position = "";

export let auth = false;

const logout = () => {
    pb.authStore.clear();
    location.reload();
}

</script>

<nav class={`nav ${position}`}>
    <a href="/"><h3 class="title">{SiteName}</h3></a>
    <ul class="nav-list">
        {#if position === "horizontal"}
        <DarkMode></DarkMode>
        {/if}

        {#if !Boolean(auth)}
            {#each TABS as tabList}
            {@const tab = tabList.toLowerCase()}
            <li><a href={`${tab}`}>{tabList}</a></li>
            {/each}
        {/if}

        {#if pb.authStore.isValid && position === "horizontal"}
        <li><a class="logout" href="/admin">Admin</a></li>      
        <li><button class="logout" on:click={logout}>Logout</button></li>      
        {/if}
    </ul>
</nav>

<style>   
   .nav {
    height: 80px;
    padding: 0 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 3.2rem;
    color: var(--gray20);
    background-color: var(--gray80);
}

.nav.vertical {
    
    background-color: transparent;
   }

   .vertical .nav-list {
    flex-direction: column;
   }
   .vertical .title {
    transform: translateY(-6rem);
   }

   a,button {
    font-family: serif;
   }
   .nav-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    list-style: none;
   }
   .nav-list button {
    border: none;
   }

   a,
   .nav-list a, .nav-list button {
    font-size: 3.2rem;
    /* border: none; */
    background-color: transparent;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: var(--gray20);
   }

   .nav-list button::after, .nav-list a::after {
       content: "";
    height: 2px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--secondary);
    left: 0%;
    transform: scaleX(0%);
    transform-origin: left;
    transition: all .2s;
}
.nav-list a:hover::after, .nav-list button:hover::after  {
    transform: scaleX(100%);
}

@media (max-width: 47em) {
    a, button {
        font-size: 2.4rem !important;
    }
}



    
 

</style>
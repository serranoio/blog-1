<script>

  import { pb } from "../../model/pocketbase";
import {TABS} from  "../../model/util"

export let position = "";


const logout = () => {

    pb.authStore.clear();
    location.reload();
}



console.log(pb.authStore.isValid)
</script>

<nav class={`nav ${position}`}>
    <h3 class="title">Soflare</h3>
    <ul class="nav-list">
        {#each TABS as tab}
             <li><a href={`${tab}`}>{tab}</a></li>
        {/each}

        {#if pb.authStore.isValid}
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

   .vertical .nav-list {
    flex-direction: column;
   }
   .vertical .title {
    transform: translateY(-6rem);
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




    
 

</style>
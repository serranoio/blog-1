<svelte:options tag='drawer-component' />


<script lang="ts">
 

 export let isOpened = true;



</script>



<aside class="drawer">

    <slot></slot>

</aside>

<style>


.drawer {
    height: 100vh;
    width: 30vw;
    background-color: var(--gray92);
    background-color: var(--gray92);
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
    padding: 6.4rem;
}

  
</style>

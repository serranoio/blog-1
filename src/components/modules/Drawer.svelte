<svelte:options tag='drawer-component' />


<script lang="ts">
 export let isOpened;



 $: cssStyles = isOpened ? "transform: translate(0)" :  "transform: translate(100%)"

//  if (isOpened == false)


</script>


    <aside class="drawer" style={cssStyles}>
        <div class="inside">
            <slot></slot>
        </div>
    </aside>

<style>

* {
    box-sizing: border-box;
}


.drawer {
    height: 100vh;
    position: fixed;
    width: 50vw;
    right: 0;
    top: 0;
    z-index: 99999;
    background-color: var(--gray80);
    padding: 3.2rem;
    transition: all .5s;
}

.inside {
    padding: 0.8rem;
    background-color: var(--gray92);
    height: 100%;
}

  
</style>

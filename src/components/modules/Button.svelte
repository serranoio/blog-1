<svelte:options tag='button-component' />


<script lang="ts">
 
export let type = "button";

</script>


<!-- @ts-ignore -->
<button type={type} class="button-styles">
<slot></slot>
</button>

<style>


.button-styles {
    border: none;
    background-color: var(--primary);
    box-shadow: 0 0 0 2px var(--gray92);
    color: var(--gray92);
    padding: 1.2rem 2.4rem;
    font-size: 2rem;
    cursor: pointer;
    border-radius: var(--br);
}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
  
</style>




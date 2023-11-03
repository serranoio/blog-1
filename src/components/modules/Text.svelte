<svelte:options tag='input-box' />


<script lang="ts">
  import { onMount } from "svelte";

  import { pb } from "../../model/pocketbase";
  import { HeroCollection } from "../../model/model";
  
  let input: HTMLInputElement;
  
  export let inputValue = "";
  let isAdmin = false;
  if (pb.authStore.isValid) {
    isAdmin = true;
  }

  export let records: any;

  export let column= "";
  export let collection= "";

  export let mB = "";
  export let size = "";  

  let fontSize = `
    font-size: ${size}rem;
    color: inherit;
  `
    

    let pStyle = `
        font-size: ${size}rem;
        padding: 0;
        margin-bottom: ${mB}rem !important;
        `

    const updateInput = async () => {
        if (!isEditing) return

        inputValue = input.value;
        

        console.log(records[0].id);

        const update = {
            ...records[0],
            [column]: inputValue
        }

        console.log(update)

        try {

            const updated = await pb.collection(HeroCollection)
            .update(records[0].id, update);
        } catch (e) {

        } finally {

        }

        
    }


    $: isEditing = false;
    const onClick = () => {

        updateInput();

        isEditing = !isEditing;
    }

    let inputContainerStyles = `
        position: relative;
        display: flex;
        align-items: center;
        gap: 2.4rem;
    `;
</script>



{#if isEditing}
<div style={inputContainerStyles}>
    
    <button class="edit-button" on:click={onClick}>-</button>
    <input bind:this="{input}" style={fontSize} value={inputValue}/>
</div>
    
{:else}


<p class="reset" style={pStyle}>
    {inputValue}
    {#if isAdmin}
    <button class="edit-button" on:click={onClick}>+</button>
    {/if}
    
</p>

{/if}

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    p {
        position: relative;
    }

    input, .submit-changes {
        padding: .6rem;
        border-radius: var(--br);
        border: none;
    }
    
    .submit-changes {
        font-size: 2.4rem;
        background-color: var(--secondary);
        color: var(--gray20);
        cursor: pointer;
        padding: 1.2rem 2.4rem;
    }
    
    .edit-button {
        position: absolute;
        left: 0%;
        top: 50%;
        transform: translate(-150%, -50%);
        display: inline;
        background-color: var(--gray80);
        color: var(--gray22);
        width: 30px;
        height: 30px; 
        border-radius: 50%;
        border: 2px solid var(--gray22);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    

</style>




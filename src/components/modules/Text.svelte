<svelte:options tag='input-box' />


<script lang="ts">
  import { onMount } from "svelte";

  import { pb } from "../../model/pocketbase";
  import { HeroCollection } from "../../model/model";
  import { Routes } from "../../model/api";
  
  let input: HTMLInputElement;
  
  export let inputValue = "";
  let isAdmin = false;
  if (pb.authStore.isValid) {
    isAdmin = true;
  }

  export let records: [{
    id: "",
  }];
  export let type: string;
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

if (!records) {
    records = [{id: ""}];
}

    const updateInput = async () => {
        if (!isEditing) return
        
        
        const formData = new FormData();
        formData.append("id", records[0].id)
        if (type === "file") {
            formData.append(column, input.files![0])
        } else {
            inputValue = input?.value;
            formData.append(column, inputValue?.length === 0 ? " " : inputValue)
        }

        let updated;
        try {

            updated = await pb.collection(collection)
            .update(records[0].id, formData);
            
            // now set inputValue to image title
            if (type === "file") {
                inputValue = updated.pic
            }
        } catch(err) {
            console.log("Could not update text", err)
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
    
    let createImage = "";
    if (inputValue === "" && type === "file") {
        createImage = `
            width: 25rem;
            height: 25rem;
        `
    }

    $: isAdminStyles = isAdmin ? "stretch-to-fit" : "";

    $: editButtonStyles = !isEditing ? "start-editing" : "finish-editing"


    $: isFileTypeClass = type === "file" ? "is-file" : "";
</script>

{#if isEditing}
<div style={inputContainerStyles} class={`${isAdminStyles}`}> 
    <button class={`edit-button ${editButtonStyles}`} on:click={onClick}>Finish</button>
    {#if type === "file"}
    <input bind:this="{input}" type={type} style={fontSize}/>
    {:else}
    <input bind:this="{input}" type={type} style={fontSize} placeholder={column} value={inputValue}/>
    {/if}
</div>
{:else}

    {#if type === "file"}
    <div class={`relative ${isFileTypeClass}`}>
            {#if inputValue === ""}
                <p class="input-picture">Please input a picture!</p>
            {:else}
            <img class="pic" alt="hero-img" src={Routes + `api/files/${HeroCollection}/${records[0]?.id}/${inputValue}`}/>
            {/if}
        {#if isAdmin}
        <button class={`edit-button ${editButtonStyles}`}  on:click={onClick}>Change Image</button>
        {/if}                
    </div>

    {:else if type === "text"}
 
    <p class="reset" style={pStyle}>
        {inputValue}
        {#if isAdmin}
        <button class={`edit-button ${editButtonStyles}`}  on:click={onClick}>Edit</button>
        {/if}
        
    </p>
    
    {:else if type === "icon"}
    
    <div class={`a ${isAdminStyles}`}>
        {#if isAdmin}
        <button class={`edit-button ${editButtonStyles} link`}  on:click={onClick}>Change&nbsp;Link</button>
        {/if}
    
        <a style={pStyle} class="icon" href={inputValue} target="_blank">
            <!-- {inputValue} -->
            <!--  LOGO -->
<!-- only dont show when the inputValue is "" and there is no admin -->
            {#if column === "twitter" &&  (!(inputValue === " " || !inputValue && !isAdmin) || isAdmin)} 
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg>
            {:else if column === "youtube" && (!(inputValue === " " || !inputValue && !isAdmin) || isAdmin)}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path></svg>
            {:else if column === "facebook" && (!(inputValue === " " || !inputValue && !isAdmin) || isAdmin)}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>
            {:else if column === "instagram" && (!(inputValue === " " || !inputValue && !isAdmin) || isAdmin)}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>
            {:else if column === "github" && (!(inputValue === " " || !inputValue && !isAdmin) || isAdmin)}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg>
            {/if}

            <!-- END LOGO -->
        </a>
    </div>
    {/if}

{/if}

<style>
    .pic {
        max-width: 75%;
        /* background-color: green; */
        max-height: 100%;
    }

    .stretch-to-fit {
        width: 20rem !important;
    }



    .icon svg {
        transition:  all .2s;
    }

    .icon:hover svg {
        transform: scale(1.1);
    }

    :host {
        /* height:; */
        display: block;
    }

    .start-editing {
        color: var(--gray92);
        background-color: var(--primary) !important;
    }
    
    .finish-editing {
        color: var(--gray92);
        background-color: var(--secondary) !important;
    }

    .input-picture {
        font-size: 2.4rem;
    }

    .a {
        width: 100%;
        height: 4.65rem;
        position: relative;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    p {
        position: relative;
    }
    .relative {
        position: relative;
        width: 100%;
    }


    input {
        min-height: 3rem;
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

    .stretch-to-fit .edit-button {
        transform: translate(-50%, -50%) !important;
    }
    
    .stretch-to-fit .edit-button.finish-editing {
        transform: translate(-100%, -50%) !important;
        
    }
    
    .is-file .edit-button {
        /* '' */
        transform: translate(-40%, -50%) !important;
    }
    
    .edit-button {
        position: absolute;
        left: 0%;
        top: 50%;
        transform: translate(-150%, -50%);
        display: inline;
        /* width: 30px; */
        /* height: 30px;  */
        padding: 1.2rem 2.4rem;
        border-radius: var(--br);
        border: 2px solid var(--gray92);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all .2s;
        box-shadow: 0 1px 1px 1px var(--gray20);

    }

    .edit-button:hover {
        transform: translate(-150%, calc(-50% + -2px));
        box-shadow: 0 2px 2px 2px var(--gray20);
    }

    .link {
        transform: translate(-105%, -50%);
    }
    
    .link:hover {
        transform: translate(-105%, calc(-50% + -2px));
    }

    svg path {
        fill: var(--gray22);
    }


    input {
        color: var(--gray25);
        background-color: var(--white);
    }
    

    @media (max-width: 47em) {
        .edit-button {
            transform: translate(-75%, -50%) !important;
        }
        
        .is-file .edit-button {
            transform: translate(-50%, -50%) !important;
            left: 50%;
            
        }
    }


</style>




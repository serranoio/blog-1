<script lang="ts">
      let properties: {name: string, value: string}[] = [];

const addToPropertyList = (name: string, value: string) => {
   properties.push({
    name: name,
    value: value
   })
}

addToPropertyList("--white", "#ffffff");
addToPropertyList("--gray98", "#f7f8fa");
addToPropertyList("--gray96", "#f2f4f5");
addToPropertyList("--gray92", "#e1e6eb");
addToPropertyList("--gray80", "#c3cbd4");
addToPropertyList("--gray60", "#818d99");
addToPropertyList("--gray45", "#5c6773");
addToPropertyList("--gray30", "#3c444d");
addToPropertyList("--gray25", "#31373e");
addToPropertyList("--gray22", "#2b3033");
addToPropertyList("--gray20", "#171d21");
addToPropertyList("--black", "#000000");


let lightModeEnabled = false;

const state = localStorage.getItem("lightModeEnabled")

if (state === "true") {
 lightModeEnabled = true;   
} else {
    lightModeEnabled = false;   
}
// localStorage.setItem("lightModeEnabled"

const toggleLightMode = () => {
        lightModeEnabled = !lightModeEnabled;
        localStorage.setItem("lightModeEnabled", "" + lightModeEnabled)
    }

    const switchProperty = (name: string, value: string, name1: string, value1: string) => {
        document.documentElement.style.setProperty(name, value1);
        document.documentElement.style.setProperty(name1, value);
    }

 
    
    $: if (lightModeEnabled) {
        for (let i = 0; i < properties.length; i++) {
            switchProperty(properties[i].name, properties[i].value, properties[properties.length-1-i].name, properties[properties.length-1-i].value)
        }
    } else {
        for (let i = 0; i < properties.length; i++) {
            switchProperty(properties[i].name, properties[properties.length-1-i].value, properties[properties.length-1-i].name, properties[i].value)
        }
    }
</script>

    

<button class="light-or-dark" on:click={toggleLightMode}>
    {#if lightModeEnabled}
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"></path></svg>  
    {/if}  
</button>


<style>
    .light-or-dark {
    width: 5rem;
    height: 5rem;
    background-color: var(--gray92);

    border: 2px solid var(--gray22);
    cursor: pointer;
    border-radius: 50%;
    border: none;
}

.light-or-dark path {
    fill: var(--gray22);
}
</style>
<script lang="ts">
    import { onMount } from "svelte";
  import Nav from "../../components/nav/Nav.svelte";

  
    export let data;
    
    const colors = new Map();
    colors.set("red", "#af575a")
    colors.set("red-1", "#62b3b2")
    colors.set("orange", "#ec9960")
    colors.set("orange-1", "#006d9c")
    colors.set("yellow", "#4fa484")
    colors.set("yellow-1", "#f8be34")
    colors.set("purple", "#5a4575")
    colors.set("purple-1", "#708794")
    colors.set("blue", "#294e70")
    colors.set("blue-1", "#b6c75a")
  
    let lightModeEnabled = false;

    const toggleLightMode = () => {
        lightModeEnabled = !lightModeEnabled;
    }


    const changeSelectedColor = (e: any) => {

        let color = e.target.value;
        


        document.documentElement.style.setProperty("--primary", colors.get(color));
        document.documentElement.style.setProperty("--secondary", colors.get(color + "-1"));


    }

    const switchProperty = (name: string, value: string, name1: string, value1: string) => {
        document.documentElement.style.setProperty(name, value1);
        document.documentElement.style.setProperty(name1, value);
    }

    let properties: {name: string, value: string}[] = [];

    const addToPropertyList = (name: string, value: string, name1: string, value1: string) => {
       properties.push({
        name: name,
        value: value
       })
       properties.push({
        name: name1,
        value: value1
       })
    }

    addToPropertyList("--white", "#ffffff", "--black", "#000000")
    addToPropertyList("--gray98", "#f7f8fa", "--gray20", "#171d21")
    addToPropertyList("--gray96", "#f2f4f5", "--gray22", "#2b3033")
    addToPropertyList("--gray92", "#e1e6eb", "--gray25", "#313773e")
    addToPropertyList("--gray80", "#c3cbd4", "--gray30", "#3c444d")
    addToPropertyList("--gray60", "#818d99", "--gray45", "#5c6773")
    
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
  
  <Nav position="horizontal"/>


  <section class="admin">
    <div class="container">

        <h2>Configure your website!</h2>
        
        <div>
            <label>Change your layout!</label>
            <select>
                <option>Layout 1</option>
                <option>Layout 2</option>
                <option>Layout 3</option>
                <option>Layout 4</option>
                <option>Layout 5</option>
            </select>
        </div>
        
        <div>
            <label>Change Your Color Accents!</label>
            <select on:change={changeSelectedColor}>
                {#each Array.from(colors.keys()).filter((color, i) => i % 2 == 0) as color}
                    <option>{color}</option>
                {/each}
            </select>
        </div>
            

        <button class="light-or-dark" on:click={toggleLightMode}>
        
        </button>

    </div>
  </section>

<style>      
.container {
    max-width: 130rem;
    margin: 0 auto;
}
.container div {
    margin-bottom: 2.4rem;
}

label {
    font-size: 2rem;
    margin-right: 2rem;
    color: var(--gray22);
}

select {
    font-size: 2rem;
}

h2 {
    font-size: 4.2rem;
    margin-bottom: 3.2rem;
    color: var(--gray20);
}

.light-or-dark {
    width: 5rem;
    height: 5rem;
    background-color: black;
    cursor: pointer;
    border-radius: 50%;
}

</style>
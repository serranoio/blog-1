<script lang="ts">
    import { onMount } from "svelte";
  import Nav from "../../components/nav/Nav.svelte";
  import { pb } from "../../model/pocketbase";
  import { MetadataCollection } from "../../model/model";
  import { colors, makeColorChange } from "../../model/util";

let metadata: any;

  onMount(async () => {
    const records = await pb.collection(MetadataCollection).getFullList();
    metadata = records[0];

    makeColorChange(metadata?.accents)
  })
    
    const setSelectedColorInDatabase = async (color: string) => {
        const formData = new FormData()

        formData.append("accents", color);
        formData.append("design", metadata?.design);
        // formData.append("id", metadata?.id);

        await pb.collection(MetadataCollection).update(metadata?.id, formData)
    }

    const changeSelectedColor = (e: any) => {
        let color = e.target.value;
        setSelectedColorInDatabase(color);

        makeColorChange(color);
    }


    console.log(pb.admins)
    
  </script>
  
  <Nav position="horizontal"/>


  <section class="admin">
    <div class="container">

        <h2>Configure your website!</h2>
        
        <div>
            <label>Change your layout!</label>
            <select>
                <option>Layout 1</option>
            </select>
        </div>
        
        <div class="accent-div">
            <div>
                <label>Change Your Color Accents!</label>
                <select on:change={changeSelectedColor} value={metadata?.accents}>
                    {#each Array.from(colors.keys()).filter((color, i) => i % 2 == 0) as color}
                    <option>{color}</option>
                    {/each}
                </select>
            </div>
            <div>
            </div>
            <div class="accent-1">Accent 1</div>
            <div class="accent-2">Accent 2</div>
        </div>
        <a class="forgot" href="/auth/change">Change Your Password</a>
    </div>
  </section>

<style>  

.forgot {
        /* position: absolute; */
        /* right: 0; */
        /* bottom: 0; */
        /* transform: translateY(100%); */
        font-size: 1.6rem;
        color: var(--gray45);  
}


.accent-div {
    display: flex;
    gap: 2.4rem;
    align-items: center;
}
.accent-1 {
    background-color: var(--primary);
    color: var(--gray92);
    padding: 4.2rem;
    font-size: 2rem;
}

.accent-2 {
    background-color: var(--secondary);
    color: var(--gray22);
    padding: 4.2rem;
    font-size: 2rem;
}

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

</style>
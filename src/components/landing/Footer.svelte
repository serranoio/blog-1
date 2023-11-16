<script lang="ts">
  import { ContactColection } from "../../model/model";
  import { pb } from "../../model/pocketbase";
    import Nav from "../nav/Nav.svelte";
    export let name = "";
    export let records: any;

    $: record = records ? records[0] : undefined

    $: socialsStyles = !pb.authStore.isAdmin ? `width: 25%` : `width: 100%`;
</script>


<footer>
    <Nav position="vertical"/>

    <div class="contact-info">
        <div class="socials" style={socialsStyles}>
            
            <input-box
                records={records}
                column="twitter"
                collection={ContactColection}
                size="3"
                type="icon"
                inputValue={record?.twitter}
            >
        </input-box>
            <input-box
                records={records}
                column="youtube"
                collection={ContactColection}
                size="3"
                type="icon"
                inputValue={record?.youtube}
            >
        </input-box>
            <input-box
                records={records}
                column="facebook"
                collection={ContactColection}
                size="3"
                type="icon"
                inputValue={record?.facebook}
            >
        </input-box>
            <input-box
                records={records}
                column="instagram"
                collection={ContactColection}
                size="3"
                type="icon"
                inputValue={record?.instagram}
            >
        </input-box>
            <input-box
                records={records}
                column="github"
                collection={ContactColection}
                size="3"
                type="icon"
                inputValue={record?.github}
            >
        </input-box>
        </div>

        <input-box
            records={records}
            column="name"
            collection={ContactColection}
            size="3"
            type="text"
            mB="1.2"
            inputValue={record?.name}
        >
    </input-box>
        <input-box
            records={records}
            column="email"
            collection={ContactColection}
            size="3"
            type="text"
            mB="1.2"
            inputValue={record?.email}
        >
    </input-box>
        <a href="/auth">login admin</a>
    </div>
    <div class="sub-footer">
        <p>Made with ❤️</p>

        <div>
            <a href="https://github.com/serranoio/blog-1" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg>
            </a>
            <a href="https://github.com/serranoio/soflare" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path></svg>
            </a>
        </div>
    </div>
</footer>



<style>
    .sub-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sub-footer div {
        display: flex;
        gap: 1.2rem;
    }

    .sub-footer p {
        
        font-size: 1.6rem;
    }

    .socials {
        display: flex;
        gap: 2rem;
        margin-bottom: .6rem;
        line-height: 1.5;
        width: 25%;
    }

    .contact-info a {
        text-decoration: none;
        color: var(--gray20);
    }

    p {    
        line-height: 1.5;
    }

    footer {
        padding: 9.8rem 0 0 0;
        max-width: 130rem;
        margin: 0 auto;
        border-top: 2px solid black;
        /* overflow-y: hidden; */
    }


    .contact-info {
        font-size: 2.4rem;
        padding: 0 4rem;
        transform: translateY(-6rem);
    }

</style>
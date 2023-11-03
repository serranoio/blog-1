<script>
    import Nav from "../nav/Nav.svelte";


    export let name = "";

</script>




<footer>
    <Nav position="vertical"/>

    <div class="contact-info">
        <div class="socials">
            <div>twitter</div>
            <div>facebook</div>
            <div>youtube</div>
            <div>instagram</div>
    </div>
        <p>{name}</p>
        <p>number</p>
        <p>email</p>
    </div>
</footer>



<style>

    .socials {
        display: flex;
        gap: 2rem;
    }
    footer {
        padding: 9.8rem 0;
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
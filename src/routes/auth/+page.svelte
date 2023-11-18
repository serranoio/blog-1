<script lang="ts">
  import { onMount } from "svelte";


import Nav from "../../components/nav/Nav.svelte";
import {CreateAccount, Signin, pb} from "../../model/pocketbase"
  import { redirect } from "@sveltejs/kit";
  
let admins;

let form: HTMLFormElement;

onMount(async () => {
    // pb.admins
    if (pb.authStore.isValid) {
        window.location.href = "/";
    }
})

const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(form);

    const email: string = formData.get("email")!.toString();
    const password: string = formData.get("password")!.toString();
    
    let result;
    try {

        result = await Signin(email, password);
    } catch (e) {
        console.log(e)
    } finally {

        if (result) {
            // console.log("redirect")
            window.location.replace("/")
        }
    }
    
    
}

  </script>
  
  <Nav/>
  <section class="hero-section">
  <div class="container">
  

        <form bind:this="{form}" class="auth-form">

            <h2>Sign in</h2>

            <div class="label-input">
                <label for="email">Email</label>
                <input name="email" type="text" placeholder="Username"/>
            </div>
            <div class="label-input">
                <label for="password">Password</label>
                <input name="password" type="text" placeholder="Username"/>
            </div>
            <button class="submit" type="submit" on:click={onSubmit}>Submit</button>
        </form>  

        <div class="accent"></div>
        <div class="accent-2"></div>
    </div>
  </section>
  
  
  
  
  
  <style>

    .forgot {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
        font-size: 1.6rem;
        color: var(--gray45);
    }

    .label-input {
        position: relative;
    }

      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
  
      .submit {
        color: var(--gray80);
        background-color: var(--primary);
        padding: 1.2rem 3.2rem;
        width: 100%;
        border-radius: var(--br);
        border: none;
        font-size: 2.4rem;
        cursor: pointer;
        transition: all .2s;
        margin-top: 1.2rem;
      }
      
      .submit:hover {
        background-color: var(--gray80);
        box-shadow: 0 0 0 2px var(--primary);
        color: var(--primary);
        padding: 1.2rem 3.2rem;
        width: 100%;
        border-radius: var(--br);
        border: none;
        font-size: 2.4rem;
        cursor: pointer;
      }


      .hero-section {
        overflow-y: hidden;
        overflow-x: hidden;
      }
        
    .container {
        position: relative;
        display: grid;
        min-height: calc(100vh - 80px);
        grid-template-columns: 1fr 1fr;
        gap: 2.4rem;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        max-width: 130rem;
    }
    .auth-form {
        grid-column: 1/-1;
        text-align: center;
        background-color: var(--gray80);
        padding: 6.2rem;
        border-radius: var(--br);
        justify-self: center;
    }

    h2 {
        font-size: 4.2rem;
        margin-bottom: 2.4rem;
        color: var(--gray25);
    }

    .label-input {
        display: flex;
        justify-content: center;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
        color: var(--gray30);
        align-items: center;

    }

    label, input {
        font-size: 2.4rem;
    }

    input {
        border-radius: var(--br);
        background-color: var(--gray60);
        border: none;
        padding: .6rem;
        color: var(--gray20);
    }
    
    input::placeholder {
        
        color: var(--gray80);
    } 
    
    .accent {
        height: 450%;
        width: 500px;
        background-color: var(--primary);
        position: absolute;
        right: -5%;
        z-index: -1;
        transform: rotate(45deg);
    }
    .accent-2 {
        height: 470%;
        width: 250px;
        background-color: var(--secondary);
        position: absolute;
        right: 0%;
        z-index: -1;
        transform: rotate(45deg);
    }
    
  </style>
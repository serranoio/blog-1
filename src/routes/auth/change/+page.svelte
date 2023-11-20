<script lang="ts">
  import Nav from "../../../components/nav/Nav.svelte";
    import { redirect } from "@sveltejs/kit";
  import { Signin, pb } from "../../../model/pocketbase";
    
  let form: HTMLFormElement;
  let changed = "";
  
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email")!.toString();
    const oldPassword = formData.get("old-password")!.toString();
    const newPassword = formData.get("new-password")!.toString();

    pb.authStore.clear()
    let result
    try {
        result = await Signin(email, oldPassword);   
    } catch (e) {
        // console.log(e)
        console.log("could not change")
        changed = "Could not change"
    } finally {
        if (result) {

            const onlyAdmin = await pb.admins.getFullList({ sort: '-created' });

            try {
                const admin = await pb.admins.update(onlyAdmin[0].id, {
                    password: newPassword,
                    passwordConfirm: newPassword,
                    avatar: 4,
                });

                if (admin) {
                    changed = "Success"
                }
                
            } catch(e) {
                console.log("COULD NOT CHANGE", e)
                
                changed = "Could not change"
            }  
        } else {
            changed = "Could not change"
        }
    }
  }

    </script>
    
    <Nav auth="true"/>
    <section class="hero-section">
    <div class="container">
          <form bind:this="{form}" class="auth-form">
  
              <h2>Update Your Password</h2>
  
              <div class="label-input">
                  <label for="email">Email</label>
                  <input name="email" type="text" placeholder="Email"/>
              </div>
              <div class="label-input">
                  <label for="old-password">Old Password</label>
                  <input name="old-password" type="text" placeholder="Old Password"/>
              </div>
              <div class="label-input">
                  <label for="new-password">New Password</label>
                  <input name="new-password" type="text" placeholder="New Password"/>
              </div>
              <button class="submit" type="submit" on:click={onSubmit}>Change Password</button>
              <p class="success">{changed}</p>
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

      .success {
        font-size: 1.2rem;
        color: var(--gray22);
        margin-top: 1.2rem;
      }
      
    </style>
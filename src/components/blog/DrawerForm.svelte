<script lang="ts">
import ImageTool from '@editorjs/image';
import EditorJS from '@editorjs/editorjs';
import { onMount } from "svelte";
export let isOpened: string;
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
  import { pb } from '../../model/pocketbase';
  import { Routes } from '../../model/api';


// uploadByUrl()
// send it to images collection
// -> create ID
// -> 


const uploadByFile = async (file: any) => {
    const formData = new FormData(); 
    formData.append("img", file);

    let uploadInfo;
    try {
        uploadInfo = await pb.collection("images").create(formData);
        const route = Routes + `api/files/images/${uploadInfo?.id}/${uploadInfo.img}`
        return {
            success: 1,
            file: {
                url: route,
            }
        }
    } catch(err) {
        return {
            success: 0
        }

    }
}

let editor: EditorJS;
onMount(() => {
    editor = new EditorJS( {

        tools: {
            image: {
                class: ImageTool,
                config: {
                    uploader: {
                        uploadByFile
                    }
                }
            },
            header: Header,
            paragraph: Paragraph,
        }
    }
);
})

const onSubmit = (e: any) => {
e.preventDefault();
const formData = new FormData(e.target);

const title = formData.get("title")!;
const subtitle = formData.get("subtitle")!;
const date = formData.get("date")!;
const author = formData.get("author")!;
const titleImg = formData.get("title-img");



let outputData;

editor.save().then((outputData) => {
  outputData = outputData;

  
  let formDataPost = {
      title: title,
      subtitle: subtitle,
      date: date,
      author: author,
      md: JSON.stringify(outputData),
      titleImg: titleImg
  }
  createPost(formDataPost, e.target);
}).catch((error) => {
  console.log('Saving failed: ', error)
}) 
}

const createPost = async (formData: any, form: HTMLFormElement) => {
    try {
        const record = await pb.collection('blog').create(formData);

        window.location.href = `/blog/${record.title}`
    } catch(e) {

    }

    clearForm(form);

}

const clearForm = (form: HTMLFormElement) => {

    form.querySelectorAll("input").forEach(input => {
        input.value = "";
    })

    editor.clear()
}
// let show: string;
$: show = isOpened ? "display: block;" : "display: none";

</script>

<drawer-component isOpened={isOpened}>
    <button class='close' style={show} on:click={() => {isOpened = !isOpened}}><span>x</span></button>
    <form on:submit={onSubmit}>
    <h3 class="create-post-title">Create a post!</h3>
    <p class="create-post-desc">You must fill them all in to create a post!</p>

<div class="label-box-grid">

    <div class="label-box"> 
        <label for="title">
            Title
        </label>
        <input name="title" required/>
    </div>
    
    <div class="label-box"> 
        <label for="Title Image">
            Title Image
        </label>
        <input name="title-img" type="file" required/>
    </div>
    
    
    <div class="label-box"> 
        <label for="date">
            Date
        </label>
        <input type="date" name="date" required/>
    </div>
    
    <div class="label-box"> 
        <label for="author">
            Author
        </label>
        <input name="author" required/>
    </div>
    
    <div class="label-box description"> 
        <label for="subtitle">
            Description
        </label>
        <input name="subtitle" required/>
    </div>
</div>



    <div class="label-box editor">
        <label>Content</label>
        <div id="editorjs-container">
            <div id="editorjs"></div>
        </div>
    </div>
    
    
    
    <button class="button-styles" type="submit">Submit</button>

</form>



</drawer-component>


<style>





.label-box.editor {
    flex: 1;
}

.label-box-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.4rem;
}


h3 {
    color: var(--gray22);
}

p {
    color: var(--gray45);
}

label {
    color: var(--gray30);
}
input {
    color: var(--gray22);
    background-color: var(--gray92);
    border-radius: var(--br);
    border: none;
    box-shadow: 0 0 0 2px var(--gray22);
    padding: .6rem;
    font-size: 1.8rem;
}

.label-box.description {
    grid-column: -1/1;
}

.create-post-title {
    font-size: 3.2rem;
    margin-bottom: 1.2rem;
}

.close {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    font-size: 2rem;
    padding: 1.2rem;
    width: 50px;
    height: 50px;
    -webkit-clip-path: circle(50.0% at 100% 50%);
    clip-path: circle(50.0% at 100% 50%);
    cursor: pointer;
    border: none;
    background-color: var(--gray80);
}

.close span {
    color: var(--gray60);
    position: absolute;
    right: 12.5%;
    top: 50%;
    transform: translate(0, -50%);
    /* transform: translateX(80px); */
}
    

.create-post-desc {
    font-size: 2rem;
    margin-bottom: 2rem;
}

#editorjs {
    height: 100%; 
    border: 1px solid var(--gray80);
    overflow: auto;
    overflow-x: hidden;
    width: calc(50vw - 8rem);
    color: var(--gray22);
}


.button-styles {
    border: none;
    background-color: var(--primary);
    box-shadow: 0 0 0 2px var(--gray92);
    color: var(--gray92);
    padding: 1.2rem 2.4rem;
    font-size: 2rem;
    cursor: pointer;
    width: 100%;
    border-radius: var(--br);
    /* position: absolute; */
}


form {
    height: 100%;
    display: flex;
    flex-direction: column;

    /* display: grid; */
    /* grid-template-rows: 1fr 1fr 1fr 1fr 1fr 11fr  1fr; */
}

.label-box {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    gap: .6rem;
    margin-bottom: 2rem;
    height: auto;
    /* overflow-y: scroll; */
}
    
    .title-section {
        margin-bottom: 4.2rem;
    }
    .article-image-box {
        background-color: green;
        height: 75%;
        box-shadow: 0 0 0 2px var(--gray20);
        border-radius: var(--br);
}

.container {
    max-width: 130rem;
    margin: 0 auto;
}
#editorjs-container {
    flex-shrink: 1;
    /* flex-grow: 1; */
    max-height: 39vh;
    /* max-height: unset; */
}

@media (max-height: 55em) {
    form {
        overflow-y: scroll;
    }
}

@media (max-width: 80em) {
    .label-box-grid {
        grid-template-columns: 1fr;
    }
    
    #editorjs-container {
        flex-shrink: 1;
        /* flex-grow: 1; */
        max-height: 23vh;
        /* max-height: unset; */
    }
    #editorjs-container {
 
    }
    #editorjs {

    }
    .label-box.editor {
        
    }
    
}

@media (max-width: 60em) {
    #editorjs-container {
        /* flex-shrink: 0; */
        /* flex: 1; */
    }

    #editorjs {
        width: calc(100vw - 8rem);

    }
    .close {
        transform: translate(0);
        left: 88%;
        top: 4%;
        -webkit-clip-path: none;
    clip-path: none;
    background-color: var(--gray45);
    color: var(--gray20);
    border-radius: 50%;
        width: 4rem;
        height: 4rem;
    }


.close span {
    color: var(--gray60);
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    /* transform: translateX(80px); */
}
}



@media (max-width: 47em) {


    .label-box.editor label {
        flex-grow: 0;
    }

    #editorjs-container {
        max-height: 39rem;
    }

}

</style>
<script lang="ts">
import ImageTool from '@editorjs/image';
import EditorJS from '@editorjs/editorjs';
import { onMount } from "svelte";
export let isOpened;
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
  import { pb } from '../../model/pocketbase';

console.log(isOpened)

// uploadByUrl()
// send it to images collection
// -> create ID
// -> 


const uploadByFile = async (file: any) => {

    const formData = new FormData();

    
    console.log(file)
    
    formData.append("image", file);

    let uploadInfo;
    try {


        uploadInfo = await pb.collection("images").create(formData);
    } catch(err) {

    } finally {

        console.log(uploadInfo)
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

let outputData;

editor.save().then((outputData) => {
  outputData = outputData;

  
  let formDataPost = {
      title: title,
      subtitle: subtitle,
      date: date,
      author: author,
      md: JSON.stringify(outputData)
  }
  
  console.log(formDataPost)
  
  createPost(formDataPost);
}).catch((error) => {
  console.log('Saving failed: ', error)
});


}



const createPost = async (formData: any) => {
    try {
        await pb.collection('blog').create(formData);
    } catch(e) {

    }
}


</script>




<drawer-component isOpened={isOpened}>

    <form on:submit={onSubmit}>
    <h3 class="create-post-title">Create a post!</h3>
    <p class="create-post-desc">Requirements: title, date, author, content</p>
    <div class="label-box"> 
        <label for="title">
            Title
        </label>
        <input name="title"/>
    </div>

    <div class="label-box"> 
        <label for="subtitle">
            Subtitle
        </label>
        <input name="subtitle"/>
    </div>
    
    <div class="label-box"> 
        <label for="date">
            Date
        </label>
        <input type="date" name="date"/>
    </div>
    
    <div class="label-box"> 
        <label for="author">
            Author
        </label>
        <input name="author"/>
    </div>
    

        <div class="label-box">
            <label>Content</label>
            <div id="editorjs-container">
                <div id="editorjs"></div>
            </div>
        </div>
        <button class="button-styles" type="submit">Submit</button>
</form>
    
    
    
</drawer-component>


<style>


#editorjs-container {
    /* overflow-y: scroll; */
    height: 100%;
    overflow-y: hidden;
    /* flex-shrink: 0; */
}

.create-post-title {
    font-size: 3.2rem;
    margin-bottom: 1.2rem;
}
    

.create-post-desc {
    font-size: 2rem;
}

#editorjs {
    /* height: 100%;  */
    height:  46.5rem;
    border: 1px solid var(--gray80);
    overflow: auto;
    overflow-x: hidden;
    width: calc(50vw - 8rem);
}


.button-styles {
    border: none;
    background-color: var(--primary);
    box-shadow: 0 0 0 2px var(--gray92);
    color: var(--gray92);
    padding: 1.2rem 2.4rem;
    font-size: 2rem;
    cursor: pointer;
}


form {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 11fr  1fr;
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
</style>
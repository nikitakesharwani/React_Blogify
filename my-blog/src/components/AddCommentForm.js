import axios from "axios";
import { useState } from "react"

const AddCommentForm = ({articleName , onArticleUpdate}) => {
    const [name , setName] = useState('');
    const [commentText , setComment] = useState('');
    const addComment = async ()=>{
        const response = await axios.post(`/api/articles/${articleName}/comment` , {
            user: name,
            text: commentText, 
        });
        const updatedComment = response.data;
        onArticleUpdate(updatedComment);
        setName('');
        setComment('');
    }


    return(
        <div className="add-comment-form">
            <h3>Add Comment:</h3>
            <label>
                Name:
                <input 
                    value={name}
                    onChange = {e => setName(e.target.value)}
                    type = "text"

                />
            </label>
            <label>
                Comment:
                <textarea 
                    value={commentText}
                    onChange={e =>setComment(e.target.value)}
                    row="4" 
                    cols="50"  
                />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
        
    )
}

export default AddCommentForm;

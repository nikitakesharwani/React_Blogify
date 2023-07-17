import { useState , useEffect } from "react";
import articles from "./ArticleContent";
import { useParams } from "react-router-dom";
import NotfoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm"

const ArticlePage = ()=>{

    const [articlesInfo , setArticlesInfo] = useState({upvotes: 0 , comment: []})
    const { articleID } = useParams();
    useEffect(()=>{
        const loadArticleInfo = async()=>{
        const response = await axios.get(`/api/articles/${articleID}`);
        const newArticleInfo = response.data;
        setArticlesInfo(newArticleInfo);
        }
        loadArticleInfo();
        
    },[]);


    const article = articles.find(article => article.name === articleID)

    const addUpvote =  async()=>{
        const response = await axios.put(`/api/articles/${articleID}/upvote`);
        const updatedArticle = response.data;
        setArticlesInfo(updatedArticle);
    }

    if(!article){
        return <NotfoundPage/>
    }

    return(
        <>
            <h1>{article.title}</h1>
            <div className = 'upvotes-section'>
                <button onClick = {addUpvote}>Upvote</button>
                <p>This article has {articlesInfo.upvotes} upvote(s)</p>
            </div>
            
            {article.content.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
            ))}
            <AddCommentForm 
                articleName={articleID}
                onArticleUpdate = {updatedComment => setArticlesInfo(updatedComment)}
            />
            <CommentsList comments = {articlesInfo.comment}/>
        </>
    
    );
}

export default ArticlePage;
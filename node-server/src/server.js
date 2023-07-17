import express from "express";
import {db , connectToDb} from "./mongoDb.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


// app.post("/hello" , (req ,res)=>{
//     res.send(`Hello ${req.body.name}!`)
//     console.log(req.body.name)
// })

// app.get("/hello/:name" , (req ,res)=>{
//     const { name } =req.params;
//     res.send(`Hello ${name}!!`);
// })

app.get('/api/articles/:name' , async (req ,res)=>{
    const { name } = req.params;
    
    const article = await db.collection('articles').findOne({name});
    if(article){
        res.json(article)
    }else{
        res.sendStatus(404).send("Article not found!")
    }
})

app.put("/api/articles/:name/upvote" ,async(req , res)=>{
    const {name} = req.params

    await db.collection('articles').updateOne({ name } , {
        $inc: {upvotes: 1}
    })
    const article = await db.collection('articles').findOne({name});
    if(article){
        res.json(article)
    }else{
        res.send("There are no articles")
    }
    
})

app.post("/api/articles/:name/comment" , async(req , res)=>{
    const { name } = req.params;
    const { user , text } = req.body;

    await db.collection('articles').updateOne({name} , {
        $push: {comment: {user , text}},
    })

    const article = await db.collection('articles').findOne({name})

    if(article){
        res.json(article) 
    }else{
        res.send("There are no articles")
    }
    
})


connectToDb(()=>{
    console.log("Sucessfully connected to the database")
    app.listen("8000" , ()=>{
        console.log("Server is Running on port 8000!")
    })
})




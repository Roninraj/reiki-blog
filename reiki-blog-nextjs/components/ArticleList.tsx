import React from "react";
import Blogcard from "./Blogcard";
import { IArticle } from "../types";
import BlogcardWithImage from "./BlogCardWithImage";

interface IPropType{
    articles: IArticle[]
}

const ArticleList = ({articles}:IPropType) => {
    return (
        <div className='grid lg:grid-cols-2 grid-gap gap-16 mt-16'>
            {
                articles.map((article,idx) =>{
                    return (<>
                        { 
                        idx === 1 ? (
                            <BlogcardWithImage article={article} key={article.id}/>
                            ) : (
                            <Blogcard article={article} key={article.id}/>
                        )}
                  </>
                );
                })}   
        </div>
    );
}

export default ArticleList;
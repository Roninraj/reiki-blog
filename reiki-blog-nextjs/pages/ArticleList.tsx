import React from "react";
import Blogcard from "../components/Blogcard";
import { IArticle } from "../types";

interface IPropType{
    articles: IArticle[]
}

const ArticleList = ({articles}:IPropType) => {
    return (
        <div className='grid lg:grid-cols-2 grid-gap gap-16 mt-16'>
            {
                articles.map((article) =>{
                    return <Blogcard article={article} key={article.id}/>;
                })}
        </div>
    );
}

export default ArticleList;
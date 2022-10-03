import { AxiosResponse } from "axios";
import React from "react";
import { fetchArticleBySlug } from "../../http";
import { IArticle, ICollectionResponse } from "../../types";
import qs from 'qs';
import { GetServerSideProps } from "next";

interface IPropType {
    article : IArticle;
    notFound : boolean;
}

const slug = ({article, notFound=false}: IPropType) => {
    return <div>Slug</div>;
};



export const getServerSideProps:GetServerSideProps = async({query}) => {

    const queryString = qs.stringify({
        populate: ['Image', 'author.avatar'],
        filters : {
            Slug: {
                $eq: query.slug,
            },
        },
    });

    const {data: articles}:AxiosResponse<ICollectionResponse<IArticle[]>> = 
    await fetchArticleBySlug(queryString);

    if(articles.data.length === 0) {
        return{
            props: {
                article:articles.data[0],
            }
        }
    }
};
export default slug;
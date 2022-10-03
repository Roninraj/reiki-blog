import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Tabs from "../../components/Tabs";
import { GetServerSideProps } from "next";
import { fetchArticles, fetchCategories } from "../../http";
import { AxiosResponse } from "axios";
import { IArticle, ICategory, ICollectionResponse, IPagination } from "../../types";
import qs from 'qs';
import ArticleList from "../../components/ArticleList";
import { capitalizeFirstLetter, makeCategory } from "../../utils";
import Pagination from "../../components/Pagination";


interface IPropType{
    categories:{
        items:ICategory[];
        pagination: IPagination;
    },
    articles:{
        items: IArticle[];
        pagination: IPagination;
    },
    slug:string;
}

const category = ({categories, articles, slug}: IPropType) => {
    
    const {page, pageCount} =articles.pagination;
    const router = useRouter()
    const {category:categorySlug} = router.query;

    const formattedCategory = () => {
        return capitalizeFirstLetter(makeCategory(slug));
    }

    return (
        <>
        <Head>
        <title>Reiki - {formattedCategory()}</title>
        <meta
          name="description"
          content="A self healing blog for readers"
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Tabs categories={categories.items}/>

      <ArticleList articles={articles.items}/>

      <Pagination page={page} pageCount={pageCount} redirectUrl={`/category/${categorySlug}`}/>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {

    //console.log('query',query);
    const options = {
        populate: ['author.avatar'],
        sort: ['id:desc'],
        filters:{
            category: {
                slug: query.category,
            },
        },
        pagination : {
            page: query.page?query.page:1,
            pageSize : 1,
          },
    }

    const queryString = qs.stringify(options);
    const{data:articles}:AxiosResponse<ICollectionResponse<IArticle[]>> = 
    await fetchArticles(queryString);

    const {
        data: categories,
      }: AxiosResponse<ICollectionResponse<ICategory[]>> =
      await fetchCategories();

      return{

        props: {
            categories:{
                items : categories.data,
                pagination: categories.meta.pagination,
            },

            articles: {
                items: articles.data,
                pagination: articles.meta.pagination,
            },

            slug: query.category,
        }
      }
}

export default category;
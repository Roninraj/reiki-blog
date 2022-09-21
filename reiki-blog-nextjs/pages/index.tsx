import { Axios, AxiosResponse } from 'axios';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import Tabs from '../components/Tabs';
import { fetchArticles, fetchCategories } from '../http';
import { IArticle, ICategory, ICollectionResponse } from '../types';
import ArticleList from './ArticleList';

//Creting interface to pass props 
interface IPropTypes{
  categories: {
    items: ICategory[];
  };
  articles: {
    items:IArticle[];
  }
}

const Home: NextPage<IPropTypes> = ({categories,articles}) => {
  console.log('categories',categories);
  return (
    <div>
      <Head>
        <title>Reiki</title>
        <meta
          name="description"
          content="A sel healing blog for readers"
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Tabs categories={categories.items}/>

      {/* {Rendering articles} */}
      
      <ArticleList articles={articles.items}/>
  
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () =>{
  //Articles
  const{data:articles}:AxiosResponse<ICollectionResponse<IArticle[]>> = 
    await fetchArticles();
  
  //fetchin categories
  const {
    data: categories,
  }: AxiosResponse<ICollectionResponse<ICategory[]>> =
  await fetchCategories();
  
  
  return{
    props:{
      categories:{
        items: categories.data,
      },
      articles: {
        items: articles.data,
        pagination : articles.meta.pagination,
      }
    },
  };
};

export default Home;

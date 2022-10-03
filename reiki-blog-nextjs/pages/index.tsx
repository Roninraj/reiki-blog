import { Axios, AxiosResponse } from 'axios';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import Tabs from '../components/Tabs';
import { fetchArticles, fetchCategories } from '../http';
import { IArticle, ICategory, ICollectionResponse } from '../types';
import ArticleList from '../components/ArticleList';
import qs from 'qs';
import Pagination from '../components/Pagination';

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
  //console.log('categories',categories);
  return (
    <div>
      <Head>
        <title>Reiki</title>
        <meta
          name="description"
          content="A self healing blog for readers"
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Tabs categories={categories.items}/>

      {/* {Rendering articles} */}
      
      <ArticleList articles={articles.items}/>

      <Pagination/>
  
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () =>{
  //Articles

  const options = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
  };

  const queryString = qs.stringify(options);
  //console.log('string', queryString);

  const{data:articles}:AxiosResponse<ICollectionResponse<IArticle[]>> = 
    await fetchArticles(queryString);

  //console.log(JSON.stringify(articles));
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

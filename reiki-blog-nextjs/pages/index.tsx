import { Axios, AxiosResponse } from 'axios';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import Tabs from '../components/Tabs';
import { fetchArticles, fetchCategories } from '../http';
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from '../types';
import ArticleList from '../components/ArticleList';
import qs from 'qs';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import { debounce } from '../utils';

//Creting interface to pass props 
interface IPropTypes{
  categories: {
    items: ICategory[];
  };
  articles: {
    items:IArticle[];
    pagination: IPagination;
  }
}

const Home: NextPage<IPropTypes> = ({categories,articles}) => {

  const router = useRouter();
  const {page, pageCount} =articles.pagination
  //console.log('categories',categories);

  const handleSearch = (query:string) =>{
      router.push(`/?search=${query}`);
  }
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

      <Tabs categories={categories.items} handleOnSearch={debounce(handleSearch,500)}/>

      {/* {Rendering articles} */}
      
      <ArticleList articles={articles.items}/>

      <Pagination page={page} pageCount={pageCount}/>
  
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) =>{
  
  
  //Articles

  const options:Partial<IQueryOptions> = {
    populate: ['author.avatar'],
    sort: ['id:desc'],
    pagination : {
      page: query.page? +query.page:1,
      pageSize : 1,
    },
  };

  if(query.search) {
    options.filters = {
      Title:{
        $containsi: query.search,
      }
    }
  }

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

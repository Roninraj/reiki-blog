import { Axios, AxiosResponse } from 'axios';
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import { fetchCategories } from '../http';
import { ICategory, ICollectionResponse } from '../types';


interface IPropTypes{
  categories: {
    items: ICategory[];
  };
}

const Home: NextPage<IPropTypes> = ({categories}) => {
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

        {categories.items.map(category => {
          return <span>{category.attributes.Title}</span>;
        })
        }
      <main>

        <h1 className='text-primary-dark'>
          Welcome to Reiki Blog!
        </h1>

       
      </main>

  
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () =>{
  //fetchin categories
  const {
    data: categories,
  }: AxiosResponse<ICollectionResponse<ICategory[]>> =
  await fetchCategories();
  console.log('categories',categories);

    console.log('categories')
  return{
    props:{
      categories:{
        items: categories.data,
      },
    },
  };
};

export default Home;

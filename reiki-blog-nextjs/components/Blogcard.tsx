import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IArticle } from "../types";

interface IPropType{
    article : IArticle;
}

const Blogcard = ({article}: IPropType) =>  {
    return (
        <div>
            <Link href="#">
                <h1 className='text-xl text-gray-600 font-bold hover:decoration-2 hover:underline hover:cursor-pointer hover:decoration-primary'>
                {article.attributes.Title}
                </h1>
            </Link>
            <div className='flex items-center my-3 gap-2 text-sm'>
                <div>
                    <Image src={`${process.env.API_BASE_URL}${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                    height={40}
                    width={40}
                    />
                </div>
                <span>Author</span>
                <span>Createddate</span>
            </div>
        </div>
    );
}

export default Blogcard;
import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { DeleteProduct } from "../../services/product";
import router from "next/router";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from '../HomePage/Header'
import HomePageClient from "./HomePageClient";
interface ProductType {
  id: string,
  image: string,
  nameProduct: string,
  material: string,
  price: string
}

export default function Example() {
  const [listProduct, setListProduct] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const res = axios
      .get(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/product/getAllProduct`)
      .then((res) => setListProduct(res.data));
  }, []);

  const handleDelete = (id:string) => {
    DeleteProduct(id).then(() => {router.push('/homePage')})
  }

  const handleEditProduct = (id: string) => { 
    console.log(router.query);
  }

  return (
    <div className="bg-white">
      <Header/>
      <HomePageClient/>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {listProduct.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.image}
               
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.nameProduct}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.material}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <div className="mt-6 flex w-full">
                <button onClick={() => handleDelete(product.id)}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Delete Product
                </button>
                <button onClick={() => handleEditProduct(product.id)}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  <Link href={{ pathname: "/updateProduct/", query: { id: product.id } }}>
                  Edit Product
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

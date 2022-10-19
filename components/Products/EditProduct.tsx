import { data } from "autoprefixer";
import axios from "axios";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import router, { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PostProduct } from "../../services/product";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../TipTap/MenuBar";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [fileSelect, setFileSelect] = useState<File>();
  const [nameProduct, setNameProduct] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [urlImg, setUrlImg] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
      localStorage.setItem("idProduct", router.query.id?.toString() ?? '');
  }, [router.isReady]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
          Detail product
      `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDetail(html);
    },
  });

  const onFileChange = async (e: any) => {
    setFileSelect(e.target.files[0]);
  };

  const handleUploadImg = async () => {
    console.log("file2", fileSelect);
    const formData = new FormData();

    formData.append("file", fileSelect || "");
    console.log("formData", typeof formData);

    formData.append("upload_preset", "my-uploads");
    PostProduct(formData);
  };

  const handleUpload = () => {
    axios({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/product/updateProduct`,
      data: {
        id: localStorage.getItem('idProduct'),
        nameProduct: nameProduct,
        price: price,
        material: material,
        color: color,
        description: description,
        urlImg: localStorage.getItem("img"),
        detail: detail,
      },
    });
    localStorage.clear();
  };
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center">
      <div className="bg-indigo-200">
        <div className="flex pt-6 items-center justify-around">
          <span>Name Product</span>
          <input
            id="nameProduct"
            name="nameProduct"
            onChange={(e) => setNameProduct(e.target.value)}
            type="text"
            autoComplete="current-name"
            required
            className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex pt-6 items-center justify-around">
          <span>Price</span>
          <input
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            autoComplete="current-price"
            required
            className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex pt-6 items-center justify-around">
          <span>Material</span>
          <input
            id="material"
            name="material"
            onChange={(e) => setMaterial(e.target.value)}
            type="text"
            autoComplete="current-material"
            required
            className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex pt-6 items-center justify-around">
          <span>Color</span>
          <input
            id="color"
            name="color"
            type="text"
            onChange={(e) => setColor(e.target.value)}
            autoComplete="current-color"
            required
            className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex pt-6 items-center justify-around">
          <span>Description</span>
          <input
            id="description"
            name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="current-description"
            required
            className="appearance-none block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="pt-6 items-center">
          <div></div>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <div className="flex pt-6 items-center">
          <span>Image</span>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(e) => {
              onFileChange(e);
            }}
            autoComplete="current-img"
            required
            className="appearance-none block w-1/3 px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleUploadImg}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Up Image
          </button>
          <button
            onClick={handleUpload}
            className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

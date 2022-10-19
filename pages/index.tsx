import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Register from "./register";
import Login from "./login";
import Product from './postProduct'
import styles from "../styles/Home.module.css";
const Home: NextPage = () => {
  return ( 
    <div>
      <Login/>
      {/* <Product/> */}
    </div>
  );
};

export default Home;

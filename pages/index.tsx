import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Router } from "next/router";
import Header from "../src/component/List/Header";
import CategoryList from "../src/component/List/CategoryList"
export default function Home() {



  return (
    <>
      <Header />
      <CategoryList />
    </>
  );
}

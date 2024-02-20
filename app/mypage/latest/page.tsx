"use client";

import React, { useState, useEffect } from "react";
import Latest from "@/components/mypage/content/latest";
import MyHeader from "@/components/mypage/myHeader";
import "../../../public/style/mypage/mypage.css";
import useUser from "@/libs/useUser";
import { useRouter } from "next/navigation";

export default function Condition() {
  const [menufold, setMenufold] = useState(false);

  useEffect(() => {
    const menufold = localStorage.getItem("menufold");
    if (menufold === "null") setMenufold(false);
    else if (menufold === "true") setMenufold(true);
    else if (menufold === "false") setMenufold(false);
  }, []);
  // 메뉴 상태값을 LocalStorage에 저장하는 함수
  const saveMenuStateToLocalStorage = (menufold: boolean) => {
    localStorage.setItem("menufold", menufold.toString());
  };

  const handleMenuClick = () => {
    const newMenufold = !menufold;
    setMenufold(newMenufold);
    saveMenuStateToLocalStorage(newMenufold);
  };

  const { data, isLoading, mutate } = useUser();
  const router = useRouter();
  if (!data?.ok && !isLoading) router.replace("/");

  return (
    <>
      {data?.ok && !isLoading && (
        <div id="wrap">
          <MyHeader isOpen={menufold} handleMenuClick={handleMenuClick}></MyHeader>
          <Latest isOpen={menufold}></Latest>
        </div>
      )}
    </>
  );
}

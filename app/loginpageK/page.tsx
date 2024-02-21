"use client";
import React from "react";

import Login from "@/components/loginpage/keywordLogin";
import "../../public/style/loginpage/loginpage.css";

export default function Mypage() {
  return (
    <>
      <div className="login_wrap">
        <Login></Login>
      </div>
    </>
  );
}

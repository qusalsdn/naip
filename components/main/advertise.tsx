import React from "react";

import Link from "next/link";

import Image from "next/image";
import LeftAd01 from "@/public/img/left_ad_01.jpg";
import LeftAd02 from "@/public/img/left_ad_02.jpg";
import RightAd01 from "@/public/img/right_ad_01.jpg";
import RightAd02 from "@/public/img/right_ad_02.jpg";

import "../../public/style/advertise.css";

export default function Advertise() {
  return (
    <div>
      <div className="leftAD">
        <Link href="#" className="l_ad_01">
          <Image src={LeftAd01} alt="ad01"></Image>
        </Link>
        <Link href="#" className="l_ad_02">
          <Image src={LeftAd02} alt="ad02"></Image>
        </Link>
      </div>
      <div className="rightAD">
        <Link href="#" className="r_ad_01">
          <Image src={RightAd01} alt="ad01"></Image>
        </Link>
        <Link href="#" className="r_ad_02">
          <Image src={RightAd02} alt="ad02"></Image>
        </Link>
      </div>
    </div>
  );
}

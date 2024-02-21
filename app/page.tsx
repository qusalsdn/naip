"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

/* 메인페이지 구성 컴포넌트 */
import MainBanner from "@/components/main/mainBanner";
import SearchBar from "@/components/main/searchBar";
import ProjectList from "@/components/main/projectList";
import FAQ from "@/components/main/faq";
import useSWR from "swr";

interface FormType {
  dateRadio: string;
  applicable: boolean;
  bidSelect: string;
  dateStart: string;
  dateEnd: string;
  condition: string;
  searchKeyword: string;
  exceptionKeyword: string;
  sourceSelect: string;
  announcementSelect: string;
  announcementSelectKeyword: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data;
  });

export default function Home() {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR("/api/main", fetcher);
  const { handleSubmit, register, setValue, getValues } = useForm<FormType>({
    defaultValues: {
      dateRadio: "dateAll",
      applicable: false,
      bidSelect: "bidEnd",
      dateStart: "",
      dateEnd: "",
      condition: "or",
      searchKeyword: "",
      exceptionKeyword: "",
      sourceSelect: "",
      announcementSelect: "",
      announcementSelectKeyword: "",
    },
  });

  const onSubmit = async (formData: FormType) => {
    let exceptionString = "";
    if (formData.exceptionKeyword !== "") {
      const splitExceptionArr = formData.exceptionKeyword.split(",");
      let string = "";
      splitExceptionArr.forEach((item: string) => {
        if (item.trim() !== "") return (string += `${item},true/`);
      });
      exceptionString = string.slice(0, -1);
      let exceptionKeywordArr = exceptionString.split("/");
      exceptionKeywordArr = exceptionKeywordArr.map((item: string) => {
        const splitArr = item.split(",");
        return splitArr[0].trim() + `,${splitArr[1].trim()}`;
      });
      exceptionString = "";
      exceptionKeywordArr.forEach((item: string) => {
        exceptionString += `${item}/`;
      });
    }
    let searchString = "";
    if (formData.searchKeyword !== "") {
      const splitExceptionArr = formData.searchKeyword.split(",");
      let string = "";
      splitExceptionArr.forEach((item: string) => {
        if (item.trim() !== "") return (string += `${item},true/`);
      });
      searchString = string.slice(0, -1);
      let searchKeywordArr = searchString.split("/");
      searchKeywordArr = searchKeywordArr.map((item: string) => {
        const splitArr = item.split(",");
        return splitArr[0].trim() + `,${splitArr[1].trim()}`;
      });
      searchString = "";
      searchKeywordArr.forEach((item: string) => {
        searchString += `${item}/`;
      });
    }
    router.push(
      `/searchpage?dateRadio=${formData.dateRadio}&applicable=${formData.applicable}&bidSelect=${
        formData.bidSelect
      }&dateStart=${formData.dateStart}&dateEnd=${formData.dateEnd}&dateRadio=${
        formData.dateRadio
      }&condition=${formData.condition}&searchKeyword=${searchString.slice(
        0,
        -1
      )}&exceptionKeyword=${exceptionString.slice(0, -1)}&sourceSelect=${
        formData.sourceSelect
      }&announcementSelect=${formData.announcementSelect}&announcementSelectKeyword=${
        formData.announcementSelectKeyword
      }&page=1`
    );
  };

  const calculationDate = (minusDate: number) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const today = `${year}-${month}-${day}`;
    const calculationDate = new Date(date);
    calculationDate.setMonth(date.getMonth() - minusDate);
    const fewMonthAgo = calculationDate.toLocaleDateString().split(".");
    fewMonthAgo[1] = fewMonthAgo[1].slice(1).padStart(2, "0");
    fewMonthAgo[2] = fewMonthAgo[2].slice(1).padStart(2, "0");
    setValue("dateStart", `${fewMonthAgo[0]}-${fewMonthAgo[1]}-${fewMonthAgo[2]}`);
    setValue("dateEnd", today);
    setValue("applicable", false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const today = `${year}-${month}-${day}`;
    const radioBtnValue = e.target.value;
    if (radioBtnValue === "dateAll") {
      setValue("bidSelect", "bidEnd");
      setValue("dateStart", "");
      setValue("dateEnd", "");
    } else if (radioBtnValue === "on") {
      setValue("bidSelect", "bidEnd");
      setValue("dateRadio", "dateAll");
      setValue("dateStart", "");
      setValue("dateEnd", "");
    } else if (radioBtnValue === "toDayRegistration") {
      setValue("bidSelect", "announcementPosting");
      setValue("dateStart", today);
      setValue("dateEnd", today);
      setValue("applicable", false);
    } else if (radioBtnValue === "todayDeadline") {
      setValue("bidSelect", "bidEnd");
      setValue("dateStart", today);
      setValue("dateEnd", today);
      setValue("applicable", false);
    } else if (radioBtnValue === "1month") {
      calculationDate(1);
    } else if (radioBtnValue === "3month") {
      calculationDate(3);
    } else if (radioBtnValue === "6month") {
      calculationDate(6);
    }
  };
  const onClickApplicable = () => {
    if (!getValues("applicable")) {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const today = `${year}-${month}-${day}`;
      setValue("bidSelect", "bidEnd");
      setValue("dateStart", today);
      setValue("dateEnd", "");
      setValue("dateRadio", "dateAll");
    }
  };
  const dateOnChange = () => {
    setValue("dateRadio", "");
    setValue("applicable", false);
  };

  return (
    <>
      {/* 동적배너 + 로그인영역 */}
      <MainBanner
        mainMutate={mutate}
        bookMarkCount={data?.bookMarkCount}
        recentAnnouncementCount={data?.recentAnnouncementCount}
      ></MainBanner>

      {/* 검색 바 */}
      <SearchBar
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        onChange={onChange}
        data={data}
        onClickApplicable={onClickApplicable}
        dateOnChange={dateOnChange}
      ></SearchBar>

      {/* 카드형식 공고리스트 */}
      <ProjectList data={data} isLoading={isLoading} mutate={mutate}></ProjectList>

      {/* 공지사항 및 바로가기 영역 */}
      {/* <Notice></Notice> */}

      {/* 정부공개자료 및 FAQ 영역 */}
      <FAQ></FAQ>
    </>
  );
}

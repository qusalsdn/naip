"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import SearchAreaNew from "@/components/searchpage/searchareaNew";
import SearchResult from "@/components/searchpage/searchresult";

import "../../public/style/projectlist.css";

interface FormType {
  dateRadio: string;
  applicable: boolean;
  bidSelect: string;
  dateStart: string;
  dateEnd: string;
  condition: string;
  searchKeyword: string;
  exceptionKeyword: string;
  announcementSelect: string;
  announcementSelectKeyword: string;
  filterName: string;
  pageCount: string;
  reAnnouncementSelect: string;
  reSearchKeyword: string;
  divisionType: string;
  location: string;
}

interface FilterOptionsType {
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
  reAnnouncementSelect: string;
  reSearchKeyword: string;
  divisionType: string;
}

type DataType = {
  resData: any;
  searchKeywordArr: any;
  exceptionKeywordArr: any;
  filterNames: any;
  msg: string;
  totalCount: number;
  pageCount: number;
  filterOptions: FilterOptionsType;
};

export default function SearchPage() {
  const { handleSubmit, register, setValue, getValues, reset } = useForm<FormType>({
    defaultValues: {
      dateRadio: "",
      applicable: false,
      bidSelect: "bidEnd",
      dateStart: "",
      dateEnd: "",
      condition: "or",
      searchKeyword: "",
      exceptionKeyword: "",
      announcementSelect: "announcementAll",
      announcementSelectKeyword: "",
      pageCount: "10",
      reAnnouncementSelect: "name",
      reSearchKeyword: "",
      divisionType: "",
      location: "locationAll",
    },
  });
  const params = useSearchParams();
  const [data, setData] = useState<DataType>({
    resData: [],
    searchKeywordArr: [],
    exceptionKeywordArr: [],
    filterNames: [],
    msg: "",
    totalCount: 0,
    pageCount: 10,
    filterOptions: {
      dateRadio: "",
      applicable: false,
      bidSelect: "",
      dateStart: "",
      dateEnd: "",
      condition: "",
      searchKeyword: "",
      exceptionKeyword: "",
      sourceSelect: "",
      announcementSelect: "",
      announcementSelectKeyword: "",
      reAnnouncementSelect: "",
      reSearchKeyword: "",
      divisionType: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [toggleExecptionStates, setToggleExecptionStates] = useState<boolean[]>([]);
  const [toggleSearchStates, setToggleSearchStates] = useState<boolean[]>([]);
  const [checked, setChecked] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/search?dateRadio=${params.get("dateRadio")}&applicable=${params.get(
          "applicable"
        )}&bidSelect=${params.get("bidSelect")}&dateStart=${params.get(
          "dateStart"
        )}&dateEnd=${params.get("dateEnd")}&condition=${params.get(
          "condition"
        )}&searchKeyword=${params.get("searchKeyword")}&exceptionKeyword=${params.get(
          "exceptionKeyword"
        )}&sourceSelect=${params.get("sourceSelect")}&announcementSelect=${params.get(
          "announcementSelect"
        )}&announcementSelectKeyword=${params.get("announcementSelectKeyword")}&page=1&pageCount=10`
      )
      .then((res) => {
        let searchString = "";
        if (params.get("searchKeyword") !== "") {
          const splitArr = params.get("searchKeyword")?.split("/");
          splitArr?.forEach((item: string) => {
            searchString += item.split(",")[0] + ",";
          });
        }
        let exceptionString = "";
        if (params.get("exceptionKeyword") !== "") {
          const splitArr = params.get("exceptionKeyword")?.split("/");
          splitArr?.forEach((item: string) => {
            exceptionString += item.split(",")[0] + ",";
          });
        }
        setValue("dateRadio", params.has("dateRadio") ? `${params.get("dateRadio")}` : "dateAll");
        setValue("applicable", params.get("applicable") === "true" ? true : false);
        setValue("bidSelect", params.has("bidSelect") ? `${params.get("bidSelect")}` : "bidEnd");
        setValue("dateStart", params.has("dateStart") ? `${params.get("dateStart")}` : "");
        setValue("dateEnd", params.has("dateEnd") ? `${params.get("dateEnd")}` : "");
        setValue("condition", params.has("condition") ? `${params.get("condition")}` : "or");
        setValue(
          "searchKeyword",
          params.get("searchKeyword") !== "" ? searchString.slice(0, -1) : ""
        );
        setValue(
          "exceptionKeyword",
          params.get("exceptionKeyword") !== "" ? exceptionString.slice(0, -1) : ""
        );
        setValue(
          "announcementSelect",
          params.has("announcementSelect") ? `${params.get("announcementSelect")}` : ""
        );
        setValue(
          "announcementSelectKeyword",
          params.has("announcementSelectKeyword")
            ? `${params.get("announcementSelectKeyword")}`
            : ""
        );
        setData(res.data);
        setToggleExecptionStates(Array(res.data.exceptionKeywordArr.length).fill(true));
        setToggleSearchStates(Array(res.data.searchKeywordArr.length).fill(true));
        handleCondtionChecked2("announcementAll");
        setLoading(false);
      });
  }, [params, setValue]);

  const onSubmit = async (formData: FormType) => {
    setLoading(true);
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
    let sourceSelect = "";
    if (!buttonStates["sourceSelectAll"]) {
      Object.keys(buttonStates).forEach((item) => {
        if (buttonStates[item]) sourceSelect += `${item},`;
      });
    }
    let type = "";
    if (!buttonStates2["typeAll"]) {
      Object.keys(buttonStates2).forEach((item) => {
        if (buttonStates2[item]) type += `${item},`;
      });
    }
    axios
      .get(
        `/api/search?dateRadio=${formData.dateRadio}&applicable=${formData.applicable}&bidSelect=${
          formData.bidSelect
        }&dateStart=${formData.dateStart}&dateEnd=${formData.dateEnd}&dateRadio=${
          formData.dateRadio
        }&condition=${formData.condition}&searchKeyword=${encodeURIComponent(
          searchString.slice(0, -1)
        )}&exceptionKeyword=${encodeURIComponent(exceptionString.slice(0, -1))}&sourceSelect=${
          buttonStates["sourceSelectAll"] ? "" : sourceSelect.slice(0, -1)
        }&announcementSelect=${formData.announcementSelect}&announcementSelectKeyword=${
          formData.announcementSelectKeyword
        }&location=${formData.location}&announcementType=${type}&page=1&pageCount=${getValues(
          "pageCount"
        )}&reAnnouncementSelect=${formData.reAnnouncementSelect}&reSearchKeyword=${
          formData.reSearchKeyword
        }&divisionType=${buttonStates2["typeAll"] ? "" : type.slice(0, -1)}&amountStart=${
          markers[val1[0]]
        }&amountEnd=${markers[val1[1]]}`
      )
      .then((res) => {
        setPage(1);
        setData(res.data);
        setToggleExecptionStates(Array(res.data.exceptionKeywordArr.length).fill(true));
        setToggleSearchStates(Array(res.data.searchKeywordArr.length).fill(true));
        setLoading(false);
      });
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
    const radioBtnValue = e.target.value;
    setChecked(radioBtnValue);
    if (radioBtnValue === "1month") {
      setValue("applicable", false);
      calculationDate(1);
    } else if (radioBtnValue === "3month") {
      setValue("applicable", false);
      calculationDate(3);
    } else if (radioBtnValue === "6month") {
      setValue("applicable", false);
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
      setChecked("");
    }
  };
  const dateOnChange = () => {
    setValue("dateRadio", "");
    setValue("applicable", false);
    setChecked("");
  };

  const onClickSearchFilterSaveBtn = () => {
    setLoading(true);
    const formData: FormType = getValues();
    if (formData.filterName == "") {
      alert("검색조건 이름을 입력해주세요.");
      setLoading(false);
      return;
    } else if (formData.filterName.trim().length === 0) {
      alert("검색조건 이름은 빈값으로 저장할 수 없습니다.");
      setLoading(false);
      return;
    }
    let sourceSelect = "";
    if (!buttonStates[""]) {
      Object.keys(buttonStates).forEach((item) => {
        if (buttonStates[item]) sourceSelect += `${item},`;
      });
    }
    let type = "";
    if (!buttonStates2["typeAll"]) {
      Object.keys(buttonStates2).forEach((item) => {
        if (buttonStates2[item]) type += `${item},`;
      });
    }
    axios
      .get(
        `/api/searchFilter/save?dateRadio=${formData.dateRadio}&applicable=${
          formData.applicable
        }&bidSelect=${formData.bidSelect}&dateStart=${formData.dateStart}&dateEnd=${
          formData.dateEnd
        }&dateRadio=${formData.dateRadio}&condition=${formData.condition}&searchKeyword=${
          formData.searchKeyword
        }&exceptionKeyword=${
          formData.exceptionKeyword
        }&sourceSelect=${sourceSelect}&announcementSelect=${
          formData.announcementSelect
        }&announcementSelectKeyword=${formData.announcementSelectKeyword}&filterName=${
          formData.filterName
        }&location=${formData.location}&announcementType=${type}&amountStart=${
          markers[val1[0]]
        }&amountEnd=${markers[val1[1]]}&page=${page}&pageCount=${data.pageCount}`
      )
      .then((res) => {
        if (res.data.ok) {
          axios
            .get(
              `/api/search?dateRadio=${data.filterOptions.dateRadio}&applicable=${
                data.filterOptions.applicable
              }&bidSelect=${data.filterOptions.bidSelect}&dateStart=${
                data.filterOptions.dateStart
              }&dateEnd=${data.filterOptions.dateEnd}&dateRadio=${
                data.filterOptions.dateRadio
              }&condition=${data.filterOptions.condition}&searchKeyword=${
                data.filterOptions.searchKeyword
              }&exceptionKeyword=${data.filterOptions.exceptionKeyword}&sourceSelect=${
                data.filterOptions.sourceSelect
              }&announcementSelect=${
                data.filterOptions.announcementSelect
              }&announcementSelectKeyword=${
                data.filterOptions.announcementSelectKeyword
              }&location=${formData.location}&announcementType=${type}&amountStart=${
                markers[val1[0]]
              }&amontEnd=${markers[val1[1]]}&page=${page}&pageCount=${data.pageCount}`
            )
            .then((res) => {
              setData(res.data);
              setLoading(false);
            });
          setValue("filterName", "");
        } else alert("일치하는 유저가 없습니다.");
      });
  };

  const formReset = () => {
    reset();
    handleCondtionChecked("or");
    handleCondtionChecked2("announcementAll");
    handleButtonClick("sourceSelectAll");
    handleButtonClick2("typeAll");
    setVal1([0, 9]);
    axios
      .get(
        `/api/search?dateRadio=${getValues("dateRadio")}&applicable=${getValues(
          "applicable"
        )}&bidSelect=${getValues("bidSelect")}&dateStart=${getValues(
          "dateStart"
        )}&dateEnd=${getValues("dateEnd")}&dateRadio=${getValues(
          "dateRadio"
        )}&condition=${getValues(
          "condition"
        )}&searchKeyword=&exceptionKeyword=&sourceSelect=sourceSelectAll&announcementSelect=${getValues(
          "announcementSelect"
        )}&announcementSelectKeyword=${getValues("announcementSelectKeyword")}&location=${getValues(
          "location"
        )}&page=1&pageCount=10&reAnnouncementSelect=${getValues(
          "reAnnouncementSelect"
        )}&reSearchKeyword=${getValues(
          "reSearchKeyword"
        )}&divisionType=typeAll&amountStart=0원&amountEnd=100억원 이상`
      )
      .then((res) => {
        setPage(1);
        setData(res.data);
      });
  };

  const onChangePage = (pageNumber: number) => {
    let exceptionString = "";
    if (getValues("exceptionKeyword") !== "") {
      const splitExceptionArr = getValues("exceptionKeyword").split(",");
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
    if (getValues("searchKeyword") !== "") {
      const splitExceptionArr = getValues("searchKeyword").split(",");
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
    let sourceSelect = "";
    if (!buttonStates["sourceSelectAll"]) {
      Object.keys(buttonStates).forEach((item) => {
        if (buttonStates[item]) sourceSelect += `${item},`;
      });
    }
    let type = "";
    if (!buttonStates2["typeAll"]) {
      Object.keys(buttonStates2).forEach((item) => {
        if (buttonStates2[item]) type += `${item},`;
      });
    }
    axios
      .get(
        `/api/search?dateRadio=${getValues("dateRadio")}&applicable=${getValues(
          "applicable"
        )}&bidSelect=${getValues("bidSelect")}&dateStart=${getValues(
          "dateStart"
        )}&dateEnd=${getValues("dateEnd")}&dateRadio=${getValues(
          "dateRadio"
        )}&condition=${getValues("condition")}&searchKeyword=${searchString.slice(
          0,
          -1
        )}&exceptionKeyword=${exceptionString.slice(0, -1)}&sourceSelect=${
          buttonStates["sourceSelectAll"] ? "" : sourceSelect.slice(0, -1)
        }&announcementSelect=${getValues(
          "announcementSelect"
        )}&announcementSelectKeyword=${getValues("announcementSelectKeyword")}&location=${getValues(
          "location"
        )}&page=${pageNumber}&pageCount=${getValues("pageCount")}&reAnnouncementSelect=${getValues(
          "reAnnouncementSelect"
        )}&reSearchKeyword=${getValues("reSearchKeyword")}&divisionType=${
          buttonStates2["typeAll"] ? "" : type.slice(0, -1)
        }&amountStart=${markers[val1[0]]}&amountEnd=${markers[val1[1]]}`
      )
      .then((res) => {
        setPage(pageNumber);
        setData(res.data);
      });
  };

  const onChangePageCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let exceptionString = "";
    if (getValues("exceptionKeyword") !== "") {
      const splitExceptionArr = getValues("exceptionKeyword").split(",");
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
    if (getValues("searchKeyword") !== "") {
      const splitExceptionArr = getValues("searchKeyword").split(",");
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
    let sourceSelect = "";
    if (!buttonStates["sourceSelectAll"]) {
      Object.keys(buttonStates).forEach((item) => {
        if (buttonStates[item]) sourceSelect += `${item},`;
      });
    }
    let type = "";
    if (!buttonStates2["typeAll"]) {
      Object.keys(buttonStates2).forEach((item) => {
        if (buttonStates2[item]) type += `${item},`;
      });
    }
    axios
      .get(
        `/api/search?dateRadio=${getValues("dateRadio")}&applicable=${getValues(
          "applicable"
        )}&bidSelect=${getValues("bidSelect")}&dateStart=${getValues(
          "dateStart"
        )}&dateEnd=${getValues("dateEnd")}&dateRadio=${getValues(
          "dateRadio"
        )}&condition=${getValues("condition")}&searchKeyword=${searchString.slice(
          0,
          -1
        )}&exceptionKeyword=${exceptionString.slice(0, -1)}&sourceSelect=${
          buttonStates["sourceSelectAll"] ? "" : sourceSelect.slice(0, -1)
        }&announcementSelect=${getValues(
          "announcementSelect"
        )}&announcementSelectKeyword=${getValues("announcementSelectKeyword")}&location=${getValues(
          "location"
        )}&page=1&pageCount=${e.target.value}&reAnnouncementSelect=${getValues(
          "reAnnouncementSelect"
        )}&reSearchKeyword=${getValues("reSearchKeyword")}&divisionType=${
          buttonStates2["typeAll"] ? "" : type.slice(0, -1)
        }&amountStart=${markers[val1[0]]}&amountEnd=${markers[val1[1]]}`
      )
      .then((res) => {
        setPage(1);
        setData(res.data);
      });
  };

  const toggleStar = (listId: number, bookMarkCheck: boolean) => {
    if (bookMarkCheck) {
      setLoading(true);
      axios.post("api/bookMark", { listId, bookMarkCheck }).then((res) => {
        if (res.data.ok) {
          axios
            .get(
              `/api/search?dateRadio=${data.filterOptions.dateRadio}&applicable=${data.filterOptions.applicable}&bidSelect=${data.filterOptions.bidSelect}&dateStart=${data.filterOptions.dateStart}&dateEnd=${data.filterOptions.dateEnd}&condition=${data.filterOptions.condition}&searchKeyword=${data.filterOptions.searchKeyword}&exceptionKeyword=${data.filterOptions.exceptionKeyword}&sourceSelect=${data.filterOptions.sourceSelect}&announcementSelect=${data.filterOptions.announcementSelect}&announcementSelectKeyword=${data.filterOptions.announcementSelectKeyword}&page=${page}&pageCount=${data.pageCount}&reAnnouncementSelect=${data.filterOptions.reAnnouncementSelect}&reSearchKeyword=${data.filterOptions.reSearchKeyword}`
            )
            .then((res) => {
              setData(res.data);
              setLoading(false);
            });
        } else handleAlertOn();
      });
    } else {
      axios.post("api/bookMark", { listId, bookMarkCheck }).then((res) => {
        if (res.data.ok) {
          axios
            .get(
              `/api/search?dateRadio=${data.filterOptions.dateRadio}&applicable=${data.filterOptions.applicable}&bidSelect=${data.filterOptions.bidSelect}&dateStart=${data.filterOptions.dateStart}&dateEnd=${data.filterOptions.dateEnd}&condition=${data.filterOptions.condition}&searchKeyword=${data.filterOptions.searchKeyword}&exceptionKeyword=${data.filterOptions.exceptionKeyword}&sourceSelect=${data.filterOptions.sourceSelect}&announcementSelect=${data.filterOptions.announcementSelect}&announcementSelectKeyword=${data.filterOptions.announcementSelectKeyword}&page=${page}&pageCount=${data.pageCount}&reAnnouncementSelect=${data.filterOptions.reAnnouncementSelect}&reSearchKeyword=${data.filterOptions.reSearchKeyword}`
            )
            .then((res) => {
              setData(res.data);
              setLoading(false);
            });
        } else handleAlertOn();
      });
    }
  };

  const onClickToggle = (toggleObj: any) => {
    setLoading(true);
    let toggleExceptionString = "";
    for (const key in toggleObj.exception) {
      toggleExceptionString += `${key},${toggleObj.exception[key]}/`;
    }
    let toggleSearchString = "";
    for (const key in toggleObj.search) {
      toggleSearchString += `${key},${toggleObj.search[key]}/`;
    }
    let sourceSelect = "";
    if (!buttonStates[""]) {
      Object.keys(buttonStates).forEach((item) => {
        if (buttonStates[item]) sourceSelect += `${item},`;
      });
    }
    let type = "";
    if (!buttonStates2["typeAll"]) {
      Object.keys(buttonStates2).forEach((item) => {
        if (buttonStates2[item]) type += `${item},`;
      });
    }
    axios
      .get(
        `/api/search?dateRadio=${getValues("dateRadio")}&applicable=${getValues(
          "applicable"
        )}&bidSelect=${getValues("bidSelect")}&dateStart=${getValues(
          "dateStart"
        )}&dateEnd=${getValues("dateEnd")}&dateRadio=${getValues(
          "dateRadio"
        )}&condition=${getValues("condition")}&searchKeyword=${toggleSearchString.slice(
          0,
          -1
        )}&exceptionKeyword=${toggleExceptionString.slice(0, -1)}&sourceSelect=${
          buttonStates["sourceSelectAll"] ? "" : sourceSelect.slice(0, -1)
        }&announcementSelect=${getValues(
          "announcementSelect"
        )}&announcementSelectKeyword=${getValues("announcementSelectKeyword")}&location=${getValues(
          "location"
        )}&page=1&pageCount=${getValues("pageCount")}&reAnnouncementSelect=${getValues(
          "reAnnouncementSelect"
        )}&reSearchKeyword=${getValues("reSearchKeyword")}&divisionType=${
          buttonStates2["typeAll"] ? "" : type.slice(0, -1)
        }&amountStart=${markers[val1[0]]}&amountEnd=${markers[val1[1]]}`
      )
      .then((res) => {
        setPage(1);
        setData(res.data);
        setLoading(false);
      });
  };

  //경고창 상태
  const [alertOn, setAlertOn] = useState(false);

  const handleAlertOn = () => {
    setAlertOn(true);
  };

  const handleAlertOff = () => {
    setAlertOn(false);
  };

  //출처 버튼 토글
  const buttonData = [
    { id: "sourceSelectAll", text: "전체" },
    { id: "ntis", text: "국가과학기술지식정보서비스(NTIS)" },
    { id: "madang", text: "기업마당" },
    { id: "nara", text: "나라장터" },
    { id: "iris", text: "범부처통합연구지원시스템(IRIS)" },
    { id: "kdn", text: "기타 공기업" },
  ];

  const [buttonStates, setButtonStates] = useState(
    buttonData.reduce((acc: any, button: any) => {
      acc[button.id] = button.id === "sourceSelectAll";
      return acc;
    }, {})
  );

  const handleButtonClick = (button: any) => {
    if (button === "sourceSelectAll") {
      const updatedStates = Object.keys(buttonStates).reduce((acc: any, key: any) => {
        acc[key] = key === "sourceSelectAll";
        return acc;
      }, {});
      setButtonStates(updatedStates);
    } else {
      setButtonStates((prevStates: any) => ({
        ...prevStates,
        sourceSelectAll: false,
        [button]: !prevStates[button],
      }));
    }
  };

  //타입 버튼 토글
  const buttonData2 = [
    { id: "typeAll", text: "전체" },
    { id: "일반", text: "일반" },
    { id: "긴급", text: "긴급" },
    { id: "사전", text: "사전" },
    { id: "재공고", text: "재공고" },
  ];

  const [buttonStates2, setButtonStates2] = useState(
    buttonData2.reduce((acc: any, button: any) => {
      acc[button.id] = button.id === "typeAll";
      return acc;
    }, {})
  );

  const handleButtonClick2 = (button: any) => {
    if (button === "typeAll") {
      const updatedStates2 = Object.keys(buttonStates2).reduce((acc: any, key: any) => {
        acc[key] = key === "typeAll";
        return acc;
      }, {});
      setButtonStates2(updatedStates2);
    } else {
      setButtonStates2((prevStates2: any) => ({
        ...prevStates2,
        typeAll: false,
        [button]: !prevStates2[button],
      }));
    }
  };

  //사업금액 드래그 바
  const [val1, setVal1] = useState([0, 9]);
  const [markers, setMarkers] = useState<any>({
    0: "0원",
    1: "1천만원",
    2: "3천만원",
    3: "5천만원",
    4: "1억원",
    5: "5억원",
    6: "10억원",
    7: "30억원",
    8: "50억원",
    9: "100억원 이상",
  });

  //커스텀 라디오 버튼
  const [conditionChecked, setConditionChecked] = useState("or");

  const handleCondtionChecked = (value: string) => {
    setConditionChecked(value);
  };
  //커스텀 라디오 버튼2
  const [conditionChecked2, setConditionChecked2] = useState("");

  const handleCondtionChecked2 = (value: string) => {
    setConditionChecked2(value);
  };

  return (
    <>
      {/* <SearchArea
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        onChange={onChange}
        onClickApplicable={onClickApplicable}
        dateOnChange={dateOnChange}
        setValue={setValue}
        onClickSearchFilterSaveBtn={onClickSearchFilterSaveBtn}
        filterNames={data.filterNames}
        formReset={formReset}
        getValues={getValues}
      ></SearchArea> */}
      <SearchAreaNew
        handleSubmit={handleSubmit}
        register={register}
        onSubmit={onSubmit}
        onChange={onChange}
        onClickApplicable={onClickApplicable}
        dateOnChange={dateOnChange}
        setValue={setValue}
        onClickSearchFilterSaveBtn={onClickSearchFilterSaveBtn}
        filterNames={data.filterNames}
        formReset={formReset}
        getValues={getValues}
        checked={checked}
        applicableChecked={getValues("applicable")}
        buttonStates={buttonStates}
        buttonData={buttonData}
        handleButtonClick={handleButtonClick}
        buttonStates2={buttonStates2}
        buttonData2={buttonData2}
        handleButtonClick2={handleButtonClick2}
        markers={markers}
        val1={val1}
        setVal1={setVal1}
        conditionChecked={conditionChecked}
        handleCondtionChecked={handleCondtionChecked}
        conditionChecked2={conditionChecked2}
        handleCondtionChecked2={handleCondtionChecked2}
      ></SearchAreaNew>
      <SearchResult
        data={data}
        loading={loading}
        page={page}
        onChangePage={onChangePage}
        onChangePageCount={onChangePageCount}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        toggleStar={toggleStar}
        onClickToggle={onClickToggle}
        toggleExecptionStates={toggleExecptionStates}
        toggleSearchStates={toggleSearchStates}
        setToggleExecptionStates={setToggleExecptionStates}
        setToggleSearchStates={setToggleSearchStates}
      ></SearchResult>
      {alertOn && (
        <div className="alert_scrap">
          <div className="alert_scrap_content">
            <p>관심공고 저장 기능은 로그인 후 이용가능합니다.</p>
            <button onClick={handleAlertOff}>확인</button>
          </div>
        </div>
      )}
    </>
  );
}

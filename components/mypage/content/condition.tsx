"use client";

import React, { useEffect, useState } from "react";
import MyFooter from "@/components/mypage/myFooter";
import "../../../public/style/projectlist.css";
import "../../../public/style/mypage/condition.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faXmark } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import axios from "axios";
import { useForm } from "react-hook-form";

interface FilterType {
  id: number;
  filterName: string;
  bidSelect: string;
  dateStart: string;
  dateEnd: string;
  conditionAndOr: string;
  sourceSelect: string;
  announcementSelect: string;
  announcementSelectKeyword: string;
  searchKeyword: string;
  exceptionKeyword: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.data.ok) return res.data.cardData;
  });

export default function ConditionComponent({ isOpen }: any) {
  const {
    data: cardData,
    isLoading,
    mutate,
  } = useSWR<FilterType[]>("/api/mypage/condition", fetcher);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      id: 0,
      filterName: "",
      bidSelect: "bidEnd",
      dateStart: "",
      dateEnd: "",
      conditionAndOr: "or",
      sourceSelect: "",
      announcementSelect: "",
      announcementSelectKeyword: "",
      searchKeyword: "",
      exceptionKeyword: "",
    },
  });

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

  //검색 조건 만들기 버튼 클릭
  const [createCondition, setCreateCondition] = useState(false);

  const popUpBtn = () => {
    setCreateCondition(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setCreateCondition(false);
    document.body.style.overflow = "auto";
    reset();
  };

  //검색조건 수정
  const [reviseCondition, setReviseCondition] = useState(false);

  const reviseConditionBtn = () => {
    setReviseCondition(true);
    setModifyStates(Array(cardData?.length).fill(false)); // modifyStates의 상태값을 모두 false로 변경

    setDetailCondition(false);
    document.body.style.overflow = "hidden";

    if (cardData) {
      setValue("filterName", cardData[arrIndex].filterName);
      setValue("bidSelect", cardData[arrIndex].bidSelect);
      setValue("dateStart", cardData[arrIndex].dateStart);
      setValue("dateEnd", cardData[arrIndex].dateEnd);
      setValue("conditionAndOr", cardData[arrIndex].conditionAndOr);
      setValue("sourceSelect", cardData[arrIndex].sourceSelect);
      setValue("announcementSelect", cardData[arrIndex].announcementSelect);
      setValue("announcementSelectKeyword", cardData[arrIndex].announcementSelectKeyword);
      setValue("exceptionKeyword", cardData[arrIndex].exceptionKeyword);
      setValue("searchKeyword", cardData[arrIndex].searchKeyword);
    }
  };

  const closeReviseCondition = () => {
    setReviseCondition(false);
    document.body.style.overflow = "auto";
    reset();
  };

  //이벤트 전파 막기
  const prevent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  //수정, 삭제버튼 토글
  const [modifyStates, setModifyStates] = useState(Array(cardData?.length).fill(false));

  const toggleModify = (e: React.MouseEvent, index: number, id: number) => {
    e.stopPropagation();
    const newModifyStates = [...modifyStates];
    newModifyStates[index] = !newModifyStates[index];
    setModifyStates(newModifyStates);
    setonClickFilterId(id);
    setArrIndex(index);
  };

  const handleOutsideClick = () => {
    if (modifyStates.some((state) => state === true)) {
      setModifyStates(Array(modifyStates.length).fill(false));
    }
  };

  //관리모드 실행하기
  const [manageMode, setManageMode] = useState(false);

  const toggleManageMode = () => {
    setManageMode(!manageMode);
    setCheckedIds([]);
    setCheckedItems(Array(cardData?.length).fill(false));
  };
  //체크박스
  const [checkedItems, setCheckedItems] = useState(Array(cardData?.length).fill(false));

  //검색 조건 상세보기 모달
  const [detailCondition, setDetailCondition] = useState(false);
  const [arrIndex, setArrIndex] = useState(0);

  const popUpBtnDetail = (id: number, index: number) => {
    if (manageMode) {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
      if (!checkedIds.includes(id)) {
        setCheckedIds([...checkedIds, id]);
      } else {
        let newCheckedIds = checkedIds;
        newCheckedIds = newCheckedIds.filter((checkedId) => checkedId !== id);
        setCheckedIds(newCheckedIds);
      }
      return; // manageMode가 true일 때는 클릭 이벤트를 무시하고 함수 실행 종료
    }
    setonClickFilterId(id);
    setArrIndex(index);
    setDetailCondition(true);
    document.body.style.overflow = "hidden";
  };

  const closePopupDetail = () => {
    setDetailCondition(false);
    document.body.style.overflow = "auto";
  };

  // 검색 조건 만들기
  const onSubmitConditionCreate = (data: FilterType) => {
    axios
      .post("/api/mypage/condition/create", {
        filterName: data.filterName,
        bidSelect: data.bidSelect,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        conditionAndOr: data.conditionAndOr,
        sourceSelect: data.sourceSelect,
        announcementSelect: data.announcementSelect,
        announcementSelectKeyword: data.announcementSelectKeyword,
        exceptionKeyword: data.exceptionKeyword,
        searchKeyword: data.searchKeyword,
      })
      .then((res) => {
        if (res.data.ok) {
          setCreateCondition(false);
          document.body.style.overflow = "auto";
          reset();
          mutate();
        } else alert("유저 정보가 존재하지 않습니다.");
      });
  };

  // 검색조건 수정하기
  const [onClickFilterId, setonClickFilterId] = useState(0);
  const onSubmitConditionUpdate = (data: FilterType) => {
    axios
      .post("/api/mypage/condition/update", {
        id: onClickFilterId,
        filterName: data.filterName,
        bidSelect: data.bidSelect,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        conditionAndOr: data.conditionAndOr,
        sourceSelect: data.sourceSelect,
        announcementSelect: data.announcementSelect,
        announcementSelectKeyword: data.announcementSelectKeyword,
        exceptionKeyword: data.exceptionKeyword,
        searchKeyword: data.searchKeyword,
      })
      .then((res) => {
        if (res.data.ok) {
          setReviseCondition(false);
          document.body.style.overflow = "auto";
          reset();
          mutate();
        } else alert("유저 정보가 존재하지 않습니다.");
      });
  };

  // 검색조건 삭제
  const onClickDeleteBtn = () => {
    axios.delete(`/api/mypage/condition/delete?ids=${onClickFilterId}`).then((res) => {
      if (res.data.ok) mutate();
      else alert("유저 정보가 존재하지 않습니다.");
    });
  };

  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  // 검색 조건 관리(선택 삭제)
  const onClickSelectedDeleteBtn = () => {
    if (checkedIds.length !== 0) {
      const confirm = window.confirm("정말 삭제하시겠습니까?");
      if (confirm) {
        let urlQuery = "";
        checkedIds.forEach((id) => {
          urlQuery += `${id},`;
        });
        axios.delete(`/api/mypage/condition/delete?ids=${urlQuery.slice(0, -1)}`).then((res) => {
          if (res.data.ok) {
            mutate();
            setManageMode(!manageMode);
            setCheckedIds([]);
            setCheckedItems(Array(cardData?.length).fill(false));
          } else alert("유저 정보가 존재하지 않습니다.");
        });
      }
    } else alert("선택된 검색 조건이 없습니다.");
  };
  // 검색 조건 관리(전체 삭제)
  // const onClickAllDeleteBtn = () => {
  //   if (cardData?.length !== 0) {
  //     const confirm = window.confirm("정말 전체 삭제를 하시겠습니까?");
  //     if (confirm) {
  //       let urlQuery = "";
  //       cardData?.forEach((item) => {
  //         urlQuery += `${item.id},`;
  //       });
  //       axios.delete(`/api/mypage/condition/delete?ids=${urlQuery.slice(0, -1)}`).then((res) => {
  //         if (res.data.ok) {
  //           mutate();
  //           setManageMode(!manageMode);
  //           setCheckedIds([]);
  //           setCheckedItems(Array(cardData?.length).fill(false));
  //         } else alert("유저 정보가 존재하지 않습니다.");
  //       });
  //     }
  //   } else alert("삭제할 검색 조건이 존재하지 않습니다.");
  // };

  //검색 조건 관리 (전체 선택)
  const [selectAll, setSelectAll] = useState(false);
  // "전체 선택" 버튼 클릭 처리를 담당하는 함수
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const newCheckedItems = Array(cardData?.length).fill(!selectAll);
    setCheckedItems(newCheckedItems);

    // 선택된 항목의 ID를 업데이트합니다.
    if (!selectAll) {
      const ids = cardData?.map((item) => item.id) || [];
      setCheckedIds(ids);
    } else {
      setCheckedIds([]);
    }
  };

  const [selectOption, setSelectOption] = useState(true);

  const handleSelectOption = () => {
    setSelectOption(true);
  };
  const handleSelectOption2 = () => {
    setSelectOption(false);
    // value 값을 지우는 코드 추가
  };

  return (
    <section id="condition" className={`${isOpen ? "fold" : ""}`} onClick={handleOutsideClick}>
      <div className="inner">
        <article>
          <div className="tit_box">
            <h2>검색 조건 관리</h2>
            <p>자주 사용하는 검색조건을 저장 후 불러와 편리하게 검색해 보세요.</p>
          </div>

          <div className="top_btn">
            {cardData !== undefined && cardData.length === 0 ? null : manageMode ? (
              <div className="manage_mode_layout">
                <button className="delete_all" onClick={handleSelectAll}>
                  전체 선택
                </button>
                <button className="delete_selected" onClick={onClickSelectedDeleteBtn}>
                  선택 삭제
                </button>
              </div>
            ) : (
              <button className="create_condition" onClick={popUpBtn}>
                새로운 MY 검색 조건 만들기
              </button>
            )}

            {cardData !== undefined && cardData.length === 0 ? null : (
              <button
                className={manageMode ? "manage_condition2" : "manage_condition"}
                onClick={manageMode ? toggleManageMode : toggleManageMode}
              >
                {manageMode ? "취소" : "검색 조건 삭제"}
              </button>
            )}
          </div>

          <div className="condition_card">
            {cardData !== undefined && cardData.length === 0 ? (
              <div className="no-data">
                <div>
                  <p>
                    저장된 검색조건이 없습니다. <br></br>
                    자주 사용하는 검색 조건을 저장하시고 편리하게 검색해보세요.
                  </p>
                  <button onClick={popUpBtn}>검색조건 만들기</button>
                </div>
              </div>
            ) : (
              <ul>
                {cardData?.map((item: FilterType, index: number) => (
                  <li
                    className="condition_card_wrap"
                    key={index}
                    onClick={() => popUpBtnDetail(cardData[index].id, index)}
                  >
                    <div className="flex">
                      {manageMode && (
                        // <input type="checkbox" checked={checkedItems[index]} onChange={() => {}} />
                        <div className="cntr">
                          <input
                            className="hidden-xs-up"
                            id="cbx"
                            type="checkbox"
                            checked={checkedItems[index]}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`cbx-${index}`}
                            className={`cbx ${checkedItems[index] ? "checked" : ""}`}
                          ></label>
                        </div>
                      )}
                      <h3>{item.filterName}</h3>
                      <div className="modify_btn_wrap">
                        {manageMode ? null : (
                          <button onClick={(e) => toggleModify(e, index, cardData[index].id)}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </button>
                        )}

                        {modifyStates[index] && (
                          <div className="modify" onClick={prevent}>
                            <button className="revise" onClick={reviseConditionBtn}>
                              조건 수정
                            </button>
                            <button className="delete" onClick={onClickDeleteBtn}>
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <h4>날짜</h4>
                      <p>
                        {item.dateStart !== "" ? item.dateStart : "전체기간"} ~{" "}
                        {item.dateEnd !== "" ? item.dateEnd : "전체기간"}
                      </p>
                    </div>
                    <div className="flex">
                      <h4>조건</h4>
                      <p>{item.conditionAndOr.toUpperCase()} 조건 검색</p>
                    </div>
                    <div className="flex">
                      <h4>출처</h4>
                      {item.sourceSelect === "ntis" && "국가과학기술지식정보서비스(NTIS)"}
                      {item.sourceSelect === "madang" && "기업마당"}
                      {item.sourceSelect === "nara" && "나라장터"}
                      {item.sourceSelect === "iris" && "범부처통합연구지원시스템"}
                      {item.sourceSelect === "kdn" && "한전KDN"}
                      {item.sourceSelect === "" && "전체"}
                    </div>
                    <div className="flex">
                      <h4>기관</h4>
                      <p>
                        {item.announcementSelect !== ""
                          ? item.announcementSelect === "public"
                            ? "공고기관"
                            : "수요기관"
                          : "전체"}{" "}
                        /{" "}
                        {item.announcementSelectKeyword !== ""
                          ? item.announcementSelectKeyword
                          : "-"}
                      </p>
                    </div>
                    <div className="flex">
                      <h4>검색키워드</h4>
                      <p>{item.searchKeyword !== "" ? item.searchKeyword : "-"}</p>
                    </div>
                    <div className="flex">
                      <h4>제외키워드</h4>
                      <p>{item.exceptionKeyword !== "" ? item.exceptionKeyword : "-"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* {manageMode && (
            <div className="manage_mode_layout2">
              <button className="confirm" onClick={toggleManageMode}>
                변경 완료
              </button>
              <button className="cancel" onClick={toggleManageMode}>
                취소
              </button>
            </div>
          )} */}
        </article>
      </div>

      <MyFooter></MyFooter>

      {/* 검색조건 만들기 팝업 */}
      {createCondition && (
        <div className="createPopup">
          <div className="modal">
            <form onSubmit={handleSubmit(onSubmitConditionCreate)} className="modal_content">
              <div className="flex">
                <h5>검색조건 만들기</h5>
                <button type="button" className="close_btn" onClick={closePopup}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="create_content">
                <div className="conditionName">
                  <label htmlFor="conditionName">새로운 검색조건 이름</label>
                  <input
                    {...register("filterName", { required: true })}
                    maxLength={30}
                    id="conditionName"
                    type="text"
                    placeholder="검색 조건 이름 입력은 필수입니다. (최대 30글자)"
                  />
                </div>
                <div className="condition_row conditiondate">
                  <label>날짜</label>
                  <div className="directSelect">
                    <button onClick={handleSelectOption}>직접입력</button>
                    <button onClick={handleSelectOption2}>최근기준</button>
                  </div>
                  {selectOption ? (
                    <div className="selectDateOption">
                      <select {...register("bidSelect")}>
                        <option value="bidEnd">입찰마감일</option>
                        <option value="announcementPosting">공고게시일</option>
                        <option value="bidStart">입찰시작일</option>
                      </select>
                      <input {...register("dateStart")} type="date" />
                      <span>~</span>
                      <input {...register("dateEnd")} className="last" type="date" />
                    </div>
                  ) : (
                    <div className="selectDateOption selectDateOption2">
                      <select {...register("bidSelect")} className="second_select">
                        <option value="bidEnd">입찰마감일</option>
                        <option value="announcementPosting">공고게시일</option>
                        <option value="bidStart">입찰시작일</option>
                      </select>
                      <label htmlFor="dateoption">
                        <input type="radio" name="selectMonth" id="dateoption" />
                        최근 1개월
                      </label>
                      <label htmlFor="dateoption2">
                        <input type="radio" name="selectMonth" id="dateoption2" />
                        최근 3개월
                      </label>
                      <label htmlFor="dateoption3">
                        <input type="radio" name="selectMonth" id="dateoption3" />
                        최근 6개월
                      </label>
                    </div>
                  )}
                </div>
                <div className="condition_row conditionRadio">
                  <label>조건</label>

                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      {...register("conditionAndOr")}
                      type="radio"
                      name="conditionAndOr"
                      value="or"
                    />
                    <p>입력 키워드 OR 조건 검색</p>
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      {...register("conditionAndOr")}
                      type="radio"
                      name="conditionAndOr"
                      value="and"
                    />
                    <p>입력 키워드 AND 조건 검색</p>
                  </label>
                </div>
                <div className="condition_row conditionSource">
                  <label>출처선택</label>
                  <select {...register("sourceSelect")}>
                    <option value="">출처기관을 선택해 주세요.</option>
                    <option value="">전체</option>
                    <option value="ntis">국가과학기술지식정보서비스(NTIS)</option>
                    <option value="madang">기업마당</option>
                    <option value="nara">나라장터</option>
                    <option value="iris">범부처통합연구지원시스템(IRIS)</option>
                    <option value="kdn">한전KDN</option>
                  </select>
                </div>
                <div className="condition_row conditionAgency">
                  <label>기관선택</label>
                  <select {...register("announcementSelect")}>
                    <option value="">기관을 선택하세요.</option>
                    <option value="">전체</option>
                    <option value="public">공고기관</option>
                    <option value="demand">수요기관</option>
                  </select>
                  <input
                    {...register("announcementSelectKeyword")}
                    type="text"
                    placeholder="공고 / 수요기관을 입력하세요."
                  />
                </div>

                <div className="condition_row conditionConclude">
                  <label>검색 키워드 입력</label>
                  <input
                    {...register("searchKeyword")}
                    type="text"
                    placeholder="검색할 키워드를 입력하세요 (여러개 입력 시 콤마(,)로 구분)"
                  />
                </div>
                <div className="condition_row conditionExcept">
                  <label>제외 키워드 입력</label>
                  <input
                    {...register("exceptionKeyword")}
                    type="text"
                    placeholder="제외키워드를 입력하세요 (여러개 입력 시 콤마(,)로 구분, OR 조건 검색)"
                  />
                </div>
                <div className="complete_btn_wrap">
                  <button type="submit" className="saveCondition">
                    검색조건 저장
                  </button>
                  <button type="button" className="closeCondition" onClick={closePopup}>
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 검색조건 상세보기 팝업 */}
      {detailCondition && (
        <div className="createPopup">
          <div className="modal">
            <div className="modal_content">
              <div className="flex">
                <h5>검색조건 상세보기</h5>
                <button className="close_btn" onClick={closePopupDetail}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="create_content">
                <div className="conditionName">
                  <p>{cardData && cardData[arrIndex].filterName}</p>
                  <button className="reviseBtn" onClick={reviseConditionBtn}>
                    수정하기
                  </button>
                </div>
                <div className="condition_row conditiondate">
                  <label className="color">날짜</label>
                  <span>
                    {cardData && cardData[arrIndex].bidSelect === "bidEnd" && "입찰마감일"}
                    {cardData &&
                      cardData[arrIndex].bidSelect === "announcementPosting" &&
                      "공고게시일"}
                    {cardData && cardData[arrIndex].bidSelect === "bidStart" && "입찰시작일"} /{" "}
                    {cardData && cardData[arrIndex].dateStart !== ""
                      ? cardData[arrIndex].dateStart
                      : "전체기간"}{" "}
                    ~{" "}
                    {cardData && cardData[arrIndex].dateEnd !== ""
                      ? cardData[arrIndex].dateEnd
                      : "전체기간"}
                  </span>
                </div>
                <div className="condition_row conditionRadio">
                  <label className="color">조건</label>
                  <span>
                    {cardData && cardData[arrIndex].conditionAndOr.toUpperCase()} 조건 검색
                  </span>
                </div>
                <div className="condition_row conditionSource">
                  <label className="color">출처선택</label>
                  <span>
                    {cardData &&
                      cardData[arrIndex].sourceSelect === "ntis" &&
                      "국가과학기술지식정보서비스(NTIS)"}
                    {cardData && cardData[arrIndex].sourceSelect === "madang" && "기업마당"}
                    {cardData && cardData[arrIndex].sourceSelect === "nara" && "나라장터"}
                    {cardData &&
                      cardData[arrIndex].sourceSelect === "iris" &&
                      "범부처통합연구지원시스템"}
                    {cardData && cardData[arrIndex].sourceSelect === "kdn" && "한전KDN"}
                    {cardData && cardData[arrIndex].sourceSelect === "" && "전체"}
                  </span>
                </div>
                <div className="condition_row conditionAgency">
                  <label className="color">기관선택</label>
                  <span>
                    {cardData && cardData[arrIndex].announcementSelect !== ""
                      ? cardData[arrIndex].announcementSelect === "public"
                        ? "공고기관"
                        : "수요기관"
                      : "전체"}{" "}
                    /{" "}
                    {cardData && cardData[arrIndex].announcementSelectKeyword !== ""
                      ? cardData[arrIndex].announcementSelectKeyword
                      : "-"}
                  </span>
                </div>

                <div className="condition_row conditionConclude">
                  <label className="color">검색 키워드</label>
                  <span>
                    {cardData && cardData[arrIndex].searchKeyword !== ""
                      ? cardData[arrIndex].searchKeyword
                      : "-"}
                  </span>
                </div>
                <div className="condition_row conditionExcept">
                  <label className="color">제외 키워드</label>
                  <span>
                    {cardData && cardData[arrIndex].exceptionKeyword !== ""
                      ? cardData[arrIndex].exceptionKeyword
                      : "-"}
                  </span>
                </div>
                <div className="complete_btn_wrap">
                  <button className="saveCondition" onClick={closePopupDetail}>
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 검색조건 수정 팝업 */}
      {reviseCondition && (
        <div className="createPopup">
          <div className="modal">
            <form onSubmit={handleSubmit(onSubmitConditionUpdate)} className="modal_content">
              <div className="flex">
                <h5>검색조건 수정하기</h5>
                <button type="button" className="close_btn" onClick={closeReviseCondition}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="create_content">
                <div className="conditionName">
                  <label htmlFor="conditionName">검색조건 이름</label>
                  <input
                    {...register("filterName", { required: true })}
                    id="conditionName"
                    maxLength={30}
                    type="text"
                    placeholder="검색 조건 이름 입력은 필수입니다. (최대 30글자)"
                  />
                </div>
                <div className="condition_row conditiondate">
                  <label>날짜</label>
                  <div className="selectDateOption">
                    <select {...register("bidSelect")}>
                      <option value="bidEnd">입찰마감일</option>
                      <option value="announcementPosting">공고게시일</option>
                      <option value="bidStart">입찰시작일</option>
                    </select>
                    <input {...register("dateStart")} type="date" />
                    <span>~</span>
                    <input {...register("dateEnd")} className="last" type="date" />
                  </div>
                </div>
                <div className="condition_row conditionRadio">
                  <label>조건</label>

                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      {...register("conditionAndOr")}
                      type="radio"
                      name="conditionAndOr"
                      value="or"
                    />
                    <p>입력 키워드 OR 조건 검색</p>
                  </label>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      {...register("conditionAndOr")}
                      type="radio"
                      name="conditionAndOr"
                      value="and"
                    />
                    <p>입력 키워드 AND 조건 검색</p>
                  </label>
                </div>
                <div className="condition_row conditionSource">
                  <label>출처선택</label>
                  <select {...register("sourceSelect")}>
                    <option value="">출처기관을 선택해 주세요.</option>
                    <option value="">전체</option>
                    <option value="ntis">국가과학기술지식정보서비스(NTIS)</option>
                    <option value="madang">기업마당</option>
                    <option value="nara">나라장터</option>
                    <option value="iris">범부처통합연구지원시스템(IRIS)</option>
                    <option value="kdn">한전KDN</option>
                  </select>
                </div>
                <div className="condition_row conditionAgency">
                  <label>기관선택</label>
                  <select {...register("announcementSelect")}>
                    <option value="">기관을 선택하세요.</option>
                    <option value="">전체</option>
                    <option value="public">공고기관</option>
                    <option value="demand">수요기관</option>
                  </select>
                  <input
                    {...register("announcementSelectKeyword")}
                    type="text"
                    placeholder="공고 / 수요기관을 입력하세요."
                  />
                </div>

                <div className="condition_row conditionConclude">
                  <label>검색 키워드 입력</label>
                  <input
                    {...register("searchKeyword")}
                    type="text"
                    placeholder="검색할 키워드를 입력하세요 (여러개 입력 시 콤마(,)로 구분)"
                  />
                </div>
                <div className="condition_row conditionExcept">
                  <label>제외 키워드 입력</label>
                  <input
                    {...register("exceptionKeyword")}
                    type="text"
                    placeholder="제외키워드를 입력하세요 (여러개 입력 시 콤마(,)로 구분, OR 조건 검색)"
                  />
                </div>
                <div className="complete_btn_wrap">
                  <button type="submit" className="saveCondition">
                    검색조건 저장
                  </button>
                  <button type="button" className="closeCondition" onClick={closeReviseCondition}>
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

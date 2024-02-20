import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const dateRadio = searchParams.get("dateRadio");
  const applicable = searchParams.get("applicable");
  const bidSelect = searchParams.get("bidSelect");
  const dateStart = searchParams.get("dateStart");
  const dateEnd = searchParams.get("dateEnd");
  const condition = searchParams.get("condition");
  const exceptionKeyword = searchParams.get("exceptionKeyword");
  const searchKeyword = searchParams.get("searchKeyword");
  const sourceSelect = searchParams.get("sourceSelect");
  const announcementSelect = searchParams.get("announcementSelect");
  const announcementSelectKeyword = searchParams.get("announcementSelectKeyword");
  const token = cookies().get("token")?.value;
  const page = searchParams.get("page");
  const pageCount = searchParams.get("pageCount");
  const reAnnouncementSelect = searchParams.get("reAnnouncementSelect");
  const reSearchKeyword = searchParams.get("reSearchKeyword");
  const divisionType = searchParams.get("divisionType");
  const location = searchParams.get("location");
  const amountStart = searchParams.get("amountStart");
  const amountEnd = searchParams.get("amountEnd");

  let exception = false;
  if (exceptionKeyword && exceptionKeyword !== "null") {
    const splitExceptionArr = exceptionKeyword.split("/");
    splitExceptionArr.forEach((item: string) => {
      const splitCommaArr = item.split(",");
      if (splitCommaArr[1] == "true") {
        exception = true;
      }
    });
  }
  let search = false;
  if (searchKeyword && searchKeyword !== "null") {
    const splitSearchArr = searchKeyword.split("/");
    splitSearchArr.forEach((item: string) => {
      const splitCommaArr = item.split(",");
      if (splitCommaArr[1] == "true") {
        search = true;
      }
    });
  }

  const connection = await createConnection();
  try {
    let exceptionKeywordArr: Array<string> = [];
    let searchKeywordArr: Array<string> = [];
    let query =
      "SELECT list_table_test.*, COALESCE(state_info.stateSummary, '-') AS stateSummary, COALESCE(state_info.stateDetail, '-') AS stateDetail, COALESCE(file_table.price, '-') AS price FROM list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name AND list_table_test.division = file_table.division";
    if (
      (dateRadio !== "dateAll" && dateRadio !== "null") ||
      (applicable &&
        applicable !== "false" &&
        applicable !== "null" &&
        applicable !== "undefined") ||
      (dateStart && dateStart !== "null") ||
      (dateEnd && dateEnd !== "null") ||
      (exceptionKeyword && exceptionKeyword !== "null" && exception) ||
      (searchKeyword && searchKeyword !== "null" && search) ||
      (sourceSelect && sourceSelect !== "null" && sourceSelect !== "sourceSelectAll") ||
      (announcementSelectKeyword &&
        announcementSelectKeyword !== "null" &&
        announcementSelectKeyword !== null) ||
      (reSearchKeyword && reSearchKeyword !== "null" && reSearchKeyword !== null) ||
      (divisionType &&
        divisionType !== "null" &&
        divisionType !== null &&
        divisionType !== "typeAll") ||
      (location !== "locationAll" && location !== null) ||
      (amountStart !== null &&
        amountEnd !== null &&
        amountStart !== "0원" &&
        amountEnd !== "100억원 이상")
    )
      query += " where";

    if (
      applicable &&
      applicable !== "false" &&
      applicable !== "null" &&
      applicable !== "undefined"
    ) {
      const today = new Date();
      query.length === 387
        ? (query += ` end_date >= '${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()} 00:00'`)
        : (query += ` and end_date >= '${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()} 00:00'`);
    }

    if (bidSelect && bidSelect !== "null") {
      if (dateStart && dateEnd) {
        if (bidSelect === "bidEnd")
          query.length === 387
            ? (query += ` (end_date >= '${dateStart} 00:00' and end_date <= '${dateEnd} 23:59')`)
            : ` and (end_date >= '${dateStart} 00:00' and end_date <= '${dateEnd} 23:59')`;
        else if (bidSelect === "announcementPosting")
          query.length === 387
            ? (query += ` (input_date >= '${dateStart} 00:00' and input_date <= '${dateEnd} 23:59')`)
            : (query += ` and (input_date >= '${dateStart} 00:00' and input_date <= '${dateEnd} 23:59')`);
        else if (bidSelect === "bidStart")
          query.length === 387
            ? (query += ` (register_date >= '${dateStart} 00:00' and register_date <= '${dateEnd} 23:59')`)
            : (query += ` and (register_date >= '${dateStart} 00:00' and register_date <= '${dateEnd} 23:59')`);
      } else if (dateStart) {
        if (bidSelect === "bidEnd")
          query.length === 387
            ? (query += ` end_date >= '${dateStart} 00:00'`)
            : (query += ` and end_date >= '${dateStart} 00:00'`);
        else if (bidSelect === "announcementPosting")
          query.length === 387
            ? (query += ` input_date >= '${dateStart} 00:00'`)
            : (query += ` and input_date >= '${dateStart} 00:00'`);
        else if (bidSelect === "bidStart")
          query.length === 387
            ? (query += ` register_date >= '${dateStart} 00:00'`)
            : (query += ` and register_date >= '${dateStart} 00:00'`);
      } else if (dateEnd) {
        if (bidSelect === "bidEnd")
          query.length === 387
            ? (query += ` end_date <= '${dateEnd} 23:59'`)
            : (query += ` and end_date <= '${dateEnd} 23:59'`);
        else if (bidSelect === "announcementPosting")
          query.length === 387
            ? (query += ` input_date <= '${dateEnd} 23:59'`)
            : (query += ` and input_date <= '${dateEnd} 23:59'`);
        else if (bidSelect === "bidStart")
          query.length === 387
            ? (query += ` register_date <= '${dateEnd} 23:59'`)
            : (query += ` and register_date <= '${dateEnd} 23:59'`);
      }
    }

    if (sourceSelect && sourceSelect !== "null" && sourceSelect !== "sourceSelectAll") {
      query.length === 387 ? (query += " (") : (query += " and (");
      sourceSelect?.split(",").forEach((item) => {
        let source = "";
        if (item === "ntis") source = "국가과학기술지식정보서비스(NTIS)";
        else if (item === "madang") source = "기업마당";
        else if (item === "nara") source = "나라장터";
        else if (item === "iris") source = "범부처통합연구지원시스템(IRIS)";
        else if (item === "kdn") source = "한전KDN";
        query.slice(380).includes("division")
          ? (query += ` or list_table_test.division='${source}'`)
          : (query += `list_table_test.division='${source}'`);
      });
      query += ")";
    }

    if (announcementSelectKeyword && announcementSelectKeyword !== "null") {
      if (announcementSelect === "public")
        query.length === 387
          ? (query += ` announcement_agency like '%${announcementSelectKeyword}%'`)
          : (query += ` and announcement_agency like '%${announcementSelectKeyword}%'`);
      else if (announcementSelect === "demand")
        query.length === 387
          ? (query += ` demand_agency like '%${announcementSelectKeyword}%'`)
          : (query += ` and demand_agency like '%${announcementSelectKeyword}%'`);
      else
        query.length === 387
          ? (query += ` (announcement_agency like '%${announcementSelectKeyword}%' or demand_agency like '%${announcementSelectKeyword}%')`)
          : (query += ` and (announcement_agency like '%${announcementSelectKeyword}%' or demand_agency like '%${announcementSelectKeyword}%')`);
    }

    if (location !== "locationAll" && location !== null) {
      if (query.length !== 387) query += " and";
      query += ` stateSummary='${location}'`;
    }

    if (divisionType && divisionType !== "null" && divisionType !== "typeAll") {
      query.length === 387 ? (query += " (") : (query += " and (");
      divisionType?.split(",").forEach((item) => {
        let divisionType = "";
        if (item === "일반") divisionType = "일반";
        else if (item === "긴급") divisionType = "긴급";
        else if (item === "사전") divisionType = "사전";
        else if (item === "재공고") divisionType = "재공고";
        query.slice(380).includes("division_type")
          ? (query += ` or division_type='${divisionType}'`)
          : (query += `division_type='${divisionType}'`);
      });
      query += ")";
    }

    if (
      amountStart !== null &&
      amountEnd !== null &&
      amountStart !== "0원" &&
      amountEnd !== "100억원 이상"
    ) {
      query.length !== 387 ? (query += " and (") : (query += " (");
      if (amountStart.includes("천만원")) {
        const amount = Number(amountStart.replace("천만원", "")) * 10000000;
        query += `price >= ${amount}`;
      } else if (amountStart.includes("억원")) {
        amountStart.includes("이상")
          ? (query += `price >= ${
              Number(amountStart.replace("억원", "").replace(" 이상", "")) * 100000000
            }`)
          : (query += `price >= ${Number(amountStart.replace("억원", "")) * 100000000}`);
      } else query += "price >= 0";

      if (amountEnd.includes("천만원")) {
        const amount = Number(amountEnd.replace("천만원", "")) * 10000000;
        query += ` and price <= ${amount}`;
      } else if (amountEnd.includes("억원")) {
        if (!amountEnd.includes("이상"))
          query += ` and price <= ${Number(amountEnd.replace("억원", "")) * 100000000}`;
      } else query += " and price <= 0";

      query += ")";
    }

    const english = /^[A-Za-z]+$/;

    if (exceptionKeyword && exceptionKeyword !== "null") {
      exceptionKeywordArr = exceptionKeyword.split("/");
      if (exception) {
        if (query.length !== 387) query += " and";
        let firstCheck = false;
        exceptionKeywordArr.forEach((item: string) => {
          const splitCommaArr = item.split(",");
          if (splitCommaArr[1] == "true") {
            if (!firstCheck) {
              if (english.test(splitCommaArr[0])) {
                if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                  query += ` (list_table_test.name not like '%${
                    splitCommaArr[0]
                  }%' and list_table_test.name not like '%${splitCommaArr[0].toLowerCase()}%'`;
                else
                  query += ` (list_table_test.name not like '%${
                    splitCommaArr[0]
                  }%' and list_table_test.name not like '%${splitCommaArr[0].toUpperCase()}%'`;
              } else query += ` (list_table_test.name not like '%${splitCommaArr[0]}%'`;
              firstCheck = true;
            } else {
              if (english.test(splitCommaArr[0])) {
                if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                  query += ` and list_table_test.name not like '%${
                    splitCommaArr[0]
                  }%' and list_table_test.name not like '%${splitCommaArr[0].toLowerCase()}%'`;
                else
                  query += ` and list_table_test.name not like '%${
                    splitCommaArr[0]
                  }%' and list_table_test.name not like '%${splitCommaArr[0].toUpperCase()}%'`;
              } else query += ` and list_table_test.name not like '%${splitCommaArr[0]}%'`;
            }
          }
        });
        query += ")";
      }
    }

    if (searchKeyword && searchKeyword !== "null") {
      if (condition === "and") {
        searchKeywordArr = searchKeyword.split("/");
        if (search) {
          if (query.length !== 387) query += " and";
          let firstCheck = false;
          searchKeywordArr.forEach((item: string) => {
            const splitCommaArr = item.split(",");
            if (splitCommaArr[1] === "true") {
              if (!firstCheck) {
                if (english.test(splitCommaArr[0])) {
                  if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                    query += ` (list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' and list_table_test.name like '%${splitCommaArr[0].toLowerCase()}%'`;
                  else
                    query += ` (list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' and list_table_test.name like '%${splitCommaArr[0].toUpperCase()}%'`;
                } else query += ` (list_table_test.name like '%${splitCommaArr[0]}%'`;
                firstCheck = true;
              } else {
                if (english.test(splitCommaArr[0])) {
                  if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                    query += ` and list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' and list_table_test.name like '%${splitCommaArr[0].toLowerCase()}%' `;
                  else
                    query += ` and list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' and list_table_test.name like '%${splitCommaArr[0].toUpperCase()}%' `;
                } else query += ` and list_table_test.name like '%${splitCommaArr[0]}%'`;
              }
            }
          });
          query += ")";
        }
      } else if (condition === "or") {
        searchKeywordArr = searchKeyword.split("/");
        if (search) {
          if (query.length !== 387) query += " and";
          let firstCheck = false;
          searchKeywordArr.forEach((item: string) => {
            const splitCommaArr = item.split(",");
            if (splitCommaArr[1] === "true") {
              if (!firstCheck) {
                if (english.test(splitCommaArr[0])) {
                  if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                    query += ` (list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' or list_table_test.name like '%${splitCommaArr[0].toLowerCase()}%'`;
                  else
                    query += ` (list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' or list_table_test.name like '%${splitCommaArr[0].toUpperCase()}%'`;
                } else query += ` (list_table_test.name like '%${splitCommaArr[0]}%'`;
                firstCheck = true;
              } else {
                if (english.test(splitCommaArr[0])) {
                  if (splitCommaArr[0] === splitCommaArr[0].toUpperCase())
                    query += ` or list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' or list_table_test.name like '%${splitCommaArr[0].toLowerCase()}%' `;
                  else
                    query += ` or list_table_test.name like '%${
                      splitCommaArr[0]
                    }%' or list_table_test.name like '%${splitCommaArr[0].toUpperCase()}%' `;
                } else query += ` or list_table_test.name like '%${splitCommaArr[0]}%'`;
              }
            }
          });
          query += ")";
        }
      }
    }

    if (reSearchKeyword && reSearchKeyword !== null) {
      if (reAnnouncementSelect === "name") {
        if (query.length !== 387) query += " and";
        query += ` list_table_test.name like '%${reSearchKeyword}%'`;
      } else if (reAnnouncementSelect === "public") {
        if (query.length !== 387) query += " and";
        query += ` announcement_agency like '%${reSearchKeyword}%'`;
      } else if (reAnnouncementSelect === "demand") {
        if (query.length !== 387) query += " and";
        query += ` demand_agency like '%${reSearchKeyword}%'`;
      }
    }

    query.length === 381
      ? (query +=
          " where not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'")
      : (query +=
          " and not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'");

    const replaceQuery = query;
    const totalQuery = replaceQuery.replaceAll(
      "list_table_test.*, COALESCE(state_info.stateSummary, '-') AS stateSummary, COALESCE(state_info.stateDetail, '-') AS stateDetail, COALESCE(file_table.price, '-') AS price",
      "count(*)"
    );
    const [totalCount] = await connection.execute(totalQuery);
    query += ` order by input_date desc limit ${(Number(page) - 1) * Number(pageCount)}, ${Number(
      pageCount
    )}`;
    console.log(query);

    const [rows]: any = await connection.execute(query);
    const today = new Date();
    for (const item of rows) {
      // const targetDate = new Date(item.end_date);
      // if (!isNaN(targetDate.getTime())) {
      //   const timeDifference = targetDate.getTime() - today.getTime();
      //   const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
      //   item.terminationDate = daysRemaining.toString();
      // } else item.terminationDate = "-";
      item.terminationDate = "-"; // 나중에 컬럼 동기화되면 주석 풀면됨

      const [userInfoResult] = await connection.execute(
        `select uid from userInfo where token='${token}'`
      );
      if (userInfoResult.length !== 0) {
        const uid = userInfoResult[0].uid;
        const [bookMark]: Array<[]> = await connection.execute(
          `select * from bookMark where uid=${uid} and listId=${item.list_id}`
        );
        if (bookMark.length !== 0) item.bookMarkCheck = true;
        else item.bookMarkCheck = false;
      } else item.bookMarkCheck = false;
    }

    let filterNames: Array<any> = [];
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      const [filterNamesResults] = await connection.execute(
        `select filterName from searchFilter where uid=${uid[0].uid}`
      );
      filterNames = filterNamesResults;
    }

    await connection.end();
    return NextResponse.json({
      msg: "success",
      resData: rows,
      searchKeywordArr,
      exceptionKeywordArr,
      filterNames,
      totalCount: totalCount[0]["count(*)"],
      pageCount,
      filterOptions: {
        dateRadio,
        applicable,
        bidSelect,
        dateStart,
        dateEnd,
        condition,
        searchKeyword,
        exceptionKeyword,
        sourceSelect,
        announcementSelect,
        announcementSelectKeyword,
        reAnnouncementSelect,
        reSearchKeyword,
        divisionType,
      },
    });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ data: error });
  }
}

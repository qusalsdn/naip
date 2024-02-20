import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  const filterName = body.filterName;
  const bidSelect = body.bidSelect;
  const dateStart = body.dateStart;
  const dateEnd = body.dateEnd;
  const conditionAndOr = body.conditionAndOr;
  const sourceSelect = body.sourceSelect;
  const announcementSelect = body.announcementSelect;
  const announcementSelectKeyword = body.announcementSelectKeyword;
  let exceptionKeyword = body.exceptionKeyword;
  let searchKeyword = body.searchKeyword;
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [userInfo] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfo.length !== 0) {
      if (exceptionKeyword) {
        const exceptionKeywordSplitArr = exceptionKeyword.split(",");
        if (exceptionKeywordSplitArr.length !== 0 && exceptionKeywordSplitArr.length !== 1) {
          exceptionKeyword = "";
          exceptionKeywordSplitArr.forEach((item: string) => {
            exceptionKeyword += item.trim() + ",";
          });
          exceptionKeyword = exceptionKeyword.slice(0, -1);
        }
      }
      if (searchKeyword) {
        const searchKeywordSplitArr = searchKeyword.split(",");
        if (searchKeywordSplitArr.length !== 0 && searchKeywordSplitArr.length !== 1) {
          searchKeyword = "";
          searchKeywordSplitArr.forEach((item: string) => {
            searchKeyword += item.trim() + ",";
          });
          searchKeyword = searchKeyword.slice(0, -1);
        }
      }

      const [results] = await connection.execute(
        `update searchFilter set filterName='${filterName}', bidSelect='${bidSelect}', dateStart='${dateStart}', dateEnd='${dateEnd}', conditionAndOr='${conditionAndOr}', sourceSelect='${sourceSelect}', announcementSelect='${announcementSelect}', announcementSelectKeyword='${announcementSelectKeyword}', exceptionKeyword='${exceptionKeyword}', searchKeyword='${searchKeyword}' where id=${id} and uid=${userInfo[0].uid}`
      );
      if (results.affectedRows === 1) {
        await connection.end();
        return NextResponse.json({ ok: true });
      } else {
        await connection.end();
        return NextResponse.json({ ok: false });
      }
    } else {
      await connection.end();
      return NextResponse.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false });
  }
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const dateRadio = searchParams.get("dateRadio");
  const applicable = searchParams.get("applicable");
  const bidSelect = searchParams.get("bidSelect");
  const dateStart = searchParams.get("dateStart");
  const dateEnd = searchParams.get("dateEnd");
  const condition = searchParams.get("condition");
  const sourceSelect = searchParams.get("sourceSelect");
  const announcementSelect = searchParams.get("announcementSelect");
  const announcementSelectKeyword = searchParams.get("announcementSelectKeyword");
  const location = searchParams.get("location");
  const announcementType = searchParams.get("announcementType");
  const amountStart = searchParams.get("amountStart");
  const amountEnd = searchParams.get("amountEnd");
  let searchKeyword = searchParams.get("searchKeyword");
  let exceptionKeyword = searchParams.get("exceptionKeyword");
  const filterName = searchParams.get("filterName");
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      if (exceptionKeyword) {
        const exceptionKeywordSplitArr = exceptionKeyword.split(",");
        if (exceptionKeywordSplitArr.length !== 0 && exceptionKeywordSplitArr.length !== 1) {
          exceptionKeyword = "";
          exceptionKeywordSplitArr.forEach((item) => {
            exceptionKeyword += item.trim() + ",";
          });
          exceptionKeyword = exceptionKeyword.slice(0, -1);
        }
      }

      if (searchKeyword) {
        const searchKeywordSplitArr = searchKeyword.split(",");
        if (searchKeywordSplitArr.length !== 0 && searchKeywordSplitArr.length !== 1) {
          searchKeyword = "";
          searchKeywordSplitArr.forEach((item) => {
            searchKeyword += item.trim() + ",";
          });
          searchKeyword = searchKeyword.slice(0, -1);
        }
      }

      await connection.execute(
        `insert into searchFilter(filterName, dateRadio, applicable, bidSelect, dateStart, dateEnd, conditionAndOr, sourceSelect, announcementSelect, announcementSelectKeyword, location, announcementType, amountStart, amountEnd, exceptionKeyword, searchKeyword, uid) values('${filterName}', '${dateRadio}', '${applicable}', '${bidSelect}', ${
          dateStart ? `'${dateStart}'` : "''"
        }, ${dateEnd ? `'${dateEnd}'` : "''"}, '${condition}', ${
          sourceSelect ? `'${sourceSelect}'` : "''"
        }, ${announcementSelect ? `'${announcementSelect}'` : "''"}, ${
          announcementSelectKeyword ? `'${announcementSelectKeyword}'` : "''"
        }, ${location ? `'${location}'` : "''"}, ${
          announcementType ? `'${announcementType}'` : "''"
        }, ${amountStart ? `'${amountStart}'` : "''"}, ${amountEnd ? `'${amountEnd}'` : "''"}, ${
          exceptionKeyword ? `'${exceptionKeyword}'` : "''"
        }, ${searchKeyword ? `'${searchKeyword}'` : "''"}, ${uid[0].uid})`
      );
      await connection.end();
      return NextResponse.json({ ok: true });
    } else {
      await connection.end();
      return NextResponse.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false, error });
  }
}

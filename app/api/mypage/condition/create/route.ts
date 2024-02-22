import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const filterName = body.filterName;
  const dateRadio = body.dateRadio;
  const bidSelect = body.bidSelect;
  const dateStart = body.dateStart;
  const dateEnd = body.dateEnd;
  const conditionAndOr = body.conditionAndOr;
  const sourceSelect = body.sourceSelect;
  const announcementSelect = body.announcementSelect;
  const announcementSelectKeyword = body.announcementSelectKeyword;
  const location = body.location;
  const announcementType = body.announcementType;
  const amountStart = body.amountStart;
  const amountEnd = body.amountEnd;
  let exceptionKeyword = body.exceptionKeyword;
  let searchKeyword = body.searchKeyword;
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [userInfo] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfo.length !== 0) {
      const [results] = await connection.execute(
        `insert into searchFilter(filterName, dateRadio, applicable, bidSelect, dateStart, dateEnd, conditionAndOr, sourceSelect, announcementSelect, announcementSelectKeyword, location, announcementType, amountStart, amountEnd, exceptionKeyword, searchKeyword, uid) values('${filterName}', '${dateRadio}', 'false', '${bidSelect}', '${dateStart}', '${dateEnd}', '${conditionAndOr}', '${sourceSelect}', '${announcementSelect}', '${announcementSelectKeyword}', '${location}', '${announcementType}', '${amountStart}', '${amountEnd}', '${exceptionKeyword}', '${searchKeyword}', ${userInfo[0].uid})`
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
    return NextResponse.json({ ok: false, error });
  }
}

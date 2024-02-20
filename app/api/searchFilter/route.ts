import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = cookies().get("token")?.value;
  const filterName = searchParams.get("filterName");

  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      const [searchFilter] = await connection.execute(
        `select dateRadio, applicable, bidSelect, dateStart, dateEnd, conditionAndOr, searchKeyword, exceptionKeyword, sourceSelect, announcementSelect, announcementSelectKeyword, location, announcementType, amountStart, amountEnd from searchFilter where filterName='${filterName}' and uid=${uid[0].uid}`
      );
      await connection.end();
      return NextResponse.json({ ok: true, searchFilter });
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

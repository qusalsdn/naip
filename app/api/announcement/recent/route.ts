import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      let now = new Date();
      let year = now.getFullYear();
      let month = String(now.getMonth() + 1).padStart(2, "0");
      let day = String(now.getDate()).padStart(2, "0");
      let hours = String(now.getHours()).padStart(2, "0");
      let minutes = String(now.getMinutes()).padStart(2, "0");
      let seconds = String(now.getSeconds()).padStart(2, "0");
      let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const [recentData] = await connection.execute(`select count(*) from recentAnnouncement where uid=${uid[0].uid} and listId=${id}`);
      if (recentData[0]["count(*)"] !== 0) await connection.execute(`update recentAnnouncement set lookDate='${formattedDate}' where uid=${uid[0].uid} and listId=${id}`);
      else await connection.execute(`insert into recentAnnouncement(lookDate, uid, listId) values('${formattedDate}', ${uid[0].uid}, ${id})`);
      const [recentCount] = await connection.execute(`select count(*) from recentAnnouncement where uid=${uid[0].uid}`);
      if (recentCount[0]["count(*)"] > 50) {
        const [recentDataOrdeyBy] = await connection.execute(`select uid, listId from recentAnnouncement order by lookDate desc limit 50, 1`);
        await connection.execute(`delete from recentAnnouncement where uid=${recentDataOrdeyBy[0].uid} and listId=${recentDataOrdeyBy[0].listId}`);
      }
    }
    await connection.end();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false });
  }
}

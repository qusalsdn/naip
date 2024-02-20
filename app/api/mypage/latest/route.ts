import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sort = searchParams.get("sort");
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      let recentData: any[] = [];
      const [rows]: Array<[]> = await connection.execute(`select listId from recentAnnouncement where uid=${uid[0].uid}`);
      if (rows.length !== 0) {
        [recentData] = await connection.execute(
          `SELECT list_table_test.*, recentAnnouncement.lookDate FROM list_table_test JOIN recentAnnouncement ON list_table_test.list_id = recentAnnouncement.listId and recentAnnouncement.uid=${
            uid[0].uid
          } order by ${sort} ${sort === "lookDate" ? "desc" : "asc"}`
        );
        const today = new Date();
        for (const item of recentData) {
          const [bookMark]: Array<[]> = await connection.execute(`select * from bookMark where uid=${uid[0].uid} and listId=${item.list_id}`);
          if (bookMark.length !== 0) item.bookMarkCheck = true;
          else item.bookMarkCheck = false;

          const [price] = await connection.execute(`select max(price) from file_table where name='${item.name}'`);
          if (price[0]["max(price)"] !== null) {
            item.price = price[0]["max(price)"].toLocaleString("ko-KR");
          } else item.price = "-";

          const targetDate = new Date(item.end_date);
          if (!isNaN(targetDate.getTime())) {
            const timeDifference = targetDate.getTime() - today.getTime();
            const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
            item.terminationDate = daysRemaining.toString();
          } else item.terminationDate = "-";
        }
      }
      return NextResponse.json({ ok: true, recentData });
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

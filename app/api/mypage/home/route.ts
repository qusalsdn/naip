import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

export async function GET(req: NextRequest) {
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      const today = new Date();

      let recentData: any[] = [];
      [recentData] = await connection.execute(
        `SELECT list_table_test.*, recentAnnouncement.lookDate FROM list_table_test JOIN recentAnnouncement ON list_table_test.list_id = recentAnnouncement.listId and recentAnnouncement.uid=${uid[0].uid} order by lookDate desc limit 0,10`
      );
      if (recentData.length !== 0) {
        for (const item of recentData) {
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

      let bookMarkData: any[] = [];
      const [bookMarkIds] = await connection.execute(`select listId from bookMark where uid=${uid[0].uid} order by createDT desc limit 0, 10`);
      if (bookMarkIds.length !== 0) {
        const listIds1 = bookMarkIds.map((item: any) => item.listId);
        const placeholders1 = listIds1.map(() => "?").join(",");
        const query1 = `select * from list_table_test where list_id in (${placeholders1})`;
        [bookMarkData] = await connection.execute(query1, listIds1);

        for (const item of bookMarkData) {
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

      await connection.end();
      return NextResponse.json({ data: { recentData, bookMarkData } });
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

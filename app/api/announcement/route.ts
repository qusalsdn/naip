import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    let [announcement] = await connection.execute(`select * from list_table_test where list_id=${id}`);
    if (announcement.legnth !== 0) {
      const [price] = await connection.execute(`select max(price) from file_table where name='${name}'`);
      if (price.length !== 0 && price[0]["max(price)"] !== null) announcement[0].price = price[0]["max(price)"].toLocaleString("ko-KR");
      else announcement[0].price = "-";
      const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
      if (uid.length !== 0) {
        const [bookMarkCheck] = await connection.execute(`select * from bookMark where uid=${uid[0].uid} and listId=${id}`);
        bookMarkCheck.length !== 0 ? (announcement[0].bookMarkCheck = true) : (announcement.bookMarkCheck = false);
      } else announcement[0].bookMarkCheck = false;

      await connection.end();
      return NextResponse.json({ ok: true, resData: announcement[0] });
    } else return NextResponse.json({ ok: false });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false });
  }
}

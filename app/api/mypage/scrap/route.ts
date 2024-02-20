import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

interface ResponseDataType {
  list_id: number;
  search: string;
  work: string;
  number: string;
  URL: string;
  division: string;
  division_type: string;
  name: string;
  announcement_agency: string;
  demand_agency: string;
  contract: string;
  input_date: string;
  register_date: string;
  end_date: string;
  qualified_date: string;
  price: string;
  terminationDate: string;
  bookMarkCheck: boolean;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sort = searchParams.get("sort");
  const postName = searchParams.get("postName");
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [userInfoRows] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfoRows.length !== 0) {
      const uid = userInfoRows[0].uid;
      let [rows]: Array<ResponseDataType[]> = await connection.execute(
        `select list_table_test.*, bookMark.uid, bookMark.createDT from list_table_test inner join bookMark on list_table_test.list_id=bookMark.listId where uid=${uid}${
          postName !== "" ? ` and name like '%${postName}%'` : ""
        } order by ${sort} ${sort === "createDT" ? "desc" : "asc"}`
      );
      const today = new Date();
      for (const item of rows) {
        const targetDate = new Date(item.end_date);
        if (!isNaN(targetDate.getTime())) {
          const timeDifference = targetDate.getTime() - today.getTime();
          const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
          item.terminationDate = daysRemaining.toString();
        } else item.terminationDate = "-";

        const [price] = await connection.execute(`select max(price) from file_table where name='${item.name}'`);
        if (price[0]["max(price)"] !== null) {
          item.price = price[0]["max(price)"].toLocaleString("ko-KR");
        } else item.price = "-";

        const [bookMark]: Array<[]> = await connection.execute(`select * from bookMark where uid=${uid} and listId=${item.list_id}`);
        if (bookMark.length !== 0) item.bookMarkCheck = true;
        else item.bookMarkCheck = false;
      }

      await connection.end();
      return NextResponse.json({ ok: true, data: rows });
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

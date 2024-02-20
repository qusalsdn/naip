import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../src/db");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = cookies().get("token")?.value;
  const listId = body.listId;
  const bookMarkCheck = body.bookMarkCheck;

  const connection = await createConnection();
  try {
    const [userInfoRows] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfoRows.length !== 0) {
      const uid = userInfoRows[0].uid;
      if (bookMarkCheck) {
        const [queryResult] = await connection.execute(`delete from bookMark where uid=${uid} and listId=${listId}`);
        await connection.end();
        return NextResponse.json({ ok: true, data: queryResult });
      } else {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hour = String(currentDate.getHours()).padStart(2, "0");
        const minute = String(currentDate.getMinutes()).padStart(2, "0");
        const second = String(currentDate.getSeconds()).padStart(2, "0");

        const [queryResult] = await connection.execute(
          `INSERT INTO bookMark (uid, listId, createDT) SELECT ${uid}, ${listId}, '${year}-${month}-${day} ${hour}:${minute}:${second}' FROM DUAL WHERE NOT EXISTS (SELECT uid, listId, createDT FROM bookMark WHERE uid = ${uid} AND listId = ${listId} AND createDT='${year}-${month}-${day}');`
        );
        await connection.end();
        return NextResponse.json({ ok: true, data: queryResult });
      }
    } else {
      await connection.end();
      return NextResponse.json({ ok: false });
    }
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false, msg: error });
  }
}

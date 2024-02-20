import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [userInfoRows] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfoRows.length !== 0) {
      const uid = userInfoRows[0].uid;
      const listId = body.listId;
      const [queryResult] = await connection.execute(`delete from bookMark where uid=${uid} and listId=${listId}`);
      await connection.end();
      return NextResponse.json({ ok: true, queryResult });
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

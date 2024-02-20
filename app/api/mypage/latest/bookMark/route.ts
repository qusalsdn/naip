import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function POST(req: NextRequest) {
  const noScrapArr: Array<any[]> = await req.json();
  const token = cookies().get("token")?.value;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minute = String(currentDate.getMinutes()).padStart(2, "0");
  const second = String(currentDate.getSeconds()).padStart(2, "0");

  const connection = await createConnection();
  try {
    const [uid]: Array<any[]> = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (uid.length !== 0) {
      noScrapArr.forEach((arr) => {
        arr.push(uid[0].uid);
        arr.push(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
      });
      await connection.query(`insert into bookMark (listId, uid, createDT) values ?`, [noScrapArr]);
      return NextResponse.json({ ok: true });
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

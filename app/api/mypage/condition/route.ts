import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");

export async function GET(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [uid] = await connection.execute(`select uid from userInfo where token='${token}'`);
    const [cardData] = await connection.execute(`select * from searchFilter where uid=${uid[0].uid}`);
    await connection.end();
    return NextResponse.json({ ok: true, cardData });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false, error });
  }
}

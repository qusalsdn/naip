import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function GET(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [data]: Array<any[]> = await connection.execute(`select keyword, institution, amount from userInfo where token='${token}'`);
    if (data.length !== 0) {
      await connection.end();
      return NextResponse.json({ ok: true, fetchData: data[0] });
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

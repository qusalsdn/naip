import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const createConnection = require("../../../src/db");

export async function GET(req: NextRequest) {
  const connection = await createConnection();
  try {
    const token = cookies().get("token")?.value;
    const [results] = await connection.execute(`select * from userInfo where token='${token}'`);
    if (results.length !== 0) {
      await connection.end();
      return NextResponse.json({ ok: true, user: results[0] });
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

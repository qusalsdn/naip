import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function DELETE(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [[{ uid }]] = await connection.execute(`select uid from userInfo where token='${token}'`);
    await connection.execute(`delete from recentAnnouncement where uid=${uid}`);
    await connection.end();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false });
  }
}

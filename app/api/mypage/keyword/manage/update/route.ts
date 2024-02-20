import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../../src/db");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const keyword = body.keyword;
  const institution = body.institution;
  const amount = body.amount;
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [results] = await connection.execute(`update userInfo set keyword='${keyword}', institution='${institution}', amount=${amount} where token='${token}'`);
    if (results.affectedRows === 1) {
      await connection.end();
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

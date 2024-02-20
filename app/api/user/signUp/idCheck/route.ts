import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const connection = await createConnection();
  try {
    const [results] = await connection.execute(`select * from userInfo where id='${id}'`);
    const idCheck = results.length === 0 ? true : false;
    connection.end();
    return NextResponse.json({ idCheck });
  } catch (error) {
    connection.end();
    return NextResponse.json({ error });
  }
}

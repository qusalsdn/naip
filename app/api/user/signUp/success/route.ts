import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function GET(req: NextRequest) {
  const id = cookies().get("id")?.value;

  const connection = await createConnection();
  try {
    const [results] = await connection.execute(`select name from userInfo where id='${id}'`);
    await connection.end();
    cookies().delete("id");
    return NextResponse.json({ ok: true, name: results[0].name });
  } catch (error) {
    console.log(error);
    await connection.end();
    cookies().delete("id");
    return NextResponse.json({ ok: false, error });
  }
}

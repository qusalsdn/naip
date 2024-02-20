import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");
const shajs = require("sha.js");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const pw = searchParams.get("pw");

  const connection = await createConnection();
  try {
    const [emailQueryResults] = await connection.execute(`select name from userInfo where id='${id}'`);
    const name = emailQueryResults[0].name;
    const shaPw =
      shajs("sha256").update(id).digest("hex") +
      shajs("sha256").update(name).digest("hex") +
      shajs("sha256").update(pw).digest("hex") +
      shajs("sha256").update(name).digest("hex");
    const [results] = await connection.execute(`select token from userInfo where id='${id}' and pw='${shaPw}'`);
    if (results.length !== 0) {
      cookies().set("token", results[0].token);
      await connection.end();
      return NextResponse.json({ ok: true });
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

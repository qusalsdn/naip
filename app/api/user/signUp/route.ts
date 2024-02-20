import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");
const shajs = require("sha.js");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  const pw = body.pw;
  const name = body.name;
  const phoneNumber = body.phoneNumber;
  const email = body.email;
  const address1 = body.address1;
  const address2 = body.address2;
  const shaPw =
    shajs("sha256").update(id).digest("hex") +
    shajs("sha256").update(name).digest("hex") +
    shajs("sha256").update(pw).digest("hex") +
    shajs("sha256").update(name).digest("hex");
  const token =
    shajs("sha256").update(pw).digest("hex") +
    shajs("sha256").update(name).digest("hex") +
    shajs("sha256").update(id).digest("hex") +
    shajs("sha256").update(name).digest("hex");

  cookies().set("id", id);

  const connection = await createConnection();
  try {
    const [results] = await connection.execute(
      `insert into userInfo(id, pw, name, email, phoneNumber, address1, address2, token) values('${id}', '${shaPw}', '${name}', '${email}', '${phoneNumber}', '${address1}', '${address2}', '${token}')`
    );
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
    return NextResponse.json({ ok: false, error });
  }
}

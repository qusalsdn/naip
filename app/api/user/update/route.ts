import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../src/db");
const shajs = require("sha.js");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pw0 = body.pw0;
  const pw1 = body.pw1;
  const phoneNumber = body.phoneNumber;
  const email = body.email;
  const address1 = body.address1;
  const address2 = body.address2;
  const track = body.track;

  const connection = await createConnection();
  const token = cookies().get("token")?.value;
  const [userInfo] = await connection.execute(`select * from userInfo where token='${token}'`);
  if (track === 0) {
    try {
      if (userInfo.length !== 0) {
        const shaPw =
          shajs("sha256").update(userInfo[0].id).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex") +
          shajs("sha256").update(pw0).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex");
        if (userInfo[0].pw !== shaPw) {
          await connection.end();
          return NextResponse.json({ ok: false });
        }
        const newShaPw =
          shajs("sha256").update(userInfo[0].id).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex") +
          shajs("sha256").update(pw1).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex");
        const newShaToken =
          shajs("sha256").update(pw1).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex") +
          shajs("sha256").update(userInfo[0].id).digest("hex") +
          shajs("sha256").update(userInfo[0].name).digest("hex");
        const [results] = await connection.execute(`update userInfo set pw='${newShaPw}', token='${newShaToken}' where uid='${userInfo[0].uid}'`);
        if (results.affectedRows === 1) {
          cookies().set("token", newShaToken);
          await connection.end();
          return NextResponse.json({ ok: true });
        } else {
          await connection.end();
          return NextResponse.json({ ok: false });
        }
      } else {
        await connection.end();
        return NextResponse.json({ ok: false });
      }
    } catch (error) {
      console.log(error);
      await connection.end();
      return NextResponse.json({ ok: false, error });
    }
  } else if (track === 1) {
    try {
      if (userInfo.length !== 0) {
        const uid = userInfo[0].uid;
        const [results] = await connection.execute(`update userInfo set phoneNumber='${phoneNumber}' where uid=${uid}`);
        if (results.affectedRows === 1) {
          await connection.end();
          return NextResponse.json({ ok: true });
        } else {
          await connection.end();
          return NextResponse.json({ ok: false });
        }
      } else {
        await connection.end();
        return NextResponse.json({ ok: false });
      }
    } catch (error) {
      console.log(error);
      await connection.end();
      return NextResponse.json({ ok: false, error });
    }
  } else if (track == 2) {
    try {
      if (userInfo.length !== 0) {
        const uid = userInfo[0].uid;
        const [results] = await connection.execute(`update userInfo set email='${email}', address1='${address1}', address2='${address2}' where uid=${uid}`);
        if (results.affectedRows === 1) {
          await connection.end();
          return NextResponse.json({ ok: true });
        } else {
          await connection.end();
          return NextResponse.json({ ok: false });
        }
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
}

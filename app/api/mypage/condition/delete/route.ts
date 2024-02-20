import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.get("ids")?.split(",");
  const token = cookies().get("token")?.value;

  const connection = await createConnection();
  try {
    const [userInfo] = await connection.execute(`select uid from userInfo where token='${token}'`);
    if (userInfo.length !== 0) {
      if (ids) {
        for (let i = 0; i < ids.length; i++) {
          const [results] = await connection.execute(`delete from searchFilter where id=${ids[i]} and uid=${userInfo[0].uid}`);
          if (results.affectedRows !== 1) {
            await connection.end();
            return NextResponse.json({ ok: false });
          }
        }
        await connection.end();
        return NextResponse.json({ ok: true });
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

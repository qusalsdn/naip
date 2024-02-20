import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const createConnection = require("../../../../../src/db");

interface DataType {
  keywords: string;
  institution: string;
  amount: string;
}

interface JsonType {
  data: DataType;
}

export async function POST(req: NextRequest) {
  const body: JsonType = await req.json();
  const id = cookies().get("id")?.value;

  const splitKeywordsArr: Array<any> = body.data.keywords.split(",");
  let keywords: string = "";
  splitKeywordsArr.forEach((item: string) => (keywords += `${item.trim()},`));
  keywords = keywords.slice(0, -1);

  const splitInstitutionArr: Array<any> = body.data.institution.split(",");
  let institution: string = "";
  splitInstitutionArr.forEach((item: string) => (institution += `${item.trim()},`));
  institution = institution.slice(0, -1);

  const amount = body.data.amount.replaceAll(",", "");

  const connection = await createConnection();
  try {
    const [results] = await connection.execute(
      `update userInfo set keyword='${keywords}', institution='${institution}', amount=${
        amount ? amount : 0
      } where id='${id}'`
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

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  cookies().delete("token");
  return NextResponse.json({ ok: true });
}

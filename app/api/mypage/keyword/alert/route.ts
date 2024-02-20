import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface DataType {
  keyword: string;
  institution: string;
}

const createConnection = require("../../../../../src/db");

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const matching = searchParams.get("matching");
  const page = searchParams.get("page");
  const pageCount = searchParams.get("pageCount");
  const dateType = searchParams.get("dateType");
  const dateStart = searchParams.get("dateStart");
  const dateEnd = searchParams.get("dateEnd");
  const reSearch = searchParams.get("reSearch");
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [[interests]]: DataType[][] = await connection.execute(
      `select keyword, institution from userInfo where token='${token}'`
    );
    let query =
      "SELECT list_table_test.*, COALESCE(state_info.stateSummary, '-') AS stateSummary, COALESCE(state_info.stateDetail, '-') AS stateDetail, COALESCE(file_table.price, '-') AS price FROM list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name where not list_table_test.division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'";
    const english = /^[A-Za-z]+$/;

    if (matching === "all") {
      if (interests.keyword !== null) {
        query += " and (";
        interests.keyword.split(",").forEach((keyword) => {
          if (english.test(keyword)) {
            keyword === keyword.toUpperCase()
              ? (query += `list_table_test.name like '%${keyword}%' or list_table_test.name like '%${keyword.toLowerCase()}%' or `)
              : (query += `list_table_test.name like '%${keyword}%' or list_table_test.name like '%${keyword.toUpperCase()}%' or `);
          } else query += `list_table_test.name like '%${keyword}%' or `;
        });
        query = query.slice(0, -4) + ")";
      }
      if (interests.institution !== null) {
        query += " and (";
        interests.institution.split(",").forEach((institution) => {
          if (english.test(institution)) {
            institution === institution.toUpperCase()
              ? (query += `list_table_test.demand_agency like '%${institution}%' or list_table_test.demand_agency like '%${institution.toLowerCase()}%' or `)
              : (query += `list_table_test.demand_agency like '%${institution}%' or list_table_test.demand_agency like '%${institution.toUpperCase()}%' or `);
          } else query += `list_table_test.demand_agency like '%${institution}%' or `;
        });
        query = query.slice(0, -4) + ")";
      }
    } else if (matching === "keyword") {
      if (interests.keyword !== null) {
        query += " and (";
        interests.keyword.split(",").forEach((keyword) => {
          if (english.test(keyword)) {
            keyword === keyword.toUpperCase()
              ? (query += `list_table_test.name like '%${keyword}%' or list_table_test.name like '%${keyword.toLowerCase()}%' or `)
              : (query += `list_table_test.name like '%${keyword}%' or list_table_test.name like '%${keyword.toUpperCase()}%' or `);
          } else query += `list_table_test.name like '%${keyword}%' or `;
        });
        query = query.slice(0, -4) + ")";
      }
    } else if (matching === "institution") {
      if (interests.institution !== null) {
        query += " and (";
        interests.institution.split(",").forEach((institution) => {
          if (english.test(institution)) {
            institution === institution.toUpperCase()
              ? (query += `list_table_test.demand_agency like '%${institution}%' or list_table_test.demand_agency like '%${institution.toLowerCase()}%' or `)
              : (query += `list_table_test.demand_agency like '%${institution}%' or list_table_test.demand_agency like '%${institution.toUpperCase()}%' or `);
          } else query += `list_table_test.demand_agency like '%${institution}%' or `;
        });
        query = query.slice(0, -4) + ")";
      }
    }

    if (dateType === "bidEnd") {
      if (dateStart !== "" && dateEnd !== "")
        query += ` and (end_date >= '${dateStart} 00:00' and end_date <= '${dateEnd} 23:59')`;
      else if (dateStart !== "") query += ` and (end_date >= '${dateStart} 00:00')`;
      else if (dateEnd !== "") query += ` and (end_date <= '${dateEnd} 23:59')`;
    } else if (dateType === "posting") {
      if (dateStart !== "" && dateEnd !== "")
        query += ` and (input_date >= '${dateStart} 00:00' and input_date <= '${dateEnd} 23:59')`;
      else if (dateStart !== "") query += ` and (input_date >= '${dateStart} 00:00')`;
      else if (dateEnd !== "") query += ` and (input_date <= '${dateEnd} 23:59')`;
    } else if (dateType === "bidStart") {
      if (dateStart !== "" && dateEnd !== "")
        query += ` and (register_date >= '${dateStart} 00:00' and register_date <= '${dateEnd} 23:59')`;
      else if (dateStart !== "") query += ` and (register_date >= '${dateStart} 00:00')`;
      else if (dateEnd !== "") query += ` and (register_date <= '${dateEnd} 23:59')`;
    }

    if (reSearch !== "") query += ` and list_table_test.name like'%${reSearch}%'`;

    const totalQuery = query.replaceAll(
      "list_table_test.*, COALESCE(state_info.stateSummary, '-') AS stateSummary, COALESCE(state_info.stateDetail, '-') AS stateDetail, COALESCE(file_table.price, '-') AS price",
      "count(*)"
    );
    const [[totalCount]] = await connection.execute(totalQuery);
    query += ` order by input_date desc limit ${(Number(page) - 1) * Number(pageCount)}, ${Number(
      pageCount
    )}`;
    const [results]: any[][] = await connection.execute(query);
    const today = new Date();
    for (const item of results) {
      const targetDate = new Date(item.end_date);
      if (!isNaN(targetDate.getTime())) {
        const timeDifference = targetDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
        item.terminationDate = daysRemaining.toString();
      } else item.terminationDate = "-";
    }
    await connection.end();
    return NextResponse.json({
      ok: true,
      fetchData: results,
      pageCount,
      totalCount: totalCount["count(*)"],
      interests,
    });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ ok: false });
  }
}

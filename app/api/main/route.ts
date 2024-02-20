import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const createConnection = require("../../../src/db");

interface ResponseDataType {
  list_id: number;
  search: string;
  work: string;
  number: string;
  URL: string;
  division: string;
  division_type: string;
  name: string;
  announcement_agency: string;
  demand_agency: string;
  contract: string;
  input_date: string;
  register_date: string;
  end_date: string;
  qualified_date: string;
  price: string;
  terminationDate: string;
  bookMarkCheck: boolean;
}

export async function GET(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const connection = await createConnection();
  try {
    const [userInfoResult] = await connection.execute(
      `select uid from userInfo where token='${token}'`
    );
    let [rows]: Array<ResponseDataType[]> = await connection.execute(
      "select * from list_table_test where not division_type='공지' and not division='중소벤처기업진흥공단' order by input_date desc limit 0, 9;"
    );
    const today = new Date();
    for (const item of rows) {
      const targetDate = new Date(item.end_date);
      if (!isNaN(targetDate.getTime())) {
        const timeDifference = targetDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
        item.terminationDate = daysRemaining.toString();
      } else item.terminationDate = "-";

      const [price] = await connection.execute(
        `select max(price) from file_table where name='${item.name}'`
      );
      if (price[0]["max(price)"] !== null) {
        item.price = price[0]["max(price)"].toLocaleString("ko-KR");
      } else item.price = "-";

      if (userInfoResult.length !== 0) {
        const uid = userInfoResult[0].uid;
        const [bookMark]: Array<[]> = await connection.execute(
          `select * from bookMark where uid=${uid} and listId=${item.list_id}`
        );
        if (bookMark.length !== 0) item.bookMarkCheck = true;
        else item.bookMarkCheck = false;
      } else item.bookMarkCheck = false;
    }

    let todayDate = new Date().toISOString().slice(0, 10);
    const hours = today.getHours();
    let time = "";
    if (hours >= 0 && hours <= 2) {
      todayDate += " 00:00:00";
      time = " 00:00:00";
    } else if (hours >= 3 && hours <= 5) {
      todayDate += " 03:00:00";
      time = " 03:00:00";
    } else if (hours >= 6 && hours <= 8) {
      todayDate += " 06:00:00";
      time = " 06:00:00";
    } else if (hours >= 9 && hours <= 11) {
      todayDate += " 09:00:00";
      time = " 09:00:00";
    } else if (hours >= 12 && hours <= 14) {
      todayDate += " 12:00:00";
      time = " 12:00:00";
    } else if (hours >= 15 && hours <= 17) {
      todayDate += " 15:00:00";
      time = " 15:00:00";
    } else if (hours >= 18 && hours <= 20) {
      todayDate += " 18:00:00";
      time = " 18:00:00";
    } else if (hours >= 21 && hours <= 23) {
      todayDate += " 21:00:00";
      time = " 21:00:00";
    }

    const [announcementAllCount] = await connection.execute(
      "select count(*) from list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name AND list_table_test.division = file_table.division where not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'"
    );

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);
    const oneMonthAgoDate = oneMonthAgo.toISOString().slice(0, 10) + time;
    const [announcementMonthCount] = await connection.execute(
      `select count(*) from list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name AND list_table_test.division = file_table.division where (input_date >= '${oneMonthAgoDate}' and input_date <= '${todayDate}') and not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'`
    );

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoDate = oneWeekAgo.toISOString().slice(0, 10) + time;
    const [announcementWeekCount] = await connection.execute(
      `select count(*) from list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name AND list_table_test.division = file_table.division where (input_date >= '${oneWeekAgoDate}' and input_date <= '${todayDate}') and not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'`
    );

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterDate = yesterday.toISOString().slice(0, 10) + time;
    const [announcementDayCount] = await connection.execute(
      `select count(*) from list_table_test LEFT JOIN state_info ON list_table_test.state_id = state_info.stateId LEFT JOIN file_table ON list_table_test.name = file_table.name where input_date >= '${yesterDate}' and input_date <= '${todayDate}' and not division_type='공지' and not list_table_test.division='중소벤처기업진흥공단'`
    );

    let bookMarkData: any[] = [];
    let bookMarkCount = 0,
      recentAnnouncementCount = 0;
    if (userInfoResult.length !== 0) {
      [bookMarkData] = await connection.execute(
        `SELECT list_table_test.* FROM list_table_test JOIN bookMark ON list_table_test.list_id = bookMark.listId and bookMark.uid=${userInfoResult[0].uid} order by input_date desc limit 0,9`
      );
      for (const item of bookMarkData) {
        const targetDate = new Date(item.end_date);
        if (!isNaN(targetDate.getTime())) {
          const timeDifference = targetDate.getTime() - today.getTime();
          const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
          item.terminationDate = daysRemaining.toString();
        } else item.terminationDate = "-";

        const [price] = await connection.execute(
          `select max(price) from file_table where name='${item.name}'`
        );
        if (price[0]["max(price)"] !== null) {
          item.price = price[0]["max(price)"].toLocaleString("ko-KR");
        } else item.price = "-";
        item.bookMarkCheck = true;
      }

      const [bookMark] = await connection.execute(
        `select count(*) from bookMark where uid=${userInfoResult[0].uid}`
      );
      const [recentAnnouncement] = await connection.execute(
        `select count(*) from recentAnnouncement where uid=${userInfoResult[0].uid}`
      );
      bookMarkCount = bookMark[0]["count(*)"];
      recentAnnouncementCount = recentAnnouncement[0]["count(*)"];
    }

    await connection.end();
    return NextResponse.json({
      latestData: rows,
      bookMarkData,
      todayDate,
      announcementAllCount: announcementAllCount[0]["count(*)"],
      announcementMonthCount: announcementMonthCount[0]["count(*)"],
      announcementWeekCount: announcementWeekCount[0]["count(*)"],
      announcementDayCount: announcementDayCount[0]["count(*)"],
      bookMarkCount,
      recentAnnouncementCount,
    });
  } catch (error) {
    console.log(error);
    await connection.end();
    return NextResponse.json({ data: error });
  }
}

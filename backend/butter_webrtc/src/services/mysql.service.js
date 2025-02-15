import {
  MYSQL_ENDPOINT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../config.js";

// mysql.service.js
import mysql from "mysql2/promise";

// MySQL 연결 설정
const db = mysql.createConnection({
  host: MYSQL_ENDPOINT,  
  user: MYSQL_USER, 
  password: MYSQL_PASSWORD, 
  database: MYSQL_DATABASE,
  port: 3306, 
  timezone: 'Asia/Seoul', 
  ssl: false, 
  allowPublicKeyRetrieval: true, 
});

db.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.stack);
    return;
  }
  console.log('데이터베이스에 연결되었습니다.');
});

// 데이터 삽입 함수
// export async function insertClip(crewId, title, videoName) {
//   return new Promise((resolve, reject) => {
//     const query =
//       "INSERT INTO clip (crew_id, title, video_name) VALUES (?, ?, ?)";
//     db.execute(query, [crewId, title, videoName], (err, results) => {
//       if (err) {
//         console.error("Error inserting into database:", err);
//         reject(err);
//       } else {
//         console.log("Inserted data into database successfully:", results);
//         resolve(results);
//       }
//     });
//   });
// }

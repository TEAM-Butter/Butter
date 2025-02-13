import { MYSQL_ENDPOINT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from "../config.js";

// mysql.service.js
import mysql from 'mysql2/promise';

// MySQL 연결 설정
const db = mysql.createConnection({
  host: MYSQL_ENDPOINT,   // MySQL 서버 호스트
  user: MYSQL_USER,   // MySQL 사용자
  password: MYSQL_PASSWORD, // MySQL 비밀번호
  database: MYSQL_DATABASE,
  port: 3306, // MySQL 기본 포트
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0  // 데이터베이스 이름
});

// 데이터 삽입 함수
export async function insertClip(crewId, title, videoName) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO clip (crew_id, title, video_name) VALUES (?, ?, ?)';
    db.execute(query, [crewId, title, videoName], (err, results) => {
      if (err) {
        console.error("Error inserting into database:", err);
        reject(err);
      } else {
        console.log("Inserted data into database successfully:", results);
        resolve(results);
      }
    });
  });
}

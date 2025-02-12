import { MYSQL_ENDPOINT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from "../config.js";

// mysql.service.js
const mysql = require('mysql2');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: MYSQL_ENDPOINT,   // MySQL 서버 호스트
  user: MYSQL_USER,   // MySQL 사용자
  password: MYSQL_PASSWORD, // MySQL 비밀번호
  database: MYSQL_DATABASE  // 데이터베이스 이름
});

// 데이터 삽입 함수
async function insertClip(crewId, title, videoName) {
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

module.exports = {
  insertClip
};

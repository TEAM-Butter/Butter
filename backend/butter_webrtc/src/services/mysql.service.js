import {
  MYSQL_ENDPOINT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../config.js";
import mysql from "mysql2/promise";

export class MySQLService {
  static instance;

  constructor() {
    if (MySQLService.instance) {
      return MySQLService.instance;
    }

    // Connection Pool 생성 (연결 재사용을 위한 설정)
    this.pool = mysql.createPool({
      host: MYSQL_ENDPOINT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: 3306,
      timezone: 'Asia/Seoul',
      ssl: false,
      allowPublicKeyRetrieval: true,
    });

    MySQLService.instance = this;
    return this;
  }

  /**
  * SQL 쿼리를 실행합니다.
  * @param {string} sql 실행할 SQL 문
  * @param {Array} params SQL 문에 전달할 파라미터 배열
  * @returns {Promise<any>} 쿼리 결과 rows
  */
  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error("MySQL query error:", error);
      throw error;
    }
  }

  /**
  * Connection Pool에서 하나의 연결을 가져옵니다.
  * (트랜잭션 등 직접 연결 관리가 필요한 경우 사용)
  * @returns {Promise<PoolConnection>} DB 연결 객체
  */
  async getConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error("Error getting connection:", error);
      throw error;
    }
  }

  /**
   * Connection Pool을 종료합니다.
   */
  async closePool() {
    try {
      await this.pool.end();
    } catch (error) {
      console.error("Error closing pool:", error);
    }
  }
}
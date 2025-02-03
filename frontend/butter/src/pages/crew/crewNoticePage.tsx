import axios from "axios"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import styled from "styled-components"


let ServerUrl = 'http://i12e204.p.ssafy.io:8081'


function CrewNoticePage() {

    let { crewId, noticeId } : any = useParams(); // crewId 파라미터 가져옴
    let [ crewDetail, setCrewDetail ] = useState(null) // 크루 정보 받아오면 담을 변수
    let [ crewNoticeDetail, setCrewNoticeDetail] = useState(['1번 공지사항','2번 공지사항','3번 공지사항', ])
    let [ loading, setLoading ] = useState(true) // 로딩 표시하는 변수
    let [error, setError] = useState(null) // 에러 상태
    let navigate = useNavigate()
    let [noticeSwitch, setNoticeSwitch ] = useState(true)
    let [noticePlusSwitch, setNoticePlusSwitch ] =useState(false)
    let [noticeEditSwitch, setNoticeEditSwitch ] = useState(false)
    let [basicNum , setBasicNum] = useState(noticeId)


    const plusHandlerOn = () => {
        setNoticeSwitch(false)
        setNoticePlusSwitch(true)
        setNoticeEditSwitch(false)
    }

    const plusHandlerOff = () => {
        setNoticeSwitch(true)
        setNoticePlusSwitch(false)
    }
    
    const editHandlerOn = () => {
        setNoticeSwitch(false)
        setNoticeEditSwitch(true)
        setNoticePlusSwitch(false)
    }

    const editHandlerOff = () => {
        setNoticeSwitch(true)
        setNoticeEditSwitch(false)
    }

    useEffect (() => {
        const fetchCrewDetail = async () => {
            try {
                const noticeResponse = await axios.get(`${ServerUrl}/api/v1/crew/notice/detail/${crewId}`) // 크루 공지사항 정보 받아옴
                setCrewNoticeDetail(noticeResponse.data);
                const response = await axios.get(`${ServerUrl}/api/v1/crew/detail/${crewId}`) // 크루 디테일 정보 받아옴
                setCrewDetail(response.data);
            } catch (err:any) {
                setError(err.message); //요청 놓치면 에러 메세지 띄우기
            } finally {
                setLoading(false) // 요청 끝나면 로딩끄기
            }
        }

        if (crewId) {
            fetchCrewDetail();
        }
    }, [crewId])



    return (
        <div>
            <div>크루 공지사항 페이지 입니다</div>
            <div>(크루 이름) {crewDetail} | 공지사항 | <button onClick={() => plusHandlerOn()}>공지사항 추가하기</button></div>
            <div>{
                crewNoticeDetail.map((a:any, i:any) => {
                    return ( <div>  {a} <button onClick={() => {setBasicNum(i)}}>자세히보기 버튼</button></div> )
                })
                }
            </div>
            
            {noticeSwitch && <button onClick={() => navigate(`/crew/detail/${crewId}`)}>크루 상세정보 페이지로 돌아가기 버튼</button>}
            {noticeSwitch && 
                <div>
                    <div>  {crewNoticeDetail.length > 0 ? crewNoticeDetail[basicNum] : '등록한 공지사항이 없습니다.'} </div>
                    <div> 공지사항 내용  </div>
                    <div> 공지사항 첨부 이미지</div>
                    <div>
                        <button onClick={()=> editHandlerOn()}>편집</button>
                        <button onClick={()=> axios.delete(``)}>삭제</button>
                </div>
            </div>}

            
            {noticePlusSwitch && <div>
                <div><input type="text" placeholder="type your notice title" /></div>
                <div><input type="text" placeholder="type your notice content" /></div>
                <button>이미지로드</button>   
                <div><button onClick={() => plusHandlerOff()}>취소</button>
                <button onClick={() => {
                    axios.post(``)
                    .then(() => plusHandlerOff())
                }}>생성</button>
                </div>
            </div>}

            {noticeEditSwitch && <div>
                <div><input type="text" placeholder="type your notice title" /></div>
                <div><input type="text" placeholder="type your notice content" /></div>
                <button>이미지로드</button>   
                <div><button onClick={() => editHandlerOff()}>취소</button>
                <button onClick={() => {
                    axios.put(``)
                    .then(() => editHandlerOff())
                }}>편집 완료</button>
                </div>
            </div>}


        </div>
    )
}







export default CrewNoticePage
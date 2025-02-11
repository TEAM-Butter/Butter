import styled from "@emotion/styled";
import VideoTrimmer from "../../components/video/VideoTrimmer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RecordingService } from "../../components/recording/RecordingService";
import axios from "axios";

const VideoEditPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 10px;
  max-width: 2000px;
  max-height: 1000px;
  margin: auto;
  padding-top: 70px;
  padding-top: 15px;
  height: 90vh;
  width: 90vw;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 580px;
`;
const Right = styled.div`
  width: 400px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8px;
  height: calc(100% - 8px);

  @media (max-width: 780px) {
    width: 100%;
    min-width: 100%;
    height: auto;
    gap: 8px; /* 간격 균일하게 */
  }
`;

const T1 = styled.div`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const T2 = styled.div`
  font-size: 60px;
  margin-top: 40px;
  margin-bottom: 20px;
  /* white-space: pre; */
`;

const VideoListContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 20px;
  background-color: var(--darkgray);
  padding: 10px;
  @media (max-width: 780px) {
    min-height: 300px;
    gap: 8px; /* 간격 균일하게 */
  }
`;
const VideoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--gray-bright);
  color: black;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecordingInfo = styled.div`
  flex-grow: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SelectButton = styled(Button)`
  background-color: #4da44f;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #da3030;
  color: white;
`;

const BackBtn = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--butter);
  border-radius: 20px;
  padding-left: 30px;
  padding: 18px;
  font-size: 25px;
  font-weight: 300;
  color: black;
  font-weight: 700;
`;

interface Video {
  url: string;
  title: string;
  date: string;
}

const video: Video = {
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  title: "Sample Video",
  date: "2025-02-09",
};

export interface Recording {
  id: string; // 녹화 ID
  name: string; // 녹화 파일 이름
  roomId: string; // 녹화된 방 ID
  roomName: string; // 녹화된 방 이름
  duration: number; // 녹화 길이 (초 단위)
  size: number; // 녹화 파일 크기 (바이트 단위)
  startedAt: number; // 녹화 시작 시간 (Unix Timestamp)
}

const VideoEditPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [recordingUrls, setRecordingUrls] = useState<{ [key: string]: string }>(
    {}
  );

  const selectVideo = (url: { [key: string]: string }) => {
    console.log("url성공", url);
    setSelectedVideo(url.recordingUrl);
  };
  const params = useParams();
  const id = params.id;
  const [recordings, setRecordings] = useState<Recording[] | null>(null);
  const SEVER_URL = "http://localhost:6080";
  const getRecordings = async (id: string) => {
    try {
      const response = await axios.get(`${SEVER_URL}/recordings`, {
        params: { roomName: id },
      });
      console.log(response.data.recordings);
      setRecordings(response.data.recordings);
    } catch (err) {
      console.log("동영상 가져오기 실패", err);
    }
  };

  const getRecordingUrl = async (name: string) => {
    try {
      const response = await axios.get(`${SEVER_URL}/recordings/${name}/url`);
      console.log("url", response.data);
      return response.data;
    } catch (err) {
      console.log("URL을 불러오기 실패", err);
    }
  };

  const deleteRecording = async (name: string) => {
    try {
      await axios.delete(`${SEVER_URL}/recordings/${name}`);
      console.log("동영상 삭제 성공");

      //삭제된 녹화를 목록에서 제거
      setRecordings((prev) =>
        prev ? prev.filter((recording) => recording.name !== name) : null
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getRecordings(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchUrls = async () => {
      if (!recordings) return;

      const urls: { [key: string]: string } = {};
      for (const recording of recordings) {
        const url = await getRecordingUrl(recording.name);
        if (url) urls[recording.id] = url;
      }
      setRecordingUrls(urls);
      console.log("urls", urls);
      console.log(recordingUrls);
    };
    fetchUrls();
  }, [recordings]);
  return (
    <VideoEditPageWrapper>
      <Left>
        <T1>My Video</T1>
        <VideoTrimmer videoUrl={selectedVideo} />
      </Left>
      <Right>
        <T2>Choose Video</T2>
        <VideoListContainer>
          {recordings?.map((recording) => {
            const formattedDate = new Date(
              recording.startedAt
            ).toLocaleString();
            const recordingUrl = recordingUrls[recording.id] || "";
            return (
              <VideoItem key={recording.id}>
                <RecordingInfo>
                  <h3>Title : {recording.name}</h3>
                  <p>Date : {formattedDate}</p>
                </RecordingInfo>
                <ButtonGroup>
                  <SelectButton onClick={() => selectVideo(recordingUrl)}>
                    Select
                  </SelectButton>
                  <DeleteButton onClick={() => deleteRecording(recording.name)}>
                    Delete
                  </DeleteButton>
                </ButtonGroup>
              </VideoItem>
            );
          })}
        </VideoListContainer>
        <BackBtn>Back</BackBtn>
      </Right>
    </VideoEditPageWrapper>
  );
};

export default VideoEditPage;

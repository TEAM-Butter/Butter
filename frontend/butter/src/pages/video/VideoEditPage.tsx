import styled from "@emotion/styled";
import VideoTrimmer from "../../components/video/VideoTrimmer";
import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";

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

const VideoEditPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const selectVideo = (url: string) => {
    console.log(url);
    setSelectedVideo(url);
  };

  return (
    <VideoEditPageWrapper>
      <Left>
        <T1>My Video</T1>
        <VideoTrimmer videoUrl={selectedVideo} />
      </Left>
      <Right>
        <T2>Choose Video</T2>
        <VideoListContainer>
          <VideoItem>
            <RecordingInfo>
              <h3>{video.title}</h3>
              <p>{video.date}</p>
            </RecordingInfo>
            <ButtonGroup>
              <SelectButton onClick={() => selectVideo(video.url)}>
                Select
              </SelectButton>
              <DeleteButton>Delete</DeleteButton>
            </ButtonGroup>
          </VideoItem>
          <VideoItem>
            <RecordingInfo>
              <h3>제목</h3>
              {/* <h2>{}</h2> */}
              <p>날짜</p>
            </RecordingInfo>
            <ButtonGroup>
              <SelectButton>Select</SelectButton>
              <DeleteButton>Delete</DeleteButton>
            </ButtonGroup>
          </VideoItem>
        </VideoListContainer>
        <BackBtn>Back</BackBtn>
      </Right>
    </VideoEditPageWrapper>
  );
};

export default VideoEditPage;

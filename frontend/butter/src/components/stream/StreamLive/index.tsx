import { LocalVideoTrack, RemoteTrackPublication, Room } from "livekit-client";
import StreamLiveAudio from "./StreamLiveAudio";
import StreamLiveVideo from "./StreamLiveVideo";
import { LiveKitRoom } from "@livekit/components-react";
import { Socket } from "socket.io-client";

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

interface StreamLiveProps {
  room?: Room;
  participantName: string;
  roomName: string;
  localTrack?: LocalVideoTrack;
  remoteTracks: TrackInfo[];
  serverUrl: string;
  token: string;
  role: string;
}

const StreamLive = ({
  room,
  participantName,
  roomName,
  localTrack,
  remoteTracks,
  serverUrl,
  token,
  role,
}: StreamLiveProps) => {
  console.log("remoeteTracks 정보입니다", remoteTracks);
  console.log("Stream component에서 room을 받아들입니다.", room);
  return (
    <div className="w-full h-full">
      {!room ? (
        <div>Loading</div>
      ) : (
        <LiveKitRoom token={token} serverUrl={serverUrl} connect={true}>
          <div className="flex flex-col h-screen">
            {/* Header */}
            {/* <div className="bg-gray-800 text-white p-4">
              <h2 className="text-xl font-semibold">{roomName}</h2>
            </div> */}

            {/* Main content */}
            <div className="flex-1 bg-gray-900 p-4">
              <div className="grid gap-4 h-full">
                {/* Grid layout for videos */}
                <div
                  className={`grid ${
                    remoteTracks.length > 0 ? "grid-cols-2" : "grid-cols-1"
                  } gap-4`}
                >
                  {/* Local video */}
                  {localTrack && (
                    <div className="relative rounded-lg overflow-hidden">
                      <StreamLiveVideo
                        track={localTrack}
                        participantIdentity={participantName}
                        local={true}
                        roomName={roomName}
                        role={role}
                      />
                      {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                        {participantName}
                      </div> */}
                    </div>
                  )}

                  {/* Remote videos */}
                  {remoteTracks.map((remoteTrack) => {
                    return remoteTrack.trackPublication.kind === "video" ? (
                      <div
                        key={remoteTrack.trackPublication.trackSid}
                        className="relative rounded-lg overflow-hidden"
                      >
                        <StreamLiveVideo
                          track={remoteTrack.trackPublication.videoTrack!}
                          participantIdentity={remoteTrack.participantIdentity}
                          roomName={roomName}
                          role={role}
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                          {remoteTrack.participantIdentity}
                        </div>
                      </div>
                    ) : (
                      <StreamLiveAudio
                        key={remoteTrack.trackPublication.trackSid}
                        track={remoteTrack.trackPublication.audioTrack!}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </LiveKitRoom>
      )}
    </div>
  );
};

export default StreamLive;

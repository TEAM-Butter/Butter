import { LocalVideoTrack, RemoteTrackPublication, Room } from "livekit-client";
import StreamLiveAudio from "./StreamLiveAudio";
import StreamLiveVideo from "./StreamLiveVideo";
import { ChangeEventHandler, FormEventHandler } from "react";
import { LiveKitRoom } from "@livekit/components-react";

type TrackInfo = {
  trackPublication: RemoteTrackPublication;
  participantIdentity: string;
};

interface StreamLiveProps {
  room?: Room;
  onSubmit: FormEventHandler<HTMLFormElement>;
  participantName: string;
  onParticipantNameChange: ChangeEventHandler<HTMLInputElement>;
  roomName: string;
  onRoomNameChange: ChangeEventHandler<HTMLInputElement>;
  localTrack?: LocalVideoTrack;
  remoteTracks: TrackInfo[];
  serverUrl: string;
  token: string;
}

const StreamLive = ({
  room,
  onSubmit,
  participantName,
  onParticipantNameChange,
  roomName,
  onRoomNameChange,
  localTrack,
  remoteTracks,
  serverUrl,
  token,
}: StreamLiveProps) => {
  return (
    <div className="w-full h-full">
      {!room ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Join Video Room
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="participant-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Participant Name
                </label>
                <input
                  id="participant-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  type="text"
                  value={participantName}
                  onChange={onParticipantNameChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="room-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Name
                </label>
                <input
                  id="room-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  type="text"
                  value={roomName}
                  onChange={onRoomNameChange}
                  required
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                type="submit"
                disabled={!roomName || !participantName}
              >
                Join Room
              </button>
            </form>
          </div>
        </div>
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
                      />
                      {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                        {participantName}
                      </div> */}
                    </div>
                  )}

                  {/* Remote videos */}
                  {remoteTracks.map((remoteTrack) => {
                    console.log("remoteTrack", remoteTrack); // 로그를 여기로 이동

                    return remoteTrack.trackPublication.kind === "video" ? (
                      <div
                        key={remoteTrack.trackPublication.trackSid}
                        className="relative rounded-lg overflow-hidden"
                      >
                        <StreamLiveVideo
                          track={remoteTrack.trackPublication.videoTrack!}
                          participantIdentity={remoteTrack.participantIdentity}
                          roomName={roomName}
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

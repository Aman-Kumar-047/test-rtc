import AgoraRTC from "agora-rtc-sdk-ng";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let rtc = {
  // For the local client.
  client: null,
  uid:null,
  // For the local audio track.
  localAudioTrack: null,
  localVideoTrack:null,
  // For the remote audio video track
  remoteAudioTrack: null,
  remoteVideoTrack: null
};

let options = {
  // Pass your app ID here.
  appId: "e32fdcfdb6794ce0a6396d810bcbade4",
  // Set the channel name.
  channel: "testing_rtc",
  // Pass a token if your project enables the App Certificate.
  token:
    "006e32fdcfdb6794ce0a6396d810bcbade4IAAsmZtXEIEhZw0k43bxoSiEXg1fXS5WU0ezU2ITscJBSUjct68AAAAAEADEZWnpsKi1YAEAAQBQqLVg",
};

async function joinChannel() {

  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  // Automatically assign a number user ID.
  rtc.uid = await rtc.client.join(options.appId,
          options.channel,
          options.token,
          null);
  console.log("client",rtc.client);
  console.log("uid",rtc.uid);
  console.log("state",rtc.client.connectionState);

  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

  await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

  const localPlayerContainer = document.createElement("div");
  localPlayerContainer.id = rtc.uid;
  localPlayerContainer.style.width = "10%";
  localPlayerContainer.style.height = "5rem";

  let container = document.getElementById("container");
  container.append(localPlayerContainer);
  
  rtc.localVideoTrack.play(localPlayerContainer);
  
  console.log("publish success!");
  
  if(rtc.client.remoteUsers){
    console.log("remoteUsers",rtc.client.remoteUsers);
  }

  rtc.client.on("user-published", async (user, mediaType) => {
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");
    console.log("mediaType",mediaType);
    if (mediaType === "video") {
        rtc.remoteVideoTrack = user.videoTrack;
        console.log("remoteVideoTrack",rtc.remoteVideoTrack);
        const remotePlayerContainer = document.createElement("div");
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        remotePlayerContainer.style.width = "50%";
        remotePlayerContainer.style.height = "25rem";
        let container = document.getElementById("container");
        container.append(remotePlayerContainer);
        rtc.remoteVideoTrack.play(remotePlayerContainer);
    }

    if (mediaType === "audio") {
        rtc.remoteAudioTrack = user.audioTrack;
        rtc.remoteAudioTrack.play();
    }

    rtc.client.on("user-unpublished", user => {
        const remotePlayerContainer = document.getElementById(user.uid);
        remotePlayerContainer.remove();
    });


});


}


async function leaveChannel() {
  await rtc.client.leave();
  await rtc.localVideoTrack.setEnabled(false);
  await rtc.localAudioTrack.setEnabled(false);
  await rtc.remoteVideoTrack.setEnabled(false);
  await rtc.remoteAudioTrack.setEnabled(false);
  let myobj = document.getElementById(rtc.uid);
  myobj.remove();
  console.log("state",rtc.client.connectionState);
}


export {joinChannel, leaveChannel };

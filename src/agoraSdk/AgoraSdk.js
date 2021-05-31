import AgoraRTC from "agora-rtc-sdk-ng";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let rtc = {
  // For the local client.
  client: null,
  uid:null,
  // For the local audio track.
  localAudioTrack: null,
  localVideoTrack:null,
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
  localPlayerContainer.style.width = "640px";
  localPlayerContainer.style.height = "480px";
  document.body.append(localPlayerContainer);

  rtc.localVideoTrack.play(localPlayerContainer);

  console.log("publish success!");

  rtc.client.on("user-published", async (user, mediaType) => {
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remotePlayerContainer = document.createElement("div");
        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
        remotePlayerContainer.style.width = "940px";
        remotePlayerContainer.style.height = "680px";
        document.body.append(remotePlayerContainer);
        remoteVideoTrack.play(remotePlayerContainer);
    }

    if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
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
  let myobj = document.getElementById(rtc.uid);
  myobj.remove();
  console.log("state",rtc.client.connectionState);
}
// async function startBasicCall() {
//     rtc.client =  AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     const uid = await rtc.client.join(
//       options.appId,
//       options.channel,
//       options.token,
//       null
//     );
//   //console.log("uid", uid);
//   //Create an audio track from the audio sampled by a microphone.
//   rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//   // Publish the local audio track to the channel.
//   await rtc.client.publish([rtc.localAudioTrack]);

//   console.log("publish success!",rtc.localAudioTrack);

//   rtc.client.on("user-published", async (user, mediaType) => {
//     // Subscribe to a remote user.
//     await rtc.client.subscribe(user, mediaType);
//     console.log("subscribe success",user);
//     console.log("media",mediaType);

//     // If the subscribed track is audio.
//     if (mediaType === "audio") {
//       // Get `RemoteAudioTrack` in the `user` object.
//       const remoteAudioTrack = user.audioTrack;
//       // Play the audio track. No need to pass any DOM element.
//       remoteAudioTrack.play();
//     }
//   });

//   rtc.client.on("user-unpublished", user => {
//     // Get the dynamically created DIV container.
//     const playerContainer = document.getElementById(user.uid);
//     // Destroy the container.
//     playerContainer.remove();
//   });
// }

// async function leaveCall() {
//     // Destroy the local audio and track.
//     rtc.localAudioTrack.close();

//     // Leave the channel.
//     await rtc.client.leave();
//   }

export {joinChannel, leaveChannel };

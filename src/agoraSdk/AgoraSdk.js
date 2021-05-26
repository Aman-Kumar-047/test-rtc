import AgoraRTC from "agora-rtc-sdk-ng";

// const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

let rtc = {
  // For the local client.
  client: null,
  uid:null,
  // For the local audio track.
  localAudioTrack: null,
};

let options = {
  // Pass your app ID here.
  appId: "e32fdcfdb6794ce0a6396d810bcbade4",
  // Set the channel name.
  channel: "testing_rtc",
  // Pass a token if your project enables the App Certificate.
  token:
    "006e32fdcfdb6794ce0a6396d810bcbade4IAC3bgTUXwl8W1nU8ubAhuZKMeBRsPO5Fd/mFBJ94okzYEjct68AAAAAEACJ4tGgrgWuYAEAAQBTBa5g",
};

async function joinChannel() {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  // Automatically assign a number user ID.
  rtc.uid = await client.join(options.appId,
          options.channel,
          options.token,
          null);
  console.log("client",rtc.client);
  console.log("uid",rtc.uid);
  console.log("state",rtc.client.connectionState);
}


async function leaveChannel() {
  await client.leave();
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

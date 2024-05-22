"use client";

export const dynamic = "force-dynamic";

import { useMicVAD, utils } from "@ricky0123/vad-react";
import { useState } from "react";

export default function VoiceActivityAI() {
  const [audioList, setAudioList] = useState<string[]>([]);
  const vad = useMicVAD({
    workletURL: "/_next/static/chunks/vad.worklet.bundle.min.js",
    modelURL: "/_next/static/chunks/silero_vad.onnx",
    modelFetcher: (path) => {
      const filename = path.split("/").pop();
      return fetch(`/_next/static/chunks/${filename}`).then((model) =>
        model.arrayBuffer()
      );
    },
    ortConfig: (ort) => {
      ort.env.wasm.wasmPaths = "/_next/static/chunks/";
    },
    onSpeechEnd: (audio) => {
      const wavBuffer = utils.encodeWAV(audio);
      const base64 = utils.arrayBufferToBase64(wavBuffer);
      const url = `data:audio/wav;base64,${base64}`;
      setAudioList((old) => {
        return [url, ...old];
      });
    },
  });

  console.log(vad);
  return (
    <div>
      <h6>Listening</h6>
      {!vad.listening && "Not"} listening
      <h6>Loading</h6>
      {!vad.loading && "Not"} loading
      <h6>Errored</h6>
      {!vad.errored && "Not"} errored
      <h6>User Speaking</h6>
      {!vad.userSpeaking && "Not"} speaking
      <h6>Audio count</h6>
      {audioList.length}
      <div className="mt-10">
        <button onClick={vad.pause}>Pause</button>
        <button onClick={vad.start}>Start</button>
        <button onClick={vad.toggle}>Toggle</button>
      </div>
      <ol id="playlist">
        {audioList.map((audioURL) => {
          return (
            <li key={audioURL.substring(-10)}>
              <audio controls src={audioURL} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

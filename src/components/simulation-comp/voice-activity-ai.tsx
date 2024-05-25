"use client";

export const dynamic = "force-dynamic";

import { getSession } from "@/lib/session";
import { useMicVAD, utils } from "@ricky0123/vad-react";
import { useState } from "react";

export default function VoiceActivityAI({
  params,
}: {
  params: { slug: string };
}) {
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
    onSpeechEnd: async (audio) => {
      const wavBuffer = utils.encodeWAV(audio);
      const base64 = utils.arrayBufferToBase64(wavBuffer);
      const url = `data:audio/wav;base64,${base64}`;
      setAudioList((old) => {
        return [url, ...old];
      });

      // Create a blob from the WAV buffer
      const blob = new Blob([wavBuffer], { type: "audio/wav" });

      const session = await getSession();
      const accessToken = session?.accessToken;

      // Prepare the form data
      const formData = new FormData();
      formData.append("application_id", params.slug);
      formData.append("note", "Audio evidence"); // Add any relevant note
      formData.append("status", "exam");
      formData.append("file", blob, "audio.wav");

      // Send the form data to the server
      try {
        await fetch("http://localhost:3001/evidences", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure you have the accessToken defined and set properly
          },
          body: formData,
        });
      } catch (error) {
        console.error("Error sending audio:", error);
      }
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

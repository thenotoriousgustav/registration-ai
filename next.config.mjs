import CopyPlugin from "copy-webpack-plugin";

const wasmPaths = [
  "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
  "./node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm",
  "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
  "./node_modules/onnxruntime-web/dist/ort-wasm-simd.jsep.wasm",
  "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
  "./node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm",
  "./node_modules/onnxruntime-web/dist/ort-training-wasm-simd.wasm",
];

const vadModelFiles = [
  "./node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js",
  "./node_modules/@ricky0123/vad-web/dist/silero_vad.onnx",
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  webpack: (config, {}) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.module.rules.push({
      test: /face-api.esm.js/,
      type: "javascript/esm",
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          ...wasmPaths.map((path) => ({
            from: path,
            to: "static/chunks",
          })),
          ...vadModelFiles.map((path) => ({
            from: path,
            to: "static/chunks",
          })),
        ],
      })
    );

    return config;
  },
};

export default nextConfig;

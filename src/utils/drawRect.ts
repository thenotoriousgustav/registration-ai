import { DetectedObject } from "@tensorflow-models/coco-ssd";

function drawRect(
  detections: DetectedObject[],
  context: CanvasRenderingContext2D
) {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;

    const score = (prediction.score * 100).toFixed(2) + "%";
    const label = prediction.class.toUpperCase() + " - " + score;

    // draw bounding box
    context.font = "16px Arial";
    context.strokeStyle = "tomato";
    context.lineWidth = 3;
    context.strokeRect(x, y, width, height);

    // draw label bg
    context.fillStyle = "tomato";
    const textW = context.measureText(label).width + 10;
    context.fillRect(x, y, textW, -16);

    // text on top
    context.fillStyle = "#000000";
    context.fillText(label, x, y);
  });
}

export { drawRect };

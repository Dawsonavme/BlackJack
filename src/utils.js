export function drawTextOnArc(ctx, text, cx, cy, radius, startAngle = "center", clockwise = true, letterSpacing = 0) {
  // Prepare: measure angular width of the whole string
  const metrics = [];
  let totalArc = 0; // in radians
  for (let i = 0; i < text.length; i++) {
    const w = ctx.measureText(text[i]).width + letterSpacing;
    const ang = w / radius;                    // arc length / r = angle
    metrics.push({ w, ang });
    totalArc += ang;
  }

  // Determine the initial angle
  let angle0;
  if (startAngle === "center") {
    // center the text on the provided angle = 0 by default (pointing to the right)
    // Most people want text centered on the top (π/2). We'll rotate frame below.
    angle0 = -totalArc / 2;
  } else {
    angle0 = startAngle;
  }

  ctx.save();
  ctx.translate(cx, cy);

  // If you want the text centered at the TOP of the circle, rotate baseline by -90°.
  // Comment this out if you prefer 3 o'clock as zero-angle.
  ctx.rotate(-Math.PI / 2);

  // Direction
  const dir = clockwise ? 1 : -1;

  // Text settings (customize)
  // Example: casino table look
  // ctx.font already set by caller
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Step through characters
  let current = angle0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const { ang } = metrics[i];

    // Advance half a char
    current += dir * (ang / 2);

    ctx.save();
    ctx.rotate(current);
    ctx.translate(0, -radius); // move outward to the arc
    // Optional stroke+fill for that poker-table engraved look
    // ctx.strokeStyle = "black"; ctx.lineWidth = 3; ctx.strokeText(ch, 0, 0);
    ctx.fillText(ch, 0, 0);
    ctx.restore();

    // Advance the other half
    current += dir * (ang / 2);
  }

  ctx.restore();
}
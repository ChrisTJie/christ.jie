import { ImageResponse } from "next/og";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "small", size: { width: 32, height: 32 } },
    { id: "medium", size: { width: 192, height: 192 } },
    { id: "large", size: { width: 512, height: 512 } },
  ];
}

function IconMark({ size }: { size: number }) {
  const fontSize = Math.round(size * 0.34);
  const border = Math.max(2, Math.round(size * 0.04));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#051424",
        border: `${border}px solid #00f5ff`,
        color: "#00f5ff",
        fontSize,
        fontWeight: 700,
        fontFamily: "monospace",
        letterSpacing: "-0.06em",
      }}
    >
      CJ
    </div>
  );
}

export default async function Icon({
  id,
}: {
  id: Promise<string>;
}) {
  const iconId = await id;
  const size =
    iconId === "large" ? 512 : iconId === "medium" ? 192 : 32;

  return new ImageResponse(<IconMark size={size} />, {
    width: size,
    height: size,
  });
}

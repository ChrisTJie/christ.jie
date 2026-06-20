"use client";

const ANCHORS = [
  { id: "a1", label: "ANCHOR_01" },
  { id: "a2", label: "ANCHOR_02" },
  { id: "a3", label: "ANCHOR_03" },
  { id: "a4", label: "ANCHOR_04" },
] as const;

export function XRBackgroundLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="xr-viewfinder">
        <span className="xr-corner xr-corner-tl" />
        <span className="xr-corner xr-corner-tr" />
        <span className="xr-corner xr-corner-bl" />
        <span className="xr-corner xr-corner-br" />
      </div>

      <div className="xr-depth-planes">
        <span className="xr-depth-plane xr-depth-plane-near" />
        <span className="xr-depth-plane xr-depth-plane-mid" />
        <span className="xr-depth-plane xr-depth-plane-far" />
      </div>

      {ANCHORS.map((anchor) => (
        <div
          key={anchor.id}
          className={`xr-spatial-anchor xr-spatial-anchor-${anchor.id}`}
        >
          <div className="xr-anchor-cube">
            <span />
            <span />
            <span />
          </div>
          <span className="xr-anchor-label font-mono">{anchor.label}</span>
          <span className="xr-anchor-pulse" />
        </div>
      ))}

      <div className="scanline" />
    </div>
  );
}

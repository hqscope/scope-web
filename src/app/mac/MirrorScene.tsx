/* The reading both screens show, drawn on a 416 x 256 box. */
const SCREEN_W = 416;
const SCREEN_H = 256;
const IPAD_SCALE = 0.62;
const IPAD_PAD = 10;

const LINES = [
  { y: 100, w: 150 },
  { y: 112, w: 160 },
  { y: 124, w: 128 },
  { y: 148, w: 140 },
  { y: 160, w: 120 },
  { y: 172, w: 136 },
  { y: 196, w: 152 },
  { y: 208, w: 104 },
];

const SIDEBAR_ROWS = [66, 80, 94, 108];

/** The Mac's screen: a window with a reading open and pen marks on it. */
function Screen() {
  return (
    <>
      <rect width={SCREEN_W} height={SCREEN_H} className="fill-[#3a322a]" />
      <rect width={SCREEN_W} height={14} className="fill-[#2b2520]" />

      {/* The Lectra window. */}
      <rect x={36} y={26} width={344} height={222} rx={8} className="fill-wash" />
      <circle cx={50} cy={38} r={3.5} className="fill-[#d9d3ca]" />
      <circle cx={62} cy={38} r={3.5} className="fill-[#d9d3ca]" />
      <circle cx={74} cy={38} r={3.5} className="fill-[#d9d3ca]" />
      <path d="M36 50h344" className="stroke-line" strokeWidth={1} />
      {SIDEBAR_ROWS.map((y) => (
        <rect key={y} x={48} y={y} width={46} height={5} rx={2.5} className="fill-[#ddd6cc]" />
      ))}

      {/* The reading. */}
      <rect x={136} y={60} width={196} height={180} rx={3} className="fill-paper" />
      <rect x={154} y={76} width={92} height={9} rx={2} className="fill-[#cfc8be]" />
      <rect x={152} y={144} width={124} height={12} rx={2} className="fill-marker" />
      {LINES.map((line) => (
        <rect
          key={line.y}
          x={154}
          y={line.y}
          width={line.w}
          height={4.5}
          rx={2}
          className="fill-[#e3ddd5]"
        />
      ))}

      {/* Pen marks. */}
      <path
        d="M154 131c24-2.5 62-3.5 98-1.5 10 .5 20 1 30 2"
        className="stroke-pen"
        fill="none"
        strokeWidth={2.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M298 162c2.5 2 4.5 4.5 6 7 3.5-7 8-12 14-15"
        className="stroke-pen"
        fill="none"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

/**
 * A Mac with a reading open and an iPad in front of it showing the same
 * screen, with the Pencil beside it. Static and decorative; the caption
 * carries the meaning.
 */
export default function MirrorScene({ caption }: { caption: string }) {
  const ipadW = SCREEN_W * IPAD_SCALE + IPAD_PAD * 2;
  const ipadH = SCREEN_H * IPAD_SCALE + IPAD_PAD * 2;

  return (
    <figure className="m-0">
      <svg viewBox="0 0 640 430" className="block h-auto w-full select-none" aria-hidden="true">
        <defs>
          <filter id="mac-scene-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#241e18" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* The Mac. */}
        <rect
          x={30}
          y={10}
          width={440}
          height={280}
          rx={16}
          className="fill-[#1d1915]"
          filter="url(#mac-scene-shadow)"
        />
        <g transform="translate(42 22)">
          <Screen />
        </g>
        <path d="M10 290h480l-14 13H24z" className="fill-[#ddd6cc]" />
        <path d="M215 290h70v3a3 3 0 0 1-3 3h-64a3 3 0 0 1-3-3z" className="fill-[#c9c1b6]" />

        {/* The iPad, held in front of it, showing the same screen. */}
        <g transform="translate(318 230) rotate(-4)">
          <rect
            width={ipadW}
            height={ipadH}
            rx={16}
            className="fill-[#1d1915]"
            filter="url(#mac-scene-shadow)"
          />
          <g transform={`translate(${IPAD_PAD} ${IPAD_PAD}) scale(${IPAD_SCALE})`}>
            <Screen />
          </g>
        </g>

        {/* The Pencil, resting beside it. */}
        <g transform="translate(296 418) rotate(-4)">
          <rect x={0} y={-4.5} width={168} height={9} rx={4.5} className="fill-paper stroke-[#d9d3ca]" strokeWidth={1} />
          <path d="M0 -4.5 L-14 0 L0 4.5z" className="fill-[#ece7e0]" />
          <path d="M-9 -1.6 L-14 0 L-9 1.6z" className="fill-ink-soft" />
        </g>
      </svg>
      <figcaption className="mt-5 max-w-[52ch] text-[14.5px] leading-[1.55] text-stone">
        {caption}
      </figcaption>
    </figure>
  );
}

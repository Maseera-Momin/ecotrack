import React from 'react';

/**
 * Generates an SVG Barcode pattern based on any text string.
 */
export const BarcodeSvg: React.FC<{ value: string; className?: string; height?: number }> = ({
  value,
  className = '',
  height = 54,
}) => {
  // Deterministic bar widths based on char codes
  const bars: { width: number; isBlack: boolean }[] = [];
  
  // Start pattern
  bars.push({ width: 3, isBlack: true });
  bars.push({ width: 2, isBlack: false });
  bars.push({ width: 2, isBlack: true });
  bars.push({ width: 3, isBlack: false });

  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    const b1 = (charCode % 3) + 1;
    const b2 = ((charCode >> 1) % 3) + 1;
    const b3 = ((charCode >> 2) % 3) + 1;
    const b4 = ((charCode >> 3) % 3) + 1;
    
    bars.push({ width: b1, isBlack: true });
    bars.push({ width: b2, isBlack: false });
    bars.push({ width: b3, isBlack: true });
    bars.push({ width: b4, isBlack: false });
  }

  // Stop pattern
  bars.push({ width: 4, isBlack: true });
  bars.push({ width: 2, isBlack: false });
  bars.push({ width: 3, isBlack: true });

  const totalWidth = bars.reduce((acc, bar) => acc + bar.width, 0);

  let currentX = 0;

  return (
    <div className={`flex flex-col items-center bg-white p-3 rounded-xl shadow-inner ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full h-auto max-h-16"
        preserveAspectRatio="none"
      >
        {bars.map((bar, idx) => {
          const rect = bar.isBlack ? (
            <rect
              key={idx}
              x={currentX}
              y={0}
              width={bar.width}
              height={height}
              fill="#0F172A"
            />
          ) : null;
          currentX += bar.width;
          return rect;
        })}
      </svg>
      <span className="font-mono text-[11px] tracking-[0.25em] font-semibold text-slate-900 mt-1.5 uppercase">
        *{value}*
      </span>
    </div>
  );
};

/**
 * Generates an SVG 2D QR Code with authentic position locator targets and dynamic data matrix.
 */
export const QrCodeSvg: React.FC<{ value: string; size?: number; className?: string }> = ({
  value,
  size = 140,
  className = '',
}) => {
  // 21x21 grid QR code layout
  const gridSize = 21;
  const matrix: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Helper to draw QR position detection squares
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = true;
        } else {
          matrix[startY + r][startX + c] = false;
        }
      }
    }
  };

  // 3 standard QR position locators
  drawFinder(0, 0); // Top-left
  drawFinder(gridSize - 7, 0); // Top-right
  drawFinder(0, gridSize - 7); // Bottom-left

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Populate data cells deterministically based on value
  let seed = 0;
  for (let i = 0; i < value.length; i++) {
    seed = (seed * 31 + value.charCodeAt(i)) & 0xffffffff;
  }

  let pseudoRand = Math.abs(seed);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Don't overwrite finders or timing patterns
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming) {
        pseudoRand = (pseudoRand * 1103515245 + 12345) & 0x7fffffff;
        matrix[r][c] = (pseudoRand % 3 === 0);
      }
    }
  }

  const cellSize = size / gridSize;

  return (
    <div className={`flex flex-col items-center bg-white p-3 rounded-2xl shadow-inner ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded"
      >
        <rect width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((isFilled, c) =>
            isFilled ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.2}
                height={cellSize + 0.2}
                fill="#090F17"
                rx={cellSize * 0.15}
              />
            ) : null
          )
        )}
      </svg>
      <span className="font-mono text-[10px] tracking-wider text-slate-800 font-bold mt-1.5">
        {value}
      </span>
    </div>
  );
};

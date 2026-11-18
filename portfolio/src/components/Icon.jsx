// 内联 SVG 图标库，避免外部依赖
const paths = {
  arrowUpRight:
    "M7 17 17 7M17 7H8M17 7v9",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  mail: "M3 7h18v10H3zM3 7l9 7 9-7",
  phone:
    "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z",
  location: "M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  palette:
    "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  layers:
    "M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  devices:
    "M3 5h14v10H3zM7 19h6M15 9h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z",
  sparkles:
    "M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2l-1.8-4.8L5.4 9.6l4.8-1.8L12 3zM5 15l.9 2.1L8 18l-2.1.9L5 21l-.9-2.1L2 18l2.1-.9L5 15z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  search:
    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  check: "M5 12l5 5L20 7",
  dot: "M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0",
};

export default function Icon({ name, size = 20, stroke = 1.6, className = "" }) {
  const d = paths[name] || paths.dot;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

import type { SVGProps } from "react";

/** Bộ icon line-art dùng chung (stroke = currentColor). */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5c0 9 6 15 15 15l0-3.5-4-1.5-2 2c-2.5-1.3-4.7-3.5-6-6l2-2L7 5H4z" />
    </svg>
  );
}

export function ZaloIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16v10H10l-5 4v-4H4z" />
    </svg>
  );
}

export function MessengerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3C6.5 3 3 6.9 3 11.4c0 2.4 1.1 4.5 2.9 5.9V21l3-1.6c1 .3 2 .4 3.1.4 5.5 0 9-3.9 9-8.4S17.5 3 12 3z" />
      <path d="M7 13l3-3 2 2 3-3" />
    </svg>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4c.5 2.5 2 4 4.5 4.3" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.2} {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.5 15.5M14.5 12.5L20 20M8.5 8.5L12 12" />
    </svg>
  );
}

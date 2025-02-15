import * as React from "react";

const SVGComponent = () => (
  <svg
    width={33}
    height={82}
    viewBox="0 0 33 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="arrowDown"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M16.5 81.6001C16.5 72.4874 23.8873 65.1001 33 65.1001"
        stroke={"#3a4be8"}
        strokeWidth={3}
      />
      <path
        d="M0 65.1001C9.11269 65.1001 16.5 72.4874 16.5 81.6001"
        stroke={"#3a4be8"}
        strokeWidth={3}
      />
    </g>
    <line
      x1={16.953}
      y1={6.55671e-8}
      x2={16.953}
      y2={78}
      stroke={"#3a4be8"}
      strokeWidth={3}
    />
    <defs>
      <clipPath id="clip0">
        <rect
          width={33}
          height={26.4}
          fill={"#3a4be8"}
          transform="translate(0 55.1997)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SVGComponent;

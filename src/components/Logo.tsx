export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="30" height="30" rx="7" fill="#E8803A" />
        <text
          x="15"
          y="20.5"
          textAnchor="middle"
          fill="white"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="13"
          letterSpacing="-0.3"
        >
          SK
        </text>
      </svg>
      <span className="font-serif text-lg font-medium text-ink">Saurav KC</span>
    </div>
  )
}

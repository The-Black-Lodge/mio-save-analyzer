import { SECTIONS, LABELS } from "../constants/sections"

function SectionToggles({ active, onSelect }) {
  return (
    <div className="section-toggles">
      <button
        className={`view-toggle-btn ${active === "all" ? "view-toggle-btn--active" : ""}`}
        onClick={() => onSelect("all")}
      >
        Show All
      </button>
      {SECTIONS.map((key) => (
        <button
          key={key}
          className={`view-toggle-btn ${active === key ? "view-toggle-btn--active" : ""}`}
          onClick={() => onSelect(key)}
        >
          {LABELS[key]}
        </button>
      ))}
    </div>
  )
}

export default SectionToggles

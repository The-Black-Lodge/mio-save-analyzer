import { SECTIONS, LABELS } from "../constants/sections"

function SectionToggles({ visible, onToggle, onToggleAll }) {
  const allOn = SECTIONS.every((s) => visible[s])

  return (
    <div className="section-toggles">
      <button
        className={`view-toggle-btn ${allOn ? "view-toggle-btn--active" : ""}`}
        onClick={onToggleAll}
      >
        Toggle All
      </button>
      {SECTIONS.map((key) => (
        <button
          key={key}
          className={`view-toggle-btn ${visible[key] ? "view-toggle-btn--active" : ""}`}
          onClick={() => onToggle(key)}
        >
          {LABELS[key]}
        </button>
      ))}
    </div>
  )
}

export default SectionToggles

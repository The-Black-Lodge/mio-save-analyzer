import useSaveProvider from "../hooks/useSaveProvider"
import tabModifiersIcon from "../assets/tab-modifiers.png"

const MAX_SQUARES = 190
const ROWS = 9
const REMAINDER = MAX_SQUARES % ROWS
const UNAVAILABLE = REMAINDER === 0 ? 0 : ROWS - REMAINDER
const TOTAL_CELLS = MAX_SQUARES + UNAVAILABLE

const AllocationMatrix = () => {
  const { playerStats } = useSaveProvider()
  const equipped = playerStats?.equippedSlotCost ?? 0
  const max = playerStats?.currentMaxSlots ?? 0

  const cells = []
  for (let i = 0; i < TOTAL_CELLS; i++) {
    let className = "matrix-cell"
    if (i >= MAX_SQUARES) {
      className += " matrix-cell--unavailable"
    } else if (i < equipped) {
      className += " matrix-cell--used"
    } else if (i < max) {
      className += " matrix-cell--available"
    } else {
      className += " matrix-cell--locked"
    }
    cells.push(<div key={i} className={className} />)
  }

  return (
    <div className="section-top">
      <h3>
        <img src={tabModifiersIcon} alt="" className="header-icon" />{" "}
        Allocation Matrix{" "}
        <span className="count">
          ({equipped}/{max})
        </span>
      </h3>
      <p className="text-small">Empty slots: {max - equipped}</p>
      <div className="allocation-matrix">{cells}</div>
    </div>
  )
}

export default AllocationMatrix

import { useState } from "react"

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="todo-fixed">
      <h4
        className="todo-toggle"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((open) => !open)}
        role="button"
        tabIndex={0}
      >
        TODO <i className={`fa-solid fa-angle-${isOpen ? "up" : "down"}`} />
      </h4>
      {isOpen && (
        <ul>
          <li>Damage Upgrades</li>
          <li>Network Gates</li>
          <li>Overseers</li>
          <li>Old Core locations</li>
          <li><s>Candle locations</s></li>
          <li>Lore items</li>
          <li>% progress (maybe)</li>
          <li>Map uncovered (maybe)</li>
        </ul>
      )}
    </div>
  )
}

export default Todo

import useSaveProvider from "../hooks/useSaveProvider"

const CarcassCard = ({ label, acquired, url }) => {
  return (
    <div
      className={`card card--relative ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small">{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="corner-badge"
          aria-label="View location"
        >
          <i className="fa-solid fa-link" />
        </a>
      ) : null}
    </div>
  )
}

const Carcasses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const carcassIds = collectibles?.CARCASS ?? []
  const carcassDetails = collectibles?.carcass ?? {}
  const acquiredCarcasses = playerStats?.carcasses ?? []

  return (
    <div className="section-flex">
      <h3>
        Old Cores{" "}
        <span className="count">
          ({acquiredCarcasses.length}/{carcassIds.length})
        </span>
      </h3>
      <div className="flex-column">
        {carcassIds.map((id) => {
          const info = carcassDetails[id] ?? {}
          const description = info.description ?? id
          const url = info.url ?? ""
          const acquired = acquiredCarcasses.includes(id)
          return (
            <CarcassCard
              key={id}
              label={description}
              acquired={acquired}
              url={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Carcasses

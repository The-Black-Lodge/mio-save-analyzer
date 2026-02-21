import useSaveProvider from "../hooks/useSaveProvider"

const NetworkGateCard = ({ name, checkpointAcquired, overseerAcquired }) => {
  return (
    <div
      className={`card card--relative card--boss ${
        checkpointAcquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small text-accent">{name}</p>
      {overseerAcquired && (
        <span className="corner-badge">
          <i className="fa-solid fa-water" />
        </span>
      )}
    </div>
  )
}

const NetworkGates = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const checkpointDetails = collectibles?.checkpoints ?? {}
  const overseerDetails = collectibles?.overseers ?? {}
  const checkpointsAcquired = playerStats?.checkpointsAcquired ?? new Set()
  const overseersAcquired = playerStats?.overseersAcquired ?? new Set()

  const checkpointIds = Object.keys(checkpointDetails)
  const acquiredCount = checkpointIds.filter((id) =>
    checkpointsAcquired.has(id),
  ).length

  return (
    <div className="section">
      <h3>
        Network Gates{" "}
        <span className="count">
          ({acquiredCount}/{checkpointIds.length})
        </span>
      </h3>
      <p className="text-small legend">
        <i className="fa-solid fa-water" /> = Overseer found
      </p>
      <div className="flex-grid flex-grid--bosses">
        {checkpointIds.map((id) => {
          const info = checkpointDetails[id] ?? {}
          const name = info.name ?? id
          return (
            <NetworkGateCard
              key={id}
              name={name}
              checkpointAcquired={checkpointsAcquired.has(id)}
              overseerAcquired={id in overseerDetails && overseersAcquired.has(id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NetworkGates

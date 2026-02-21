import useSaveProvider from "../hooks/useSaveProvider"

const BossCard = ({ label, description, acquired, attempts }) => {
  return (
    <div
      className={`card card--relative ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <h4 className="text-uppercase">{label}</h4>
      {description && (
        <>
          <hr className="divider" />
          <p className="text-small">
            {description}
          </p>
        </>
      )}
      {attempts > 0 && (
        <>
          <br />
          <span className="corner-badge">
            {attempts} <i className="fa-solid fa-skull" />
          </span>
        </>
      )}
    </div>
  )
}

const Bosses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const bossDetails = collectibles?.bosses ?? {}
  const bossesList = Object.keys(bossDetails)
  const bossesDefeated = playerStats?.bossesDefeated ?? {}
  const bossAttempts = playerStats?.bossAttempts ?? {}

  const defeatedCount = bossesList.filter(
    (id) => (bossesDefeated[id] ?? 0) > 0,
  ).length

  return (
    <div className="section">
      <h3>
        Bosses{" "}
        <span className="count">
          ({defeatedCount}/{bossesList.length})
        </span>
      </h3>
      <div className="flex-grid">
        {bossesList.map((bossId) => {
          const info = bossDetails[bossId] ?? {}
          const name = info.name ?? bossId
          const description = info.description ?? ""
          const acquired = (bossesDefeated[bossId] ?? 0) > 0
          const attempts = bossAttempts[bossId] ?? 0
          return (
            <BossCard
              key={bossId}
              label={name}
              description={description}
              acquired={acquired}
              attempts={attempts}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Bosses

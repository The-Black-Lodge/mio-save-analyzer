import useSaveProvider from "../hooks/useSaveProvider"

const BossCard = ({ label, description, acquired, attempts }) => {
  return (
    <div
      style={{
        position: "relative",
        border: acquired ? "1px solid #ffc" : "1px solid #666",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    >
      <h4 style={{ textTransform: "uppercase" }}>{label}</h4>
      {description && (
        <>
          <hr style={{ border: "none", borderBottom: "1px solid #666" }} />
          <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
            {description}
          </p>
        </>
      )}
      {attempts > 0 && (
        <>
          <br />
          <span
            style={{
              position: "absolute",
              bottom: "0.25rem",
              right: "0.25rem",
              color: "#ffc",
              fontSize: "0.8rem",
            }}
          >
            {attempts} <i className="fa-solid fa-skull" />
          </span>
        </>
      )}
    </div>
  )
}

const Bosses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const bossesList = collectibles?.bosses ?? []
  const bossDetails = collectibles?.boss ?? {}
  const bossesDefeated = playerStats?.bossesDefeated ?? {}
  const bossAttempts = playerStats?.bossAttempts ?? {}

  const defeatedCount = bossesList.filter(
    (id) => (bossesDefeated[id] ?? 0) > 0,
  ).length

  return (
    <div style={{ padding: "1rem" }}>
      <h3>
        Bosses{" "}
        <span style={{ color: "white" }}>
          ({defeatedCount}/{bossesList.length})
        </span>
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
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

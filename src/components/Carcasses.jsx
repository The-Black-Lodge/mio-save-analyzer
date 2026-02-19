import useSaveProvider from "../hooks/useSaveProvider"

const CarcassCard = ({ label, acquired, url }) => {
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
      <p style={{ textAlign: "left", fontSize: "0.8rem" }}>{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: "0.25rem",
            right: "0.25rem",
            color: "#ffc",
            fontSize: "0.8rem",
          }}
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
    <div style={{ padding: "1rem" }}>
      <h3>
        Old Cores{" "}
        <span style={{ color: "white" }}>
          ({acquiredCarcasses.length}/{carcassIds.length})
        </span>
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          maxWidth: "32rem",
          margin: "0 auto",
        }}
      >
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

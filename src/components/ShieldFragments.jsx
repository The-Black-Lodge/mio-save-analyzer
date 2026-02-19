import useSaveProvider from "../hooks/useSaveProvider"

const SHIELD_FRAGMENTS_MAX = 24
const SHIELD_FRAGMENT_INDICES = Array.from(
  { length: SHIELD_FRAGMENTS_MAX },
  (_, i) => i,
)

const ShieldFragmentCard = ({ label, acquired, url }) => {
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

const ShieldFragments = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []
  const shieldFragments = collectibles?.shield_fragments ?? {}

  return (
    <div style={{ padding: "1rem", flex: 1, minWidth: "14rem" }}>
      <h3>
        Coating Components{" "}
        <span style={{ color: "white" }}>
          ({shieldFragmentsAcquired.length}/{SHIELD_FRAGMENTS_MAX})
        </span>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {SHIELD_FRAGMENT_INDICES.map((i) => {
          const info = shieldFragments[String(i)] ?? {}
          const description = info.description ?? `Fragment ${i}`
          const url = info.url ?? ""
          const acquired = shieldFragmentsAcquired.includes(i)
          return (
            <ShieldFragmentCard
              key={i}
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

export default ShieldFragments

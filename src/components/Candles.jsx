import useSaveProvider from "../hooks/useSaveProvider"

const CANDLES_MAX = 12
const CANDLE_INDICES = Array.from({ length: CANDLES_MAX }, (_, i) => i)

const CandleCard = ({ label, acquired, url }) => {
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

const Candles = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const candlesAcquired = playerStats?.candlesAcquired ?? []
  const candles = collectibles?.candles ?? {}

  return (
    <div style={{ padding: "1rem", flex: 1, minWidth: "14rem" }}>
      <h3>
        Candles{" "}
        <span style={{ color: "white" }}>
          ({candlesAcquired.length}/{CANDLES_MAX})
        </span>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {CANDLE_INDICES.map((i) => {
          const info = candles[String(i)] ?? {}
          const description = info.description ?? `Candle ${i}`
          const url = info.url ?? ""
          const acquired = candlesAcquired.includes(i)
          return (
            <CandleCard
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

export default Candles

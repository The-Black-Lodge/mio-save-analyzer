import useSaveProvider from "../hooks/useSaveProvider"

const CANDLES_MAX = 12
const CANDLE_INDICES = Array.from({ length: CANDLES_MAX }, (_, i) => i)

const CandleCard = ({ label, acquired, url }) => {
  return (
    <div
      style={{
        border: acquired ? "1px solid #ffc" : "1px solid #666",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    >
      <h4>{label}</h4>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗
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
    <div style={{ padding: "1rem" }}>
      <h3>
        Candles{" "}
        <span style={{ color: "white" }}>
          ({candlesAcquired.length}/{CANDLES_MAX})
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

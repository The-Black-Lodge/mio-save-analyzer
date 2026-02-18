import useSaveProvider from "../hooks/useSaveProvider"

const CANDLE_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const CANDLES_MAX = 12

const Candles = () => {
  const { playerStats } = useSaveProvider()
  const candlesCount = playerStats?.candlesCount ?? 0
  const candlesAcquired = playerStats?.candlesAcquired ?? []

  return (
    <div style={{ display: "inline-block" }}>
      <h3>Candles</h3>
      <p>
        {candlesCount}/{CANDLES_MAX} found
      </p>
      <p style={{ fontSize: "0.9em", margin: "0.25rem 0" }}>
        Slots:{" "}
        {CANDLE_INDICES.map((i) =>
          candlesAcquired.includes(i) ? "✅" : "❌",
        ).join(" ")}{" "}
        <span style={{ color: "#666" }}>(0–11)</span>
      </p>
    </div>
  )
}

export default Candles

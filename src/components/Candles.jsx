import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"

const Candles = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const candlesAcquired = playerStats?.candlesAcquired ?? []
  const candles = collectibles?.candles ?? {}

  return (
    <CollectibleList
      title="Candles"
      items={candles}
      acquiredKeys={new Set(candlesAcquired.map(String))}
      fallbackLabel={(key) => `Candle ${key}`}
    />
  )
}

export default Candles

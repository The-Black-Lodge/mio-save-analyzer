import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"

const Carcasses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const acquiredCarcasses = playerStats?.carcasses ?? []
  const carcasses = collectibles?.carcasses ?? {}

  return (
    <CollectibleList
      title="Old Cores"
      items={carcasses}
      acquiredKeys={new Set(acquiredCarcasses)}
    />
  )
}

export default Carcasses

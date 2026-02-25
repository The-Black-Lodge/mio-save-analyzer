import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"

const Carcasses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const acquiredCarcasses = playerStats?.carcasses ?? []
  const acquiredDialogs = playerStats?.carcassDialogs ?? []
  const carcasses = collectibles?.carcasses ?? {}
  const carcassDialog = collectibles?.carcassDialog ?? {}

  const allItems = { ...carcasses, ...carcassDialog }
  const allAcquired = new Set([...acquiredCarcasses, ...acquiredDialogs])

  return (
    <CollectibleList
      title="Old Cores"
      items={allItems}
      acquiredKeys={allAcquired}
    />
  )
}

export default Carcasses

import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"
import serialNumberIcon from "../assets/fragmented-serial-number.png"

const ChestKey = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const chestKeysAcquired = playerStats?.chestKeysAcquired ?? []
  const chestKeys = collectibles?.chest_keys ?? {}

  return (
    <CollectibleList
      title="Fragmented Serial Numbers"
      icon={serialNumberIcon}
      items={chestKeys}
      acquiredKeys={new Set(chestKeysAcquired.map(String))}
      fallbackLabel={(key) => `Serial Code ${+key + 1}`}
    />
  )
}

export default ChestKey

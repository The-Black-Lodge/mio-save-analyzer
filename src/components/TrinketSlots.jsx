import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"
import modifierExtIcon from "../assets/modifier-extension.png"

const TrinketSlots = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const slotUpgradesAcquired = playerStats?.trinketSlotUpgradesAcquired ?? []
  const trinketSlots = collectibles?.trinket_slots ?? {}

  return (
    <CollectibleList
      title="Modifier Slot Upgrades"
      icon={modifierExtIcon}
      items={trinketSlots}
      acquiredKeys={new Set(slotUpgradesAcquired.map(String))}
      fallbackLabel={(key) => `Slot ${key}`}
    />
  )
}

export default TrinketSlots

import localization from "../data/localization.en.json"
import collectibles from "../data/collectibles.json"
import { useState, useMemo } from "react"
import { parseSave } from "../saveParser"
import { SaveContext } from "./SaveContext"

const parsePlaytime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

const parseLastSaveTime = (lastSaveTime) => {
  if (!lastSaveTime) return "—"
  const date = new Date(lastSaveTime * 1000)
  return date.toLocaleString()
}

function computePlayerStats(gameData, collectibles) {
  const trinketObj = gameData?.Saved_entries?.TRINKET ?? {}
  const trinkets = Object.entries(trinketObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => key)
  const equippedTrinkets = Object.entries(trinketObj)
    .filter(([, value]) => value?.flags?.includes("Equipped"))
    .map(([key]) => key)

  const unlockObj = gameData?.Saved_entries?.UNLOCK ?? {}
  const unlocks = Object.entries(unlockObj)
    .filter(([key]) => key !== "SLASH")
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => key)

  const validSlotKeys = new Set(Object.keys(collectibles.trinket_slots))
  const slotUpgradeObj = gameData?.Saved_entries?.TRINKET_SLOT_UPGRADE ?? {}
  const trinketSlotUpgradesAcquired = Object.entries(slotUpgradeObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => parseInt(key, 10))
    .filter((n) => !Number.isNaN(n) && validSlotKeys.has(String(n)))
    .sort((a, b) => a - b)
  const trinketSlotUpgradesCount = trinketSlotUpgradesAcquired.length

  const validCandleKeys = new Set(Object.keys(collectibles.candles))
  const candleObj = gameData?.Saved_entries?.CANDLE ?? {}
  const candlesAcquired = Object.entries(candleObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => parseInt(key, 10))
    .filter((n) => !Number.isNaN(n) && validCandleKeys.has(String(n)))
    .sort((a, b) => a - b)
  const candlesCount = candlesAcquired.length

  const validShieldKeys = new Set(Object.keys(collectibles.shield_fragments))
  const shieldFragmentObj = gameData?.Saved_entries?.SHIELD_FRAGMENT ?? {}
  const shieldFragmentsAcquired = Object.entries(shieldFragmentObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => parseInt(key, 10))
    .filter((n) => !Number.isNaN(n) && validShieldKeys.has(String(n)))
    .sort((a, b) => a - b)
  const shieldFragmentsCount = shieldFragmentsAcquired.length

  const validChestKeyKeys = new Set(Object.keys(collectibles.chest_keys))
  const chestKeyObj = gameData?.Saved_entries?.CHEST_KEY ?? {}
  const chestKeysAcquired = Object.entries(chestKeyObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => parseInt(key, 10))
    .filter((n) => !Number.isNaN(n) && validChestKeyKeys.has(String(n)))
    .sort((a, b) => a - b)

  const carcassObj = gameData?.Saved_entries?.CARCASS ?? {}
  const carcasses = Object.entries(carcassObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => key)
    .filter((key) => key in collectibles.carcasses)

  const bossIds = Object.keys(collectibles.bosses)
  const bossObj = gameData?.Saved_entries?.BOSS ?? {}
  const bossMeetObj = gameData?.Saved_entries?.BOSS_MEET ?? {}
  const bossTryObj = gameData?.Saved_entries?.BOSS_TRY ?? {}
  const bossesDefeated = Object.fromEntries(
    bossIds.map((id) => [id, bossObj[id]?.count ?? 0]),
  )
  const bossAttempts = Object.fromEntries(
    bossIds.map((id) => {
      const met = bossMeetObj[id]?.count ?? 0
      const tried = bossTryObj[id]?.count ?? 0
      return [id, Math.max(Math.max(0, met - 1), tried)]
    }),
  )

  return {
    deaths: gameData?.Saved_entries?.STATS?.DEATH?.count ?? 0,
    playtime: parsePlaytime(gameData?.Saved_not_important?.playtime ?? 0),
    lastSaveTime: parseLastSaveTime(
      gameData?.Saved_not_important?.last_save_time ?? 0,
    ),
    liquidNacresCount:
      gameData?.Saved_entries?.RESOURCE?.PEARL_SHARDS?.count ?? 0,
    solidifyNacreCount:
      gameData?.Saved_entries?.RESOURCE?.SOLID_DROPLETS?.count ?? 0,
    nacreLost: gameData?.Save?.nacre_in_hub_basin ?? 0,
    trinkets,
    equippedTrinkets,
    unlocks,
    trinketSlotUpgradesCount,
    trinketSlotUpgradesAcquired,
    candlesCount,
    candlesAcquired,
    shieldFragmentsCount,
    shieldFragmentsAcquired,
    chestKeysAcquired,
    carcasses,
    bossesDefeated,
    bossAttempts,
  }
}

const SaveProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null)

  const playerStats = useMemo(
    () => computePlayerStats(gameData, collectibles),
    [gameData],
  )

  const uploadSave = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result
      if (typeof text === "string") {
        try {
          const parsed = parseSave(text)
          setGameData(parsed)
        } catch (err) {
          console.error("Failed to parse save file:", err)
        }
      }
    }
    reader.readAsText(file)
  }

  const value = {
    setGameData,
    uploadSave,
    playerStats,
    localization,
    collectibles,
  }

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
}

export default SaveProvider

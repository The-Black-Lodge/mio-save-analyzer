import collectibles from "../data/collectibles.json"
import { useState, useMemo } from "react"
import { parseSave } from "../saveParser"
import { SaveContext } from "./SaveContext"

const STARTING_TRINKET_SLOTS = 25

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

function acquiredIntKeys(gameData, saveKey, validKeys) {
  const obj = gameData?.Saved_entries?.[saveKey] ?? {}
  return Object.entries(obj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => parseInt(key, 10))
    .filter((n) => !Number.isNaN(n) && validKeys.has(String(n)))
    .sort((a, b) => a - b)
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

  const trinketSlotUpgradesAcquired = acquiredIntKeys(
    gameData,
    "TRINKET_SLOT_UPGRADE",
    new Set(Object.keys(collectibles.trinket_slots)),
  )
  const attackPowerAcquired = acquiredIntKeys(
    gameData,
    "ATTACK_POWER",
    new Set(Object.keys(collectibles.attack_power)),
  )
  const candlesAcquired = acquiredIntKeys(
    gameData,
    "CANDLE",
    new Set(Object.keys(collectibles.candles)),
  )
  const shieldFragmentsAcquired = acquiredIntKeys(
    gameData,
    "SHIELD_FRAGMENT",
    new Set(Object.keys(collectibles.shield_fragments)),
  )
  const chestKeysAcquired = acquiredIntKeys(
    gameData,
    "CHEST_KEY",
    new Set(Object.keys(collectibles.chest_keys)),
  )

  const datapadObj = gameData?.Saved_entries?.DATAPAD ?? {}
  const datapadsAcquired = new Set(
    Object.entries(datapadObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key),
  )

  const keyObj = gameData?.Saved_entries?.KEY ?? {}
  const keysAcquired = new Set(
    Object.entries(keyObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key),
  )

  const voiceDiscoveredObj = gameData?.Saved_entries?.ITEM_DISCOVERED?.VOICE ?? {}
  const voicesAcquired = new Set(
    Object.entries(voiceDiscoveredObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key),
  )

  const carcassObj = gameData?.Saved_entries?.CARCASS ?? {}
  const carcasses = Object.entries(carcassObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => key)
    .filter((key) => key in collectibles.carcasses)

  const dialogObj = gameData?.Saved_entries?.DIALOG ?? {}
  const carcassDialogs = Object.entries(dialogObj)
    .filter(([, value]) => value?.flags?.includes("Acquired"))
    .map(([key]) => key)
    .filter((key) => key in collectibles.carcassDialog)

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

  const checkpointObj = gameData?.Saved_entries?.CHECKPOINT ?? {}
  const checkpointsAcquired = new Set(
    Object.entries(checkpointObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key),
  )

  const overseerObj = gameData?.Saved_entries?.OVERSEER ?? {}
  const overseersAcquired = new Set(
    Object.entries(overseerObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key),
  )

  const trinketData = collectibles?.trinkets ?? {}
  const unlockedSlots =
    STARTING_TRINKET_SLOTS + trinketSlotUpgradesAcquired.length * 10

  const negativeSlotBonus = equippedTrinkets.reduce((sum, key) => {
    const cost = parseInt(trinketData[key]?.cost, 10) || 0
    return cost < 0 ? sum + Math.abs(cost) : sum
  }, 0)
  const currentMaxSlots = unlockedSlots + negativeSlotBonus

  const equippedSlotCost = equippedTrinkets.reduce((sum, key) => {
    const cost = parseInt(trinketData[key]?.cost, 10) || 0
    return cost > 0 ? sum + cost : sum
  }, 0)

  if (gameData) {
    console.log(
      `[Trinket Slots] unlocked: ${unlockedSlots}, max: ${currentMaxSlots}, equipped: ${equippedSlotCost}`,
    )
  }

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
    trinketSlotUpgradesAcquired,
    candlesAcquired,
    shieldFragmentsAcquired,
    chestKeysAcquired,
    attackPowerAcquired,
    datapadsAcquired,
    keysAcquired,
    voicesAcquired,
    carcasses,
    carcassDialogs,
    bossesDefeated,
    bossAttempts,
    checkpointsAcquired,
    overseersAcquired,
    unlockedSlots,
    currentMaxSlots,
    equippedSlotCost,
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
    uploadSave,
    playerStats,
    collectibles,
  }

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
}

export default SaveProvider

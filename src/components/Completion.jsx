import useSaveProvider from "../hooks/useSaveProvider"

const CURIO_KEYS = [
  "CURIO_PENDANT",
  "CURIO_CEREAL_BAR",
  "CURIO_MARBLES",
  "CURIO_PLUSHIE",
  "CURIO_JOURNAL",
  "CURIO_FLUTE",
  "CURIO_SHOE",
]

const LETTER_KEYS = [
  "LETTER_FIRST_CASE",
  "LETTER_FAREWELL",
  "LETTER_TRIGGER",
  "LETTER_SPREAD",
  "LETTER_LOVE",
  "LETTER_ACCELERATE",
  "LETTER_POISON",
]

const PEARL_KEYS = [
  "PEARL_LIHO",
  "PEARL_HALYN",
  "PEARL_ASMA",
  "PEARL_NODEN",
  "PEARL_AMYTIS",
  "PEARL_KHLIA",
]

const LOG_KEYS = [
  "TXT_TRAVELLER_LOG1_TRANSLATED",
  "TXT_TRAVELLER_LOG2_TRANSLATED",
  "TXT_TRAVELLER_LOG3_TRANSLATED",
  "TXT_TRAVELLER_LOG4_TRANSLATED",
  "TXT_TRAVELLER_LOG5_TRANSLATED",
  "TXT_TRAVELLER_LOG6_TRANSLATED",
  "TXT_TRAVELLER_LOG7_TRANSLATED",
]

const MEM_KEYS = [
  "MEM_VOICEKEEPER",
  "MEM_LIBRARIAN",
  "MEM_PUPPET",
  "MEM_LIDAR",
  "MEM_LIDAR_2",
  "MEM_IMPY",
]

const KEY_KEYS = [
  "ROOTS_CORRIDOR",
  "BELL_TOWER_PASS_CITY",
  "BELL_TOWER_PASS_GARDEN",
  "MAINTENANCE_KEY",
  "BUNKER_KEY",
  "GLASSHOUSE_KEY",
  "SPIDY_KEY",
]

const KEY_ITEM_KEYS = ["SPINE_FRAGMENT", "LURA", "FINGER_WHEEL"]

const CompletionRow = ({ label, acquired, total }) => {
  const pct = total === 0 ? 100 : (acquired / total) * 100
  const done = acquired === total
  return (
    <div className={`completion-row ${done ? "completion-row--done" : ""}`}>
      <span className="completion-label">{label}</span>
      <span className="completion-fraction">
        {acquired}/{total}
      </span>
      <div className="completion-bar-track">
        <div
          className="completion-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

const Completion = () => {
  const { playerStats, collectibles } = useSaveProvider()

  const bossIds = Object.keys(collectibles?.bosses ?? {})
  const bossesDefeated = bossIds.filter(
    (id) => (playerStats?.bossesDefeated?.[id] ?? 0) > 0,
  ).length

  const checkpointIds = Object.keys(collectibles?.checkpoints ?? {})
  const checkpointsAcquired = checkpointIds.filter((id) =>
    playerStats?.checkpointsAcquired?.has(id),
  ).length

  const overseerIds = Object.keys(collectibles?.overseers ?? {})
  const overseersAcquired = overseerIds.filter((id) =>
    playerStats?.overseersAcquired?.has(id),
  ).length

  const trinketTotal = Object.keys(collectibles?.trinkets ?? {}).length
  const trinketSlotTotal = Object.keys(collectibles?.trinket_slots ?? {}).length
  const trinketAcquired = playerStats?.trinkets?.length ?? 0
  const trinketSlotAcquired =
    playerStats?.trinketSlotUpgradesAcquired?.length ?? 0

  const curiosCapucined = CURIO_KEYS.filter((k) =>
    playerStats?.datapadsAcquired?.has(`${k}_CAPUCINED`),
  ).length

  const unlockTotal = Object.keys(collectibles?.unlocks ?? {}).length
  const abilitiesAcquired = playerStats?.unlocks?.length ?? 0

  const shieldTotal = Object.keys(collectibles?.shield_fragments ?? {}).length
  const shieldAcquired = playerStats?.shieldFragmentsAcquired?.length ?? 0

  const coreTotal =
    Object.keys(collectibles?.carcasses ?? {}).length +
    Object.keys(collectibles?.carcassDialog ?? {}).length
  const coresAcquired =
    (playerStats?.carcasses?.length ?? 0) +
    (playerStats?.carcassDialogs?.length ?? 0)

  const candleTotal = Object.keys(collectibles?.candles ?? {}).length
  const candlesAcquired = playerStats?.candlesAcquired?.length ?? 0

  const lettersAcquired = LETTER_KEYS.filter((k) =>
    playerStats?.datapadsAcquired?.has(k),
  ).length

  const voiceTotal = Object.keys(collectibles?.voices ?? {}).length
  const voicesAcquired = playerStats?.voicesAcquired?.size ?? 0

  const pearlsAcquired = PEARL_KEYS.filter((k) =>
    playerStats?.datapadsAcquired?.has(k),
  ).length

  const logsAcquired = LOG_KEYS.filter((k) =>
    playerStats?.datapadsAcquired?.has(k),
  ).length

  const memsAcquired = MEM_KEYS.filter((k) =>
    playerStats?.datapadsAcquired?.has(k),
  ).length

  const keysAcquired = KEY_KEYS.filter((k) =>
    playerStats?.keysAcquired?.has(k),
  ).length

  const serialTotal = Object.keys(collectibles?.chest_keys ?? {}).length
  const serialAcquired = playerStats?.chestKeysAcquired?.length ?? 0

  const keyItemsAcquired = KEY_ITEM_KEYS.filter((k) =>
    playerStats?.keysAcquired?.has(k),
  ).length

  const attackTotal = Object.keys(collectibles?.attack_power ?? {}).length
  const attackAcquired = playerStats?.attackPowerAcquired?.length ?? 0

  const COMPLETION_ITEMS = [
    { label: "Abilities", acquired: abilitiesAcquired, total: unlockTotal },
    { label: "Modifiers", acquired: trinketAcquired, total: trinketTotal },
    {
      label: "Modifier Slot Upgrades",
      acquired: trinketSlotAcquired,
      total: trinketSlotTotal,
    },
    { label: "Bosses", acquired: bossesDefeated, total: bossIds.length },
    {
      label: "Network Gates",
      acquired: checkpointsAcquired,
      total: checkpointIds.length,
    },
    {
      label: "Overseers",
      acquired: overseersAcquired,
      total: overseerIds.length,
    },
    {
      label: "Letters from Tomo",
      acquired: lettersAcquired,
      total: LETTER_KEYS.length,
    },
    { label: "Voices", acquired: voicesAcquired, total: voiceTotal },
    {
      label: "Pearl Records",
      acquired: pearlsAcquired,
      total: PEARL_KEYS.length,
    },
    {
      label: "Curios Capucined",
      acquired: curiosCapucined,
      total: CURIO_KEYS.length,
    },
    {
      label: "Traveller's Log",
      acquired: logsAcquired,
      total: LOG_KEYS.length,
    },
    { label: "Flash Memory", acquired: memsAcquired, total: MEM_KEYS.length },
    { label: "Keys", acquired: keysAcquired, total: KEY_KEYS.length },
    {
      label: "Key Items",
      acquired: keyItemsAcquired,
      total: KEY_ITEM_KEYS.length,
    },
    { label: "Forebears Legacy", acquired: attackAcquired, total: attackTotal },
    {
      label: "Coating Components",
      acquired: shieldAcquired,
      total: shieldTotal,
    },
    { label: "Old Cores", acquired: coresAcquired, total: coreTotal },
    {
      label: "Fragmented Serial Numbers",
      acquired: serialAcquired,
      total: serialTotal,
    },
    { label: "Candles", acquired: candlesAcquired, total: candleTotal },
  ]

  const totalAcquired = COMPLETION_ITEMS.reduce((s, i) => s + i.acquired, 0)
  const totalPossible = COMPLETION_ITEMS.reduce((s, i) => s + i.total, 0)
  const overallPct =
    totalPossible === 0
      ? "0.0"
      : ((totalAcquired / totalPossible) * 100).toFixed(1)

  return (
    <div className="section">
      <h3>
        Completion <span className="count">({overallPct}%)</span>
      </h3>
      <p className="text-small text-dim text-center">
        as defined by speedrun.com 100% category rules{" "}
        <a
          href="https://www.speedrun.com/MIO_Memories_in_Orbit?h=100&rules=category&x=7dgw67x2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-external-link" />
        </a>
      </p>
      <div className="completion-list">
        {COMPLETION_ITEMS.map((item) => (
          <CompletionRow
            key={item.label}
            label={item.label}
            acquired={item.acquired}
            total={item.total}
          />
        ))}
      </div>
    </div>
  )
}

export default Completion

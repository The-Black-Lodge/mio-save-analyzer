import useSaveProvider from "../hooks/useSaveProvider"

const datapadIconModules = import.meta.glob("../assets/datapads/*.png", {
  eager: true,
  import: "default",
})
const rootIconModules = import.meta.glob("../assets/*.png", {
  eager: true,
  import: "default",
})

function getIcon(filename, isRoot = false) {
  if (isRoot) return rootIconModules[`../assets/${filename}.png`]
  return datapadIconModules[`../assets/datapads/${filename}.png`]
}

const SECTIONS = [
  {
    id: "abilities",
    title: "Abilities",
    items: [
      { key: "SPIDER_GOO",   icon: "UNLOCK_SPIDER_GOO",  root: true },
      { key: "HOOK",         icon: "UNLOCK_HOOK",         root: true },
      { key: "BLOCK",        icon: "UNLOCK_BLOCK",        root: true },
      { key: "HIT_RECHARGE", icon: "UNLOCK_HIT_RECHARGE", root: true },
      { key: "GLIDE",        icon: "UNLOCK_GLIDE",        root: true },
      { key: "SPIDER",       icon: "UNLOCK_SPIDER",       root: true },
      { key: "ORB_SHOOT",    icon: "UNLOCK_ORB_SHOOT",    root: true },
    ],
    acquired: (ps) => new Set(ps?.unlocks ?? []),
    total: (col) => col?.unlocks,
  },
  {
    id: "letters",
    title: "Letter from Tomo",
    items: [
      { key: "LETTER_FIRST_CASE", icon: "DATAPAD_LETTER_FIRST_CASE" },
      { key: "LETTER_FAREWELL", icon: "DATAPAD_LETTER_FAREWELL" },
      { key: "LETTER_TRIGGER", icon: "DATAPAD_LETTER_TRIGGER" },
      { key: "LETTER_SPREAD", icon: "DATAPAD_LETTER_SPREAD" },
      { key: "LETTER_LOVE", icon: "DATAPAD_LETTER_LOVE" },
      { key: "LETTER_ACCELERATE", icon: "DATAPAD_LETTER_ACCELERATE" },
      { key: "LETTER_POISON", icon: "DATAPAD_LETTER_POISON" },
    ],
    acquired: (ps) => ps?.datapadsAcquired ?? new Set(),
    total: (col) => col?.datapads,
  },
  {
    id: "voices",
    title: "Voices",
    items: [
      { key: "LIHO", icon: "VOICE_LIHO" },
      { key: "HALYN", icon: "VOICE_HALYN" },
      { key: "ASMA", icon: "VOICE_ASMA" },
      { key: "NODEN", icon: "VOICE_NODEN" },
      { key: "AMYTIS", icon: "VOICE_AMYTIS" },
    ],
    acquired: (ps) => ps?.voicesAcquired ?? new Set(),
    total: (col) => col?.voices,
  },
  {
    id: "pearls",
    title: "Pearl Record",
    items: [
      { key: "PEARL_LIHO", icon: "DATAPAD_PEARL_LIHO" },
      { key: "PEARL_HALYN", icon: "DATAPAD_PEARL_HALYN" },
      { key: "PEARL_ASMA", icon: "DATAPAD_PEARL_ASMA" },
      { key: "PEARL_NODEN", icon: "DATAPAD_PEARL_NODEN" },
      { key: "PEARL_AMYTIS", icon: "DATAPAD_PEARL_AMYTIS" },
      { key: "PEARL_KHLIA", icon: "DATAPAD_PEARL_KHLIA" },
    ],
    acquired: (ps) => ps?.datapadsAcquired ?? new Set(),
    total: (col) => col?.datapads,
  },
  {
    id: "curios",
    title: "Curios",
    items: [
      { key: "CURIO_PENDANT", icon: "DATAPAD_CURIO_PENDANT" },
      { key: "CURIO_CEREAL_BAR", icon: "DATAPAD_CURIO_CEREAL_BAR" },
      { key: "CURIO_MARBLES", icon: "DATAPAD_CURIO_MARBLES" },
      { key: "CURIO_PLUSHIE", icon: "DATAPAD_CURIO_PLUSHIE" },
      { key: "CURIO_JOURNAL", icon: "DATAPAD_CURIO_JOURNAL" },
      { key: "CURIO_FLUTE", icon: "DATAPAD_CURIO_FLUTE" },
      { key: "CURIO_SHOE", icon: "DATAPAD_CURIO_SHOE" },
    ],
    acquired: (ps) => ps?.datapadsAcquired ?? new Set(),
    total: (col) => col?.datapads,
  },
  {
    id: "logs",
    title: "Traveller's Log",
    items: [
      {
        key: "TXT_TRAVELLER_LOG1_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG1_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG2_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG2_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG3_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG3_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG4_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG4_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG5_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG5_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG6_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG6_TRANSLATED",
      },
      {
        key: "TXT_TRAVELLER_LOG7_TRANSLATED",
        icon: "DATAPAD_TXT_TRAVELLER_LOG7_TRANSLATED",
      },
    ],
    acquired: (ps) => ps?.datapadsAcquired ?? new Set(),
    total: (col) => col?.datapads,
  },
  {
    id: "memories",
    title: "Flash Memory",
    items: [
      { key: "MEM_VOICEKEEPER", icon: "DATAPAD_MEM_VOICEKEEPER" },
      { key: "MEM_LIBRARIAN", icon: "DATAPAD_MEM_LIBRARIAN" },
      { key: "MEM_PUPPET", icon: "DATAPAD_MEM_PUPPET" },
      { key: "MEM_LIDAR", icon: "DATAPAD_MEM_LIDAR" },
      { key: "MEM_LIDAR_2", icon: "DATAPAD_MEM_LIDAR_2" },
      { key: "MEM_IMPY", icon: "DATAPAD_MEM_IMPY" },
    ],
    acquired: (ps) => ps?.datapadsAcquired ?? new Set(),
    total: (col) => col?.datapads,
  },
  {
    id: "keys",
    title: "Keys",
    items: [
      { key: "ROOTS_CORRIDOR",       icon: "KEY_ROOTS_CORRIDOR" },
      { key: "BELL_TOWER_PASS_CITY",   icon: "KEY_BELL_TOWER_PASS_CITY" },
      { key: "BELL_TOWER_PASS_GARDEN", icon: "KEY_BELL_TOWER_PASS_GARDEN" },
      { key: "MAINTENANCE_KEY",      icon: "KEY_MAINTENANCE_KEY" },
      { key: "BUNKER_KEY",           icon: "KEY_BUNKER_ACCESS" },
      { key: "GLASSHOUSE_KEY",       icon: "KEY_GLASSHOUSE_KEY" },
      { key: "SPIDY_KEY",            icon: "KEY_SPIDY_KEY" },
    ],
    acquired: (ps) => ps?.keysAcquired ?? new Set(),
    total: (col) => col?.keys,
    footer: (ps, col) => [
      {
        label: "Fragmented Serial Numbers",
        icon: "CHEST_KEY",
        acquired: ps?.chestKeysAcquired?.length ?? 0,
        total: Object.keys(col?.chest_keys ?? {}).length,
        divider: true,
      },
      {
        label: "Candles",
        icon: "CANDLE",
        acquired: ps?.candlesAcquired?.length ?? 0,
        total: Object.keys(col?.candles ?? {}).length,
      },
    ],
  },
  {
    id: "special",
    title: "Key Items",
    items: [
      { key: "SPINE_FRAGMENT", icon: "KEY_SPINE_FRAGMENT" },
      { key: "LURA",           icon: "KEY_LURA" },
      { key: "FINGER_WHEEL",   icon: "KEY_FINGER_WHEEL" },
    ],
    acquired: (ps) => ps?.keysAcquired ?? new Set(),
    total: (col) => col?.keys,
  },
]

const UPGRADES = [
  {
    id: "forebears",
    label: "Forebears Legacy",
    icon: "ATTACK_POWER",
    acquired: (ps) => ps?.attackPowerAcquired?.length ?? 0,
    total: (col) => Object.keys(col?.attack_power ?? {}).length,
  },
  {
    id: "coatings",
    label: "Coating Components",
    icon: "SHIELD_FRAGMENT",
    acquired: (ps) => ps?.shieldFragmentsAcquired?.length ?? 0,
    total: (col) => Object.keys(col?.shield_fragments ?? {}).length,
  },
  {
    id: "slots",
    label: "Modifier Slots",
    icon: "TRINKET_SLOT_UPGRADE",
    acquired: (ps) => ps?.trinketSlotUpgradesAcquired?.length ?? 0,
    total: (col) => Object.keys(col?.trinket_slots ?? {}).length,
  },
  {
    id: "cores",
    label: "Old Cores",
    icon: "RESOURCE_SUPER_SCRAP",
    acquired: (ps) => (ps?.carcasses?.length ?? 0) + (ps?.carcassDialogs?.length ?? 0),
    total: (col) => Object.keys(col?.carcasses ?? {}).length + Object.keys(col?.carcassDialog ?? {}).length,
  },
]

const DatapadItem = ({ name, originalName, icon, acquired }) => (
  <div
    className={`datapad-item ${acquired ? "datapad-item--acquired" : "datapad-item--unacquired"}`}
    title={name}
  >
    {icon && <img src={icon} alt="" className="datapad-icon" />}
    <span className="datapad-label text-extra-small">
      {name}
      {originalName && (
        <span className="datapad-original-name"> · {originalName}</span>
      )}
    </span>
  </div>
)

const UpgradeItem = ({ label, icon, acquired, total }) => (
  <div className="datapad-item datapad-item--acquired">
    {icon && <img src={rootIconModules[`../assets/${icon}.png`]} alt="" className="datapad-icon" />}
    <span className="datapad-label text-extra-small">
      {label}{" "}
      <span className="count">({acquired}/{total})</span>
    </span>
  </div>
)

const DatapadSection = ({ section, playerStats, collectibles }) => {
  const acquiredSet = section.acquired(playerStats)
  const dataSource = section.total(collectibles) ?? {}
  const acquiredCount = section.items.filter((i) =>
    acquiredSet.has(i.key),
  ).length
  const footerRaw = section.footer?.(playerStats, collectibles)
  const footer = footerRaw ? (Array.isArray(footerRaw) ? footerRaw : [footerRaw]) : []

  return (
    <div className="datapad-section">
      <h4 className="datapad-section-title">
        {section.title}{" "}
        <span className="count">
          ({acquiredCount}/{section.items.length})
        </span>
      </h4>
      <div className="datapad-items">
        {section.items.map(({ key, icon, root }) => {
          const info = dataSource[key] ?? {}
          const isCapucined = acquiredSet.has(`${key}_CAPUCINED`)
          const name = info.name ?? key
          const originalName = isCapucined ? (info.capucinedName ?? null) : null
          return (
            <DatapadItem
              key={key}
              name={name}
              originalName={originalName}
              icon={getIcon(icon, root)}
              acquired={acquiredSet.has(key)}
            />
          )
        })}
        {footer.map((f) => (
          <div key={f.label}>
            {f.divider && <hr className="datapad-divider" />}
            <UpgradeItem
              label={f.label}
              icon={f.icon}
              acquired={f.acquired}
              total={f.total}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const Datapads = () => {
  const { playerStats, collectibles } = useSaveProvider()

  return (
    <div className="section">
      <h3>Inventory</h3>
      <div className="datapad-columns">
        {SECTIONS.map((section) => (
          <DatapadSection
            key={section.id}
            section={section}
            playerStats={playerStats}
            collectibles={collectibles}
          />
        ))}
        <div className="datapad-section">
          <h4 className="datapad-section-title">Upgrades</h4>
          <div className="datapad-items">
            {UPGRADES.map((u) => (
              <UpgradeItem
                key={u.id}
                label={u.label}
                icon={u.icon}
                acquired={u.acquired(playerStats)}
                total={u.total(collectibles)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Datapads

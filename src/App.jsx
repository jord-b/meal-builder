import { useState, useEffect } from "react";

const DATA = {
  proteins: {
    chicken: { label: "Chicken", icon: "🍗", color: "#c8956c" },
    salmon: { label: "Salmon", icon: "🐟", color: "#e07b6a" },
    shrimp: { label: "Shrimp", icon: "🍤", color: "#d4956a" },
    ground_turkey: { label: "Ground Turkey", icon: "🦃", color: "#b8956c" },
    cod: { label: "Cod / Tilapia", icon: "🐠", color: "#7aab8a" },
    eggs: { label: "Eggs", icon: "🥚", color: "#d4b86a" },
    tofu: { label: "Tofu", icon: "🫘", color: "#8aab8a" },
    tuna: { label: "Tuna", icon: "🥫", color: "#6a8ab0" },
  },
  starches: {
    quinoa: { label: "Quinoa", icon: "🌾", color: "#c8a86c" },
    brown_rice: { label: "Brown Rice", icon: "🍚", color: "#b8a06a" },
    sweet_potato: { label: "Sweet Potato", icon: "🍠", color: "#d4824a" },
    whole_wheat_pasta: {
      label: "Whole Wheat Pasta",
      icon: "🍝",
      color: "#c8956c",
    },
    farro: { label: "Farro", icon: "🌿", color: "#8aab6a" },
    lentils: { label: "Lentils", icon: "🫘", color: "#8a7a6a" },
    black_beans: { label: "Black Beans", icon: "⚫", color: "#6a6a6a" },
  },
  veggies: {
    broccoli: { label: "Broccoli", icon: "🥦", color: "#5a9a6a" },
    roasted_carrots: { label: "Roasted Carrots", icon: "🥕", color: "#d4784a" },
    spinach: { label: "Spinach", icon: "🌿", color: "#4a8a5a" },
    zucchini: { label: "Zucchini", icon: "🥒", color: "#6aaa5a" },
    bell_peppers: { label: "Bell Peppers", icon: "🫑", color: "#d44a4a" },
    asparagus: { label: "Asparagus", icon: "🌱", color: "#5a9a5a" },
    brussels_sprouts: {
      label: "Brussels Sprouts",
      icon: "🥬",
      color: "#4a8a4a",
    },
    cauliflower: { label: "Cauliflower", icon: "🤍", color: "#aaaaaa" },
    green_beans: { label: "Green Beans", icon: "🫛", color: "#5a8a5a" },
  },
};

const PROTEIN_PAIRS = {
  chicken: {
    starches: ["quinoa", "brown_rice", "sweet_potato", "whole_wheat_pasta"],
    veggies: [
      "broccoli",
      "asparagus",
      "bell_peppers",
      "zucchini",
      "spinach",
      "brussels_sprouts",
    ],
  },
  salmon: {
    starches: ["quinoa", "farro", "brown_rice", "sweet_potato"],
    veggies: [
      "asparagus",
      "spinach",
      "green_beans",
      "roasted_carrots",
      "zucchini",
    ],
  },
  shrimp: {
    starches: ["brown_rice", "whole_wheat_pasta", "quinoa"],
    veggies: [
      "zucchini",
      "bell_peppers",
      "spinach",
      "asparagus",
      "green_beans",
    ],
  },
  ground_turkey: {
    starches: ["sweet_potato", "brown_rice", "whole_wheat_pasta", "lentils"],
    veggies: [
      "bell_peppers",
      "roasted_carrots",
      "spinach",
      "zucchini",
      "cauliflower",
    ],
  },
  cod: {
    starches: ["brown_rice", "quinoa", "farro"],
    veggies: [
      "asparagus",
      "green_beans",
      "roasted_carrots",
      "spinach",
      "cauliflower",
    ],
  },
  eggs: {
    starches: ["sweet_potato", "black_beans", "farro", "lentils"],
    veggies: [
      "spinach",
      "bell_peppers",
      "zucchini",
      "roasted_carrots",
      "cauliflower",
    ],
  },
  tofu: {
    starches: ["brown_rice", "quinoa", "farro", "lentils"],
    veggies: [
      "broccoli",
      "bell_peppers",
      "zucchini",
      "spinach",
      "cauliflower",
      "green_beans",
    ],
  },
  tuna: {
    starches: ["whole_wheat_pasta", "quinoa", "brown_rice"],
    veggies: [
      "spinach",
      "roasted_carrots",
      "green_beans",
      "zucchini",
      "broccoli",
    ],
  },
};

const STARCH_PAIRS = {
  quinoa: {
    proteins: ["salmon", "chicken", "ground_turkey", "tofu", "shrimp"],
    veggies: [
      "spinach",
      "asparagus",
      "roasted_carrots",
      "broccoli",
      "zucchini",
    ],
  },
  brown_rice: {
    proteins: ["salmon", "shrimp", "chicken", "tofu", "cod"],
    veggies: [
      "broccoli",
      "green_beans",
      "spinach",
      "bell_peppers",
      "roasted_carrots",
    ],
  },
  sweet_potato: {
    proteins: ["chicken", "ground_turkey", "eggs", "salmon"],
    veggies: [
      "spinach",
      "broccoli",
      "brussels_sprouts",
      "roasted_carrots",
      "cauliflower",
    ],
  },
  whole_wheat_pasta: {
    proteins: ["chicken", "ground_turkey", "shrimp", "tuna"],
    veggies: ["spinach", "zucchini", "broccoli", "bell_peppers", "asparagus"],
  },
  farro: {
    proteins: ["salmon", "tofu", "cod", "eggs", "chicken"],
    veggies: [
      "asparagus",
      "spinach",
      "roasted_carrots",
      "brussels_sprouts",
      "zucchini",
    ],
  },
  lentils: {
    proteins: ["eggs", "chicken", "tofu", "ground_turkey"],
    veggies: [
      "spinach",
      "roasted_carrots",
      "cauliflower",
      "bell_peppers",
      "zucchini",
    ],
  },
  black_beans: {
    proteins: ["eggs", "chicken", "ground_turkey"],
    veggies: [
      "bell_peppers",
      "roasted_carrots",
      "spinach",
      "zucchini",
      "cauliflower",
    ],
  },
};

const VEGGIE_PAIRS = {
  broccoli: {
    proteins: ["chicken", "salmon", "shrimp", "tofu"],
    starches: ["brown_rice", "quinoa", "whole_wheat_pasta", "farro"],
  },
  roasted_carrots: {
    proteins: ["chicken", "ground_turkey", "salmon", "cod"],
    starches: ["quinoa", "farro", "sweet_potato", "lentils"],
  },
  spinach: {
    proteins: ["salmon", "eggs", "tofu", "chicken"],
    starches: ["farro", "quinoa", "whole_wheat_pasta", "brown_rice"],
  },
  zucchini: {
    proteins: ["chicken", "shrimp", "tofu", "cod"],
    starches: ["whole_wheat_pasta", "brown_rice", "quinoa", "farro"],
  },
  bell_peppers: {
    proteins: ["chicken", "shrimp", "ground_turkey", "eggs"],
    starches: ["brown_rice", "whole_wheat_pasta", "quinoa", "black_beans"],
  },
  asparagus: {
    proteins: ["salmon", "chicken", "shrimp", "cod"],
    starches: ["quinoa", "farro", "brown_rice"],
  },
  brussels_sprouts: {
    proteins: ["chicken", "salmon", "ground_turkey"],
    starches: ["farro", "sweet_potato", "quinoa", "brown_rice"],
  },
  cauliflower: {
    proteins: ["chicken", "tofu", "ground_turkey", "eggs"],
    starches: ["lentils", "brown_rice", "farro", "sweet_potato"],
  },
  green_beans: {
    proteins: ["chicken", "salmon", "shrimp", "cod"],
    starches: ["brown_rice", "farro", "quinoa"],
  },
};

const SEASONINGS = {
  chicken_broccoli: {
    name: "Lemon Garlic Herb",
    desc: "Olive oil, garlic, lemon zest, Italian seasoning, black pepper",
  },
  chicken_asparagus: {
    name: "Lemon Herb",
    desc: "Olive oil, lemon juice, thyme, rosemary, garlic powder",
  },
  chicken_bell_peppers: {
    name: "Mexican Spice",
    desc: "Cumin, smoked paprika, chili powder, lime juice, garlic",
  },
  chicken_zucchini: {
    name: "Provençal",
    desc: "Herbes de Provence, olive oil, garlic, sun-dried tomato",
  },
  chicken_spinach: {
    name: "Tuscan",
    desc: "Garlic, olive oil, lemon, fresh basil, red pepper flakes",
  },
  chicken_brussels_sprouts: {
    name: "Balsamic Dijon",
    desc: "Balsamic vinegar, Dijon mustard, garlic, olive oil, thyme",
  },
  chicken_roasted_carrots: {
    name: "Moroccan",
    desc: "Cumin, coriander, cinnamon, turmeric, ginger, lemon",
  },
  chicken_cauliflower: {
    name: "Curry",
    desc: "Curry powder, turmeric, cumin, coriander, coconut milk, ginger",
  },
  salmon_asparagus: {
    name: "Dill & Lemon",
    desc: "Fresh dill, lemon juice, olive oil, capers, cracked pepper",
  },
  salmon_spinach: {
    name: "Mediterranean",
    desc: "Garlic, olive oil, lemon, white wine, cherry tomatoes",
  },
  salmon_roasted_carrots: {
    name: "Miso Ginger",
    desc: "White miso, ginger, sesame oil, rice vinegar, honey",
  },
  salmon_zucchini: {
    name: "Herb Citrus",
    desc: "Lemon, orange zest, parsley, olive oil, garlic",
  },
  salmon_green_beans: {
    name: "Teriyaki",
    desc: "Low-sodium soy sauce, ginger, garlic, sesame, rice vinegar",
  },
  shrimp_zucchini: {
    name: "Garlic & White Wine",
    desc: "Garlic, olive oil, dry white wine, lemon, parsley",
  },
  shrimp_bell_peppers: {
    name: "Cajun",
    desc: "Cajun seasoning, paprika, garlic, cayenne, lemon",
  },
  shrimp_spinach: {
    name: "Lemon Garlic",
    desc: "Garlic, olive oil, lemon zest, red pepper flakes, parsley",
  },
  shrimp_asparagus: {
    name: "Garlic Lemon",
    desc: "Olive oil, garlic, lemon, white wine, fresh dill",
  },
  shrimp_green_beans: {
    name: "Sesame Ginger",
    desc: "Sesame oil, ginger, low-sodium soy sauce, lime, scallions",
  },
  ground_turkey_bell_peppers: {
    name: "Mexican",
    desc: "Cumin, chili powder, garlic, lime, oregano, cilantro",
  },
  ground_turkey_spinach: {
    name: "Italian",
    desc: "Italian seasoning, garlic, tomatoes, olive oil, basil",
  },
  ground_turkey_roasted_carrots: {
    name: "Moroccan",
    desc: "Cumin, coriander, turmeric, cinnamon, lemon, honey",
  },
  ground_turkey_cauliflower: {
    name: "Curry",
    desc: "Garam masala, turmeric, cumin, coriander, ginger, coconut milk",
  },
  cod_asparagus: {
    name: "Herb & Caper",
    desc: "Olive oil, lemon, capers, dill, garlic, parsley",
  },
  cod_spinach: {
    name: "Mediterranean",
    desc: "Garlic, olive oil, tomatoes, olives, lemon, oregano",
  },
  cod_cauliflower: {
    name: "Cumin Lime",
    desc: "Cumin, lime, garlic, coriander, smoked paprika",
  },
  cod_roasted_carrots: {
    name: "Lemon Dill",
    desc: "Lemon, dill, garlic, olive oil, cracked pepper",
  },
  eggs_spinach: {
    name: "Mediterranean",
    desc: "Garlic, olive oil, red pepper flakes, lemon, feta",
  },
  eggs_bell_peppers: {
    name: "Shakshuka-style",
    desc: "Cumin, paprika, tomatoes, garlic, fresh herbs",
  },
  eggs_zucchini: {
    name: "Herb & Cheese",
    desc: "Fresh herbs, garlic, lemon, black pepper, parmesan",
  },
  eggs_roasted_carrots: {
    name: "Turmeric Spice",
    desc: "Turmeric, cumin, coriander, ginger, lemon",
  },
  eggs_cauliflower: {
    name: "Curry",
    desc: "Curry powder, turmeric, garlic, ginger, coconut milk",
  },
  tofu_broccoli: {
    name: "Sesame Ginger",
    desc: "Sesame oil, ginger, low-sodium soy sauce, garlic, lime",
  },
  tofu_bell_peppers: {
    name: "Teriyaki",
    desc: "Low-sodium soy, mirin, garlic, ginger, sesame seeds",
  },
  tofu_spinach: {
    name: "Miso Sesame",
    desc: "White miso, sesame oil, rice vinegar, ginger, scallions",
  },
  tofu_cauliflower: {
    name: "Thai Curry",
    desc: "Red curry paste, coconut milk, lime, lemongrass, basil",
  },
  tofu_zucchini: {
    name: "Lemon Herb",
    desc: "Lemon, garlic, herbes de Provence, olive oil",
  },
  tuna_spinach: {
    name: "Niçoise",
    desc: "Olive oil, Dijon mustard, lemon, capers, olives, black pepper",
  },
  tuna_zucchini: {
    name: "Mediterranean",
    desc: "Olive oil, garlic, tomatoes, lemon, oregano, parsley",
  },
  tuna_broccoli: {
    name: "Sesame Soy",
    desc: "Low-sodium soy sauce, sesame oil, ginger, garlic, lime",
  },
  tuna_roasted_carrots: {
    name: "Herb Lemon",
    desc: "Lemon, parsley, olive oil, garlic, capers",
  },
  tuna_green_beans: {
    name: "Classic Niçoise",
    desc: "Dijon, lemon, olive oil, fresh herbs, black pepper",
  },
};

function getSeasoningKey(protein, veggie) {
  return (
    SEASONINGS[`${protein}_${veggie}`] || {
      name: "Olive Oil & Herbs",
      desc: "Olive oil, garlic, lemon, fresh herbs, cracked black pepper",
    }
  );
}

function encodePantry(pantry) {
  const str = `p=${pantry.proteins.join(",")}|s=${pantry.starches.join(
    ","
  )}|v=${pantry.veggies.join(",")}`;
  return btoa(str);
}

function decodePantry(str) {
  try {
    const raw = atob(str);
    const result = { proteins: [], starches: [], veggies: [] };
    raw.split("|").forEach((seg) => {
      const [k, v] = seg.split("=");
      if (k === "p") result.proteins = v ? v.split(",").filter(Boolean) : [];
      if (k === "s") result.starches = v ? v.split(",").filter(Boolean) : [];
      if (k === "v") result.veggies = v ? v.split(",").filter(Boolean) : [];
    });
    return result;
  } catch {
    return null;
  }
}

function getHashPantry() {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    const params = new URLSearchParams(hash);
    const p = params.get("pantry");
    return p ? decodePantry(p) : null;
  } catch {
    return null;
  }
}

const CATEGORIES = ["proteins", "starches", "veggies"];
const CategoryLabel = {
  proteins: "Protein",
  starches: "Starch",
  veggies: "Veggie",
};
const CategoryEmoji = { proteins: "🍗", starches: "🌾", veggies: "🥦" };

function IngredientCard({ item, category, onClick, selected, checkmark }) {
  const info = DATA[category][item];
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 13px",
        background: selected ? `${info.color}18` : "#fff",
        border: `2px solid ${selected ? info.color : "#e8e8e8"}`,
        borderRadius: "12px",
        color: selected ? "#1a1a1a" : "#555",
        cursor: "pointer",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: selected ? "600" : "400",
        transform: selected ? "scale(1.02)" : "scale(1)",
        boxShadow: selected
          ? `0 4px 16px ${info.color}30`
          : "0 1px 3px rgba(0,0,0,0.06)",
        transition: "all 0.18s ease",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: "19px" }}>{info.icon}</span>
      <span style={{ flex: 1 }}>{info.label}</span>
      {checkmark && (
        <span
          style={{
            fontSize: "13px",
            color: selected ? "#2d8a4e" : "#ccc",
          }}
        >
          {selected ? "✓" : "○"}
        </span>
      )}
    </button>
  );
}

function StepDot({ num, label, done, active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        opacity: active || done ? 1 : 0.35,
      }}
    >
      <div
        style={{
          width: "23px",
          height: "23px",
          borderRadius: "50%",
          flexShrink: 0,
          background: done
            ? "#2d8a4e"
            : active
            ? "#ff6b35"
            : "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "700",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s",
        }}
      >
        {done ? "✓" : num}
      </div>
      <span
        style={{
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          color: done
            ? "#2d8a4e"
            : active
            ? "#ff6b35"
            : "#aaa",
        }}
      >
        {label}
      </span>
    </div>
  );
}

const titleStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "26px",
  fontWeight: "700",
  color: "#1a1a1a",
  margin: "0 0 2px 0",
  letterSpacing: "-0.3px",
};
const subStyle = {
  color: "#999",
  fontSize: "13px",
  margin: 0,
  fontFamily: "'DM Sans', sans-serif",
};
const ghostBtn = {
  background: "#f5f5f5",
  border: "1px solid #e0e0e0",
  color: "#777",
  borderRadius: "8px",
  padding: "6px 12px",
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
};
const tinyBtn = {
  background: "#f5f5f5",
  border: "1px solid #e0e0e0",
  color: "#888",
  borderRadius: "6px",
  padding: "3px 9px",
  fontSize: "11px",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
};

function Wrapper({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f8faf8 0%, #fff8f2 50%, #f0f7f2 100%)",
        padding: "28px 16px 48px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>{children}</div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} button:hover{opacity:0.9}`}</style>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("home"); // "home" | "setup" | "build"
  const [pantry, setPantry] = useState({
    proteins: [],
    starches: [],
    veggies: [],
  });
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isSharedLink, setIsSharedLink] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);

  // Builder state
  const [firstCat, setFirstCat] = useState(null);
  const [picks, setPicks] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    const decoded = getHashPantry();
    if (
      decoded &&
      (decoded.proteins.length ||
        decoded.starches.length ||
        decoded.veggies.length)
    ) {
      setPantry(decoded);
      setMode("build");
      setIsSharedLink(true);
    }
  }, []);

  function toggleItem(cat, key) {
    setPantry((prev) => ({
      ...prev,
      [cat]: prev[cat].includes(key)
        ? prev[cat].filter((k) => k !== key)
        : [...prev[cat], key],
    }));
  }

  function generateLink() {
    const code = encodePantry(pantry);
    const base = window.location.href.split("#")[0];
    const url = `${base}#pantry=${code}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const activePantry = {
    proteins: pantry.proteins.length
      ? pantry.proteins
      : Object.keys(DATA.proteins),
    starches: pantry.starches.length
      ? pantry.starches
      : Object.keys(DATA.starches),
    veggies: pantry.veggies.length ? pantry.veggies : Object.keys(DATA.veggies),
  };

  function getOrdered() {
    if (!firstCat) return [];
    return [firstCat, ...CATEGORIES.filter((c) => c !== firstCat)];
  }

  function getCandidates(cat) {
    const available = activePantry[cat];
    const ordered = getOrdered();
    const idx = ordered.indexOf(cat);
    if (idx === 0) return available;
    const prev1Cat = ordered[0],
      prev1Val = picks[prev1Cat];
    let preferred = [];
    if (idx === 1) {
      if (prev1Cat === "proteins")
        preferred = PROTEIN_PAIRS[prev1Val]?.[cat] || [];
      else if (prev1Cat === "starches")
        preferred =
          (cat === "proteins"
            ? STARCH_PAIRS[prev1Val]?.proteins
            : STARCH_PAIRS[prev1Val]?.veggies) || [];
      else
        preferred =
          (cat === "proteins"
            ? VEGGIE_PAIRS[prev1Val]?.proteins
            : VEGGIE_PAIRS[prev1Val]?.starches) || [];
    } else {
      const prev2Cat = ordered[1],
        prev2Val = picks[prev2Cat];
      if (prev2Cat === "proteins")
        preferred = PROTEIN_PAIRS[prev2Val]?.[cat] || [];
      else if (prev2Cat === "starches")
        preferred =
          (cat === "proteins"
            ? STARCH_PAIRS[prev2Val]?.proteins
            : STARCH_PAIRS[prev2Val]?.veggies) || [];
      else
        preferred =
          (cat === "proteins"
            ? VEGGIE_PAIRS[prev2Val]?.proteins
            : VEGGIE_PAIRS[prev2Val]?.starches) || [];
    }
    return [
      ...preferred.filter((k) => available.includes(k)),
      ...available.filter((k) => !preferred.includes(k)),
    ];
  }

  function pickIngredient(cat, val) {
    const newPicks = { ...picks, [cat]: val };
    setPicks(newPicks);
    const ordered = getOrdered();
    setStep(ordered.indexOf(cat) === 2 ? 4 : ordered.indexOf(cat) + 2);
  }

  function resetBuilder() {
    setFirstCat(null);
    setPicks({});
    setStep(0);
  }

  const ordered = getOrdered();
  const seasoning =
    step === 4 && picks.proteins && picks.veggies
      ? getSeasoningKey(picks.proteins, picks.veggies)
      : null;
  const pantryCount =
    pantry.proteins.length + pantry.starches.length + pantry.veggies.length;

  // ── SETUP ───────────────────────────────────────────────────────
  if (mode === "setup")
    return (
      <Wrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "22px",
          }}
        >
          <button onClick={() => setMode("home")} style={ghostBtn}>
            ← Back
          </button>
          <div>
            <h1 style={titleStyle}>My Pantry</h1>
            <p style={subStyle}>Select what you have — then share the link</p>
          </div>
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat} style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "9px",
              }}
            >
              <span
                style={{
                  color: "#666",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {CategoryEmoji[cat]} {CategoryLabel[cat]}s &nbsp;
                <span style={{ color: "#aaa" }}>
                  ({pantry[cat].length}/{Object.keys(DATA[cat]).length})
                </span>
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() =>
                    setPantry((p) => ({ ...p, [cat]: Object.keys(DATA[cat]) }))
                  }
                  style={tinyBtn}
                >
                  All
                </button>
                <button
                  onClick={() => setPantry((p) => ({ ...p, [cat]: [] }))}
                  style={tinyBtn}
                >
                  None
                </button>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "7px",
              }}
            >
              {Object.keys(DATA[cat]).map((key) => (
                <IngredientCard
                  key={key}
                  item={key}
                  category={cat}
                  onClick={() => toggleItem(cat, key)}
                  selected={pantry[cat].includes(key)}
                  checkmark
                />
              ))}
            </div>
          </div>
        ))}

        <div style={{ position: "sticky", bottom: "16px", paddingTop: "8px" }}>
          <button
            onClick={generateLink}
            disabled={pantryCount === 0}
            style={{
              width: "100%",
              padding: "15px",
              background:
                pantryCount > 0
                  ? "linear-gradient(135deg, #2d8a4e, #22a355)"
                  : "#e8e8e8",
              border: "none",
              borderRadius: "12px",
              color: pantryCount > 0 ? "#fff" : "#aaa",
              fontSize: "14px",
              fontWeight: "600",
              cursor: pantryCount > 0 ? "pointer" : "default",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
              boxShadow: pantryCount > 0 ? "0 4px 14px rgba(45,138,78,0.3)" : "none",
            }}
          >
            {copied
              ? "✓ Link copied to clipboard!"
              : `Copy shareable link  (${pantryCount} item${
                  pantryCount !== 1 ? "s" : ""
                } selected)`}
          </button>
          {shareUrl && (
            <div
              style={{
                marginTop: "8px",
                padding: "9px 12px",
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                wordBreak: "break-all",
                fontSize: "10px",
                color: "#999",
                fontFamily: "monospace",
              }}
            >
              {shareUrl}
            </div>
          )}
        </div>
      </Wrapper>
    );

  // ── BUILD ───────────────────────────────────────────────────────
  if (mode === "build")
    return (
      <Wrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "22px",
          }}
        >
          <div>
            <h1 style={titleStyle}>Meal Builder</h1>
            <p style={{ ...subStyle }}>
              {pantry.proteins.length
                ? `Showing your ${pantryCount} pantry items`
                : "All ingredients available"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {step > 0 && (
              <button onClick={resetBuilder} style={ghostBtn}>
                Restart
              </button>
            )}
            <button
              onClick={() => {
                resetBuilder();
                setMode("home");
              }}
              style={ghostBtn}
            >
              ⚙
            </button>
          </div>
        </div>

        {step > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            {ordered.map((cat, i) => (
              <StepDot
                key={cat}
                num={i + 1}
                label={CategoryLabel[cat]}
                done={!!picks[cat]}
                active={step === i + 1}
              />
            ))}
            <StepDot
              num={4}
              label="Seasoning"
              done={step === 4}
              active={false}
            />
          </div>
        )}

        {step === 0 && (
          <div>
            <p
              style={{
                ...subStyle,
                marginBottom: "14px",
                color: "#777",
              }}
            >
              What are you in the mood for?
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {CATEGORIES.filter((cat) => activePantry[cat].length > 0).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFirstCat(cat);
                      setStep(1);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 18px",
                      background: "#fff",
                      border: "2px solid #e8e8e8",
                      borderRadius: "14px",
                      color: "#1a1a1a",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: "500",
                      textAlign: "left",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ fontSize: "26px" }}>
                      {CategoryEmoji[cat]}
                    </span>
                    <div>
                      <div style={{ fontWeight: "600" }}>
                        I want {CategoryLabel[cat]}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#aaa",
                          marginTop: "2px",
                        }}
                      >
                        {activePantry[cat]
                          .map((k) => DATA[cat][k].label)
                          .join(", ")}
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {step >= 1 &&
          step <= 3 &&
          (() => {
            const currentCat = ordered[step - 1];
            const candidates = getCandidates(currentCat);
            const prevCat = ordered[step - 2];
            const prevInfo = prevCat ? DATA[prevCat][picks[prevCat]] : null;
            const top = candidates.slice(0, 4);
            const rest = candidates.slice(4);
            return (
              <div>
                {prevInfo && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: `${prevInfo.color}22`,
                      border: `1px solid ${prevInfo.color}44`,
                      borderRadius: "8px",
                      padding: "5px 12px",
                      marginBottom: "14px",
                    }}
                  >
                    <span>{prevInfo.icon}</span>
                    <span
                      style={{
                        color: "#555",
                        fontSize: "13px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {prevInfo.label}
                    </span>
                  </div>
                )}
                {top.length > 0 && (
                  <>
                    <p
                      style={{
                        color: "#888",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "9px",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {step === 1
                        ? `Pick your ${CategoryLabel[currentCat].toLowerCase()}`
                        : "Top pairings"}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        marginBottom: rest.length ? "14px" : 0,
                      }}
                    >
                      {top.map((key, i) => (
                        <div
                          key={key}
                          style={{
                            animation: `fadeIn 0.2s ease ${i * 0.04}s both`,
                          }}
                        >
                          <IngredientCard
                            item={key}
                            category={currentCat}
                            onClick={() => pickIngredient(currentCat, key)}
                            selected={picks[currentCat] === key}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {rest.length > 0 && (
                  <>
                    <p
                      style={{
                        color: "#bbb",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        margin: "0 0 8px 0",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Also available
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                      }}
                    >
                      {rest.map((key, i) => (
                        <div
                          key={key}
                          style={{
                            animation: `fadeIn 0.2s ease ${i * 0.04}s both`,
                          }}
                        >
                          <IngredientCard
                            item={key}
                            category={currentCat}
                            onClick={() => pickIngredient(currentCat, key)}
                            selected={picks[currentCat] === key}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })()}

        {step === 4 &&
          (() => {
            const pInfo = DATA.proteins[picks.proteins];
            const sInfo = DATA.starches[picks.starches];
            const vInfo = DATA.veggies[picks.veggies];
            return (
              <div>
                <p
                  style={{
                    color: "#2d8a4e",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "14px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ✓ Tonight's Meal
                </p>
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
                >
                  {[
                    ["proteins", pInfo],
                    ["starches", sInfo],
                    ["veggies", vInfo],
                  ].map(([cat, info]) => (
                    <div
                      key={cat}
                      style={{
                        flex: 1,
                        background: `${info.color}12`,
                        border: `1px solid ${info.color}40`,
                        borderRadius: "12px",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "4px" }}>
                        {info.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {CategoryLabel[cat]}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#1a1a1a",
                          fontWeight: "600",
                          marginTop: "2px",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {info.label}
                      </div>
                    </div>
                  ))}
                </div>
                {seasoning && (
                  <div
                    style={{
                      background: "#fff8f2",
                      border: "1px solid #f0d8c0",
                      borderRadius: "14px",
                      padding: "16px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>🧂</span>
                      <div>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#c09060",
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                            display: "block",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Seasoning Profile
                        </span>
                        <span
                          style={{
                            fontSize: "15px",
                            color: "#ff6b35",
                            fontWeight: "700",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {seasoning.name}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "13px",
                        margin: 0,
                        lineHeight: "1.6",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {seasoning.desc}
                    </p>
                  </div>
                )}
                <div
                  style={{
                    background: "#f8f8f8",
                    border: "1px solid #e8e8e8",
                    borderRadius: "12px",
                    padding: "14px",
                    marginBottom: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#aaa",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      margin: "0 0 6px 0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Simple method
                  </p>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "13px",
                      margin: 0,
                      lineHeight: "1.7",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Season your {pInfo.label.toLowerCase()} and cook over medium
                    heat. Prepare your {sInfo.label.toLowerCase()} per package
                    directions. Roast or sauté your {vInfo.label.toLowerCase()}{" "}
                    with olive oil until tender. Dinner sorted!
                  </p>
                </div>
                {isSharedLink && (
                  <button
                    onClick={() => {
                      const msg = `I'd love: ${pInfo.label} + ${sInfo.label} + ${vInfo.label}${seasoning ? ` with ${seasoning.name} seasoning` : ""}!`;
                      navigator.clipboard.writeText(msg).then(() => {
                        setMsgCopied(true);
                        setTimeout(() => setMsgCopied(false), 2500);
                      });
                    }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: msgCopied
                        ? "linear-gradient(135deg, #2d8a4e, #22a355)"
                        : "linear-gradient(135deg, #ff6b35, #ff8f5e)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "8px",
                      boxShadow: msgCopied
                        ? "0 4px 14px rgba(45,138,78,0.3)"
                        : "0 4px 14px rgba(255,107,53,0.3)",
                      transition: "all 0.2s",
                    }}
                  >
                    {msgCopied ? "✓ Meal choice copied — send it back!" : "I want this! 🙌"}
                  </button>
                )}
                <button
                  onClick={resetBuilder}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "linear-gradient(135deg, #2d8a4e, #22a355)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 4px 14px rgba(45,138,78,0.3)",
                  }}
                >
                  Build another meal
                </button>
              </div>
            );
          })()}
      </Wrapper>
    );

  // ── HOME ────────────────────────────────────────────────────────
  return (
    <Wrapper>
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ ...titleStyle, fontSize: "32px" }}>Meal Builder</h1>
        <p style={{ ...subStyle, marginTop: "4px" }}>
          Pick what you're feeling. We'll handle the rest.
        </p>
      </div>
      <button
        onClick={() => setMode("build")}
        style={{
          width: "100%",
          padding: "20px",
          marginBottom: "12px",
          background: "linear-gradient(135deg, #ff6b35, #ff8f5e)",
          border: "none",
          borderRadius: "16px",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 4px 18px rgba(255,107,53,0.3)",
        }}
      >
        <span style={{ fontSize: "22px" }}>🍽️</span> Build a Meal
      </button>
      <button
        onClick={() => setMode("setup")}
        style={{
          width: "100%",
          padding: "18px",
          background: "#fff",
          border: "2px solid #e0e0e0",
          borderRadius: "16px",
          color: "#555",
          fontSize: "15px",
          fontWeight: "500",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <span style={{ fontSize: "20px" }}>🧺</span> Set up my pantry &amp;
        share a link
      </button>
      <p
        style={{
          color: "#bbb",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "20px",
          lineHeight: "1.6",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Select your ingredients, generate a link, and send it to anyone.
        <br />
        They'll only see what you have on hand.
      </p>
    </Wrapper>
  );
}

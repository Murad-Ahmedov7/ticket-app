const normalize = value => String(value ?? "").trim().toLocaleLowerCase("az")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i")
  .replace(/ə/g, "e").replace(/\s+/g, " ");

export const maleAvatars = [12, 13].map(id => `https://i.pravatar.cc/80?img=${id}`);
export const femaleAvatars = [32, 47].map(id => `https://i.pravatar.cc/80?img=${id}`);
export const neutralAvatars = ["#e2e8f0", "#d1fae5", "#e0e7ff"].map(background =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${background}"/><circle cx="40" cy="29" r="14" fill="#64748b"/><path d="M12 80v-8a28 28 0 0 1 56 0v8" fill="#64748b"/></svg>`)}`
);

const maleNames = new Set(["emil", "izzet", "izzat", "vasif", "ali", "sayid"]);
const femaleNames = new Set(["aygul", "semaya", "xalida"]);
// These account aliases are explicitly known; do not infer gender for other test accounts.
const maleAliases = new Set(["user3", "user q2", "test", "user 2"]);

export function detectGender(user = {}) {
  const declared = [user.gender, user.sex].find(value => value != null && String(value).trim() !== "");
  if (declared !== undefined) {
    const gender = normalize(declared);
    if (["female", "f", "woman", "qadin"].includes(gender)) return "female";
    if (["male", "m", "man", "kisi"].includes(gender)) return "male";
    // Explicit unknown/nonbinary values must not be overridden by a name guess.
    return "neutral";
  }

  const name = normalize(user.firstName || user.first_name || user.fullName || user.name || user.username);
  if (maleAliases.has(name)) return "male";
  if (name === "yusifova xalida") return "female";
  const firstName = name.split(" ")[0];
  if (maleNames.has(firstName)) return "male";
  if (femaleNames.has(firstName)) return "female";
  return "neutral";
}

export function getAvatarByGender(user = {}) {
  if (user.avatar) return user.avatar;
  const gender = detectGender(user);
  const pool = gender === "female" ? femaleAvatars : gender === "male" ? maleAvatars : neutralAvatars;
  const key = String(user.id ?? (user.username || user.fullName || user.name || user.firstName || user.first_name || ""));
  const hash = Array.from(key).reduce((value, char) => (Math.imul(value, 31) + char.codePointAt(0)) >>> 0, 7);
  return pool[hash % pool.length];
}

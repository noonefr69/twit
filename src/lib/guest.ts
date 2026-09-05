const ADJECTIVES = [
  "Swift", "Calm", "Brave", "Cool", "Sly", "Wild", "Kind", "Wise", "Fast", "Quiet",
  "Smart", "Bold", "Fair", "Grand", "Proud", "Super", "Mega", "Epic", "Daily", "Local"
];

const NOUNS = [
  "Otter", "Falcon", "Panda", "Tiger", "Fox", "Bear", "Wolf", "Eagle", "Lion", "Shark",
  "Coder", "Hacker", "Twit", "Guest", "Friend", "Dev", "Lead", "Pro", "Star", "Ace"
];

export function generateGuestName() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `${adj} ${noun} ${num}`;
}

export function generateGuestEmail() {
  const rand = Math.random().toString(36).substring(2, 7);
  return `guest-${rand}@twit.local`;
}

export function generateGuestToken() {
  // 6 character unambiguous alphabet
  const charset = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let token = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  return token;
}

export const mockCards = [
  { kind:'expense',  title:'Food ₹250',           subtitle:'Street tacos', icon:'🌮', value:250,  rarity:'common',    level:1, createdAt:Date.now()-3600e3 },
  { kind:'saving',   title:'Jar +₹500',           subtitle:'Laptop jar',   icon:'💰', value:500,  rarity:'rare',      level:1, createdAt:Date.now()-7200e3 },
  { kind:'upi',      title:'UPI ₹999 to Asha',    subtitle:'Party',        icon:'⛵', value:999,  rarity:'common',    level:1, createdAt:Date.now()-8200e3 },
  { kind:'roundup',  title:'Round-Up ₹5',         subtitle:'245→250',      icon:'✨', value:5,    rarity:'epic',      level:1, createdAt:Date.now()-9200e3 },
  { kind:'split',    title:'Ravi → Asha ₹400',    subtitle:'Crew settle',  icon:'⚔️', value:400, rarity:'common',    level:1 },
  { kind:'income',   title:'Salary credit ₹35k',  subtitle:'June',         icon:'🪙', value:35000,rarity:'epic',      level:3 },
  { kind:'achievement', title:'First 1K Saved',   subtitle:'SAVED_1K',     icon:'🏆',            rarity:'legendary', level:1 }
];
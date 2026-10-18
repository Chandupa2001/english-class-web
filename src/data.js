// ===== EDIT THIS FILE to update contact, branches and timetable =====
export const CONTACT = {
  phone: '077 323 8042',
  whatsapp: '94773238042',   // international format, no + or spaces
  facebook: 'https://www.facebook.com/profile.php?id=61562386681056&rdid=vPniLqTMaItLFjg5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dxo67YMA8%2F#',
}
// address / maps: null = placeholder shown. Paste real values when available.
export const BRANCHES = [
  { id: 'matara', name: { en: 'ශිල්ප යාත්‍රා අධ්‍යාපන ආයතනය', si: 'මාතර පාර ශාඛාව' }, address: 'මාතර පාර, අකුරැස්ස', maps: null },
  // { id: 'akuressa', name: { en: 'Akuressa Branch', si: 'අකුරැස්ස ශාඛාව' }, address: null, maps: null },
]
// Times from the 2026 flyer. branch: 'matara' | 'akuressa' | null (null = to be confirmed)
export const CLASSES = [
  { grade: 1, type: 'regular', day: 'fri', start: '4:15 PM', end: '6:00 PM', branch: null },
  { grade: 2, type: 'regular', day: 'mon', start: '2:30 PM', end: '4:15 PM', branch: null },
  { grade: 3, type: 'regular', day: 'fri', start: '2:30 PM', end: '4:15 PM', branch: null },
  { grade: 4, type: 'regular', day: 'sat', start: '8:15 AM', end: '10:15 AM', branch: null },
  { grade: 5, type: 'regular', day: 'sat', start: '12:30 PM', end: '2:15 PM', branch: null },
  { grade: 6, type: 'regular', day: 'sat', start: '10:45 AM', end: '12:30 PM', branch: null },
  { grade: 7, type: 'regular', day: 'tue', start: '3:00 PM', end: '5:00 PM', branch: null },
  { grade: 8, type: 'regular', day: 'thu', start: '3:00 PM', end: '5:00 PM', branch: null },
  { grade: 9, type: 'regular', day: 'mon', start: '4:15 PM', end: '6:15 PM', branch: null },
  { grade: 10, type: 'regular', day: 'sun', start: '1:30 PM', end: '3:30 PM', branch: null },
  { grade: 11, type: 'regular', day: 'sun', start: '3:30 PM', end: '5:30 PM', branch: null },
  { grade: 11, type: 'paper', day: 'wed', start: '3:00 PM', end: '5:30 PM', branch: null },
]
export const SPECIAL = { day: 'sat', start: '2:30 PM', end: '4:30 PM' }
export const QUALIFICATIONS = [
  { en: 'BA in English - University of Sri Jayewardenepura', si: 'ඉංග්‍රීසි BA - ශ්‍රී ජයවර්ධනපුර විශ්වවිද්‍යාලය' },
  { en: 'Higher National Diploma (HND) in English', si: 'ඉංග්‍රීසි උසස් ජාතික ඩිප්ලෝමාව (HND)' },
  { en: 'NDTESL', si: 'NDTESL' },
]

// ---- Optional switches & content (added in redesign) ----
export const SHOW_LANGUAGE_SWITCH = false   // set false to hide the English / සිංහල toggle
// Add real photos to /public and list them here, e.g. { src: '/gallery-1.webp', alt: 'Grade 5 class' }
export const GALLERY = []
// Add real feedback only, e.g. { name: 'Parent of Grade 6 student', text: { en: '...', si: '...' } }
export const TESTIMONIALS = []

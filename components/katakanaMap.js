const katakanaMap = {
  a: 'ア', // a
  b: 'ブ', // bu
  c: 'シ', // shi
  d: 'ド', // do
  e: 'エ', // e
  f: 'フ', // fu
  g: 'グ', // gu
  h: 'ハ', // ha
  i: 'イ', // i
  j: 'ジ', // ji
  k: 'ケ', // ke
  l: 'ル', // ru
  m: 'ム', // mu
  n: 'ン', // n
  o: 'オ', // o
  p: 'プ', // pu
  q: 'ク', // ku
  r: 'ル', // ru
  s: 'ス', // su
  t: 'ト', // to
  u: 'ウ', // u
  v: 'ブ', // bu
  w: 'ワ', // wa
  x: 'ズ', // zu (single character, approximating "X" as "z")
  y: 'イ', // i
  z: 'ズ'  // zu
};


export const convertJP=(eng)=>{
    return katakanaMap[eng[0].toLowerCase()];
}
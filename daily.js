// MyVocab Lab - Daily 20 Vocabulary Module
// SAFE: read-only vocab, no core modification

(function () {

  const DAILY_KEY = "myvocab_daily20_v1";

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
  }

  function getVocab() {
    const raw = localStorage.getItem("vocab");
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    } catch(e){}
    return [];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateDaily20() {
    const vocab = getVocab();
    if (!vocab.length) return [];
    const pick = shuffle(vocab).slice(0, 20);

    return pick.map(v => ({
      word: v.word,
      pron: v.pron,
      meaning: v.meaning
    }));
  }

  function loadDaily() {
    const saved = localStorage.getItem(DAILY_KEY);
    if (!saved) return null;

    try {
      const obj = JSON.parse(saved);
      if (obj.date === todayKey()) return obj.data;
    } catch(e){}

    return null;
  }

  function saveDaily(data) {
    const obj = {
      date: todayKey(),
      data: data
    };
    localStorage.setItem(DAILY_KEY, JSON.stringify(obj));
  }

  function getTodayTest() {
    let data = loadDaily();
    if (data) return data;

    data = generateDaily20();
    saveDaily(data);
    return data;
  }

  // expose module
  window.MyVocabDaily = {
    getTodayTest
  };

})();

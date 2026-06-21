// キーワードとスレッドの紐付け設定
const DATA = {
  "神隠し": [
    { title: "【迷宮入り】不気味な未解決事件について語ろうず【神隠し】", file: "threads/0001.html", desc: "2007/08/13作成 - 事件板アーカイブ" }
  ],
  "都市伝説": [
    { title: "【怪談】おまえらの地元の都市伝説・噂話教えろ", file: "threads/002a.html", desc: "2004/09/23作成 - オカルト板アーカイブ" }
  ],
  "オドノテ": [
    { title: "【洒落怖】『オドノテ』って知ってる奴いる？", file: "threads/003odnt.html", desc: "2004/04/04作成 - オカルト板アーカイブ" }
  ],
  "ミナガセ": [
    { title: "【地元民】『オドノテ』ってネット怪談流行ってるけどさぁ……", file: "threads/004e.html", desc: "2004/04/10作成 - 歴史・民俗板アーカイブ" }
  ],
  "ハシヅル": [
    { title: "【地元民】『オドノテ』ってネット怪談流行ってるけどさぁ……", file: "threads/004e.html", desc: "2004/04/10作成 - 歴史・民俗板アーカイブ" }
  ],
  "オチテオチテ": [
    { title: "6d6978695f50726976617465436861745f3031", file: "threads/005chat01.html", desc: "" }
  ],
  "ヨドミノナカデ": [
    { title: "6d6978695f50726976617465436861745f3032", file: "threads/006chachacha_02.html", desc: "" }
  ],
  "旧神通川 治水工事": [
    { title: "【越中】富山の郷土史・治水史を語るスレ", file: "threads/007water.html", desc: "2004/04/25作成 - 歴史・民俗板アーカイブ" }
  ],
    "富岩運河 天門橋": [
    { title: "【富山】ワイ、大学生グループ失踪事件の1人を目撃していた件について【未解決】", file: "threads/008hugan.html", desc: "2004/05/21作成 - 事件板アーカイブ" }
  ],
  // 順不同テスト用の複合キーワード
  "澱ノ手 牛ヶ首神社": [
    { title: "index.php/hidden_log", file: "thread_13.html", desc: "System Alert - 隠しログへのアクセス" }
  ]
};

const $input = document.getElementById('search-input');
const $button = document.getElementById('search-button');
const $results = document.getElementById('results');

function search() {
  // 入力された全角スペースを半角スペースに変換し、連続するスペースを1つにまとめる
  const rawQuery = $input.value.trim();
  const query = rawQuery.replace(/[\u3000\s]+/g, ' '); 
  
  $results.innerHTML = ''; // リセット

  if (!query) return;

  let exactMatchKey = null;
  let partialMatchFound = false;

  // 入力された文字列を単語ごとに分割し、Setを使って重複を排除する
  // これにより「澱ノ手 澱ノ手」のような不正入力を防ぐ
  const queryWords = [...new Set(query.split(' '))];

  // DATAオブジェクトのキーをすべて走査する
  for (const key of Object.keys(DATA)) {
    const keyWords = key.split(' ');
    
    // 入力されたすべての単語が、設定キーの中に含まれているかを判定
    const isSubset = queryWords.every(word => keyWords.includes(word));

    if (isSubset) {
      // 単語数が同じなら完全一致（順番は問わない）
      if (queryWords.length === keyWords.length) {
        exactMatchKey = key;
        break; 
      } 
      // 単語数が少ない場合は「キーワード不足」として扱う
      else if (queryWords.length < keyWords.length) {
        partialMatchFound = true;
      }
    }
  }

  // 結果の表示処理
  if (exactMatchKey) {
    DATA[exactMatchKey].forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
        <a href="${item.file}" class="thread-link" target="_blank">${item.title}</a>
        <div class="thread-desc">${item.desc}</div>
      `;
      $results.appendChild(div);
    });
  } else if (partialMatchFound) {
    // キーワードが足りない場合
    $results.innerHTML = '<p class="error" style="color: #cc5500;">キーワードが足りません。さらに情報を組み合わせてください。</p>';
  } else {
    // 一致しない場合
    $results.innerHTML = '<p class="error">一致するスレッドが見つかりませんでした。</p>';
  }
}

$button.addEventListener('click', search);
$input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') search();
});
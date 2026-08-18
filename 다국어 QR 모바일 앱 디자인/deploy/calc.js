(function () {
  var FARES = {
    round: {
      crystal: { ind: [24000, 19000], grp: [22000, 17000], pkg: [30000, 25000] },
      standard: { ind: [17000, 12000], grp: [15000, 10000], pkg: [23000, 18000] }
    },
    oneway: {
      crystal: { ind: [19000, 14000], grp: [17000, 13000], pkg: [25000, 20000] },
      standard: { ind: [14000, 9000], grp: [12000, 8000], pkg: [20000, 15000] }
    }
  };

  var T = {
    en: {
      open: 'FARE CALCULATOR', title: 'Fare Calculator', close: 'Close',
      round: 'Round Trip <span style="opacity:.65;font-weight:400">왕복</span>', oneway: 'One Way <span style="opacity:.65;font-weight:400">편도</span>',
      crystal: 'Crystal <span style="opacity:.65;font-weight:400">크리스탈</span>', standard: 'Standard <span style="opacity:.65;font-weight:400">일반</span>',
      pkg: 'Fantasy Package <span style="opacity:.65;font-weight:400">판타지 패키지</span>', pkgNote: 'Includes Fantasy New World',
      adult: 'Adult <span style="opacity:.65;font-weight:400">대인</span>', adultSub: '13 yrs and over',
      child: 'Child <span style="opacity:.65;font-weight:400">소인</span>', childSub: '3–12 yrs',
      total: 'TOTAL', people: 'people', reset: 'Reset',
      group: 'GROUP RATE APPLIED · 20+',
      pkgGroup: 'Package price is the same for groups.',
      empty: 'Select the number of guests.',
      info: ['Crystal Cabin has a glass floor.', 'Round trip: get off at the far station, then re-board.']
    },
    ko: {
      open: '요금 계산기', title: '요금 계산기', close: '닫기',
      round: '왕복', oneway: '편도',
      crystal: '크리스탈', standard: '일반',
      pkg: '판타지 패키지', pkgNote: '판타지 뉴월드 포함',
      adult: '대인', adultSub: '13세 이상',
      child: '소인', childSub: '36개월~12세',
      total: '합계', people: '명', reset: '초기화',
      group: '단체 요금 적용 · 20인 이상',
      pkgGroup: '패키지 요금은 단체도 동일합니다.',
      empty: '인원을 선택하세요.',
      info: ['크리스탈 캐빈은 바닥이 유리로 되어 있습니다.', '왕복은 반대편 정류장에서 하차 후 재탑승합니다.']
    },
    zh: {
      open: '票价计算器', title: '票价计算器', close: '关闭',
      round: '往返 <span style="opacity:.65;font-weight:400">왕복</span>', oneway: '单程 <span style="opacity:.65;font-weight:400">편도</span>',
      crystal: '水晶 <span style="opacity:.65;font-weight:400">크리스탈</span>', standard: '标准 <span style="opacity:.65;font-weight:400">일반</span>',
      pkg: '幻想新世界套餐 <span style="opacity:.65;font-weight:400">판타지 패키지</span>', pkgNote: '含幻想新世界',
      adult: '成人 <span style="opacity:.65;font-weight:400">대인</span>', adultSub: '13岁以上',
      child: '儿童 <span style="opacity:.65;font-weight:400">소인</span>', childSub: '36个月至12岁',
      total: '合计', people: '人', reset: '重置',
      group: '已适用团队票价 · 20人以上',
      pkgGroup: '套餐价格团队相同。',
      empty: '请选择人数。',
      info: ['水晶车厢为玻璃地板。', '往返票需在对面站下车后再次乘坐。']
    },
    'zh-hant': {
      open: '票價計算器', title: '票價計算器', close: '關閉',
      round: '來回 <span style="opacity:.65;font-weight:400">왕복</span>', oneway: '單程 <span style="opacity:.65;font-weight:400">편도</span>',
      crystal: '水晶 <span style="opacity:.65;font-weight:400">크리스탈</span>', standard: '標準 <span style="opacity:.65;font-weight:400">일반</span>',
      pkg: '幻想新世界套票 <span style="opacity:.65;font-weight:400">판타지 패키지</span>', pkgNote: '含幻想新世界',
      adult: '成人 <span style="opacity:.65;font-weight:400">대인</span>', adultSub: '13歲以上',
      child: '兒童 <span style="opacity:.65;font-weight:400">소인</span>', childSub: '36個月至12歲',
      total: '合計', people: '人', reset: '重設',
      group: '已套用團體票價 · 20人以上',
      pkgGroup: '套票價格團體相同。',
      empty: '請選擇人數。',
      info: ['水晶車廂為玻璃地板。', '來回票須於對面站下車後再次搭乘。']
    },
    ja: {
      open: '料金計算', title: '料金計算', close: '閉じる',
      round: '往復 <span style="opacity:.65;font-weight:400">왕복</span>', oneway: '片道 <span style="opacity:.65;font-weight:400">편도</span>',
      crystal: 'クリスタル <span style="opacity:.65;font-weight:400">크리스탈</span>', standard: 'スタンダード <span style="opacity:.65;font-weight:400">일반</span>',
      pkg: 'ファンタジーパッケージ <span style="opacity:.65;font-weight:400">판타지 패키지</span>', pkgNote: 'ファンタジーニューワールド込み',
      adult: '大人 <span style="opacity:.65;font-weight:400">대인</span>', adultSub: '13歳以上',
      child: '子供 <span style="opacity:.65;font-weight:400">소인</span>', childSub: '36ヶ月〜12歳',
      total: '合計', people: '名', reset: 'リセット',
      group: '団体料金適用 · 20名以上',
      pkgGroup: 'パッケージ料金は団体も同額です。',
      empty: '人数を選択してください。',
      info: ['クリスタルキャビンは床がガラスです。', '往復は対岸の駅で下車後、再乗車します。']
    }
  };

  var lang = (document.body.getAttribute('data-calc-lang') || 'en');
  var t = T[lang] || T.en;
  var s = { trip: 'round', cabin: 'crystal', pkg: false, adult: 0, child: 0 };
  var won = function (n) { return '₩' + n.toLocaleString('en-US'); };

  var YEL = '#f7c94b', DIM = '#a98f4e', PANEL = '#2b2620', BG = '#181512';

  var css = document.createElement('style');
  css.textContent =
    '#fc-ov{position:fixed;inset:0;z-index:9999;background:' + BG + ';overflow-y:auto;display:none;-webkit-overflow-scrolling:touch}' +
    '#fc-ov.on{display:block}' +
    '.fc-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:0;border:1px solid #fff}' +
    '.fc-seg button{appearance:none;border:0;border-left:1px solid #fff;background:transparent;color:' + DIM + ';font:700 14px/1.3 inherit;padding:13px 6px;cursor:pointer;min-height:48px}' +
    '.fc-seg button:first-child{border-left:0}' +
    '.fc-seg button[aria-pressed="true"]{background:' + YEL + ';color:' + BG + '}' +
    '.fc-step{appearance:none;border:1px solid #fff;background:transparent;color:#fff;width:48px;height:48px;font:400 24px/1 inherit;cursor:pointer;flex:none}' +
    '.fc-step:disabled{opacity:.3}' +
    '#fc-ov button:focus-visible{outline:2px solid ' + YEL + ';outline-offset:2px}';
  document.head.appendChild(css);

  var ov = document.createElement('div');
  ov.id = 'fc-ov';
  ov.innerHTML =
    '<div style="max-width:520px;margin:0 auto;color:' + YEL + ';font-family:var(--font-body),sans-serif">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:20px;border-bottom:2px solid #fff">' +
        '<h2 style="margin:0;font-weight:700;font-size:24px;line-height:1.1;font-family:var(--font-heading),sans-serif">' + t.title + '</h2>' +
        '<button id="fc-x" style="appearance:none;border:1px solid #fff;background:transparent;color:#fff;font:600 13px/1 inherit;padding:11px 14px;cursor:pointer;min-height:44px">' + t.close + '</button>' +
      '</div>' +
      '<div style="padding:20px;display:flex;flex-direction:column;gap:18px">' +
        '<div><div class="fc-seg" data-k="trip"><button data-v="round">' + t.round + '</button><button data-v="oneway">' + t.oneway + '</button></div><div id="fc-note-trip" style="margin-top:8px"></div></div>' +
        '<div><div class="fc-seg" data-k="cabin"><button data-v="crystal">' + t.crystal + '</button><button data-v="standard">' + t.standard + '</button></div><div id="fc-note-cabin" style="margin-top:8px"></div></div>' +
        '<button id="fc-pkg" aria-pressed="false" style="appearance:none;width:100%;text-align:left;border:1px solid #fff;background:transparent;color:' + DIM + ';padding:14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;font-family:inherit;min-height:48px">' +
          '<span><span style="display:block;font-weight:700;font-size:15px;line-height:1.2">' + t.pkg + '</span><span id="fc-pkgsub" style="display:block;font-weight:400;font-size:11px;line-height:1.4;margin-top:3px;color:' + DIM + '">' + t.pkgNote + '</span></span>' +
          '<span id="fc-pkgbox" style="flex:none;width:26px;height:26px;border:1px solid #fff;display:flex;align-items:center;justify-content:center;font-size:16px;color:' + BG + '"></span>' +
        '</button>' +
        '<div id="fc-rows" style="display:flex;flex-direction:column"></div>' +
      '</div>' +
      '<div id="fc-out" style="margin:0 20px 40px"></div>' +
    '</div>';
  document.body.appendChild(ov);

  function row(key, label, sub) {
    return '<div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #fff">' +
      '<span style="flex:1;min-width:0"><span style="display:block;font-weight:700;font-size:16px;line-height:1.2">' + label + '</span>' +
      '<span style="display:block;font-weight:400;font-size:11px;line-height:1.4;margin-top:3px;color:' + DIM + '">' + sub + '</span></span>' +
      '<button class="fc-step" data-d="-1" data-k="' + key + '" aria-label="minus">−</button>' +
      '<span id="fc-n-' + key + '" style="width:40px;text-align:center;font-weight:700;font-size:22px;color:#fff">0</span>' +
      '<button class="fc-step" data-d="1" data-k="' + key + '" aria-label="plus">+</button>' +
    '</div>';
  }
  ov.querySelector('#fc-rows').innerHTML =
    row('adult', t.adult, t.adultSub) + row('child', t.child, t.childSub);

  function note(x) {
    return '<div style="border-left:3px solid ' + YEL + ';padding-left:9px;font-size:11.5px;line-height:1.6;color:' + DIM + '">' + x + '</div>';
  }
  var inf = t.info || [];
  if (inf[1]) ov.querySelector('#fc-note-trip').innerHTML = note(inf[1]);
  if (inf[0]) ov.querySelector('#fc-note-cabin').innerHTML = note(inf[0]);

  function render() {
    ov.querySelectorAll('.fc-seg').forEach(function (g) {
      var k = g.getAttribute('data-k');
      g.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(s[k] === b.getAttribute('data-v')));
      });
    });
    var pk = ov.querySelector('#fc-pkg');
    pk.setAttribute('aria-pressed', String(s.pkg));
    pk.style.color = s.pkg ? YEL : DIM;
    var box = ov.querySelector('#fc-pkgbox');
    box.style.background = s.pkg ? YEL : 'transparent';
    box.textContent = s.pkg ? '✓' : '';
    ov.querySelector('#fc-n-adult').textContent = s.adult;
    ov.querySelector('#fc-n-child').textContent = s.child;
    ov.querySelectorAll('.fc-step').forEach(function (b) {
      b.disabled = b.getAttribute('data-d') === '-1' && s[b.getAttribute('data-k')] === 0;
    });

    var head = s.adult + s.child;
    var out = ov.querySelector('#fc-out');
    if (head === 0) {
      out.innerHTML = '<div style="border:1px solid #fff;padding:20px;text-align:center;font-size:13px;color:' + DIM + '">' + t.empty + '</div>';
      return;
    }
    var isGroup = head >= 20;
    var f = FARES[s.trip][s.cabin];
    var tier = s.pkg ? f.pkg : (isGroup ? f.grp : f.ind);
    var lineA = tier[0] * s.adult, lineC = tier[1] * s.child;
    var total = lineA + lineC;

    var badge = isGroup
      ? '<div style="background:' + YEL + ';color:' + BG + ';padding:9px 12px;font-weight:700;font-size:12px;line-height:1;letter-spacing:.06em">' + t.group + '</div>'
      : '';
    var note = (isGroup && s.pkg)
      ? '<div style="font-size:11px;line-height:1.5;color:' + DIM + ';margin-top:8px">' + t.pkgGroup + '</div>'
      : '';

    function line(label, n, unit, sum) {
      return '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:10px 0;border-top:1px solid #fff">' +
        '<span style="font-size:13px">' + label + ' <span style="color:' + DIM + '">' + won(unit) + ' × ' + n + '</span></span>' +
        '<span style="font-weight:600;font-size:15px;color:#fff">' + won(sum) + '</span></div>';
    }

    out.innerHTML = badge +
      '<div style="border:1px solid #fff;border-top:0;padding:0 14px 14px">' +
        (s.adult ? line(t.adult, s.adult, tier[0], lineA) : '') +
        (s.child ? line(t.child, s.child, tier[1], lineC) : '') +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:16px 0 4px;border-top:2px solid #fff;margin-top:6px">' +
          '<span style="font-weight:700;font-size:13px;letter-spacing:.08em">' + t.total + ' <span style="color:' + DIM + ';font-weight:400">' + head + ' ' + t.people + '</span></span>' +
          '<span style="font-weight:700;font-size:30px;line-height:1;color:#fff">' + won(total) + '</span>' +
        '</div>' + note +
      '</div>' +
      '<button id="fc-reset" style="appearance:none;width:100%;margin-top:12px;border:1px solid ' + DIM + ';background:transparent;color:' + DIM + ';font:600 13px/1 inherit;padding:14px;cursor:pointer;min-height:44px">' + t.reset + '</button>';

    out.querySelector('#fc-reset').onclick = function () {
      s.adult = 0; s.child = 0; s.pkg = false; render();
    };
  }

  ov.addEventListener('click', function (e) {
    var seg = e.target.closest('.fc-seg button');
    if (seg) { s[seg.parentNode.getAttribute('data-k')] = seg.getAttribute('data-v'); return render(); }
    var st = e.target.closest('.fc-step');
    if (st) {
      var k = st.getAttribute('data-k');
      s[k] = Math.max(0, Math.min(200, s[k] + Number(st.getAttribute('data-d'))));
      return render();
    }
    if (e.target.closest('#fc-pkg')) { s.pkg = !s.pkg; return render(); }
    if (e.target.closest('#fc-x')) { ov.classList.remove('on'); document.body.style.overflow = ''; }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ov.classList.contains('on')) {
      ov.classList.remove('on'); document.body.style.overflow = '';
    }
  });

  var btn = document.getElementById('fc-open');
  if (btn) {
    btn.textContent = t.open;
    btn.onclick = function () {
      ov.classList.add('on');
      document.body.style.overflow = 'hidden';
      ov.scrollTop = 0;
    };
  }
  render();
})();

// ==============================================
// ネコノメソウ属 検索ツリー + 種情報
// いがりまさし『日本のネコノメソウ』より
// ==============================================

// ---- 検索ツリー ----
GENUS_TREES['chrysosplenium'] = {

    start: 'root',

    root: {
        question: '茎葉の着き方は？',
        options: [
            { text: '対生（向かい合ってつく）', next: 'sect1_capsule' },
            { text: '互生（互い違いにつく）',   next: 'sect2_stolon'  }
        ]
    },

    // ===== Sect.1 ネコノメソウ節（対生種）=====

    sect1_capsule: {
        hint: '【ネコノメソウ節 Sect. Chrysosplenium — 対生種】',
        question: '蒴果の裂開様式は？',
        options: [
            { text: '船形に裂開する',        result: 'マルバネコノメソウ' },
            { text: '心皮がV字形に分かれる', next:   'sect1_ridge'        }
        ]
    },

    sect1_ridge: {
        question: '種子に隆条（盛り上がった筋）はあるか？',
        options: [
            { text: '隆条がない', next: 'sect1_no_ridge_stamen' },
            { text: '隆条がある', next: 'sect1_hair'            }
        ]
    },

    sect1_no_ridge_stamen: {
        hint: '【Ser.2 ネコノメソウ列】',
        question: '雄蕊の数は？',
        options: [
            { text: '4個', result: 'ネコノメソウ'       },
            { text: '8個', result: 'ヒメオオイワボタン' }
        ]
    },

    sect1_hair: {
        question: '植物体に毛はあるか？',
        options: [
            { text: '無毛（葉腋を除き毛がない）', next: 'sect1_protrusion' },
            { text: '毛がある',                   next: 'sect1_bulbil'     }
        ]
    },

    sect1_protrusion: {
        question: '種子の隆条に突起はあるか？',
        options: [
            { text: '突起がない', result: 'チシマネコノメソウ' },
            { text: '突起がある', next:   'sect1_sepal_opening' }
        ]
    },

    sect1_sepal_opening: {
        hint: '【Ser.4 イワボタン列】',
        question: '萼裂片の開き方と雄蕊の長さは？',
        options: [
            { text: '萼裂片は完全に平開し、雄蕊はごく短い',            result: 'イワネコノメソウ' },
            { text: '萼裂片は直立〜平開、雄蕊は萼裂片より明確に長い', next:   'sect1_leaf_type'  }
        ]
    },

    sect1_leaf_type: {
        question: '開花期の根生葉のタイプは？',
        options: [
            { text: '越冬葉で厚く、柄なし〜ごく短い', next: 'sect1_overwinter' },
            { text: '越冬葉でなく、明らかな柄がある', next: 'sect1_petiolate'  }
        ]
    },

    sect1_overwinter: {
        question: '雄蕊の数は？',
        options: [
            { text: '8個', next:   'sect1_8stamen' },
            { text: '4個', result: 'スズカボタン'  }
        ]
    },

    sect1_8stamen: {
        question: '雄蕊と萼裂片の長さの比較は？',
        options: [
            { text: '雄蕊が萼裂片より<strong class="key-term">明らかに長い</strong>', result: 'ホクリクネコノメ'   },
            { text: '雄蕊が萼裂片より<strong class="key-term">明らかに短い</strong>', result: 'ボタンネコノメソウ' },
            { text: '雄蕊と萼裂片が<strong class="key-term">ほぼ同長</strong>',        result: 'ヒダボタン'        }
        ]
    },

    sect1_petiolate: {
        question: '雄蕊と萼裂片の長さの比較は？',
        options: [
            { text: '雄蕊が萼裂片より<strong class="key-term">明らかに長い</strong>',    result: 'イワボタン'   },
            { text: '雄蕊が萼裂片より<strong class="key-term">わずかに長い</strong>',    result: 'ヘイケボタン' }
        ]
    },

    sect1_bulbil: {
        hint: '【Ser.5 シロバナネコノメソウ列 — 毛のあるタイプ】',
        question: '匍匐茎の先端に珠芽（しゅが）を作るか？',
        options: [
            { text: '匍匐茎先端に珠芽を作る', result: 'ムカゴネコノメソウ' },
            { text: '珠芽をもたない',          next:   'sect1_sepal_tip'    }
        ]
    },

    sect1_sepal_tip: {
        question: '萼裂片の先端の形は？',
        options: [
            { text: '多少なりとも尖る', next: 'sect1_sepal_color'  },
            { text: '方形（四角い）',   next: 'sect1_square_sepal' }
        ]
    },

    sect1_sepal_color: {
        question: '花時の萼の色は？',
        options: [
            { text: '白色または鮮黄色', result: 'シロバナネコノメソウ' },
            { text: '淡黄緑色',         result: 'ツクシネコノメソウ'   }
        ]
    },

    sect1_square_sepal: {
        question: '雄蕊と萼裂片の長さの比較は？',
        options: [
            { text: '雄蕊が萼裂片より<strong class="key-term">わずかに長い</strong>', result: 'トウノウネコノメ'   },
            { text: '雄蕊が萼裂片より<strong class="key-term">短い</strong>',          result: 'コガネネコノメソウ' }
        ]
    },

    // ===== Sect.2 ヤマネコノメソウ節（互生種）=====

    sect2_stolon: {
        hint: '【ヤマネコノメソウ節 Sect. Nephrophylloides — 互生種】',
        question: '花後に地上へ匍匐茎を出すか？',
        options: [
            { text: '地上に匍匐茎をもたない',  next:   'sect2_bulbil'    },
            { text: '花後に地上匍匐茎を出す',  result: 'ツルネコノメソウ' }
        ]
    },

    sect2_bulbil: {
        hint: '【Ser.6 ヤマネコノメソウ列】',
        question: '地下に珠芽をもつか？',
        options: [
            { text: '地下に珠芽をもつ', result: 'ヤマネコノメソウ' },
            { text: '珠芽をもたない',   next:   'sect2_bract'      }
        ]
    },

    sect2_bract: {
        question: '苞の色と分布域は？',
        options: [
            { text: '苞が<strong class="key-term">顕著な黄色</strong>になる・北海道以北に分布', result: 'エゾネコノメソウ'  },
            { text: '苞は顕著な黄色にならない・関東以西に分布',                                   result: 'タチネコノメソウ' }
        ]
    }
};


// ---- 種情報データ ----
// dist: 'y'=産する / 'p'=一部に産する / 'n'=産しない
SPECIES_DATA['chrysosplenium'] = {

    'マルバネコノメソウ': {
        latin:      'Chrysosplenium ramosum Maxim.',
        page:       'P32',
        section:    'Ser.1 マルバネコノメソウ列',
        dist:       { hok:'y', hon:'p', shi:'n', kyu:'n' },
        distDetail: '北海道・本州（近畿以北）',
        overseas:   '朝鮮半島・中国（東北）・ウスリー・アムール'
    },

    'ネコノメソウ': {
        latin:      'Chrysosplenium grayanum Maxim.',
        page:       'P38',
        section:    'Ser.2 ネコノメソウ列',
        dist:       { hok:'y', hon:'y', shi:'n', kyu:'p' },
        distDetail: '南千島・北海道・本州・九州（北部）',
        overseas:   ''
    },

    'ヒメオオイワボタン': {
        latin:      'Chrysosplenium pseudofauriei H. Lév. var. nipponicum Wakab.',
        page:       'P44',
        section:    'Ser.2 ネコノメソウ列',
        dist:       { hok:'n', hon:'n', shi:'p', kyu:'n' },
        distDetail: '四国（徳島県）',
        overseas:   '朝鮮半島・中国（東北）・ウスリー（基準変種）'
    },

    'チシマネコノメソウ': {
        latin:      'Chrysosplenium kamtschaticum Fisch. ex Ser.',
        page:       'P48',
        section:    'Ser.3 チシマネコノメソウ列',
        dist:       { hok:'y', hon:'p', shi:'n', kyu:'n' },
        distDetail: '南千島・北海道・本州（近畿以北の日本海側）',
        overseas:   'サハリン・千島列島・カムチャッカ半島'
    },

    'イワネコノメソウ': {
        latin:      'Chrysosplenium echinus Maxim.',
        page:       'P56',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'y', kyu:'y' },
        distDetail: '本州（福島県南部・関東・東海地方）・四国・九州',
        overseas:   ''
    },

    'ホクリクネコノメ': {
        latin:      'Chrysosplenium fauriei Franch.',
        page:       'P60',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（福島県西部〜島根県・日本海沿岸地方）',
        overseas:   ''
    },

    'ボタンネコノメソウ': {
        latin:      'Chrysosplenium kiotoense Ohwi',
        page:       'P68',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（岐阜県以西の日本海側）',
        overseas:   ''
    },

    'ヒダボタン': {
        latin:      'Chrysosplenium nagasei Wakab. et H. Ohba',
        page:       'P76',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（中部・近畿・山陰地方）',
        overseas:   ''
    },

    'スズカボタン': {
        latin:      'Chrysosplenium suzukaense H. Ohba et Wakab.',
        page:       'P88',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（三重県・滋賀県・鈴鹿山系）',
        overseas:   ''
    },

    'イワボタン': {
        latin:      'Chrysosplenium macrostemon Maxim. var. macrostemon',
        page:       'P92',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'y', kyu:'y' },
        distDetail: '本州（関東以西の太平洋側）・四国・九州',
        overseas:   ''
    },

    'ヘイケボタン': {
        latin:      'Chrysosplenium brevistamineum Franch.',
        page:       'P122',
        section:    'Ser.4 イワボタン列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（中国地方・紀伊半島周辺）',
        overseas:   ''
    },

    'ムカゴネコノメソウ': {
        latin:      'Chrysosplenium maximowiczii Franch. et Sav.',
        page:       'P130',
        section:    'Ser.5 シロバナネコノメソウ列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（宮城県南部〜東海地方）',
        overseas:   ''
    },

    'シロバナネコノメソウ': {
        latin:      'Chrysosplenium album Maxim. var. album',
        page:       'P134',
        section:    'Ser.5 シロバナネコノメソウ列',
        dist:       { hok:'n', hon:'p', shi:'y', kyu:'y' },
        distDetail: '本州（近畿・中国地方）・四国・九州',
        overseas:   ''
    },

    'ツクシネコノメソウ': {
        latin:      'Chrysosplenium rhabdospermum Maxim.',
        page:       'P156',
        section:    'Ser.5 シロバナネコノメソウ列',
        dist:       { hok:'n', hon:'n', shi:'p', kyu:'y' },
        distDetail: '四国（高知県）・九州',
        overseas:   ''
    },

    'トウノウネコノメ': {
        latin:      'Chrysosplenium pseudopilosum Wakab. et Hir. Takah. var. pseudopilosum',
        page:       'P162',
        section:    'Ser.5 シロバナネコノメソウ列',
        dist:       { hok:'n', hon:'p', shi:'n', kyu:'n' },
        distDetail: '本州（岐阜県・京都府）',
        overseas:   ''
    },

    'コガネネコノメソウ': {
        latin:      'Chrysosplenium pilosum Maxim. var. sphaerospermum (Maxim.) H. Hara',
        page:       'P170',
        section:    'Ser.5 シロバナネコノメソウ列',
        dist:       { hok:'n', hon:'p', shi:'y', kyu:'y' },
        distDetail: '本州（関東以西）・四国・九州',
        overseas:   '朝鮮半島・中国（東北）・アムール・ウスリー（原変種）'
    },

    'ヤマネコノメソウ': {
        latin:      'Chrysosplenium japonicum (Maxim.) Makino',
        page:       'P180',
        section:    'Ser.6 ヤマネコノメソウ列',
        dist:       { hok:'p', hon:'y', shi:'y', kyu:'y' },
        distDetail: '北海道（西南部）・本州・四国・九州',
        overseas:   '朝鮮半島・中国（東北）'
    },

    'エゾネコノメソウ': {
        latin:      'Chrysosplenium alternifolium L. var. sibiricum Ser.',
        page:       'P184',
        section:    'Ser.6 ヤマネコノメソウ列',
        dist:       { hok:'p', hon:'n', shi:'n', kyu:'n' },
        distDetail: '南千島・北海道（北部・東部）',
        overseas:   'ヒマラヤ・中国・モンゴル・シベリア・朝鮮半島・サハリン・カムチャッカ・北アメリカ中央部'
    },

    'タチネコノメソウ': {
        latin:      'Chrysosplenium tosaense (Makino) Makino ex Suto',
        page:       'P188',
        section:    'Ser.6 ヤマネコノメソウ列',
        dist:       { hok:'n', hon:'p', shi:'y', kyu:'y' },
        distDetail: '本州（関東以西）・四国・九州',
        overseas:   ''
    },

    'ツルネコノメソウ': {
        latin:      'Chrysosplenium flagelliferum F. Schmidt',
        page:       'P192',
        section:    'Ser.7 ツルネコノメソウ列',
        dist:       { hok:'y', hon:'p', shi:'p', kyu:'n' },
        distDetail: '南千島・北海道・本州（近畿以北）・四国（剣山）',
        overseas:   'アムール・ウスリー・中国（東北）・朝鮮半島・サハリン・千島列島'
    }
};

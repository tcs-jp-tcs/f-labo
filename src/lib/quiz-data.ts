export type QuizCategory = "f1" | "f2" | "f3" | "sf" | "indy";

export type Question = {
  id: string;
  category: QuizCategory;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  rd: number;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: "rd-1",
    rd: 1,
    title: "Fラボ検定 Rd.1",
    description:
      "F1の歴史と豆知識を中心に、インディ500からも1問。玄人にも歯ごたえのある全5問。",
    difficulty: 2,
    questions: [
      {
        id: "rd-1-q1",
        category: "f1",
        question:
          "F1デビュー時、マックス・フェルスタッペンが持っていなかったものは？",
        choices: [
          "レーシングスーツ",
          "一般道の運転免許",
          "パスポート",
          "チームウェア",
        ],
        correctIndex: 1,
        explanation:
          "フェルスタッペンは2015年オーストラリアGPに17歳166日でF1デビュー。当時オランダの運転免許取得年齢は18歳だったため、F1マシンは運転できても一般道は運転できなかった。これを受けてFIAはスーパーライセンスの最低年齢を18歳に引き上げた。",
      },
      {
        id: "rd-1-q2",
        category: "f1",
        question: "F1史上最速のピットストップ世界記録を持つチームは？",
        choices: ["レッドブル", "フェラーリ", "メルセデス", "マクラーレン"],
        correctIndex: 3,
        explanation:
          "2023年カタールGPでマクラーレンがノリスのマシンで1.80秒を記録し、ギネス世界記録に認定された。それまではレッドブルが2019年ブラジルGPで記録した1.82秒が最速だった。",
      },
      {
        id: "rd-1-q3",
        category: "f1",
        question:
          "F1で6輪マシンを実戦投入し、実際に優勝したチームは？",
        choices: ["ティレル", "ロータス", "ブラバム", "マーチ"],
        correctIndex: 0,
        explanation:
          "ティレルP34は前輪を4本にした6輪車。1976年スウェーデンGPでジョディ・シェクターが優勝し、デパイユが2位でティレル1-2フィニッシュを達成。6輪車がF1で優勝した唯一の例。",
      },
      {
        id: "rd-1-q4",
        category: "f1",
        question:
          "「レースに出ないこと」でフェラーリから巨額の違約金を受け取ったドライバーは？（★★★ 玄人問題）",
        choices: [
          "M.シューマッハ",
          "F.マッサ",
          "K.ライコネン",
          "R.バリチェロ",
        ],
        correctIndex: 2,
        explanation:
          "2010年、フェラーリはアロンソを迎えるためライコネンの契約を1年早く終了し、巨額の違約金を支払った。ライコネンはその年レースに出場せず、WRCに転向。その後2012年にロータスからF1に復帰した。",
      },
      {
        id: "rd-1-q5",
        category: "indy",
        question:
          "インディ500で日本人として初めて優勝したドライバーは？",
        choices: ["中嶋悟", "小林可夢偉", "角田裕毅", "佐藤琢磨"],
        correctIndex: 3,
        explanation:
          "佐藤琢磨は2017年の第101回インディ500で8度目の出場にして日本人初優勝を達成。2020年にも2勝目を挙げ、インディ500を複数回制した史上20人目のドライバーとなった。",
      },
    ],
  },
  {
    id: "rd-2",
    rd: 2,
    title: "Fラボ検定 Rd.2",
    description:
      "F1の伝説と記録から全5問。ファンカー、モナコの王者、親子チャンピオン……歴史を知るほど面白い。",
    difficulty: 2,
    questions: [
      {
        id: "rd-2-q1",
        category: "f1",
        question:
          "1978年スウェーデンGPで唯一の勝利を挙げた、車体後部に巨大なファンを備えた「ファンカー」を投入したチームは？",
        choices: ["ロータス", "ブラバム", "ウィリアムズ", "マクラーレン"],
        correctIndex: 1,
        explanation:
          "ブラバムBT46B「ファンカー」はニキ・ラウダのドライブで1978年スウェーデンGPに優勝。ロータスのグラウンドエフェクトに対抗してゴードン・マーレーが設計し、車体後部の巨大ファンで床下の空気を吸い出して強烈なダウンフォースを得た。あまりの速さに他チームが猛抗議し、ブラバムは1戦限りで自主撤回。F1で勝率100%を誇る唯一のマシンとなった。",
      },
      {
        id: "rd-2-q2",
        category: "f1",
        question: "F1モナコGPで歴代最多となる6勝を挙げた「モナコの王者」は？",
        choices: ["A.プロスト", "M.シューマッハ", "A.セナ", "L.ハミルトン"],
        correctIndex: 2,
        explanation:
          "アイルトン・セナはモナコGPで通算6勝（1987年、および1989〜1993年の5連勝）を記録し歴代最多。それまでの記録保持者は5勝のグラハム・ヒル（Mr.モナコ）だった。シューマッハは5勝、プロストは4勝、ハミルトンは3勝。",
      },
      {
        id: "rd-2-q3",
        category: "f1",
        question:
          "2010年、23歳でF1史上最年少のワールドチャンピオンになったドライバーは？",
        choices: ["L.ハミルトン", "F.アロンソ", "M.フェルスタッペン", "S.ベッテル"],
        correctIndex: 3,
        explanation:
          "セバスチャン・ベッテルは2010年アブダビGPで初戴冠し、23歳134日で史上最年少王者となった。この記録は今も破られていない。それまでの記録はハミルトンの23歳300日（2008年）。フェルスタッペンの初戴冠は24歳（2021年）だった。",
      },
      {
        id: "rd-2-q4",
        category: "f1",
        question:
          "モナコGP・インディ500・ルマン24時間の3つすべてを制した「トリプルクラウン」唯一の達成者は？",
        choices: [
          "マリオ・アンドレッティ",
          "グラハム・ヒル",
          "F.アロンソ",
          "ジャッキー・スチュワート",
        ],
        correctIndex: 1,
        explanation:
          "モータースポーツのトリプルクラウン（モナコGP・インディ500・ルマン24時間）を全制覇したのは史上グラハム・ヒルただ一人。モナコGP5勝に加え、インディ500を1966年、ルマン24時間を1972年に制した。アロンソはモナコとルマンを制したがインディ500は未勝利。",
      },
      {
        id: "rd-2-q5",
        category: "f1",
        question:
          "F1で親子2代ともにワールドチャンピオンになったのは歴史上2組だけ。ヒル親子（グラハム＆デイモン）と、もう1組は？",
        choices: ["フェルスタッペン", "シューマッハ", "ロズベルグ", "アンドレッティ"],
        correctIndex: 2,
        explanation:
          "親子2代でF1王者になったのはヒル親子とロズベルグ親子の2組のみ。ケケ・ロズベルグが1982年、息子ニコ・ロズベルグが2016年に戴冠した。フェルスタッペン（父ヨス）、シューマッハ（息子ミック）、アンドレッティ（父マリオ）はいずれも親子の片方のみが参戦・戴冠。",
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

export const categoryLabel: Record<QuizCategory, string> = {
  f1: "F1",
  f2: "F2",
  f3: "F3",
  sf: "SF",
  indy: "INDY",
};

export const categoryBadge: Record<QuizCategory, string> = {
  f1: "bg-flabo-red/15 text-flabo-red",
  f2: "bg-flabo-blue/15 text-flabo-blue",
  f3: "bg-flabo-green/15 text-flabo-green",
  sf: "bg-flabo-yellow/15 text-flabo-yellow",
  indy: "bg-flabo-yellow/15 text-flabo-yellow",
};

export type RankTone =
  | "winner"
  | "podium"
  | "prize"
  | "finished"
  | "rookie"
  | "fail";

export type Rank = {
  emoji: string;
  title: string;
  message: string;
  tone: RankTone;
};

export function getRank(correct: number, total: number): Rank {
  // Vol.1 is fixed at 5 questions; map scores directly.
  if (correct >= 5)
    return {
      emoji: "🏆",
      title: "Winner",
      message: "優勝おめでとう！",
      tone: "winner",
    };
  if (correct === 4)
    return {
      emoji: "🥈",
      title: "表彰台",
      message: "次は頂点を目指せ！",
      tone: "podium",
    };
  if (correct === 3)
    return {
      emoji: "🎖️",
      title: "入賞",
      message: "表彰台まであと一歩！",
      tone: "prize",
    };
  if (correct === 2)
    return {
      emoji: "🏁",
      title: "完走",
      message: "次は入賞を狙え！",
      tone: "finished",
    };
  if (correct === 1)
    return {
      emoji: "🏁",
      title: "ルーキー",
      message: "まずは完走を目指そう！",
      tone: "rookie",
    };
  return {
    emoji: "⚡",
    title: "デプロイ不足",
    message: "チャージして再挑戦！",
    tone: "fail",
  };
}

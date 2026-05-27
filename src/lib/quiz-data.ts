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
  vol: number;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: "vol-1",
    vol: 1,
    title: "Fラボ検定 Vol.1",
    description:
      "F1の歴史と豆知識を中心に、インディ500からも1問。玄人にも歯ごたえのある全5問。",
    difficulty: 2,
    questions: [
      {
        id: "vol-1-q1",
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
        id: "vol-1-q2",
        category: "f1",
        question: "F1史上最速のピットストップ世界記録を持つチームは？",
        choices: ["レッドブル", "マクラーレン", "フェラーリ", "メルセデス"],
        correctIndex: 1,
        explanation:
          "2023年カタールGPでマクラーレンがノリスのマシンで1.80秒を記録し、ギネス世界記録に認定された。それまではレッドブルが2019年ブラジルGPで記録した1.82秒が最速だった。",
      },
      {
        id: "vol-1-q3",
        category: "f1",
        question:
          "F1で6輪マシンを実戦投入し、実際に優勝したチームは？",
        choices: ["ロータス", "ティレル", "ブラバム", "マーチ"],
        correctIndex: 1,
        explanation:
          "ティレルP34は前輪を4本にした6輪車。1976年スウェーデンGPでジョディ・シェクターが優勝し、デパイユが2位でティレル1-2フィニッシュを達成。6輪車がF1で優勝した唯一の例。",
      },
      {
        id: "vol-1-q4",
        category: "f1",
        question:
          "「レースに出ないこと」でフェラーリから巨額の違約金を受け取ったドライバーは？（★★★ 玄人問題）",
        choices: [
          "M.シューマッハ",
          "K.ライコネン",
          "F.マッサ",
          "R.バリチェロ",
        ],
        correctIndex: 1,
        explanation:
          "2010年、フェラーリはアロンソを迎えるためライコネンの契約を1年早く終了し、巨額の違約金を支払った。ライコネンはその年レースに出場せず、WRCに転向。その後2012年にロータスからF1に復帰した。",
      },
      {
        id: "vol-1-q5",
        category: "indy",
        question:
          "インディ500で日本人として初めて優勝したドライバーは？",
        choices: ["中嶋悟", "佐藤琢磨", "小林可夢偉", "角田裕毅"],
        correctIndex: 1,
        explanation:
          "佐藤琢磨は2017年の第101回インディ500で8度目の出場にして日本人初優勝を達成。2020年にも2勝目を挙げ、インディ500を複数回制した史上20人目のドライバーとなった。",
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

export type Rank = {
  emoji: string;
  title: string;
  message: string;
  tone: "master" | "expert" | "rookie" | "fail";
};

export function getRank(correct: number, total: number): Rank {
  if (correct === total)
    return {
      emoji: "🏆",
      title: "ワールドチャンピオン",
      message: "完全制覇！あなたはモータースポーツの生き字引です。",
      tone: "master",
    };
  if (correct >= 3)
    return {
      emoji: "🥈",
      title: "ポディウム獲得",
      message: "次は頂点を目指せ！もう一度挑戦しよう。",
      tone: "expert",
    };
  if (correct >= 1)
    return {
      emoji: "🏁",
      title: "完走",
      message: "次は表彰台を目指せ！もう一度挑戦しよう。",
      tone: "rookie",
    };
  return {
    emoji: "⚡",
    title: "デプロイ不足",
    message: "チャージして再挑戦！ニュースとレビューでしっかり予習しよう。",
    tone: "fail",
  };
}

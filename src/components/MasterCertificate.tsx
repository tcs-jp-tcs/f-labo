type Props = {
  vol: number;
  dateLabel: string;
};

export default function MasterCertificate({ vol, dateLabel }: Props) {
  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-2xl border-2 border-flabo-red bg-gradient-to-br from-flabo-darker via-flabo-carbon to-flabo-darker p-6 shadow-[0_0_60px_rgba(225,6,0,0.35)] overflow-hidden"
      role="img"
      aria-label={`Fラボ検定 Vol.${vol} マスター認定証`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "repeating-conic-gradient(from 45deg, #ffffff 0deg 90deg, #000000 90deg 180deg)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 30%, transparent 70%, rgba(0,0,0,0.6))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 30%, transparent 70%, rgba(0,0,0,0.6))",
        }}
      />
      <div className="relative z-10 text-center space-y-3">
        <p className="font-display tracking-[0.32em] text-[0.6rem] text-flabo-yellow">
          CERTIFIED · FORMULA LAB
        </p>
        <h3 className="font-display font-bold tracking-[0.18em] text-2xl text-white">
          MASTER
        </h3>
        <div className="mx-auto w-20 h-[3px] bg-flabo-red" />
        <p className="text-sm text-white/80 leading-relaxed">
          ここに認定する
        </p>
        <p className="text-xl font-bold text-flabo-red drop-shadow-[0_0_12px_rgba(225,6,0,0.55)]">
          Fラボ検定 Vol.{vol} マスター
        </p>
        <p className="text-[0.78rem] text-white/70 leading-relaxed">
          あなたは全問正解という偉業を達成し、
          <br />
          フォーミュラ研究所の称号を獲得しました
        </p>
        <div className="flex items-center justify-center gap-3 pt-2 text-[0.7rem] font-display tracking-[0.18em] text-flabo-grey">
          <span>{dateLabel}</span>
          <span className="text-flabo-red">●</span>
          <span>F-LABO</span>
        </div>
      </div>
    </div>
  );
}

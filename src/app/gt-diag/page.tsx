import type { Metadata } from "next";
import GtDiagClient from "./GtDiagClient";

// 一時診断ページ。検証完了後に src/app/gt-diag ごと削除する。
export const metadata: Metadata = {
  title: "GT Diagnostic",
  robots: { index: false, follow: false },
};

export default function GtDiagPage() {
  return <GtDiagClient />;
}

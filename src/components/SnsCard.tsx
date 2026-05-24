import Image from "next/image";
import { sns } from "@/lib/data";

export default function SnsCard() {
  return (
    <div className="rounded-xl border border-white/5 bg-flabo-carbon p-5 flex flex-col gap-2">
      <h3 className="font-display tracking-[0.24em] text-[0.65rem] uppercase text-flabo-grey mb-1">
        📱 Follow Us
      </h3>
      <a
        href={sns.x.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-white/[0.03] text-white text-sm hover:bg-flabo-red/10 hover:text-flabo-red transition-colors"
      >
        <Image
          src="/flabo-icons/flabo-circle-x-400.png"
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>{sns.x.handle}</span>
      </a>
      <a
        href={sns.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-white/[0.03] text-white text-sm hover:bg-flabo-red/10 hover:text-flabo-red transition-colors"
      >
        <Image
          src="/flabo-icons/flabo-circle-instagram-320.png"
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>{sns.instagram.handle}</span>
      </a>
    </div>
  );
}

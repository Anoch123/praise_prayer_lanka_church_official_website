import Image from "next/image";
import { X } from "lucide-react";

import { COMMON_TEXTS } from "@/lib/constants/helper_data";
import { COMMON_IMAGES } from "@/lib/constants/helper_images";

export default function SidebarBrand({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
      <div className="relative h-11 w-11 shrink-0">
        <Image
          src={COMMON_IMAGES.App_logo}
          alt=""
          fill
          sizes="44px"
          className="object-contain"
        />
      </div>
      <p className="text-sm font-semibold leading-snug">
        {COMMON_TEXTS.App_name}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="ml-auto rounded-lg p-1.5 text-slate-300 hover:bg-white/10 lg:hidden"
      >
        <X size={18} />
      </button>
    </div>
  );
}

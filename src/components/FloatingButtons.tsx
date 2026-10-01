import { links } from "@/lib/site";
import { BagIcon, WhatsAppIcon } from "./icons";

// Fixed buttons shown on every page: WhatsApp (bottom right) and cart (bottom left).
export default function FloatingButtons() {
  return (
    <>
      <a className="float-btn float-btn--whatsapp" href={links.whatsapp} target="_blank" rel="noopener" aria-label="שליחת הודעה בוואטסאפ">
        <WhatsAppIcon />
      </a>
      <a className="float-btn float-btn--cart" href={links.cart} aria-label="סל הקניות">
        <BagIcon size={26} />
      </a>
    </>
  );
}

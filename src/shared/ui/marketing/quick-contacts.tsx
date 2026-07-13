import { site } from "@/shared/config/site";
import { cn } from "@/shared/lib/utils";
import {
  PhoneIcon,
  ZaloIcon,
  MessengerIcon,
  TiktokIcon,
} from "@/shared/ui/icons";

const contacts = [
  { label: "Gọi điện", href: site.phone ? `tel:${site.phone}` : "#", Icon: PhoneIcon },
  { label: "Zalo", href: site.socials.zalo || "#", Icon: ZaloIcon },
  { label: "Messenger", href: site.socials.messenger || "#", Icon: MessengerIcon },
  { label: "TikTok", href: site.socials.tiktok || "#", Icon: TiktokIcon },
];

export function QuickContacts({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      {contacts.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line-gold text-smoke transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}

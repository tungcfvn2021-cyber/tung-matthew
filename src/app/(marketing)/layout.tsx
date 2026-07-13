import { SiteHeader } from "@/shared/ui/marketing/site-header";
import { SiteFooter } from "@/shared/ui/marketing/site-footer";
import { StickyBookingBar } from "@/shared/ui/marketing/sticky-booking-bar";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      {/* khoảng đệm để sticky bar mobile không che nội dung */}
      <div className="h-16 md:hidden" aria-hidden />
      <StickyBookingBar />
    </>
  );
}

import Script from "next/script";
import { tracking } from "@/lib/site";

// Same tags the WordPress site loads today: Google Tag Manager (GA4, Google Ads, Clarity),
// Meta Pixel, Flashy and the UserWay accessibility widget.
// Disabled unless NEXT_PUBLIC_ENABLE_TRACKING=1, so the preview site doesn't pollute campaign data.
export default function Tracking() {
  if (!tracking.enabled) return null;
  const { gtmId, metaPixelId, flashyAccountId, userwayAccount } = tracking;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}</Script>

      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${metaPixelId}');fbq('track','PageView');
      `}</Script>

      <Script id="flashy" strategy="afterInteractive">{`
        (function(a,b,c){if(!a.flashy){a.flashy=function(){a.flashy.event&&a.flashy.event(arguments),a.flashy.queue.push(arguments)},
        a.flashy.queue=[];var d=document.getElementsByTagName('script')[0],e=document.createElement(b);
        e.src=c,e.async=!0,d.parentNode.insertBefore(e,d)}})(window,'script','https://js.flashyapp.com/thunder.js');
        flashy('init',${flashyAccountId});flashy('PageView');
      `}</Script>

      <Script id="userway" src="https://cdn.userway.org/widget.js" data-account={userwayAccount} strategy="lazyOnload" />

      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="gtm" />
      </noscript>
    </>
  );
}

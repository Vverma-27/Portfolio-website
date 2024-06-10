import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const requestHeaders = new Headers(request.headers);

  // Function to determine if the device is mobile or desktop based on the User-Agent string
  const isMobile = (userAgent: string) => {
    return /iphone|ipad|ipod|android|blackberry|webos|mobile/i.test(userAgent);
  };

  // Function to determine the OS from the User-Agent string
  const getOS = (userAgent: string) => {
    if (/windows nt/i.test(userAgent)) return "Windows";
    if (/macintosh|mac os x/i.test(userAgent)) return "MacOS";
    if (/linux/i.test(userAgent)) return "Linux";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/blackberry/i.test(userAgent)) return "BlackBerry";
    if (/webos/i.test(userAgent)) return "Mobile";
    return "Unknown OS";
  };

  const os = getOS(userAgent);
  const mobile = isMobile(userAgent);
  requestHeaders.set("OS", mobile ? "mobile" : os);

  // Redirect mobile users if the website is intended only for desktops
  // if (mobile) {
  //   return NextResponse.redirect("/mobile-not-supported");
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

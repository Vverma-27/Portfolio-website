import HomePage from "@/components/HomePage";
import { headers } from "next/headers";

export default function Home() {
  const headersList = headers();
  // const os = headersList.get("OS")?.toLowerCase();
  const os = "macos";
  return (
    <main className={`${os?.toLowerCase()}`}>
      <HomePage os={os?.toLowerCase() || ""} />
    </main>
  );
}

import Image from "next/image";
import BackgroundImage from "../../../public/assets/coverBg.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={BackgroundImage}
        alt="background-img"
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />
      {children}
    </div>
  );
}

import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="w-full hidden lg:flex bg-radial from-[#ABABFE] to-[#6666E6] relative h-full items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            fill
            className="object-cover"
          />
        </div>
        <Image
          src="/images/3D.svg"
          alt="3D"
          width={711}
          height={637}
          className="absolute"
        />
      </div>
      <div className="flex min-h-screen items-center justify-center py-12">
        <Card className="mx-auto w-screen md:w-[464px] border-0 shadow-xl">
          <CardContent className="grid gap-6 p-8">
            <div className="grid gap-4 text-center">
              <div className="flex w-full justify-center">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={147}
                  height={72}
                />
              </div>
              <h1 className="text-4xl font-bold text-secondary">{title}</h1>
              <p className="text-xl text-balance text-secondary">
                {description}
              </p>
            </div>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

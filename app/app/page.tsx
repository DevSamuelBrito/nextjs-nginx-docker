'use client';
 
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-screen bg-gray-900">
      <div className="flex flex-col md:flex-row w-auto mb-8 gap-14">
        <img
          src="/nextjs-logo.png"
          alt="Next.js Logo"
          width={100}
          height={100}
          className="mx-auto"
        />

        <img
          src="/docker-logo.png"
          alt="Docker Logo"
          width={100}
          height={100}
          className="mx-auto"
        />

        <img
          src="/nginx-logo.png"
          alt="Nginx Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>
      <h1 className="text-4xl font-bold text-center text-white">Next.js + Docker + Nginx</h1>
    </div>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex text-white items-center justify-center h-screen w-screen bg-black flex-col gap-4">
      <h1 className="text-2xl">Product Not Found</h1>
      <div>
        <Link
          href="/"
          className="bg-purple-800 py-2 px-8 flex rounded-md text-white font-semibold"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black flex items-center justify-center">
      <Image src="/loading24.gif" alt="loader" width={30} height={30} />
    </div>
  );
}

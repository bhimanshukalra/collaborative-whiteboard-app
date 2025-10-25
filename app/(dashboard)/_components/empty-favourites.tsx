import Image from "next/image";

function EmptyFavourites() {
  return (
    <div className=" flex flex-col items-center justify-center h-full">
      <Image src="/no-favourite.svg" height={140} width={140} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">No favourite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favouriting a board
      </p>
    </div>
  );
}

export default EmptyFavourites;
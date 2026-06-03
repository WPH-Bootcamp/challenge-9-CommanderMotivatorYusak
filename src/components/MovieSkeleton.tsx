export function MovieSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden aspect-[2/3] flex flex-col justify-end p-4 space-y-3 animate-pulse">
          <div className="h-4 bg-zinc-800 rounded w-3/4" />
          <div className="flex justify-between">
            <div className="h-3 bg-zinc-800 rounded w-1/4" />
            <div className="h-3 bg-zinc-800 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* PageHero skeleton */}
      <div className="relative h-48 md:h-56 bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-4 w-24 bg-white/10 rounded mx-auto animate-pulse" />
          <div className="h-10 w-64 bg-white/10 rounded mx-auto animate-pulse" />
          <div className="h-5 w-80 bg-white/10 rounded mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter pills skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-muted rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-72 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function JobCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white shadow animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
      </div>

      {/* Footer button */}
      <div className="h-10 w-full bg-gray-200 rounded"></div>
    </div>
  );
}

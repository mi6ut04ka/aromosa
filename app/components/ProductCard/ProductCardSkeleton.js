export default function ProductCardSkeleton() {
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col bg-white animate-pulse">
            <div className="w-full h-[400px] bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-400 rounded w-1/2 mt-auto"></div>
            </div>
        </div>
    )
};

// Shows a row of small rounded tags with an optional label in front
export default function TagList({ tags, label }: { tags: string[]; label?: string }) {
    return (
        <div className = "mt-2 flex flex-wrap items-center gap-2">

            {/* Label only renders when one is passed in */}
            {label && (
                <span className = "text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                </span>
            )}

            {/* One bubble per tag */}
            {tags.map((tag) => (
                <span key = {tag} className = "rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700">
                    {tag}
                </span>
            ))}
        </div>
    );
}
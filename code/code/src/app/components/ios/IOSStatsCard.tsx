interface IOSStatsCardProps {
  title: string;
  value: number;
  color: string;
}

export function IOSStatsCard({ title, value, color }: IOSStatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
      <div
        className="text-3xl font-bold mb-1"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[13px] text-gray-500 font-medium">
        {title}
      </div>
    </div>
  );
}

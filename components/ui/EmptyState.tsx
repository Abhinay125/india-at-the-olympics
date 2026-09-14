import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-8 h-8 text-navy-300" />}
      </div>
      <h3 className="text-lg font-semibold text-navy-700 mb-2">{title}</h3>
      <p className="text-sm text-navy-400 max-w-md">{description}</p>
    </div>
  );
}
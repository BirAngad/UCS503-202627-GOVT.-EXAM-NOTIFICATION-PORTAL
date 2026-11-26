
import { Calendar, Clock, BookOpen, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { Exam } from "../ExamCard";

interface IOSExamCardProps {
  exam: Exam;
  onSetReminder: (examId: string) => void;
  isReminderSet: boolean;
}

export function IOSExamCard({ exam, onSetReminder, isReminderSet }: IOSExamCardProps) {
  const isExpired = exam.daysLeft < 0;
  const isUrgent = exam.daysLeft >= 0 && exam.daysLeft <= 7;
  const isExpiringSoon = exam.daysLeft >= 0 && exam.daysLeft <= 3;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex gap-2 mb-2 flex-wrap">
          {exam.isNew && (
            <span className="bg-[#007AFF] text-white text-xs px-2 py-0.5 rounded-full font-medium">
              NEW
            </span>
          )}

          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {exam.category}
          </span>

          {isExpired && (
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
              APPLICATION CLOSED
            </span>
          )}

          {isExpiringSoon && (
            <span className="bg-[#FF3B30] text-white text-xs px-2 py-0.5 rounded-full font-medium animate-pulse">
              ENDING SOON
            </span>
          )}

          {isUrgent && !isExpiringSoon && (
            <span className="bg-[#FF3B30] text-white text-xs px-2 py-0.5 rounded-full font-medium">
              URGENT
            </span>
          )}
        </div>

        <h3 className="text-[17px] font-semibold mb-1 leading-tight">
          {exam.title}
        </h3>

        <p className="text-[15px] text-gray-500 mb-3">
          {exam.organization}
        </p>

        <p className="text-[15px] text-gray-600 mb-4 ">
          {exam.description}
        </p>

        <div className="space-y-2 mb-4"><p className="text-sm">Eligibility: {exam.eligibility || "Not specified"}</p>
          <div className="flex items-center gap-2 text-[15px]">
            <BookOpen className="size-4 text-gray-400" />
            <span className="text-gray-500">Posts:</span>
            <span className="font-medium">{exam.posts}</span>
          </div>

          <div className="flex items-center gap-2 text-[15px]">
            <Calendar className="size-4 text-gray-400" />
            <span className="text-gray-500">Last Date:</span>
            <span className="font-medium">{exam.lastDate}</span>
          </div>

          <div className="flex items-center gap-2 text-[15px]">
            <Clock className="size-4 text-gray-400" />
            <span className="text-gray-500">Exam Date:</span>
            <span className="font-medium">{exam.examDate}</span>
          </div>

          <div className="flex items-center gap-2 text-[15px]">
            <span className="text-gray-500">Deadline:</span>
            <span
              className={`font-semibold ${
                isExpired
                  ? "text-gray-500"
                  : isUrgent
                    ? "text-[#FF3B30]"
                    : "text-[#34C759]"
              }`}
            >
              {isExpired
                ? "Application Closed"
                : exam.daysLeft === 0
                  ? "Last day today"
                  : `${exam.daysLeft} days left`}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onSetReminder(exam.id)}
            className={`flex-1 py-2.5 rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 ${
              isReminderSet
                ? "bg-[#007AFF] text-white"
                : "bg-gray-100 text-[#007AFF]"
            }`}
          >
            {isReminderSet ? (
              <BookmarkCheck className="size-5" />
            ) : (
              <Bookmark className="size-5" />
            )}
            {isReminderSet ? "Saved" : "Save"}
          </button>

          <a
            href={exam.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#007AFF] text-white py-2.5 rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2"
          >
            Apply
            <ExternalLink className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

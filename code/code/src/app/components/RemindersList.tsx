import { Bell, Calendar, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Exam } from "./ExamCard";

interface RemindersListProps {
  exams: Exam[];
  reminders: Set<string>;
  onRemoveReminder: (examId: string) => void;
}

export function RemindersList({ exams, reminders, onRemoveReminder }: RemindersListProps) {
  const reminderExams = exams.filter((exam) => reminders.has(exam.id));

  if (reminderExams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            My Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No reminders set. Add reminders to track important deadlines!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="size-5" />
          My Reminders ({reminderExams.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminderExams.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">{exam.title}</h4>
                {exam.daysLeft <= 7 && (
                  <Badge variant="destructive" className="text-xs">
                    {exam.daysLeft}d left
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span>Deadline: {exam.lastDate}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveReminder(exam.id)}
              className="ml-2"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

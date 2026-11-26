import { Bell, Calendar, ExternalLink, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface Exam {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastDate: string;
  examDate: string;
  applicationLink: string;
  description: string;
  isNew: boolean;
  daysLeft: number;
  eligibility: string;
  posts: string;
}

interface ExamCardProps {
  exam: Exam;
  onSetReminder: (examId: string) => void;
  isReminderSet: boolean;
}

export function ExamCard({ exam, onSetReminder, isReminderSet }: ExamCardProps) {
  const isExpired = exam.daysLeft < 0;
  const isUrgent = exam.daysLeft >= 0 && exam.daysLeft <= 7;
  const isExpiringSoon = exam.daysLeft >= 0 && exam.daysLeft <= 3;
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {exam.isNew && (
                <Badge variant="default" className="bg-blue-600">
                  New
                </Badge>
              )}
              <Badge variant="outline">{exam.category}</Badge>
              {isExpired && (
                <Badge variant="secondary">
                  Application Closed
                </Badge>
              )}
              {isExpiringSoon && !isExpired && (
                <Badge variant="destructive" className="animate-pulse">
                  Ending Soon!
                </Badge>
            )}
              {isUrgent && !isExpiringSoon && (
                <Badge variant="destructive">Urgent</Badge>
              )}
            </div>
            <h3 className="font-semibold text-lg leading-tight">{exam.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{exam.organization}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{exam.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Posts:</span>
            <span className="font-medium">{exam.posts}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last Date:</span>
            <span className="font-medium">{exam.lastDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Exam Date:</span>
            <span className="font-medium">{exam.examDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Days Left:</span>
            <span
              className={`font-bold ${
                isExpired
                  ? "text-gray-500"
                  : isUrgent
                  ? "text-red-600"
                  : "text-green-600"
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
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button
          variant={isReminderSet ? "secondary" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => onSetReminder(exam.id)}
        >
          <Bell className="size-4 mr-2" />
          {isReminderSet ? "Reminder Set" : "Set Reminder"}
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <a href={exam.applicationLink} target="_blank" rel="noopener noreferrer">
            Apply Now
            <ExternalLink className="size-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

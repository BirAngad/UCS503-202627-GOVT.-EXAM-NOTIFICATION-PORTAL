import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  OpenInNew,
  CalendarToday,
  AccessTime,
  Work,
} from "@mui/icons-material";
import { Exam } from "../ExamCard";

interface AndroidExamCardProps {
  exam: Exam;
  onSetReminder: (examId: string) => void;
  isReminderSet: boolean;
}

export function AndroidExamCard({ exam, onSetReminder, isReminderSet }: AndroidExamCardProps) {
  const isUrgent = exam.daysLeft >= 0 && exam.daysLeft <= 7;
  const isExpiringSoon = exam.daysLeft >= 0 && exam.daysLeft <= 3;

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
          {exam.isNew && <Chip label="NEW" size="small" color="primary" />}
          <Chip label={exam.category} size="small" variant="outlined" />
          {isExpiringSoon && (
            <Chip label="ENDING SOON!" size="small" color="error" sx={{ animation: "pulse 2s infinite" }} />
          )}
          {isUrgent && !isExpiringSoon && <Chip label="URGENT" size="small" color="error" />}
        </Box>

        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
          {exam.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {exam.organization}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {exam.description}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Work sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Eligibility: {exam.eligibility || "Not specified"} <br/>Posts: <strong>{exam.posts}</strong>
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarToday sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Last Date: <strong>{exam.lastDate}</strong>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTime sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Exam: <strong>{exam.examDate}</strong>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Days Left:{" "}
              <strong style={{ color: isUrgent ? "#d32f2f" : "#2e7d32" }}>
                {exam.daysLeft < 0 ? "Closed / not announced" : `${exam.daysLeft} days`}
              </strong>
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant={isReminderSet ? "contained" : "outlined"}
          size="medium"
          startIcon={isReminderSet ? <Bookmark /> : <BookmarkBorder />}
          onClick={() => onSetReminder(exam.id)}
          sx={{ flex: 1 }}
        >
          {isReminderSet ? "Saved" : "Save"}
        </Button>
        <Button
          variant="contained"
          size="medium"
          endIcon={<OpenInNew />}
          href={exam.applicationLink}
          target="_blank"
          sx={{ flex: 1 }}
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  );
}

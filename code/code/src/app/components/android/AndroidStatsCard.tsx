import { Card, CardContent, Typography, Box } from "@mui/material";

interface AndroidStatsCardProps {
  title: string;
  value: number;
  color: string;
}

export function AndroidStatsCard({ title, value, color }: AndroidStatsCardProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 700, color, mb: 0.5 }}
        >
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

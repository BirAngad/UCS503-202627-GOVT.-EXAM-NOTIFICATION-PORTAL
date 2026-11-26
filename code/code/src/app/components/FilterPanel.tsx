import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

interface FilterPanelProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showOnlyReminders: boolean;
  onShowOnlyRemindersChange: (show: boolean) => void;
}

const categories = [
  "Banking",
  "Railway",
  "SSC",
  "UPSC",
  "State PSC",
  "Defence",
  "Teaching",
  "Police",
  "Other",
];

export function FilterPanel({
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
  showOnlyReminders,
  onShowOnlyRemindersChange,
}: FilterPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="size-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Sort By</h4>
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deadline" id="deadline" />
              <Label htmlFor="deadline" className="cursor-pointer">
                Deadline (Nearest First)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest" className="cursor-pointer">
                Newest First
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="examDate" id="examDate" />
              <Label htmlFor="examDate" className="cursor-pointer">
                Exam Date
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <Label
                  htmlFor={category}
                  className="cursor-pointer text-sm"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminders"
              checked={showOnlyReminders}
              onCheckedChange={(checked) =>
                onShowOnlyRemindersChange(checked as boolean)
              }
            />
            <Label htmlFor="reminders" className="cursor-pointer text-sm">
              Show Only My Reminders
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

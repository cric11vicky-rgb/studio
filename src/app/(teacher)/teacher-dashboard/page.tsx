import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Video, MessageSquareWarning, BarChart, Users, BookOpen } from "lucide-react";

export default function TeacherDashboardPage() {
  const features = [
    {
      title: "Manage Content",
      description: "Upload, edit, and organize study materials, notes, and books.",
      icon: Upload,
      href: "/teacher/content",
      cta: "Go to Content"
    },
    {
      title: "Schedule Live Classes",
      description: "Set up and manage upcoming live classes for different subjects.",
      icon: Video,
      href: "/teacher/schedule",
      cta: "Schedule a Class"
    },
    {
      title: "Manage Doubts",
      description: "View and answer questions posted by students in the doubt section.",
      icon: MessageSquareWarning,
      href: "/teacher/doubts",
      cta: "View Doubts"
    },
    {
      title: "Student Performance",
      description: "Track student progress, test scores, and overall performance.",
      icon: BarChart,
      href: "/teacher/performance",
      cta: "View Analytics"
    },
    {
      title: "Manage Students",
      description: "View student profiles and manage their enrollment.",
      icon: Users,
      href: "/teacher/students",
      cta: "View Students"
    },
    {
      title: "Curriculum Planning",
      description: "Plan and structure the curriculum for various classes and subjects.",
      icon: BookOpen,
      href: "/teacher/curriculum",
      cta: "Plan Curriculum"
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              <feature.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardContent>
                <Link href={feature.href}>
                    <Button className="w-full">{feature.cta}</Button>
                </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

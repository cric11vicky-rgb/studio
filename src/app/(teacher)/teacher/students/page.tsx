import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function StudentsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Manage Students</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription>This is where teachers can manage student enrollment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Feature coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}

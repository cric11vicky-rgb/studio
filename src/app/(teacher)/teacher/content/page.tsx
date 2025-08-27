import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContentPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Manage Content</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>This is where teachers can upload and manage course materials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Feature coming soon.</p>
                </CardContent>
            </Card>
        </div>
    );
}

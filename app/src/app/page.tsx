import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          shadcn/ui Demo
        </h1>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Stack ready</AlertTitle>
          <AlertDescription>
            Next.js · Tailwind CSS · shadcn/ui
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>
              Demonstrates Input, Label, Button, and Badge components.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex items-center gap-3">
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
              <Badge variant="secondary">Beta</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>All available button styles.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

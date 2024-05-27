import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="active" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="finished">Finished</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Ujian Aktif</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="live">
        <Card>
          <CardHeader>
            <CardTitle>Ujian berlangsung</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="finished">
        <Card>
          <CardHeader>
            <CardTitle>Ujian telah berlalu</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

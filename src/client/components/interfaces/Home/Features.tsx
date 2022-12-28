import { Card } from "@/components/ui";

export default function Features() {
  return (
    <div className="w-full bg-secondary py-4 px-2" id="features">
      <h1 className="text-2xl font-bold">Features</h1>
      <div className="flex flex-row gap-3">
        <Card heading="Picture Name">
          <span>Picture here</span>
          <span>Price here</span>
        </Card>
        <Card heading="Picture Name">
          <span>Picture here</span>
          <span>Price here</span>
        </Card>
        <Card heading="Picture Name">
          <span>Picture here</span>
          <span>Price here</span>
        </Card>
      </div>
    </div>
  );
}

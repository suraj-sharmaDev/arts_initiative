import { Card } from "@/components/ui";

export default function Creative() {
  return (
    <div className="w-full py-4 px-2" id="creative">
      <h1 className="text-2xl font-bold">Creative</h1>
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

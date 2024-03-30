import { Model } from "@jimmodel/shared";
import { InfoBlock } from "./shared";

export default function ModelAddressInfoTab({ model }: { model: Model }) {
  return (
    <div className="space-y-4">
      <InfoBlock label="Address" value={model.address} />
      <InfoBlock label="City" value={model.city} />
      <InfoBlock label="Region" value={model.region} />
      <InfoBlock label="Zip Code" value={model.zipCode} />
      <InfoBlock label="Country" value={model.country} />
    </div>
  );
}

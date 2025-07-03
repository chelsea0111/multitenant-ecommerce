import configPromise from "@payload-config";
import { getPayload } from "payload";

// http://localhost:3000/admin
export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return <div>{JSON.stringify(data)}</div>;
}

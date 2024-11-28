import {
  GetUserProfileDocument
} from "@/__generated__/graphql";
import { query } from "@/utils/apollo.client";

export default async function Home() {
  const { data } = await query({
    query: GetUserProfileDocument,
  });

  return (
    <div className="p-8">
      <div className="pb-8">Nextjs 15 + Apollo Client</div>

      <div className="pt-8">
        <div>Email: {data?.getUserProfile?.email}</div>
        <div>type: {data?.getUserProfile?.type}</div>
      </div>
    </div>
  );
}

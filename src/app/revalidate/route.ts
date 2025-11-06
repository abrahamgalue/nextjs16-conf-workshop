import type {NextRequest} from "next/server";

import {revalidateTag} from "next/cache";

export function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({message: "Invalid secret"}, {status: 401});
  }

  if (!tag) {
    return Response.json({message: "Tag is required"}, {status: 404});
  }

  revalidateTag(tag, "max");

  return Response.json({message: "Cache revalidated"});
}

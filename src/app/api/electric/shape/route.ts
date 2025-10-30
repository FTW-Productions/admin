export async function GET(req: Request) {
  const proxyUrl = new URL(req.url);

  // ... validate and authorize the request ...

  // Construct the origin URL.
  const originUrl = new URL(`/v1/shape`, `https://api.electric-sql.cloud`);
  proxyUrl.searchParams.forEach((value, key) => {
    originUrl.searchParams.set(key, value);
  });

  // Add the source params.
  originUrl.searchParams.set(`source_id`, process.env.ELECTRIC_SOURCE_ID!);
  originUrl.searchParams.set(`secret`, process.env.ELECTRIC_SOURCE_SECRET!);

  // Proxy the authorised request on to the Electric Cloud.
  const response = await fetch(originUrl);

  // Fetch decompresses the body but doesn't remove the
  // content-encoding & content-length headers which would
  // break decoding in the browser.
  //
  // See https://github.com/whatwg/fetch/issues/1729
  const headers = new Headers(response.headers);
  headers.delete(`content-encoding`);
  headers.delete(`content-length`);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

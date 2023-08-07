export default function cloudflareLoader({ src }) {
  const params = [`width=512`, `quality=75`, "format=auto"];
  return `https://inkspireai.com/cdn-cgi/image/${params.join(",")}/${src}`;
}

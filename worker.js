export default {
  async fetch(request) {
    const upstream = "http://gy.meowfly.de:443"; // ← 改成你的

    const url = new URL(request.url);
    const target = new URL(upstream);

    url.protocol = target.protocol;
    url.hostname = target.hostname;
    url.port = target.port;

    const headers = new Headers(request.headers);
    headers.set("Host", target.hostname);
    headers.set("X-Forwarded-Host", request.headers.get("Host"));

    return fetch(url.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual"
    });
  }
};

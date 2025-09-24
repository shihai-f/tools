export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    try {
      // 尝试获取请求的资源
      let response = await env.ASSETS.fetch(request);
      
      // 如果是 404，返回 index.html（SPA 支持）
      if (response.status === 404) {
        response = await env.ASSETS.fetch(new URL('/index.html', request.url));
      }
      
      return response;
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  },
}

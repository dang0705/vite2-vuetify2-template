const proxies = [
  {
    target: 'http://your-dev-proxy.com',
    as: '/api'
  }
];

const proxy = {};

proxies.forEach(
  ({ target, as }) =>
    (proxy[as] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp('^\\{' + as + '}'), '')
    })
);
export default proxy;

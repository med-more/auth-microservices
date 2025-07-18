const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require('../middlewares/authMiddleware');
const proxyConfig = require('../services/proxyConfig');

const router = express.Router();

proxyConfig.forEach(({ path, target, roles }) => {
  const middlewares = [];

  if (roles.length > 0) {
    middlewares.push(authMiddleware(roles));
  }

  middlewares.push(
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (pathReq) => pathReq.replace(path, ''),
    })
  );

  router.use(path, ...middlewares);
});

module.exports = router;

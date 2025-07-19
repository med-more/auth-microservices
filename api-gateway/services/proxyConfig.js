const proxyConfig = [
  {
    path: '/api/apprenants',
    target: 'http://apprenant-service:6000',
    roles: ['ADMIN', 'FORMATEUR']  
  },
  {
    path: '/api/briefs',
    target: 'http://brief-service:7000',
    roles: ['ADMIN']
  },
  {
    path: '/api/public',
    target: 'http://public-service:7100',
    roles: []  
  }
];


module.exports = proxyConfig;

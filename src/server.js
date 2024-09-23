const http = require('http');
const responses = require('./responseHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  '/': responses.htmlResponses.getIndex,
  '/style.css': responses.htmlResponses.getCss,
  '/success': responses.apiResponses.success,
  '/badRequest': responses.apiResponses.badRequest,
  '/unauthorized': responses.apiResponses.unauthorized,
  '/forbidden': responses.apiResponses.forbidden,
  '/internal': responses.apiResponses.internal,
  '/notImplemented': responses.apiResponses.notImplemented,
  404: responses.apiResponses.notFound,
};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  if (routes[parsedUrl.pathname]) {
    return routes[parsedUrl.pathname](parsedUrl.searchParams, request, response);
  }

  return routes[404](parsedUrl.searchParams, request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port:${port}`);
});

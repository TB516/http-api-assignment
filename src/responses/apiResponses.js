const respondJson = (request, response, code, object) => {
  const json = JSON.stringify(object);

  response.writeHead(code, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json, 'utf8'),
  });
  response.write(json);
  response.end();
};

const toXmlString = (object) => {
  let xml = '<response>';

  Object.keys(object).forEach((key) => { xml += `<${key}>${object[key]}</${key}>`; });

  xml += '</response>';
  return xml;
};

const respondXml = (request, response, code, object) => {
  const xml = toXmlString(object);

  response.writeHead(code, {
    'Content-Type': 'text/xml',
    'Content-Length': Buffer.byteLength(xml, 'utf8'),
  });
  response.write(xml);
  response.end();
};

const success = (_params, request, response) => {
  const responseBody = { id: 'success', message: 'This is a successful response.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 200, responseBody);
  }

  return respondJson(request, response, 200, responseBody);
};

const badRequest = (params, request, response) => {
  if (params.get('valid') === 'true') {
    return success(params, request, response);
  }

  const responseBody = { id: 'badRequest', message: 'Missing valid query parameter set to true.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 400, responseBody);
  }

  return respondJson(request, response, 400, responseBody);
};

const unauthorized = (params, request, response) => {
  if (params.get('loggedIn') === 'yes') {
    return success(params, request, response);
  }

  const responseBody = { id: 'unauthorized', message: 'Missing loggedIn query parameter set to yes.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 401, responseBody);
  }

  return respondJson(request, response, 401, responseBody);
};

const forbidden = (_params, request, response) => {
  const responseBody = { id: 'forbidden', message: 'You do not have access to this content.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 403, responseBody);
  }

  return respondJson(request, response, 403, responseBody);
};

const internal = (_params, request, response) => {
  const responseBody = { id: 'internalServerError', message: 'Internal server error. Something went wrong.' };

  if (request.headers.accepts === 'text/xml') {
    return respondXml(request, response, 500, responseBody);
  }

  return respondJson(request, response, 500, responseBody);
};

const notImplemented = (_params, request, response) => {
  const responseBody = { id: 'notImplemented', message: 'A get request for this page has not been implemented yet. Check back again later for updated content.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 501, responseBody);
  }

  return respondJson(request, response, 501, responseBody);
};

const notFound = (_params, request, response) => {
  const responseBody = { id: 'notFound', message: 'The page you are looking for was not found.' };

  if (request.headers.accept === 'text/xml') {
    return respondXml(request, response, 404, responseBody);
  }

  return respondJson(request, response, 404, responseBody);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

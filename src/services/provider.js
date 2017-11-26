function parse2json(string) {
  try {
    const json = JSON.parse(string);
    return json;
  } catch (e) {
    return string;
  }
}

function es5Get(url, done = () => {}, fail = () => {}, always = () => {}) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', url);
  xmlhttp.onreadystatechange = function onreadystatechange() {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        done(parse2json(xmlhttp.response), xmlhttp);
      } else {
        fail(xmlhttp.statusText, xmlhttp);
      }
      always(xmlhttp.statusText, xmlhttp);
    }
  };
  xmlhttp.send();
}

function promiseGet(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = () => (req.status === 200 ? resolve(parse2json(req.response)) : reject(Error(req.statusText)));
    req.onerror = e => reject(Error(`Network Error: ${e}`));
    req.send();
  });
}

export {
  es5Get,
  promiseGet
};

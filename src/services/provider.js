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
        done(parse2json(xmlhttp.responseText), xmlhttp);
      } else {
        fail(xmlhttp.statusText, xmlhttp);
      }
      always(xmlhttp.statusText, xmlhttp);
    }
  };
  xmlhttp.send();
}

function es6Get() {}
function es7Get() {}

export {
  es5Get,
  es6Get,
  es7Get
};

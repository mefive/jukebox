import querystring from 'querystring';

function get(url, params) {
  let urlWithQuery = url;

  if (params) {
    urlWithQuery = `${url}?${querystring.stringify(params)}`;
  }

  return fetch(urlWithQuery,
    {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip,deflate,sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'music.163.com',
        Referer: 'http://music.163.com/search/',
        'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2)
          AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152
          Safari/537.36`
      }
    })
    .then(response => response.text())
    .then(responseText => {
      let data;

      try {
        data = JSON.parse(responseText);
      }
      catch (e) {
        data = {};
      }

      return data;
    });
}

export default {
  get
};

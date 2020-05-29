# egg-ons-http

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-ons-http.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-ons-http
[travis-image]: https://img.shields.io/travis/eggjs/egg-ons-http.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-ons-http
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-ons-http.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-ons-http?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-ons-http.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-ons-http
[snyk-image]: https://snyk.io/test/npm/egg-ons-http/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-ons-http
[download-image]: https://img.shields.io/npm/dm/egg-ons-http.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-ons-http

aliyun ons http plugin for egg

## Install

```bash
$ npm i egg-ons-http --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.onsHttp = {
  enable: true,
  package: 'egg-ons-http',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.ons = {
  default: {
    accessKey: 'your-accessKey',
    secretKey: 'your-secretKey',
    instanceId:'', // 公网实例不要填,会报权限问题
    // onsAddr: 'http://.mqrest.cn-qingdao-public.aliyuncs.com', // 使用http接入地址
  },
  sub: [{
    consumerGroup: 'your-consumer-group',
    topics: [
      'your-topic',
    ],
  }],
  pub: [{
    topics: [
      'your-topic',
    ],
  }],
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

### Consumer

put your subscription codes under the folder `{app_root}/app/ons` and named as the topic name e.g `TP_NAME.js`

```
.
├── app
│   ├── ons
│   │   └── TP_NAME.js
│   ├── public
│   └── router.js
├── config
│   └── config.default.js
├── package.json
```

you should implment a subscriber as blow

```js
// TP_NAME.js
'use strict';

class TestSubscriber {
  constructor(ctx) {
    this.ctx = ctx;
  }

  * subscribe(msg) {
    yield this.ctx.service.messageService.process(msg);
  }

  static get subExpression() {
    return 'TagA';
  }
}

module.exports = TestSubscriber;
```

see [RPC](https://github.com/eggjs/egg/issues/1468) for more detail.

### Producer

using `app.ons / ctx.ons` to create & send messages

```js
const Message = ctx.ons.Message;
const msg = new Message('TP_NAME', // topic
  'TagA', // tag
  'Hello ONS !!!' // body
);
const sendResult = yield ctx.ons.send(msg);
```


## License

[MIT](LICENSE)

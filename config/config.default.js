'use strict';

const path = require('path');

module.exports = appInfo => {
  return {
    /**
     * egg-ons default config
     * @member Config#ons
     */
    onsHttp: {
      default: {
        // instanceId:'', // 公网实例不要填,会报权限问题
        // onsAddr: 'http://.mqrest.cn-qingdao-public.aliyuncs.com', // 使用http接入地址
        // accessKey: 'your-accesskey',
        // secretKey: 'your-secretkey',
      },
      sub: [
        // {
        //   consumerGroup: 'your-group',
        //   accessKey: 'your-accesskey',
        //   secretKey: 'your-secretkey',
        //   topics: [
        //     'your-topic-1',
        //     'your-topic-2',
        //   ],
        // }
      ],
      pub: [
        // 不需要生产者的group
        // {
        //   accessKey: 'your-accesskey',
        //   secretKey: 'your-secretkey',
        //   topics: [
        //     'your-topic-1',
        //     'your-topic-2',
        //   ],
        // }
      ],
    },
    customLogger: {
      onsLogger: {
        consoleLevel: 'NONE',
        file: path.join(appInfo.root, 'logs', appInfo.name, 'ons.log'),
      },
    },
  };
};

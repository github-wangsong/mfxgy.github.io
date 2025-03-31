module.exports = {
  "title": "沐风行孤影的博客",
  "description": "",
  "dest": "public",
  base:'/mfxgy.github.io/',
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "type": "blog",
    "search": true,
    "searchMaxSuggestions": 10,
    "subSidebar": 'auto',
    displayAllHeaders: true,
    "lastUpdated": "Last Updated",
   
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      },
      "socialLinks": [ // 信息栏展示社交信息
        {
          icon: 'reco-github', link: 'https://mufengxingguying.gitee.io/ws-boker'
        },
        { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
      ]
    },
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      // {
      //   "text": "TimeLine",
      //   "link": "/timeline/",
      //   "icon": "reco-date"
      // },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      // {
      //   "text": "Contact",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "GitHub",
      //       "link": "https://github.com/recoluan",
      //       "icon": "reco-github"
      //     }
      //   ]
      // }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        {
          title: 'html',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'markdown',
            'document',
            'canvasdocument'
          ]
        },
        {
          title: '八股文',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'BaGuWen',
          ]
        },
        // 'css',
        // 'javascript',
        // 'vue',
        // 'jingyan'
        // "",
        // "theme",
        // "plugin",
        // "api"
      ]
    },
   
    "sidebarDepth": 2,

    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "author": "mfxgy",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2019",
    huawei: true,
    // algolia: {
    //   apiKey: '<API_KEY>',
    //   indexName: '<INDEX_NAME>',
    //   // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    //   appId: '<APP_ID>'
    // }
  },
  "plugins": { 
    'demo-container': {
      locales: [
        {
          "lang": "zh-CN",
          "demo-block": {
            "hide-text": "隐藏代码",
            "show-text": "显示代码",
            "copy-text": "复制代码",
            "copy-success": "复制成功"
          }
        },
        {
          "lang": "en-US",
          "demo-block": {
            "hide-text": "Hide",
            "show-text": "Expand",
            "copy-text": "Copy",
            "copy-success": "Successful"
          }
        }
      ]
    } 
  },
  "locales": {
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: '',
    },
  },
  // 配置插件
  "markdown": {
    "lineNumbers": true
  },
}
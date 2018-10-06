JavaScript PassportJS Express Google OAuth2 Demo
================================================

获取google的oauth2 keys:
---------------------

已经配置好，具体信息查看： https://console.developers.google.com/apis/credentials/oauthclient/616256860065-qt7sk53jo2qafomjsg2e14dt3sadrdof.apps.googleusercontent.com?project=localhost-testin-1538833257663

然后修改`server.js`中的：

```
const GOOGLE_CLIENT_ID = '???';
const GOOGLE_CLIENT_SECRET = '???';
```

运行：
----

```
npm install
npm run demo
```

The profile got from google:

```
profile { id: '??????????????',
  displayName: '姓名',
  name: { familyName: '姓', givenName: '名' },
  photos:
   [ { value:
        'https://lh3.googleusercontent.com/-vedwpnmw3as/AAAAAAAAAAI/AAAAAAAACfw/OsVo2IKf6h0/photo.jpg?sz=50' } ],
  gender: undefined,
  provider: 'google',
  _raw:
   '{\n "kind": "plus#person",\n "etag": "\\"jb1Xzanox6i8Zyse4DcYD8sZqy0/-ExfUIMMQVz19hvz_4K3NYVKVOA\\"",\n "objectType": "person",\n "id": "103033768625365787599",\n "displayName": "李鹏",\n "name": {  "familyName": "李",\n  "givenName": "鹏"\n },\n "image": {\n  "url": "https://lh3.googleusercontent.com/-vedwpnmw3as/AAAAAAAAAAI/AAAAAAAACfw/OsVo2IKf6h0/photo.jpg?sz=50",\n  "isDefault": false\n },\nisPlusUser": false,\n "language": "en",\n "verified": false\n}\n',
  _json:
   { kind: 'plus#person',
     etag: '"jb1Xzanox6i8Zyse4DcYD8sZqy0/-ExfUIMMQVz19hvz_4K3NYVKVOA"',
     objectType: 'person',
     id: '103033768625365787599',
     displayName: '李鹏',
     name: { familyName: '李', givenName: '鹏' },
     image:
      { url:
         'https://lh3.googleusercontent.com/-vedwpnmw3as/AAAAAAAAAAI/AAAAAAAACfw/OsVo2IKf6h0/photo.jpg?sz=50',
        isDefault: false },
     isPlusUser: false,
     language: 'en',
     verified: false } }
user { id: '1111',
  googleId: '103033768625365787599',
  username: 'user-from-google',
  displayName: 'UserFromGoogle' }

```

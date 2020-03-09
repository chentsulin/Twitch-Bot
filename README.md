# Twitch Bot

此專案目前支援 `LINE message API`.

目前能透過指令`綁定帳號`、`查詢追隨`、`最多人看的遊戲`、`查詢特定遊戲`以及`綁定推播`功能。

# 加入好友

<img height="200" border="0" alt="QRcode" src="https://i.imgur.com/kRcEhBN.png">

<a href="https://line.me/R/ti/p/%40eae1476b"><img height="50" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>

# 指令

- 綁定帳號: `綁定 TWITCH_ACCOUNT`
  - ex: 綁定 relaxing234
- 查詢追隨: `follow` / `追隨`
  - 須先綁定帳號才可查詢
- 最多人看的遊戲: `top` / `遊戲`
- 查詢特定遊戲: `find League of Legends`
- 連結 LINE Notify: [點選我](https://liff.line.me/1653917374-QqknRPqk)

## 更多用法可以參考[我的文章](https://nijialin.com/2020/03/09/Twitch-Bot-%E5%85%A8%E9%9D%A2%E5%8D%87%E7%B4%9A%EF%BC%81/)

# 主力套件

- [Bottender](https://github.com/Yoctol/bottender)
- [Mongo](https://www.mongodb.com/)
  - [mongoose](https://mongoosejs.com/)
- [twitch API](https://d-fischer.github.io/twitch/docs/basic-usage/getting-started.html)

# 試玩

Clone 圖奇獸 下來！

```sh
git clone https://github.com/louis70109/Twitch-Bot.git
```

## 建立 `.env`

把 `.env.sample` 改成 `.env` 並把對應的 key 放入。

## LINE

- Secret key
  ![](https://i.imgur.com/mwLCBIe.png)

- Access token
  ![](https://i.imgur.com/7hVHm3c.png)

## 啟動

### Normal

- 先用 `yarn install` 或 `npm install` 來安裝相依套件
- 開啟另一個視窗執行 `tsc -w`，它會幫忙編譯並且即時監聽。
- 啟動服務方法:
  1. `npm bottender dev`: 執行程式，或是加上 `--console` 讓你可以在`終端機`上直接測試行為。
  2. `npm run dev`: 則是有完整的 LINE API 使用功能(`Notify`、`LIFF`)，需要前端顯示的則需要透過這個指令啟動 server。

到這裡要看到 bottender 已經幫你啟動 `LINE` 的 webhook URL 了。
![](https://i.imgur.com/p3z2fCp.png)

然後將 `LINE` webhook url 複製到你的機器人開發者頁面中。
![](https://i.imgur.com/KEpPgxK.png)

### Docker

若要試玩 Docker 的話可以使用以下指令

```sh
docker-compose up -d # 啟動服務於背景
docker ps            # 查看服務狀態
```

開啟另一個視窗執行`ngrok`將 port 導出去

```sh
npx ngrok http 5000
```

再將網址複製到對應的平台設定上即可！

> 在 container 裡也是讀取`.env`，要記得設定檔案。

---

👾👾👾 現在你可以好好的去試玩 Twitch Bot 了 🎉🎉🎉

# LICENSE

MIT

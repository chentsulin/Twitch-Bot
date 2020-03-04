import axios from 'axios';
import qs from 'querystring';
import { NotifyModel } from '../model/notify';
class NotifyController {
  static async confirmNotify(req, res) {
    const line_code = req.query.code;
    const userId = req.query.state;
    const client = qs.stringify({
      grant_type: 'authorization_code',
      code: line_code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    await axios({
      method: 'post',
      url: 'https://notify-bot.line.me/oauth/token',
      data: client,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        NotifyModel.findOne({ userId: userId }, (err, isAlive) => {
          const notify: any = {} as typeof NotifyModel;
          notify.token = response.data.access_token;
          notify.userId = userId;
          if (!isAlive) {
            notify.save(err => {
              if (err) throw err;
            });
          } else {
            const userObj = {
              token: response.data.access_token,
              userId: userId,
            };
            NotifyModel.findOneAndUpdate(
              { userId: userId },
              userObj,
              (err, _) => {
                if (err) console.log(err);
              }
            );
          }
        });
        res.render('notify_confirm', {
          message: response.data,
          liffId: process.env.LIFF_ID,
        });
      })
      .catch(err => {
        res.render('notify_confirm', {
          message: err,
          liffId: process.env.LIFF_ID,
        });
      });
  }
}

export { NotifyController };

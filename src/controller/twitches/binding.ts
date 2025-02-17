import { StreamNotifyModel } from '../../model/notify';
import sendMessage from '../../templates/common/sendMessage';

export default async function notifyBinding(
  context: any,
  { match }
): Promise<void> {
  const name: string = match.groups?.name;
  const userId: string = context._session?.user?.id;
  const $notify: any = new StreamNotifyModel();
  $notify.name = name;
  $notify.userId = userId;
  let replyMessage = `✅ 綁定編號: ${name} 成功！`;

  const $stream: any = await StreamNotifyModel.findOne({
    userId: userId,
    name: name,
  });
  if (!$stream) {
    $notify.save(err => {
      if (err) replyMessage = '❌ 綁定失敗';
      sendMessage(context, replyMessage);
    });
  } else sendMessage(context, '🔔 已經綁定過了喔！');
}

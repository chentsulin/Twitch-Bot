import TwitchClient from 'twitch';
import { UserModel } from '../../model/user';
import { StreamNotifyModel } from '../../model/notify';
import showChannels from '../common/Channels';
import sendMessage from '../../templates/common/sendMessage';

export default async function userFollow(context: any): Promise<void> {
  const platform: string = context._session?.platform;
  const userId: string = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const $currentUser: any = await UserModel.findOne({ userId: userId });
  if (!$currentUser) {
    sendMessage(context, '👾 請先綁定帳號哦！\n ex: 綁定 godjj');
    return;
  }
  const follows = await twitchClient.kraken.users.getFollowedChannels(
    $currentUser.twitchId
  );
  const channel: Array<string> = [];

  for (let i = 0; i < follows.length; i++) {
    const follow = follows[i]
    channel.push(follow.channel.id)
  }
  const streams: any = await twitchClient.kraken.streams.getStreams(channel);

  const $notify: any = await StreamNotifyModel.find({ userId: userId });

  const userBindingStreams: Array<string> = [];
  for (let idx = 0; idx < streams.length; idx++) {
    for (let n_idx = 0; n_idx < $notify.length; n_idx++) {
      if (streams[idx].channel.name === $notify[n_idx].name) {
        userBindingStreams.push($notify[n_idx].name);
        break;
      }
    }
  }
  showChannels(context, platform, streams, userBindingStreams);
}

import showGamesFlex from '../../templates/line/games';
import showGamesGeneric from '../../templates/messenger/games';
import { Game } from '../../model/game';
import sendMessage from '../../templates/common/sendMessage';

export default async function showGames(
  context: any,
  platform: string,
  games: Game[]
): Promise<void> {
  switch (platform) {
    case 'line':
      games.length !== 0
        ? showGamesFlex(context, games)
        : sendMessage(context, '🚀現在想看的遊戲都沒開哦！');
      break;
    case 'messenger':
      games.length !== 0
        ? showGamesGeneric(context, games)
        : sendMessage(context, '🚀現在想看的遊戲都沒開哦！');
      break;
    default:
      await context.sendText(games);
      break;
  }
}

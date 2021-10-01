export interface BanDescriptionModel {
  gban: string
  lban: string
  vban: string
  chatban: string
  eban: string
}

export const $banDescription: BanDescriptionModel = {
  gban: 'GBan(Global Ban)とは、MCBansプラグインが提供するグローバルなBanです。jao Minecraft Serverにログインすることができなくなり、MCBansプラグインを導入している他のサーバにも処罰内容が公開・通知され、違反を起こすと下がる数値 Reputation の設定に応じてログインを制限することができます。',
  lban: 'LBan(Local Ban)とは、MCBansプラグインが提供するローカルなBanです。jao Minecraft Serverにログインすることができなくなり、MCBansプラグインを導入している他のサーバにも処罰内容が公開・通知されますが、Reputation には影響しません。',
  vban: 'VBan(Vanila Ban)とはMinecraftの元々唯一のBan機能であるローカルBanのことです。他サーバへの影響は一切ありませんが、jao Minecraft Serverにログインすることができなくなります。',
  chatban:
    'ChatBanとは、jao Minecraft Server独自のBan機能です。他サーバのMuteと同様、チャットが一切できなくなります。',
  eban: 'EBan(Eden Ban)とは、jao Minecraft Server独自のBan機能です。特定のエリアから出ることができなくなる他、ブロックの編集やアイテムの使用ができなくなります。',
}

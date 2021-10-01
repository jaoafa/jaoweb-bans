export interface MCBansItemModel {
  banid: number
  mcid: string
  uuid: string
  reason: string
  // eslint-disable-next-line camelcase
  banned_at: string
}
export interface BanItemModel {
  id: number
  mcid: string
  uuid: string
  reason: string
  status: boolean
  // eslint-disable-next-line camelcase
  banned_at: string
}

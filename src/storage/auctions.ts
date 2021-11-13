import storage from "."

const AUCTIONS_KEY = 'AUCTIONS_KEY'

export function setAuctionsStorage(value: any) {
  storage.localSet(AUCTIONS_KEY, value)
}
export function getAuctionsStorage() {
  return storage.localGet(AUCTIONS_KEY)
}
export function removeAuctionsStorage() {
  storage.localRemove(AUCTIONS_KEY)
}

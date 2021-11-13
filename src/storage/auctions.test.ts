import {
  setAuctionsStorage,
  getAuctionsStorage,
  removeAuctionsStorage
} from "./auctions"

// 工序 2，AC 1，example 1
// 工序 2，AC 1，example 2
// 工序 2，AC 2，example 1
// 工序 2，AC 3，example 1
describe('Storage Auctions Test', () => {
  test('should return 123 when call getAuctionsStorage giving set auctions storage with value 123', async () => {
    setAuctionsStorage('123')
    const es = getAuctionsStorage()
    expect(es).toBe('123')
  })
  test('should return undefined when remove auctions storage', async () => {
    setAuctionsStorage('123')
    removeAuctionsStorage()
    const es = getAuctionsStorage()
    expect(es).toBeUndefined()
  })
})

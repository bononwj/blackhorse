import storage from "."

describe('Storage lib Test', () => {
  test('should return 1234 when set local storage with key 123 and value 1234', async () => {
    storage.localSet('123', '1234')
    const es = storage.localGet('123')
    expect(es).toBe('1234')
  })
  test('should return undefined when set local storage with key 123 and value 1234 then remove it', async () => {
    storage.localSet('123', '1234')
    storage.localRemove('123')
    const es = storage.localGet('123')
    expect(es).toBeUndefined()
  })
})

import { getAuctions } from "./auction";

jest.mock('../request', () => {
  const mockDataFn = require('../test/mockRequest').default
  return jest.fn(mockDataFn('../../mock/auction'));
});

describe('Services auction Test', () => {
  beforeAll(() => {
  });
  afterAll(() => {
    jest.resetAllMocks()
  });
  // 工序 1，AC 1，Example 1
  test('should return 6 items when call BFF', async () => {
    const data = (await getAuctions({ type: 'all', page: 1, size: 6 }))
    expect(data.content).toHaveLength(6);
  });

  // 工序 1，AC 1，Example 2
  test('should return 4 items when call BFF', async () => {
    const data = (await getAuctions({ type: 'antique', page: 1, size: 6 }))
    expect(data.content).toHaveLength(4);
  });

  // 工序 1，AC 2，Example 1
  test('should return 0 items when call BFF', async () => {
    const data = (await getAuctions({ type: 'costume', page: 1, size: 6 }))
    expect(data.content).toHaveLength(0);
  });

  // 工序 1，AC 3，Example 1
  test('should return error when call BFF with params type is error', async () => {
    const data = (await getAuctions({ type: 'error', page: 1, size: 6 }))
    expect(data.content).toBe(undefined);
  });
})

import { renderHook, act } from '@testing-library/react-hooks'
import { useAuctions, useFormatAuctionsData, useLoadAuctions } from './presenter';
import * as auctionsStorage from '@/storage/auctions'

jest.mock('@/services/auction', () => {
  return {
    __esModule: true,
    getAuctions: jest.fn((params) => {
      if (params.type === 'all') {
        return Promise.resolve({
          page: 1,
          content: [1,2,3,4,5,6],
          totalPage: 14,
          total: 80,
        })
      } else if (params.type === 'error') {
        return Promise.reject({
          "error": "数据查询失败",
          "message": "暂无该数据"
        })
      }
    }),
  };
});

jest.mock('@/storage/auctions', () => {
  const originalModule = jest.requireActual('@/storage/auctions');
  return {
    __esModule: true,
    ...originalModule,
    getAuctionsStorage: jest.fn((params) => {
      return {
        error: {
          type: 'error',
          items: [1,2,3,4,5,6]
        }
      }
    }),
    setAuctionsStorage: () => {},
  };
});

describe('Presenter load-auctions-data Test', () => {
  beforeAll(() => {
  });
  afterAll(() => {
    jest.resetAllMocks()
  });

  // 工序 3，AC 1，example 1
  // 工序 3，AC 1，example 2 类似
  test('should return 6 items when call auctions services', async () => {

    const { result } = renderHook(() => useLoadAuctions())

    await act(async () => {
      await result.current.load({ type: 'all' })
    })

    expect(result.current.data.items.toString()).toBe([1,2,3,4,5,6].toString())
  })

  // 工序 3，AC 3，example 1
  test('should return 0 items when call auctions error services', async () => {

    const { result } = renderHook(() => useLoadAuctions())

    await act(async () => {
      await result.current.load({ type: 'error' })
    })

    expect(result.current.data.isError).toBeTruthy()
  })

  // 工序 5，AC 1，example 1
  // 工序 5，AC 1，example 2
  // 工序 5，AC 2，example 1
  test('should return items from storage when call BFF with error', async () => {

    const spy = jest.spyOn(auctionsStorage, 'setAuctionsStorage')

    const { result } = renderHook(() => useAuctions())

    await act(async () => {
      await result.current.load({ type: 'all' })
    })

    expect(spy).toBeCalled()
  })

  // 工序 4，AC 3，example 1
  test('should return items from storage when call BFF with error', async () => {

    const { result } = renderHook(() => useAuctions())

    await act(async () => {
      await result.current.load({ type: 'error' })
    })

    expect(result.current.auctions.items.toString()).toBe([1,2,3,4,5,6].toString())
  })

  // 工序 6，AC 1，example 1
  // 工序 6，AC 1，example 2
  // 工序 6，AC 2，example 1
  // 工序 6，AC 3，example 1
  test('should return render data when format the model data', async () => {

    const { result } = renderHook(() => useFormatAuctionsData({
      isError: false,
      items: [1,2,3,4,5,6],
      params: {type: 'all'},
      total: 80,
      totalPage: 14,
    }))

    expect(JSON.stringify(result.current[0]))
    .toBe(JSON.stringify({
      isError: false,
      items: [1,2,3,4,5,6],
      total: 80,
      totalPage: 14,
    }))
  })

  // 工序 6，AC 3，example 2
  test('should return render data when format the model data', async () => {

    const { result } = renderHook(() => useFormatAuctionsData({
      isError: true,
      items: [],
      params: {type: 'all'},
      total: 0,
      totalPage: 0,
    }))

    expect(JSON.stringify(result.current[0]))
    .toBe(JSON.stringify({
      isError: true,
      items: [],
      total: 0,
      totalPage: 0,
    }))
  })

})

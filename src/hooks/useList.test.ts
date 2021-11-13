import { renderHook, act } from '@testing-library/react-hooks'
import Mock, { Random } from 'mockjs';
import useList, { ListQuery } from './useList';

describe('UseList Test', () => {
  test('should return items', async () => {

    const response = Mock.mock({
      page: 2,
      size: 6,
      total: 800,
      [`content|6`]: [
        {
          id: () => Mock.mock('@id'),
          title: () => Mock.mock('@title'),
          desc: () => Mock.mock('@paragraph(2)'),
          cover: () => Random.image('200x100'),
          startingPrice: () => Mock.mock({ "number|1000-10000": 100}).number,
        }
      ]
    })

    const { result } = renderHook(() => useList(() => {
      return Promise.resolve(response) as Promise<ListQuery<any>>
    }))

    await act(async () => {
      await result.current.load({})
    })

    expect(result.current.data.items).toBe(response.content)
  })

  test('should return isError when request error', async () => {

    const response = Mock.mock({
      page: 2,
      size: 6,
      total: 800,
    })

    const { result } = renderHook(() => useList(() => {
      return Promise.reject(response) as Promise<ListQuery<any>>
    }))

    await act(async () => {
      await result.current.load({})
    })

    expect(result.current.data.isError).toBeTruthy()
  })

})

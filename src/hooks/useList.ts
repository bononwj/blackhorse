import { AnyRecord } from "dns";
import { useState, useEffect } from "react"

export type ListQuery<T = unknown> =  { content: T[], page: number; totalPage: number; size: number; total: number };

export default function <T>(requestFn: (params: any) => Promise<ListQuery<T>>) {
  const [data, setData] = useState<any>(null)
  const [page, setPage] = useState<any>(1)
  const [size, setSize] = useState<any>(6)

  const getData = async(params: any) => {
    try {
      const res = await requestFn({ page, size, ...params })
      setPage(res.page + 1)
      setData({
        isError: false,
        params,
        items: res.content,
        totalPage: res.totalPage,
        total: res.total,
      })
    } catch (error) {
      setData({
        isError: true,
        params,
        items: [],
        totalPage: 0,
        total: 0,
      })
    }
  }

  const refresh = async(params: any) => {
    try {
      const res = await requestFn({ page: 1, size, ...params })
      setPage(res.page)
      setData({
        isError: false,
        params,
        items: res.content,
        totalPage: res.totalPage,
        total: res.total,
      })
    } catch (error) {
      setData({
        isError: true,
        params,
        items: [],
        totalPage: 0,
        total: 0,
      })
    }
  }

  const load = async(params: any) => {
    await getData(params)
  }

  return {
    data,
    load,
    refresh,
  }
}

import useList from "@/hooks/useList"
import { getAuctions } from "@/services/auction"
import { useCallback, useEffect, useState } from "react"
import * as auctionsStorage from '@/storage/auctions'

export interface Item {
  id: string
  title: string
  desc: string
  cover: string
  startingPrice: string
}

export function useLoadAuctions() {
  return useList<Item>((params) => {
    return getAuctions(params);
  });
}

export function useFormatAuctionsData(initialData: any): [data: any, setData: any ] {
  const [data, setData] = useState<any>(initialData)

  return [{
    isError: data.isError,
    items: data.items,
    total: data.total,
    totalPage: data.totalPage,
  }, setData]
}

export function useAuctions() {
  // Model
  const [auctionsData, setAuctionsData] = useState<any>({})

  const [auctions, setAuctions] = useFormatAuctionsData({})

  const {
    data,
    load,
  } = useLoadAuctions()

  useEffect(() => {
    if (data) {
      const {
        isError,
        params,
      } = data

      if (isError) {
        const storageAuctionsData = auctionsStorage.getAuctionsStorage()

        const {
          params,
        } = data

        if (storageAuctionsData && storageAuctionsData[params.type]) {
          setAuctions(storageAuctionsData[params.type])
        } else {
          setAuctions(data)
        }
      } else {
        const cachData = {
          ...auctionsData,
          [params.type]: data
        }

        setAuctionsData(cachData)
        setAuctions(data)
        auctionsStorage.setAuctionsStorage(cachData)
      }
    }
  }, [data])

  return {
    load: useCallback((params) => {
      const { type } = params
      if (auctionsData[type]) {
        setAuctions(auctionsData[type])
      } else {
        load({ type })
      }
    }, []),
    auctions,
  }
}

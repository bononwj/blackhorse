import request from "../request"

interface ListParams {
  type?: string
  size: number
  page: number
}
export function getAuctions(params: ListParams) {
  return request('/auction-requests/proposals', {
    params,
    method: 'get',
  })
}

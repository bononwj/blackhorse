export default (mockPath: string) => {
  const mockData = require(mockPath).default
  return (apiPath: string, options: any) => {
    let responseData = {}
    const resEnd = (data: string) => {
      responseData = JSON.parse(data)
    }
    const method = options.method === 'post' ? 'POST' : 'GET'

    let mockRequest = mockData[apiPath]
    if (!mockData[apiPath]) {
      mockRequest = mockData[`${method} ${apiPath}`]
    }
    if (typeof mockRequest === 'function') {
      const res = mockRequest({ query: options.params }, { end: resEnd, setHeader: () => {}, })
      return res || responseData
    } else if (typeof mockRequest === 'object') {
      return mockRequest
    }
    throw new Error("Request Error");
  }
}

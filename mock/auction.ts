import Mock, { Random } from 'mockjs';

export default {
  'POST /auction-requests/proposals': { a: 123 },
  'GET /auction-requests/proposals': (req: any, res: any) => {
    const {
      type = 'all',
      page = 1,
      size = 6,
    } = req.query

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (type === 'error') {
      res.statusCode = 404
      res.end(JSON.stringify({
        error: '数据查询失败',
        message: '暂无该数据'
      }))
      return
    }

    if (type === 'antique') {
      res.end(
        JSON.stringify(
          Mock.mock({
            page: Number(page),
            size,
            total: 4,
            totalPage: 1,
            [`content|${4}`]: [
              {
                id: () => Mock.mock('@id'),
                title: () => Mock.mock('@title'),
                desc: () => Mock.mock('@paragraph(2)'),
                cover: () => Random.image('200x100'),
                startingPrice: () => Mock.mock({ "number|1000-10000": 100}).number,
              }
            ]
          })
        )
      )
      return
    }

    if (type === 'costume') {
      res.end(
        JSON.stringify(
          Mock.mock({
            page: Number(page),
            size,
            total: 0,
            totalPage: 0,
            [`content|${0}`]: [
              {
                id: () => Mock.mock('@id'),
                title: () => Mock.mock('@title'),
                desc: () => Mock.mock('@paragraph(2)'),
                cover: () => Random.image('200x100'),
                startingPrice: () => Mock.mock({ "number|1000-10000": 100}).number,
              }
            ]
          })
        )
      )
      return
    }

    res.end(
      JSON.stringify(
        Mock.mock({
          page: Number(page),
          size,
          total: 80,
          totalPage: 14,
          [`content|${size}`]: [
            {
              id: () => Mock.mock('@id'),
              title: () => Mock.mock('@title'),
              desc: () => Mock.mock('@paragraph(2)'),
              cover: () => Random.image('200x100'),
              startingPrice: () => Mock.mock({ "number|1000-10000": 100}).number,
            }
          ]
        })
      )
    )
  },

  // support customized functions，please refer to express@4 for more details of the API
  'POST /api/users/create': (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; }) => {
    // add cors header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
}

import Mock, { Random } from 'mockjs';

export default {
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

  'GET /autions/450000200202142526': (req: any, res: any) => {
    // res.end(
    //   JSON.stringify(
    //     Mock.mock({
    //       id: '450000200202142526',
    //       title: () => Mock.mock('@title'),
    //       desc: () => Mock.mock('@paragraph(2)'),
    //       [`cover|${5}`]: [() => Random.image('200x100')],
    //       startingPrice: () => Mock.mock({ "number|1000-10000": 100}).number,
    //       diffPrice: () => Mock.mock({ "number|10-100": 100}).number,
    //     })
    //   )
    // )
    res.end(
      JSON.stringify(
        Mock.mock({
          id: '450000200202142526',
          startingPrice: 1200,
          lowestPrice: 1430,
          diffPrice: 50,
          lastTime: "19:35:33",
          [`list|${3}`]: [
            {
              username: () => Mock.mock('@title'),
              time: () => "19:34:33",
              price: () => 1380,
            }
          ]
        })
      )
    )
    // res.end(
    //   JSON.stringify({ error: "查询失败", message: "网络错误" }
    //   )
    // )
  },
}

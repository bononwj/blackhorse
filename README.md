Story: 
    作为 参与竞拍的用户，我想要查看最近的，以便于【获得某种价值】。
相关 API 定义：
【如需调用其他服务，请列出相关的 API 规格定义；如果 story 本身提供 API，请也列出详细的 API 规格定义】
ACs:
AC1:  在用户进入首页后，用户点击tab切换分类时，展示对应分类的拍卖活动信息
AC2:  某些分类没有活动信息，用户点击tab切换到该分类下时，展示“暂无[分类名称]的拍卖活动”
AC3:  当BFF不可用时，用户点击tab切换分类时，浏览过（即已缓存）的分类下使用已缓存的数据来展示浏览，未浏览过的分类下展示“网络不给力，请稍后试试”


【Model + Service】
工序1：Fake BFF，实现Service调用BFF获取Model，（20mins）。
【Storage】
工序2：fake 浏览器存储组件，实现Storage组件向浏览器存取数据功能，（20mins）。
【Presenter + ViewModel】
工序3：Stub Service，实现Presenter调用Service，（20mins）。
工序4：Stub Storage，实现Presenter调用Storage，（20mins）。
工序5：Stub/Spy/Mock Service，实现Presenter组装ViewModel，（20mins）。
【View】
工序6：实现View，（20mins）。

/auction-requests/proposals

------------------ -------------

针对当前架构，设计以下工序来实现架构，覆盖所有组件并应用此前设计的测试策略：
Service
工序1：Fake BFF，实现Service调用BFF获取数据和发送数据
Utils
工序2：Fake 前端存储，实现Utils调用浏览器LocalStorage API进行数据缓存
Saga
工序3：Stub Service组件，实现Saga对Service的调用，完成网络请求副作用处理
工序4：Spy Utils组件，实现Saga对Utils的调用，完成数据缓存的副作用处理
工序5：Spy Action Dispatcher组件，实现Saga将副作用处理后返回的数据传递回状态管理层
Store, Reducer, Action Dispatcher
	工序6：实现对状态的管理，用于将状态映射到View组件的渲染
View
	工序7：Stub Action Dispatcher组件，实现View对UI的渲染


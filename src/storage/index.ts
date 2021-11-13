export default {
  localSet: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data: value }))
    } catch (error) {
      console.error('设置浏览器缓存失败');
      console.error(error);
    }
  },
  localGet: (key: string) => {
    try {
      return JSON.parse((localStorage.getItem(key) || '{}')).data
    } catch (error) {
      console.error('获取浏览器缓存失败');
      console.error(error);
      return null
    }
  },
  localRemove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('移除浏览器缓存失败');
      console.error(error);
    }
  }
}

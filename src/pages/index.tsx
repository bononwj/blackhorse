import { useEffect } from 'react';
import styles from './index.less';
import { Item, useAuctions } from './presenter';


// 工序 7，AC 1，example 1
// 工序 7，AC 1，example 2
// 工序 7，AC 2，example 1
// 工序 7，AC 3，example 1
export default function IndexPage() {

  const {
    auctions,
    load,
  } = useAuctions()

  useEffect(() => {
    load('all')
  }, [])

  useEffect(() => {
    if (auctions.isError) {
      console.log('网络不给力，请稍后试试');
    }
  }, [auctions])

  const {
    isError = false,
    total = 0,
    items = [],
  } = auctions

  return (
    <div className={styles.container}>
      <h1>Auctions</h1>
      <h4>The Best Things</h4>

      <div className={styles.tabs}>
        <div className={[styles.tab, styles['tab-actived']].join(' ')}>All({ total })</div>
        <div className={styles.tab}>Antique</div>
        <div className={styles.tab}>Electronics</div>
        <div className={styles.tab}>Costume</div>
      </div>
      {
        !isError ?
        <div className={styles.error}>网络不给力，请稍后试试</div> :
        <div className={styles.cards}>
          {
            items.map((item: Item) => {
              return <div className={styles.card} key={item.id}>
                <img src={item.cover} alt="" className={styles.cover} />
                <div className={styles.info}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.desc}>{item.desc}</div>
                  <div className={styles.price}>￥{item.startingPrice}</div>
                </div>
              </div>
            })
          }
        </div>
      }
    </div>
  );
}

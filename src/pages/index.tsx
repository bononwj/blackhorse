import { useEffect } from 'react';
import styles from './index.less';
import { useAuctions } from './presenter';

interface Item {
  id: string
  title: string
  desc: string
  cover: string
  startingPrice: string
}

export default function IndexPage() {

  const {
    auctions,
    load,
  } = useAuctions()

  useEffect(() => {
    if (auctions.isError) {
      console.log('网络不给力，请稍后试试');
    }
  }, [auctions])


  return (
    <div>
      <h1 className={styles.title}>{ auctions.total }</h1>
      {/* <h1 className={styles.title} onClick={() => refresh()}>刷新</h1> */}
      <h1 className={styles.title} onClick={() => {
        load({ type: 'all' });
      }}>{ auctions.hasMore ? 'load more' : 'no more' }</h1>
      <h1 className={styles.title} onClick={() => {
        load({ type: 'error' });
      }}>error</h1>
{/*
      <div>
        {
          items.map((item) => {
            return <h1 className={styles.title} key={item.id}>{ item.title }</h1>
          })
        }
      </div> */}
    </div>
  );
}

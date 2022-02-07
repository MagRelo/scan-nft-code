import { useLoaderData, Link } from 'remix';

import { getCollections } from '~/codes';

export const loader = async () => {
  const collections = await getCollections();
  return collections;
};

export default function Index() {
  const collections = useLoaderData();

  // console.log({ collections });

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        maxWidth: '650px',
        margin: '40px auto 0',
        textAlign: 'center',
      }}>
      <h1>lskdjflsdkfj</h1>
      <hr />
      <CollectionList collections={collections} />
    </div>
  );
}

function CollectionBanner({ item }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '15px',
        textAlign: 'left',
      }}>
      <div>
        <img
          src={item.imageURL}
          alt='avatar'
          style={{ borderRadius: '50%', height: '60px' }}
        />
      </div>

      <div>
        <div style={{ fontSize: '26px', fontWeight: 'bold' }}>{item.name}</div>
        <div>Contract Address: {item.contractAddress}</div>
      </div>
    </div>
  );
}

function CollectionList({ collections }) {
  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          paddingLeft: '0',
          marginLeft: '0',
        }}>
        {collections.map((item, i) => {
          return (
            <li
              key={i}
              style={{
                marginBottom: '20px',
              }}>
              <Link to={'/collection/' + item.contractAddress}>
                <CollectionBanner item={item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

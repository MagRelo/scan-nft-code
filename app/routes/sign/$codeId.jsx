import { useLoaderData, Form } from 'remix';

import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QRCode from 'react-qr-code';

import { getCodeById } from '~/codes';

export const loader = async ({ params, request }) => {
  console.log(params.codeId);
  const code = await getCodeById(params.codeId);
  return { code };
};

export const action = async ({ request }) => {
  console.log(response);
  return null;
};

export default function Index() {
  const { code } = useLoaderData();

  // console.log({ code });

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        maxWidth: '650px',
        margin: '40px auto 0',
        textAlign: 'center',
      }}>
      <CollectionBanner item={code.collection} />
      <hr />

      <div style={{ textAlign: 'left' }}>
        <h2>Validate Ownership</h2>
        <div>
          <h3>1) Connect Your Web3 Wallet</h3>
          <p>
            <b>Status: </b> NOT CONNECTED
          </p>
          <Button variant='contained' type='submit'>
            Connect
          </Button>
        </div>
        <div>
          <h3>2) Sign a message to prove NFT ownership</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            voluptate.
          </p>
          <Button variant='contained' type='submit' disabled>
            Sign
          </Button>
        </div>
      </div>

      {/* <Form method='post' name='generate' reloadDocument>
        <Button variant='contained' type='submit'>
          Prove Ownership
        </Button>
      </Form>

      <code>{JSON.stringify(code)}</code> */}
    </div>
  );
}

export function CollectionBanner({ item }) {
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
        <div>{item.contractAddress}</div>
      </div>
    </div>
  );
}

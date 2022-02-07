import { useLoaderData, Form, Link } from 'remix';

import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkIcon from '@mui/icons-material/Link';
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import QRCode from 'react-qr-code';

import { getCodes, createCode, getCollectionByAddress } from '~/codes';

export const loader = async ({ params, request }) => {
  const [collection, codes] = await Promise.all([
    getCollectionByAddress(params.collectionAddress),
    getCodes(),
  ]);
  return { collection, codes };
};

export const action = async ({ request }) => {
  // console.log(request);

  const response = await createCode({ request });

  // console.log(response);
  return null;
};

export default function Index() {
  const { collection, codes } = useLoaderData();

  // const submit = useSubmit();
  // function handleSubmit(event) {
  //   //   submit(event.currentTarget, { replace: true });

  //   console.log();
  // }

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        maxWidth: '650px',
        margin: '40px auto 0',
        textAlign: 'center',
      }}>
      <CollectionBanner item={collection} />
      <hr />

      <div style={{ textAlign: 'left', padding: '2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto ',
            gap: '15px',
          }}>
          <div>
            <h2 style={{ margin: 0 }}>Validation Code</h2>
            <p style={{ margin: 0 }}>Codes are valid for 30 minutes</p>
          </div>
          <Form method='post' name='generate' reloadDocument>
            <input
              type='text'
              name='collection'
              id='collection'
              value={JSON.stringify(collection)}
              hidden
              readOnly
            />
            <Button variant='contained' type='submit'>
              Generate Code
            </Button>
          </Form>
        </div>

        <hr />
        <AccordionList codes={codes} />
      </div>
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
        <div>{item.contractAddress}</div>
      </div>
    </div>
  );
}

function Code({ code }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '15px',
        textAlign: 'left',
      }}>
      <div>
        {/* <div style={{ fontSize: '26px', fontWeight: 'bold' }}>
          {code.collection.name}
        </div> */}
        <div>
          <p>
            <b>Created:</b> {timeStampDisplay(code.createdAt)}
          </p>
          <p>
            <b>Expires: </b> {timeStampDisplay(code.expiresAt)}
            {/* {new Date(code.expiresAt.seconds * 1000)} */}
          </p>
        </div>
      </div>

      <div>
        <a href={code.qrCodeValue + code.id} target='_blank'>
          <QRCode
            value={code.qrCodeValue + code.id}
            size={128}
            fgColor={code.color || '#6d50d7'}
            title={code.collection.name}
            level='Q'
          />

          <div style={{ textAlign: 'center' }}>
            <small>
              <LinkIcon />
            </small>
          </div>
        </a>
      </div>
    </div>
  );
}

function timeStampDisplay(timestamp) {
  if (!timestamp) return '';

  const date = new Date(timestamp._seconds * 1000);
  return date.toISOString();
}

function AccordionList({ codes }) {
  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          paddingLeft: '0',
          marginLeft: '0',
        }}>
        {codes.map((code, i) => {
          return (
            <li
              key={i}
              style={{
                marginBottom: '20px',
              }}>
              <Accordion disabled={code.expired}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'>
                  {/* <Typography>
                    
                  </Typography> */}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      width: '100%',
                      margin: '0 1rem 0 0 ',
                    }}>
                    <div>
                      <b>id: </b>
                      {code.id}
                    </div>
                    <div style={{ display: 'flex', alignContent: 'center' }}>
                      {code.isVerified ? (
                        <CheckCircleOutlineIcon color='success' />
                      ) : (
                        <PendingIcon color='disabled' />
                      )}
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Code code={code} />
                </AccordionDetails>
              </Accordion>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

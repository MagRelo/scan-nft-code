// import { redirect } from 'remix';

import { bodyParser, redirectBack } from 'remix-utils';
import { db } from '~/utils/db.server';
// import { getUserSession } from "./utils/session.server";

export async function getCollections(request) {
  //   const sessionUser = await getUserSession(request);
  //   if (!sessionUser) {
  //     return redirect("/login");
  //   }

  console.log('getCollections', typeof db);

  const querySnapshot = await db.collection('collections').get();

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), contractAddress: doc.id });
  });

  return data;
}

export async function getCollectionByAddress(contractAddress) {
  //   const sessionUser = await getUserSession(request);
  //   if (!sessionUser) {
  //     return redirect("/login");
  //   }

  console.log(contractAddress);

  const docSnapshot = await db
    .collection('collections')
    .doc(contractAddress)
    .get();

  if (!docSnapshot.exists) {
    throw Error('No such document exists');
  } else {
    const doc = docSnapshot.data();
    return { contractAddress, ...doc };
  }
}

export async function getCodes() {
  //   const sessionUser = await getUserSession(request);
  //   if (!sessionUser) {
  //     return redirect("/login");
  //   }

  const docSnapshot = await db.collection('codes').get();

  const data = [];
  docSnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
}

export async function getCodeById(id) {
  //   const sessionUser = await getUserSession(request);
  //   if (!sessionUser) {
  //     return redirect("/login");
  //   }

  console.log(id);

  const docSnapshot = await db.collection('codes').doc(id).get();

  if (!docSnapshot.exists) {
    throw Error('No such document exists');
  } else {
    const doc = docSnapshot.data();
    return { id, ...doc };
  }
}

export async function createCode({ request }) {
  // user session
  //   const sessionUser = await getUserSession(request);
  //   if (!sessionUser) {
  //     return redirect("/login");
  //   }

  // get request body
  let body = await bodyParser.toString(request);
  body = new URLSearchParams(body);
  const collection = JSON.parse(body.get('collection'));

  const now = Date.now();
  const date = new Date();
  const newCode = {
    createdAt: date,
    updatedAt: date,
    expiresAt: new Date(date.getTime() + 30 * 60000), // add 30 min
    qrCodeValue: process.env.DEPLOYED_URL + '/sign/',
    collection: collection,
    message: `Verify ${collection.name} ownership`,
    signature: null,
    publicAddress: null,
    isAttempted: false,
    isVerified: false,
    status: 'UNSIGNED',
  };

  const docRef = await db.collection('codes').add(newCode);
  // console.log(docRef);

  return docRef;
}

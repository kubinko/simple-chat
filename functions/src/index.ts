import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const Filter = require('bad-words');
const Quotes = require('inspirational-quotes');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const quotes = functions.https.onRequest((request, response) => {
  if (request.method !== 'GET') {
    return response
      .set({'Access-Control-Allow-Origin': '*'})
      .status(400)
      .send('Bad request.');
  } else {
    return response
    .set({'Access-Control-Allow-Origin': '*'})
    .status(200)
    .send(Quotes.getQuote());
  }
});

export const onChatCreated = functions.firestore.document('chats/{id}')
  .onCreate((snapshot, context) => {
    const now = admin.firestore.FieldValue.serverTimestamp();
    return snapshot.ref.update({
      createdOn: now
    });
  });

export const onMessageCreated = functions.firestore.document('chats/{id}/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const chat = db.collection('chats').doc(context.params.id);
    const now = admin.firestore.FieldValue.serverTimestamp();

    await chat.update({
      lastMessageOn: now,
      totalMessageCount: admin.firestore.FieldValue.increment(1)
    });

    const message = snapshot.data();
    const originalText = message ? message.text : '';
    const filter = new Filter();
    const censoredText = filter.clean(originalText);

    return snapshot.ref.update({
      text: censoredText,
      moderated: originalText !== censoredText,
      createdOn: now
    });
  });

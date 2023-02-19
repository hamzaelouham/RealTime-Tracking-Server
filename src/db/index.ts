import * as firebase from "firebase-admin";
import config from "config";

firebase.initializeApp({
  credential: firebase.credential.cert(config.get<string>("firebase_secret")),
  databaseURL: config.get<string>("database_uri"),
});

const db = firebase.database();
export const ref = db.ref("tracking");

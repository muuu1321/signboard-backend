import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// データベースの参照を作成
const fireStore = admin.firestore();

export const api = functions.https.onRequest(async (request, response) => {
  if (request.method !== "POST") {
    response.send("This is not post request.");
  }

  functions.logger.info("Hello logs!", { structuredData: true });

  // 動作確認のため適当なデータをデータベースに保存
  const citiesRef = fireStore.collection("cities");
  citiesRef.doc("SF").set({
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
  });

  const read = await fireStore.collection("cities").doc("SF").get();
  if (!read.exists) {
    response.send("No such document!");
  } else {
    response.send(read.data());
  }
});

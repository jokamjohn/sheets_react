import config from "../config";
import Papa from 'papaparse';

/**
 * Load the cars from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.spreadsheetId,
          range: "Sheet1!A4:T"
        })
        .then(
            response => {
              const data = response.result.values;
              const cars = data.map(car => ({
                year: car[0],
                make: car[1],
                model: car[2]
              })) || [];
              callback({
                cars
              });
            },
            response => {
              callback(false, response.result.error);
            }
        );
  });
}

export const getCSV = async () => {
  const url = 'https://api-staging.andela.com/api/v1/partners/ratings/csv?';
  const FETCH_OPTIONS = {'headers': {'api-token': 'dAijyobQzkaieKRfVRe_8sBJzJWaIn3N06ymd-ls'}};
  const checkins = await fetch(url, FETCH_OPTIONS);
  console.log(checkins.json())
};

export const createSheet = async () => {
  try {
    const request = await window.gapi.client.sheets.spreadsheets.create({});
    return JSON.parse(request.body);
  } catch (e) {
    console.log('error creating spreadsheet:', e)
  }
};

export const writeCSV = spreadsheetId => {
  const csv = "Submitted%20Date%2C%20Submitter%2C%20Partner%2C%20Andela%20Attendees%2C%20Partner%20Attendees%2CHow%20Partner%20Feels%2C%20Partner%20Concerns%2C%20Tags%2C%20General%20Notes%2C%20Action%20Item%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Juntos%22%2C%22james%22%2C%22james%22%2C%22Unhappy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Juntos%22%2C%22Samuel%22%2C%22Samuel%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Gol%20Labs%22%2C%22James%22%2C%22James%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Bamboo%22%2C%22Bamboo%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Bamboo%22%2C%22Bamboo%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22James%22%2C%22James%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Bamboo%22%2C%22Bamboo%22%2C%22Unhappy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Gol%20Labs%22%2C%22Bamboo%22%2C%22Bamboo%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Gol%20Labs%22%2C%22Bamboo%20HR%22%2C%22Bamboo%20HR%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F01%22%2C%22Test%20Admin%22%2C%22Juntos%22%2C%22James%22%2C%22James%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F02%22%2C%22Olatunji%20Ayodabo%22%2C%22Glassbreakers%22%2C%22Pulse%22%2C%22Pulse%22%2C%22Happy%22%2C%22Blah%20concerns%22%2C%22Problem%20Solving%2C%20Initiative%2C%20Internet%20Connection%2C%20Leadership%2C%20Professionalism%2C%20Communication%22%2C%22n%2Fa%22%2C%22Title%3A%20Task%20two%20Owner%3A%20Pulse%20team%20again%20Due%20Date%3A%202018%2F04%2F19%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Task%201%20Owner%3A%20Pulse%20team%20Due%20Date%3A%20n%2Fa%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Task%20three%20Owner%3A%20Another%20Pulse%20team%20Due%20Date%3A%202018%2F04%2F28%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F03%22%2C%22Olatunji%20Ayodabo%22%2C%22Glassbreakers%22%2C%22John%20and%20Jane%20Doe%22%2C%22John%20and%20Jane%20Doe%22%2C%22Happy%22%2C%22Some%20concerns%22%2C%22Leadership%2C%20Communication%2C%20Integration%22%2C%22Some%20notes%22%2C%22Title%3A%20Action%201%20Owner%3A%20Pulse%20team%20Due%20Date%3A%202018%2F04%2F10%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Task%20two%20Owner%3A%20Success%20team%20Due%20Date%3A%202018%2F04%2F14%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F03%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Olatunji%22%2C%22Olatunji%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Joseph%22%2C%22Joseph%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22EINSTEIN%22%2C%22EINSTEIN%22%2C%22Unhappy%22%2C%22TESTING%22%2C%22n%2Fa%22%2C%22TESTING%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%222U%22%2C%22Me%22%2C%22Me%22%2C%22Unhappy%22%2C%22None%22%2C%22Initiative%22%2C%22None%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%222U%22%2C%22Many%20attendees%22%2C%22Many%20attendees%22%2C%22Unhappy%22%2C%22None%22%2C%22Initiative%22%2C%22None%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%222U%22%2C%22many%22%2C%22many%22%2C%22Unhappy%22%2C%22Many%22%2C%22n%2Fa%22%2C%22Many%22%2C%2C%0A%222018%2F04%2F12%22%2C%22Test%20Admin%22%2C%222U%22%2C%22many%20guys%22%2C%22many%20guys%22%2C%22Unhappy%22%2C%22Hallo%22%2C%22Initiative%22%2C%22Hallo%22%2C%2C%0A%222018%2F04%2F16%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22test%20attendees%22%2C%22test%20attendees%22%2C%22Ok%22%2C%22test%20slack%22%2C%22Initiative%22%2C%22test%20slack%22%2C%2C%0A%222018%2F04%2F16%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22me%20%22%2C%22me%20%22%2C%22Happy%22%2C%22test%20checkin%22%2C%22n%2Fa%22%2C%22test%20checkin%22%2C%2C%0A%222018%2F04%2F16%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22me%22%2C%22me%22%2C%22Ok%22%2C%22Hiiiiiii%22%2C%22Initiative%22%2C%22HIIII%22%2C%2C%0A%222018%2F04%2F16%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Musaimo%22%2C%22Musaimo%22%2C%22Happy%22%2C%22yessaya%22%2C%22Initiative%22%2C%22Thishadbetterworkwtf%22%2C%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Musaimo%22%2C%22Musaimo%22%2C%22Ok%22%2C%22concerns%22%2C%22Initiative%22%2C%22concerns%22%2C%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22James%22%2C%22James%22%2C%22Ok%22%2C%22This%20is%20a%20test%22%2C%22n%2Fa%22%2C%22This%20is%20a%20test%22%2C%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22One%20Credit%22%2C%22James%22%2C%22James%22%2C%22Unhappy%22%2C%22This%20is%20a%20test%22%2C%22n%2Fa%22%2C%22This%20is%20a%20test%22%2C%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Einstein%22%2C%22Einstein%22%2C%22Happy%22%2C%22Einstein%20Testing%22%2C%22n%2Fa%22%2C%22Einstein%20Testing%22%2C%22Title%3A%20czxzx%20Owner%3A%20zxczx%20Due%20Date%3A%202018%2F04%2F17%2C%20Status%3A%20resolved%0A%22%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22One%20Credit%22%2C%22olatunji%22%2C%22olatunji%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22AppThis%22%2C%22kagga%20john%22%2C%22kagga%20john%22%2C%22Ok%22%2C%22hello%20hello%22%2C%22Communication%22%2C%22general%20notes%22%2C%22Title%3A%20Communication%20Owner%3A%20John%20Jokam%20Due%20Date%3A%202018%2F04%2F26%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22AppThis%22%2C%22John%20Kagga%22%2C%22John%20Kagga%22%2C%22Happy%22%2C%22He%20has%20way%20more%20potential%20than%20he%20lets%20on%20in%20terms%20of%20communication%22%2C%22Communication%22%2C%22n%2Fa%22%2C%22Title%3A%20Improve%20communication%20Owner%3A%20John%20Kagga%20Due%20Date%3A%202018%2F05%2F16%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F17%22%2C%22Test%20Admin%22%2C%22Gol%20Labs%22%2C%22Einstein%20Njoroge%22%2C%22Einstein%20Njoroge%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22Communication%22%2C%22n%2Fa%22%2C%22Title%3A%20Improve%20Communication%20Owner%3A%20Einstein%20Njoroge%20Due%20Date%3A%202018%2F05%2F16%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F19%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Joseph%22%2C%22Joseph%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F19%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Joseph%22%2C%22Joseph%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F19%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Joseph%22%2C%22Joseph%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F19%22%2C%22Test%20Admin%22%2C%22Banerjee%20Rajoshree%22%2C%22Joseph%22%2C%22Joseph%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F23%22%2C%22Test%20Admin%22%2C%22Hewson%22%2C%22john%20kagga%22%2C%22john%20kagga%22%2C%22Ok%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22Title%3A%20Chat%20with%20success%20Owner%3A%20John%20Kagga%20Due%20Date%3A%202018%2F04%2F23%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F25%22%2C%22Test%20Admin%22%2C%22Hewson%22%2C%22David%2C%20Samuel%22%2C%22David%2C%20Samuel%22%2C%22Unhappy%22%2C%22Hello%20tester%20Hello%20tester%20Hello%20tester%20Hello%20tester%20Hello%20tester%20Hello%20tester%20Hello%20tester%20Hello%20tester%22%2C%22Initiative%2C%20Professionalism%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F26%22%2C%22Test%20Admin%22%2C%22Jeff%20Riley%22%2C%22einstein%22%2C%22einstein%22%2C%22Happy%22%2C%22am%20concerned%22%2C%22Communication%2C%20Leadership%2C%20Integration%22%2C%22notes%22%2C%22Title%3A%20toni%20Owner%3A%20Einstein%20Due%20Date%3A%202018%2F04%2F26%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F26%22%2C%22Test%20Admin%22%2C%22platform%20team%22%2C%22einstein%20n%22%2C%22einstein%20n%22%2C%22Ok%22%2C%22very%20concerned%22%2C%22Internet%20Connection%2C%20Professionalism%2C%20Problem%20Solving%22%2C%22more%20notes%22%2C%22Title%3A%20testing%20Owner%3A%20mate%20Due%20Date%3A%202018%2F04%2F26%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F26%22%2C%22Test%20Admin%22%2C%22platform%20team%22%2C%22James%22%2C%22James%22%2C%22Unhappy%22%2C%22Test%22%2C%22Communication%22%2C%22Test%22%2C%2C%0A%222018%2F04%2F26%22%2C%22Test%20Admin%22%2C%22Jeff%20Riley%22%2C%22Olatunji%22%2C%22Olatunji%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F26%22%2C%22Test%20Admin%22%2C%22WEconnect%22%2C%22Ghjgg%22%2C%22Ghjgg%22%2C%22Unhappy%22%2C%22-%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22Title%3A%20Bzbdhdhdh%20Owner%3A%20Tdhdhdhdh%20Due%20Date%3A%202019%2F03%2F12%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Hdhdhddhbd%20Owner%3A%20Bdekitnthth%20Due%20Date%3A%202018%2F07%2F16%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Gsgshehxv%20Owner%3A%20Hxhdjdkrn%20Due%20Date%3A%202018%2F05%2F15%2C%20Status%3A%20unresolved%0A%22%22Title%3A%20Ftchfgc%20Owner%3A%20ggccgcyfcg%20Due%20Date%3A%202018%2F04%2F28%2C%20Status%3A%20unresolved%0A%22%2C%0A%222018%2F04%2F27%22%2C%22Test%20Admin%22%2C%22AppThis%22%2C%22Blah%20%22%2C%22Blah%20%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F27%22%2C%22Test%20Admin%22%2C%22AppThis%22%2C%22hahaha%22%2C%22hahaha%22%2C%22Happy%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A%222018%2F04%2F30%22%2C%22Test%20Admin%22%2C%22Glassbreakers%22%2C%22Me%20myself%20and%20I%22%2C%22Partner%22%2C%22Happy%22%2C%22LOLOLOLOLO%22%2C%22n%2Fa%22%2C%22n%2Fa%22%2C%2C%0A";

  const data = Papa.parse((decodeURIComponent(csv))).data;
  window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: data
    }
  }).then((response) => {
    const result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
  });
};


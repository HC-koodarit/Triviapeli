import PartyModeOptions from "./PartyModeOptions";


test('the data has categories', () => {
   return fetchData().then(data => {
     expect(data).notToBe(null);
   });
 });
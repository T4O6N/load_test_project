// loadTest.js
// (async () => {
//   const loadtest = (await import("loadtest")).default;

//   const options = {
//     url: "https://advertisement-api.daofa.biz/api/v1/banners/FindMany?page=1&limit=100", // Change this to your API endpoint
//     method: "GET",
//   };

//   loadtest.loadTest(options, function (err, result) {
//     if (err) {
//       return console.error("Error:", err);
//     }
//     console.log("Load test result:", result);
//   });
// })();

export default async function loadTestUrl(url, apiKey) {
  const loadtest = (await import("loadtest")).default;

  const options = {
    url, // Use the passed URL from the API
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  loadtest.loadTest(options, function (err, result) {
    if (err) {
      return console.error("Error:", err);
    }
    console.log("Load test result:", result);
  });
}

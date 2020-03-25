// back-end warp function
export const getData = async () => {
  // warp directive
  "warp +server -client";

  const { request } = require("graphql-request");
  const envData = { nodeVersion: process.version };

  const query = `{
    countries {
      name
      mostRecent {
        date
        confirmed
        deaths
        recovered
        growthRate
      }
    }
  }`;

  try {
    const { countries } = await request(
      "https://covid19-graphql.now.sh",
      query
    );
    const result = countries.slice(0, 50).map(r => {
      r.mostRecent.recovered = r.mostRecent.recovered || 0;
      return r;
    });
    return { error: null, result, envData };
  } catch (e) {
    console.error("error during request");
    console.error(e);
    return { error: e };
  }
};

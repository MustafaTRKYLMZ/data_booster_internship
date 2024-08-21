const url = "https://flag-gilt.vercel.app/api/challenge";
const bearerToken = "uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=";
const initialCursor = "";

const fetchData = async (cursor) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ cursor }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch data: ${error?.error}`);
  }
  const data = await response.json();
  return data;
};

getFlagData = async (cursor) => {
  try {
    const data = await fetchData(cursor);

    const { nextCursor, message } = data;
    if (message.includes("Congratulations")) {
      console.log("Flag: ", data.flag);
    } else {
      console.log("Message: ", message);
      console.log("Cursor: ", nextCursor);
      console.log(
        ".........................................................................."
      );
      await getFlagData(nextCursor);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

getFlagData(initialCursor);

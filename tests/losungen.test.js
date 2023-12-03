const {
  getTodayString,
  loadCSVFile,
  getTodaysLosung,
  getLosungHTML,
} = require("../src/losungen.js");

describe("getTodayString", () => {
  it("should return today's date in the format dd.mm.yyyy for single digit day", () => {
    // Mock today's date to a known value
    const mockDate = new Date("2022-01-01T00:00:00.000Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const result = getTodayString();

    expect(result).toEqual("01.01.2022");
  });

  it("should return today's date in the format dd.mm.yyyy for multi digit day", () => {
    // Mock today's date to a known value
    const mockDate = new Date("2022-11-11T00:00:00.000Z");
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);

    const result = getTodayString();

    expect(result).toEqual("11.11.2022");
  });
});

describe("loadCSVFile", () => {
  it("should load CSV file for current year", async () => {
    const csvUrl = "https://example.com/csv";
    const currentYear = new Date().getFullYear();
    const expectedUrl = `${csvUrl}/Losungen${currentYear}.csv`;
    const expectedData = [
      ["header1", "header2"],
      ["value1", "value2"],
    ];

    // Mock the fetch function to return expected data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("header1\theader2\nvalue1\tvalue2"),
      })
    );

    const result = await loadCSVFile(csvUrl);

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(expectedData);
  });

  it("should reject with error if fetch fails", async () => {
    const csvUrl = "https://example.com/csv";
    const expectedError = new Error("Failed to fetch CSV file");

    // Mock the fetch function to reject with an error
    global.fetch = jest.fn(() => Promise.reject(expectedError));

    await expect(loadCSVFile(csvUrl)).rejects.toEqual(expectedError);
  });
});

describe("getTodaysLosung", () => {
  it("should return today's Losung if it exists", () => {
    const rows = [
      ["01.01.2022", "Losung 1", "Lehrtext 1"],
      ["02.01.2022", "Losung 2", "Lehrtext 2"],
      ["03.01.2022", "Losung 3", "Lehrtext 3"],
      // row for today
      [getTodayString(), "Losung 4", "Lehrtext 4"],
    ];
    const expectedLosung = rows[3];

    const result = getTodaysLosung(rows);

    expect(result).toEqual(expectedLosung);
  });

  it("should return undefined if today's Losung does not exist", () => {
    const rows = [
      ["01.01.2022", "Losung 1", "Lehrtext 1"],
      ["03.01.2022", "Losung 3", "Lehrtext 3"],
      ["04.01.2022", "Losung 4", "Lehrtext 4"],
    ];

    const result = getTodaysLosung(rows);

    expect(result).toBeUndefined();
  });
});

describe("getLosungHTML", () => {
  it("should return the correct HTML for a given Losung", () => {
    const losung = [
      "01.01.2022",
      "Samstag",
      false,
      "Losungsvers",
      "Losungstext",
    ];
    const expectedHTML = `
        <div class="losung">
            <h5 class="losungshead">Tageslosung vom 01.01.2022</h5>
            <p class="losungstext">Losungstext</p>
            <p class="losungsvers">Losungsvers</p>
        </div>
    `;

    const result = getLosungHTML(losung);

    expect(result).toEqual(expectedHTML);
  });
});

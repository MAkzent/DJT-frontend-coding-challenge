import axios from "axios";
import { queryIssues, extend, next } from "../../src/utils/issues";

const DATA = [
  {
    data: [
      {
        number: 123,
        html_url: "https://github.com/org/repo/123",
        title: "the title",
        body: "body",
        state: "closed",
        labels: [1, 2, 3]
      }
    ]
  },
  {
    data: [
      {
        number: 321,
        html_url: "https://github.com/org/repo/321",
        title: "the title2",
        body: "body2",
        state: "open",
        labels: [4]
      }
    ]
  }
];

const QUERY = {
  url: "https://github.com/org/repo",
  org: "org",
  repo: "repo",
  page: 1,
  perPage: 100,
  filter: "closed",
  issues: [
    {
      id: 123,
      url: "https://github.com/org/repo/123",
      title: "the title",
      body: "body",
      state: "closed",
      labels: [1, 2, 3],
      isPull: false
    }
  ]
};

jest.mock("axios");

axios.get
  .mockImplementationOnce(() => {
    return Promise.resolve(DATA[0]);
  })
  .mockImplementationOnce(() => {
    return Promise.resolve(DATA[1]);
  })
  .mockImplementationOnce(() => {
    return Promise.resolve(DATA[1]);
  });

describe("queryIssues", () => {
  it("converts api data into query", done => {
    queryIssues("org", "repo", {
      page: 1,
      perPage: 100,
      filter: "closed"
    }).then(query => {
      expect(query).toEqual(QUERY);
      done();
    });
  });

  it("gets next page", done => {
    next(QUERY).then(query => {
      expect(query).toEqual({
        ...QUERY,
        page: 2,
        issues: [
          {
            id: 321,
            url: "https://github.com/org/repo/321",
            title: "the title2",
            body: "body2",
            state: "open",
            labels: [4],
            isPull: false
          }
        ]
      });
      done();
    });
  });

  it("extends query to next page", done => {
    extend(QUERY).then(query => {
      expect(query).toEqual({
        ...QUERY,
        page: 2,
        issues: [
          {
            id: 123,
            url: "https://github.com/org/repo/123",
            title: "the title",
            body: "body",
            state: "closed",
            labels: [1, 2, 3],
            isPull: false
          },
          {
            id: 321,
            url: "https://github.com/org/repo/321",
            title: "the title2",
            body: "body2",
            state: "open",
            labels: [4],
            isPull: false
          }
        ]
      });
      done();
    });
  });
});

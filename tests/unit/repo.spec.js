import axios from "axios";
import { getRepository, getRepositoryFromUrl } from "../../src/utils/repo";

jest.mock("axios");

const DATA = {
  id: 123,
  name: "repo",
  owner: { login: "org" },
  html_url: "url"
};

const EXPECTED = {
  id: 123,
  repo: "repo",
  org: "org",
  url: "url"
};

axios.get
  .mockImplementationOnce(() => {
    return Promise.resolve({ data: DATA, status: 200 });
  })
  .mockImplementationOnce(() => {
    return Promise.resolve({ data: DATA, status: 404 });
  })
  .mockImplementationOnce(() => {
    return Promise.resolve({ data: DATA, status: 200 });
  });

describe("repo api", () => {
  it("return repo data from call", done => {
    getRepository("org", "repo").then(result => {
      expect(result[0]).toEqual(EXPECTED);
      expect(result[1]).toBeFalsy();
      done();
    });
  });

  it("returns error on 404", done => {
    getRepository("org", "repo").then(result => {
      expect(result[1]).toBeTruthy();
      done();
    });
  });

  it("return repo data from url call", done => {
    getRepositoryFromUrl("https://github.com/org/repo").then(result => {
      expect(result[0]).toEqual(EXPECTED);
      expect(result[1]).toBeFalsy();
      done();
    });
  });

  it("returns error on invalid url", done => {
    getRepositoryFromUrl("not a url").then(result => {
      expect(result[1]).toBeTruthy();
      done();
    });
  });

});

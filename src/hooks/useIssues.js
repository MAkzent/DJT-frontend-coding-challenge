import { useState, useEffect } from 'react';
import axios from 'axios';

const useIssues = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [repoLink, setRepoLink] = useState(null);
  const [filter, setFilter] = useState("all");
  const [offset, setOffset] = useState(1);
  
  const getIssues = async ({link, filter = "all", append = false, offset = 1 }) => {
    const pathArray = link.pathname.split("/");
    if (filter === "pull") {
      const { data } = await axios.get(`https://api.github.com/repos/${pathArray[1]}/${pathArray[2]}/issues?page=${offset}`);
      if (append) {
        setIssuesData((prevData) => [...prevData, ...data.filter((issue) => !!issue.pull_request)]);
      } else {
        setOffset(1);
        setIssuesData(data.filter((issue) => !!issue.pull_request))
      }
    } else {
      const { data } = await axios.get(`https://api.github.com/repos/${pathArray[1]}/${pathArray[2]}/issues?state=${filter}&page=${offset}`);
      if (append) {
        setIssuesData((prevData => [...prevData, ...data]));
      } else {
        setOffset(1);
        setIssuesData(data);
      }
    }
  }

  const getMoreIssues = () => {
    getIssues({link: repoLink, filter, append: true, offset: offset + 1});
    setOffset((prevOffset) => prevOffset + 1);
  }
  const clearData = () => {
    setOffset(1);
    setRepoLink(null);
    setIssuesData([]);
    setFilter("all");
  }

  useEffect(() => {
    if (!!repoLink) getIssues({link: repoLink, filter});
  }, [repoLink, filter])

  return {
    issuesData,
    getIssues,
    getMoreIssues,
    clearData,
    repoLink,
    setRepoLink,
    filter,
    setFilter,
    offset
  }
}

export default useIssues;

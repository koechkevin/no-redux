import axios from 'axios';

const apiKey = () => localStorage.getItem('key');
const baseURL = 'http://localhost:4200/api';
let axiosInstance = axios.create({
  baseURL
});
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Basic ${apiKey()}`;
    config.headers.proxyHost  = 'https://rocketdevs.atlassian.net';
    config.headers['content-type'] = 'application/json';
    return config;
});
const api = {
  get: (url) => axiosInstance.get(`${url}`),
  post: (url, data) => axiosInstance.post(`${url}`,data),
};

class Jira {
  static async getAllStories() {
    try {
      const query = `((issuetype in (Story, Bug, Task) AND resolution = Unresolved))
		AND assignee in (currentUser()) order by updated DESC`;
      const fields = `id,key,summary,status,description,parent, subtasks, issuetype, project`;
      const response = await api.get(`/rest/api/2/search?jql=${query}&fields=${fields}&expand=transitions`);
      return response.data.issues;
    } catch (e) {
      return []
    }
  }

  static async createJiraIssue(data) {
    const response = await api.post('/rest/api/2/issue', data);
    return response
  }

  static async getAllIssueTypes() {
    const response = await api.get('/rest/api/2/issuetype');
    return response.data;
  }

  static login(data) {
    const config = {
      headers: {
        Authorization: `Basic ${data}`,
        proxyHost: 'https://rocketdevs.atlassian.net'
      }
    };
    return axios.get(`${baseURL}/rest/api/2/myself`, config)
      .then(data => data);
  }
}
export default Jira;

import axios from 'axios';

const apiKey = btoa('kevin.koech@andela.com:DkaTmWav5fBYRqcDyinjA94E');
let axiosInstance = axios.create({
  baseURL: 'http://localhost:4200/api'
});
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Basic ${apiKey}`;
    config.headers.proxyHost  = 'https://koech.atlassian.net';
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
      const response = await api.get(`/rest/api/2/search?jql=${query}&fields=${fields}`);
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
}
export default Jira;

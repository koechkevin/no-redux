import axios from 'axios';

const apiKey = btoa('kevin.koech@andela.com:DkaTmWav5fBYRqcDyinjA94E');
let axiosInstance = axios.create({
  baseURL: 'http://localhost:4200/api'
});
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Basic ${apiKey}`;
    config.headers.proxyHost  = 'https://koech.atlassian.net';
    return config;
});
const api = {
  get: (url) => axiosInstance.get(`${url}`)
};

class Jira {
  static async getAllStories() {
    const query = `((issuetype in (Story, Bug, Task) AND resolution = Unresolved))
		AND assignee in (currentUser()) order by updated DESC`;
    const fields = `id,key,summary,status,description,parent, subtasks, issuetype, project`;
    const response = await api.get(`/rest/api/2/search?jql=${query}&fields=${fields}`);
    return response.data.issues;
  }
}
export default Jira;

import axios from "axios";

const baseURL = "/api/persons/";

const getAll = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const saveOne = (personObj) => {
  return axios.post(baseURL, personObj).then((res) => res.data);
};

const updateOne = (personObj) => {
  return axios.put(baseURL + personObj.id, personObj).then((res) => res.data);
};

const deleteOne = (personId) => {
  return axios.delete(baseURL + personId);
};

export default { getAll, saveOne, updateOne, deleteOne };

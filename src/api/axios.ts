import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5189/integra",
    withCredentials: true
});

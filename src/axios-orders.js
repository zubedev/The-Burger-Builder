import axios from "axios";

const instance = axios.create({
   baseURL: 'https://burger-builder-fb.firebaseio.com/'
});

export default instance;

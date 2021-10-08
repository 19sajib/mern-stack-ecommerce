import axios from "axios";

const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNWRhNDQzN2JmMWUyZDQ3YjgzYjRmNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzY5OTM4MSwiZXhwIjoxNjMzOTU4NTgxfQ.xzzB9jme7uds0lJlfJ4MZMO6DtylJTjVBsRqfCLal4s"


export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}` }
})
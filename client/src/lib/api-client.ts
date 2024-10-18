import axios from 'axios';
import { Host } from "../utils/constants.ts";

export const apiClient = axios.create(
    {
        baseURL: Host
    }
)
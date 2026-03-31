import {server} from "@/lib/auth/server"
import {toNextJsHandler} from "better-auth/next-js";

export const {POST, GET} = toNextJsHandler(server)
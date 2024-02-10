import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket';
import fastify from "fastify";

import { createPoll } from "./routes/create-polls";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from './ws/poll-results';
import { env } from '../env';

export const app = fastify()
const PORT = env.PORT

app.register(cookie, {
    secret: env.COOKIE_SECRET,
    hook: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)


app.listen({
    host: '0.0.0.0',
    port: PORT
}).then(() => console.log(`server is running at ${PORT}`))
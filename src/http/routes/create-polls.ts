import { FastifyInstance } from "fastify"
import z from "zod"

import { prisma } from "../../lib/prisma"

export async function createPoll(app: FastifyInstance) {
    app.post('/polls', async (request, reply) => {
        const createPollsBody = z.object({
            title: z.string(),
            options: z.array(z.string())
        })

        const { title, options } = createPollsBody.parse(request.body)
        const poll = await prisma.poll.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map((title) => ({ title }))
                    }
                }
            }
        })


        return reply.status(201).send({
            pollId: poll.id
        })
    })
}
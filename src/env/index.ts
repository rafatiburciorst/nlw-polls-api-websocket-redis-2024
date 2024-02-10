import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    COOKIE_SECRET: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error(_env.error.formErrors)
    throw new Error('ERROR ON ENV VALIDATION')
}

const env = _env.data

export {
    env
}
import * as z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),

  //TODO: uncomment this when we have a backend
  // .refine(async (e) => {
  //   // Where checkIfEmailIsValid makes a request to the backend
  //   // to see if the email is valid.
  //   return await checkIfEmailIsValid(e);
  // }, "This email is not in our database")
  // FIXME: this is not working, it's not waiting for the async function to finish

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
})

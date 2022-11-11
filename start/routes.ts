/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('users', 'UsersController').apiOnly().middleware({
  '*': ['auth'],
})

Route.get('/stuff', async () => {
  return "nothing"
})

Route.group(() => {
  Route.post('/register', async ({ auth, request }) => {
    const email = request.input('email')
    const password = request.input('password')

    const user = new User()

    user.email = email
    user.password = password
    await user.save()

    const token = await auth.use('api').attempt(email, password)
    return { user, token }
  })

  Route.post('/login', async ({ auth, request }) => {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token
  })
}).prefix('/auth')

Route.get('/github/redirect', async ({ ally }) => {
  return ally.use('github').redirect()
})

Route.get('/github/callback', async ({ ally, auth }) => {
  const github = ally.use('github')

  /**
   * User has explicitly denied the login request
   */
  if (github.accessDenied()) {
    return 'Access was denied'
  }

  /**
   * Unable to verify the CSRF state
   */
  if (github.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  /**
   * There was an unknown error during the redirect
   */
  if (github.hasError()) {
    return github.getError()
  }

  /**
   * Finally, access the user
   */
  const githubUser = await github.user()

  const user = await User.firstOrCreate({
    email: githubUser.email || undefined
  })

  await auth.use('web').login(user)
})

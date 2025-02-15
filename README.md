# Ozy App

Welcome to the ozy app. My personal lifestyle management app.

Over the years I've come to look at achievement as repetition of behaviors which, while not always successful,
have a probability bent in my favor such that the more repetitions I take, the higher the expected value. I apply this principle to many areas:
- Lose weight by on average being in a calorie deficit (even when some slip up days occur)
- Lose weight and promote longevity by on average taking 15k steps per day
- Get infinite money by deploying trading bots which win some probability P such that P*(expected profit multiple) - (1-P)*(expected loss multiple) > 1 then take trades on my behalf. If this random event P happens frequently you get infinite money
- Complete projects, businesses, and wellness goals by spending some X amount of hours per week on a given task.

Taking on life in this data-driven way where you're guaranteed to have a positive expected value over time mean you're guaranteed to win at life since the gains compound and all you ned to do is maintain an average.

This app helps keep track of all of life's averages. Eventually I would like to maintain additional biometric such as hormone levels, sleep quality, and turn into a metrics platform.

# Technologies

- Ionic/Capacitor ([just set it to a url](https://capacitorjs.com/docs/config#:~:text=url?:%20string) so you have a website masquerading as an app)
- Nextjs
- TypeScript
- Postgres
- Drizzle for migrations and 
- TRPC for definitive custom APIs
- Hasura for live syncing from DB to frontend
- Railway
- Envoy to switch between proxying to prod versus the codespace (basically I can hot reload develop using the public domain name)
- Tailscale to connect phone to codespace to prod deployment

# Dev Mode 2025

1. Connect local machine to tailscale
2. Add machine's virtual tailscale IP address as A record to `codespace` Host
3. Grab the `HCP_CLIENT_SECRET` env var from railway and add to local env along with `APP_VERSION=dev` and `PORT=3000`
4. Run `pnpm hcp-cache` in one terminal
4. Run `pnpm start` in another
5. Visit https://beta.ozy.xyz. You should see the dev mode toggle available

# Codespaces

Run the following on startup:
- adb connect phone.ozy.xyz:46245

^ the above port changes

TODO: get app to find out the port and send it to the db, have codespaces bring it down automatically.

# Serveo

For a while I was using serveo to make the codespace accessible but then I switched to Envoy. Keeping this for posterity reasons

- ssh -R beta.ozy.xyz:80:localhost:6080 serveo.net

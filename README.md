# Ozy App

Welcome to the ozy app. My personal lifestyle management app.

Over the years I've come to look at achievement as repetition of behaviors which, while not always successful,
have a probability bent in my favor such that the more repetitions I take, the higher the expected value. I apply this principle to many areas:
- Lose weight by on average being in a calorie deficit (even when some slip up days occur)
- Lose weight and promote longevity by on average taking 20k steps per day
- Get infinite money by deploying trading bots which win some probability P such that P*(expected profit multiple) - (1-P)*(expected loss multiple) > 1 then take trades on my behalf
- Complete projects, businesses, and wellness goals by spending some X amount of hours per week on a given task.

Taking on life in this data-driven way where you're guaranteed to have a positive expected value over time mean you're guaranteed to win at life since the gains compound and all you ned to do is maintain an average.

This app helps keep track of all of life's averages. Eventually I would like to maintain additional biometric such as hormone levels, sleep quality, and turn into a metrics platform.

# Technologies

Built using Tauri, Nextjs, TypeScript, MonogoDB (database and serverless functions)
Set up using the following guides:
- https://next--tauri.netlify.app/next/guides/getting-started/prerequisites/linux
- https://tauri.app/v1/guides/getting-started/setup/next-js
- https://next--tauri.netlify.app/next/mobile/development/configuration
- https://next--tauri.netlify.app/next/guides/distribution/sign-android

# Android testing

I'm using the tailscale free mesh vpn to connect codespaces with an android device
https://developer.android.com/tools/adb#wireless-android11-command-line

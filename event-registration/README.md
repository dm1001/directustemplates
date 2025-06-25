# Virtual Event Starter Kit

Full-stack virtual event registration and ticketing site. Includes both frontend (written in Nuxt) and the Directus backend.

**For:** Startups, software companies, and agencies that need a solution for managing and promoting virtual events for themselves or their clients.

Stop juggling 50 different platforms for event registration, schedules, CMS, and all the other pieces needed to run online events.

**Backend**

<img src="../../public/event-directus.png">

**Frontend**

<img src="../../public/event-frontend.png">

# Features 🚀

- Event registration
- Auth pages (login, register, reset confirmation code)
- Landing page builder using Directus M2A relationships
- Referral tracking to incentivize sharing
- Personalized virtual badges
- Dynamic OG / social share images based on individual tickets
- Giveaway / drawing page for awarding swag to registrants

# Local Development Setup 🚧

**Video**

<a href="https://youtu.be/4wbW7zgsRHg"><img src="https://img.youtube.com/vi/4wbW7zgsRHg/0.jpg" /></a>

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Step 1: Clone the Repository

Clone the Directus+ repository to your local machine or download the zip file.

```sh
git clone https://github.com/directusplus/directus-plus.git
cd directus-plus
```

## Step 2: Navigate to the Virtual Event Starter kit directory

Within the cloned repository, navigate to the `event-registration` directory.

```sh
cd templates/event-registration
```

## Step 3: Set Up the Directus Backend

Inside the `directus` folder, you will find a `docker-compose.yml` file, which makes it easy to set up the Directus backend locally.

1. Navigate to the `directus` directory.
2. Run the following command to start the Directus instance:

```sh
cd directus
docker compose up
```

Ensure Docker is running on your machine. This command will initialize the Directus backend, running necessary migrations and setting up the environment.

## Step 4: Log In to Directus

Once the Directus instance is running, open your browser and go to `http://localhost:8055`. Log in using the default admin credentials provided in the `docker-compose.yml` file.

## Step 5: Apply the Starter Kit Template

To apply the starter kit template, you need to generate a static token for an admin user. Follow these steps:

1. Open a terminal window.
2. Run the following command to apply the template:

```sh
npx directus-template-cli@latest apply
```

3. Choose to apply the template from a local directory and provide the relative path to the `template` folder:

```sh
/event-registration/template
```

4. Enter the Directus URL (`http://localhost:8055`) and the admin token. The CLI will now create all the collections, fields, relations, and sample data required for the starter kit.


5. Once the template has been applied, navigate to the user with the role `Event Site API` and create a static access token for use in the next step.

## Step 6: Set Up the Frontend

Navigate to the `nuxt` directory and set up the environment variables.

1. Duplicate the `env.example` file and rename it to `.env`.

```sh
cp env.example .env
```

2. Update the `.env` file with your Directus URL and server token from the `Events Site API` user from the previous step. Generate a JWT secret and update it in the `.env` file as well.

You can use the following command to generate a random JWT secret.

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```sh
# .env
DIRECTUS_URL=http://localhost:8055
DIRECTUS_SERVER_TOKEN=<your-server-token>
JWT_SECRET=<your-jwt-secret>
NEVERBOUNCE_API_KEY=<your-neverbounce-api-key>
```

Optional: Email Verification System
For local development, you can skip the email verification system. However, for production, it is recommended to use an email verification API like NeverBounce to avoid disposable email addresses.


## Step 7: Install Frontend Dependencies

Navigate to the `nuxt` directory and install the necessary dependencies.

```sh
cd nuxt
pnpm install
```

## Step 8: Run the Frontend Development Server

Start the frontend development server.

```sh
pnpm run dev
```

This will start the local development server, usually at `http://localhost:3000`. Open this URL in your browser to see the frontend application in action.

## Step 9: Configure Caching for Development (optional)

For a super fast user experience, the Nuxt frontend leverages cached event handlers within server routes for pages that won't change often in production like the landing page.

But for a smoother development experience, you might want to adjust the caching settings for the Nuxt frontend. Learn more about cached event handlers within the [Nitro JS documentation](https://nitro.unjs.io/guide/cache#cached-event-handlers).

1. Within `nuxt.config.ts`, you can comment out the routeRules for the landing page and the session pages.
2. Within the Nuxt server routes like `nuxt/server/api/events/index.get.ts` you can update the second options parameter to include `swr: false` to immediately return updated responses.

    ```ts
    import type { Query } from '@directus/sdk';
    import { directusServer, readItems } from '~/server/utils/directus-server';

    export default defineCachedEventHandler(async (event) => {
        const params = getQuery(event);

        try {
            const events = await directusServer.request(readItems('events', params as any));
            return events;
        } catch (error) {
            return { error };
        }
    }, {
        // Set maxAge to 0 and swr to false during local development to effectively disable caching until you're ready for production.
        maxAge: 0,
        swr: false
    });
    ```

# Production / Deployment Checklist ✅

- [ ]  **Add your own content inside Directus instance.**

    This one is a bit obvious, but don’t forget to edit the global settings for things like login and registration pages since that’s all controlled in the Directus instance, instead of hardcoded.

    - Events
        - Sessions
        - Speakers
    - Event Global Settings
    - Email Templates
- [ ]  **Add .env file for Nuxt.**

    There’s a `env.example` file that you can duplicate.

- [ ]  **Update frontend theme**

    The frontend uses Nuxt UI for theming and UI components. The primary color and the gray color are controlled in the `app.config.ts` file within the `nuxt` directory.

    ```tsx
    export default defineAppConfig({
    	ui: {
    		primary: 'lime',
    		gray: 'zinc',
            // Rest of the UI config
    	},
    });
    ```

    Fonts are controlled within the `tailwind.config.ts` file. The [Nuxt Fonts](https://github.com/nuxt/fonts) module should auto-detect the fonts you’re using and download them locally during the build process. Make sure to review the [Nuxt Fonts documentation](https://fonts.nuxt.com/get-started/configuration) for other configuration options.

    ```tsx
    import type { Config } from 'tailwindcss';
    import defaultTheme from 'tailwindcss/defaultTheme';

    export default {
    	darkMode: 'class',
    	content: [],
    	theme: {
    		extend: {
    			colors: {},
    			fontFamily: {
    				sans: ['Inter', ...defaultTheme.fontFamily.sans],
    				display: ['Bricolage Grotesque', ...defaultTheme.fontFamily.serif],
    				mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
    			},
    		},
    	},

    	variants: {
    		extend: {},
    	},
    } satisfies Config;

    ```

- [ ]  **Setup email settings**

    If you’re deploying the backend via Directus Cloud this should already be handled for you. But if you’re self hosting - don’t forget to add proper email settings in your [Directus config](https://docs.directus.io/self-hosted/config-options.html#email). Directus supports a variety of options like Sendmail, SMTP, Mailgun, Sendgrid, or AWS SES.

- [ ]  **Add Neverbounce API Key to .env (optional)**

    Undeliverable email addresses are a problem. Especially if you are offering a giveaway that takes advantage of the referral tracking system.

    [Neverbounce](https://www.neverbounce.com/) is one of many API services that verify email addresses. These are helpful for catching disposable and invalid email addresses that you cannot really catch via Regex.

    If you add a `NEVERBOUNCE_API_KEY` variable to the `.env` file then the Nuxt server route will verify the email and throw an error if it’s disposable or invalid.

    If you prefer to use some other email verification service, there are two files you’ll need to update.

    - `/nuxt/server/api/register.post.ts`
    - `/nuxt/server/utils/verify-email.ts`
- [ ]  **Configure Slack integration (optional)**
- [ ]  **Update live preview on `events` collection**
- [ ]  **Update the meta_links field on `tickets`**
- [ ]  **Set a giveaway password**
- [ ]  **Add deployment hooks**

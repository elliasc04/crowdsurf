# Crowdsurf.nu

Wecome to Crowdsurf! This repository contains a full stack scraping application that acts as a central hub for gathering data from Google Maps and visualizing it for users in an easy to use, all in one format. Feedback and contributions are encouraged to help improve the project. You can find the application hosted here:

API: https://api.crowdsurf.nu/
Frontend: https://crowdsurf.nu/



## Backend:
The backend operates on an AWS EC2 Ubuntu/Linux 22.04 instance, utilizing Django for URL routing, database connections, and core scraping logic. Gunicorn and Supervisor manage the backend API, while NGINX serves data. 

Data storage is handled by a cloud-based MySQL database hosted by PlanetScale for efficient data retrieval.

Axios is used to connect frontend and backend.

## Frontend:
This is an app template started from [T3 Stack](https://github.com/t3-oss/create-t3-app) with [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix) and a nice [tailwind styled component helper](https://github.com/JackRKelly/t3-tailwind-radix/blob/master/utils/tw.ts) made by [Brendan](https://github.com/Brendonovich) for [spacedrive](https://github.com/spacedriveapp/spacedrive).

Technologies used:

- [TailwindCSS](https://tailwindcss.com)
- [TailwindCSS-Radix](https://github.com/ecklf/tailwindcss-radix)
- [Radix](https://www.radix-ui.com/)



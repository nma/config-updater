# Config Updater

On the job, various folks will ask me to change a .cfg file x, y, z server.
This was okay at first, but the natural progression cause all such tasks to land on my shoulders.
So this is a first pass at automating the pain of having to manually login, we will just hand them this nice UI to play with.

It also doubles as a playground to pick up a bit more on the react-redux-starter-kit, as one of our projects currently uses it. The setup is a tad overly complex on the existing project, and adding new Unit Testing and Code Coverage features were all removed due to deadline pressures.

Playing with this project will hopefully help me understand the nuances of all the modern node componenets, so I can bring back Unit Tests and coverage features back to the app.


## RoadMap

- V1 will just be having the app in a docker container bind-mounted with the config file in question.
- The app will display the file, and allow users to edit and save on the host.
- No additional UI to learn, just edit and save.
- This is just used for inhouse development servers.


- V2 will then centralize the UI onto a single host, and either call a worker or a ssh agent to login and automate the .cfg updates.
- Most likely the automation agent will be an Ansible agent to perform updates on various remote hosts.

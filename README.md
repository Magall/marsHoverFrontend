## Frontend Project
Hello, I decided to build a SPA for the frontend off Mars Hovers problem. I asked Nela if there was any frontent framework desired and she answered no just asked me to use Typescript, so I picked Vue.js. I did not invest much time in styling, making every thing looking beatiful and focused on the app architecture.
## How to run?
Clone this repository , npm install and  npm run serve. this project needs the api in order to work properly.

## Architecture
### Layers
I managed to use 3 principal layers.
- Repository
- Services
- Dtos (types)


### Repository
This is the layer responsable for comunitcating, bringing and leaving data to the API. That's the only point of the application that can reach the API. I built a custom instance, that's where I configured the base adress and would use interceptors to handle authentication. Theres also a client which encapsulates all syntax from axios, beeing just call client.post(url,params). Finally there's the domain, here It's the place that the URL off the endpoint lives. The view can't call it directly.

### Services
This layer is responsable for handling any transformation, logic that I may need to do in with my request or any elaborated business rule. When going to the api the view calls this layer that calls repository. In the case off this app I just used once to go to API.

### DTOs
They are there to be the contract I'm firming with the API, That's how the Api is expecting to receive the data from the Frontend

### Styling architecture SASS
In Order to keep consistent styling and reusability, I build a constants file, where lies font and spacing constants and a global file where are every reusable classes across the project. Every component or view has a style file to make the component's file smaller and more readable.




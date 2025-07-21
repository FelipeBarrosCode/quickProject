import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
   } from '@apollo/client';


   // Step 2: Create the Apollo Client

const client = new ApolloClient({
    uri: 'http://localhost:5050/graphql',
    cache: new InMemoryCache(),
   });


createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
<BrowserRouter>
<App />
</BrowserRouter>
</ApolloProvider>
)

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomeScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/auth/authSlice';
import { AppDispatch } from './redux/store';
import { useEffect, useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CreatePostPage from './pages/CreatePostPage';

const client = new ApolloClient({
  uri: 'https://farington.stepzen.net/api/solid-spaniel/__graphql',
  headers: {
    'Authorization': 'apikey farington::stepzen.io+1000::000b67318454db4a0ee4783ffb4e4e1981cf5e2db01941012bf49740fb17d43b',
  },
  cache: new InMemoryCache(),
});

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth: any) => {
      if (userAuth) {
        localStorage.setItem("accessToken", userAuth?.accessToken)
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            name: null
          })
        )
      } else {
        console.log("logout")
        dispatch(logout())
      }
    });

    return unsubscribe;
  }, [])

  useEffect(() => {
    const check: any = localStorage.getItem("accessToken")
    setToken(check);
  }, [localStorage.accessToken])

  return (
    <div className="App">
      <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePostPage />} />
        </Routes>
      </BrowserRouter>
      </ApolloProvider>
    </div>
    
  );
}

export default App;
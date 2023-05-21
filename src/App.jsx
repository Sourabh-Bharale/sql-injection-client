import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')
  const [content, setContent] = useState([])

  const handleSubmit = () => {
    // console.log('submit')
    axios.post('http://localhost:3001/register', {
      username: userName,
      password: userPass,
    }).then((res) => {
      console.log(res)
    })
    setUserName('')
    setUserPass('')

  }
  const handleLogin = () => {
    // console.log('submit')
    //{message: 'wrong username / password combination'}
    axios.post('http://localhost:3001/login', {
      username: userName,
      password: userPass,
    }).then((res) => {
      console.log(typeof res.data)
      console.log(res.data)
      const arr = []
      if (res.data.message) {
        const data = {
          "message": res.data.message
        }
        arr.push(data)
      }
      else {
        for (var i = 0; i < res.data.length; i++) {
          const data = {
            "message": res.data[i].UserName,
            "pass": res.data[i].UserPassword
          }
          arr.push(data)
        }
      }
      console.log(arr)
      setContent(arr)
    })
    setUserName('')
    setUserPass('')

  }
  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <input className='input input-bordered input-primary w-full max-w-xs'
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        placeholder='username' />
      <input className='input input-bordered input-secondary w-full max-w-xs'
        type="text"
        onChange={(e) => setUserPass(e.target.value)}
        value={userPass}
        placeholder='password' />
      <input type="submit" onClick={handleLogin} />
      {
        content.map((e, i) => (
          <div>
            <h1>{e.message}</h1>
            <h1>{e.pass}</h1>
          </div>
        ))
      }
    </div>
  );
}

export default App;

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
      // console.log(res)
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
      // console.log(typeof res.data)
      // console.log(res.data)
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
      // console.log(arr)
      setContent(arr)
    })
    setUserName('')
    setUserPass('')
  }
  return (
    <div className='flex w-full h-[100vh] justify-center items-center'>

      <div className='flex w-full h-full flex-col gap-2 justify-center items-center self-center'>
        <input className='input input-bordered input-primary w-full max-w-lg'
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder='username' />
        <input className='input input-bordered input-secondary w-full max-w-lg'
          type="text"
          onChange={(e) => setUserPass(e.target.value)}
          value={userPass}
          placeholder='password' />

        <label htmlFor='my-modal' className='btn btn-outline btn-success  w-full max-w-lg mt-4' type="submit" onClick={handleLogin} >Login</label>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            {

              <div className=" ">
                <table className=" table table-zebra w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Password</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      content.map((elem, idx) => (
                        <tr>
                          <th>{idx + 1}</th>
                          <th>{elem.message}</th>
                          <th>{elem.pass}</th>
                        </tr>

                      ))
                    }
                  </tbody>
                </table>
              </div>

            }
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">ok</label>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}

export default App;

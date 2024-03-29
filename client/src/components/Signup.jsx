import { useState, useContext } from 'react'
import axios from 'axios'
import { Button, Form } from 'semantic-ui-react'

import UserContext from '../contexts/UserContext'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: { token } } = await axios.post('/auth/signup', {
      username,
      password
    })
    window.localStorage.setItem('Authorization', token);
    attemptTokenLogin()
  }

  const attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('Authorization')
    if (token) {
      const { data: user } = await axios.get('./auth/me', {
        headers: { authorization: token }
      })
      setUser(user)
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  )

}

export default Signup


//core
import React, {useState} from "react";
import Cookies from "js-cookie";

//request
import workWithServer from "@core/workWithServer";

//redux
import {useAppDispatch} from "@/store/hooks";
import {setCurrentUser} from "@/store/features/userSlice";

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const dispatch = useAppDispatch()
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validEmail = email && email.includes('@') && email.includes('.')
    setErrorEmail(validEmail ? '' : 'Некорректная почта')
    const validPassword = !!password

    setValidPassword(validPassword)

    if (validEmail && validPassword) {
      workWithServer.login({
        email,
        password
      })
        .then(r => {
          const {token, ...data} = r
          dispatch(setCurrentUser(data))
          Cookies.set('token', token)
        })
        .catch(async (err) => {
          const errObj = await err
          const message = JSON.parse(errObj).message
          setErrorEmail(message)
        })
    }
  }

  return {
    email, setEmail, errorEmail, setErrorEmail,
    password, setPassword,
    validPassword, setValidPassword,
    login
  }
}
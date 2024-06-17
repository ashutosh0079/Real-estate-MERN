import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation} from "react-query";
import { addFavourite } from '../../../../server/controllers/userController';
import UserDetailContext from '../../context/UserDetailContext';
import { useAuth0 } from '@auth0/auth0-react';
import { addfav } from '../../utils/api';
import { checkFavourites, updateFavourites } from '../../utils/common';

const Heart = ({id}) => {
  const [heartColor,setHeartColor] = useState("white")
  const {validateLogin} = useAuthCheck()
  const {user} = useAuth0()

  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(()=>{
    setHeartColor(()=> checkFavourites(id,favourites))
  },[favourites])

  const {mutate} = useMutation({
    mutationFn: ()=> addfav(id,user?.email,token),
    onSuccess:()=> {
      setUserDetails((prev)=>({
        ...prev, favourites:updateFavourites(id,prev.favourites)
      }))
    }
  })

const handleLike = () =>{
  if(validateLogin())
    {
      mutate()
      setHeartColor((prev)=>prev==="#FF0000" ? "white" :"#FF0000")
    }
}

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
      e.stopPropagation()
      handleLike()

    }}/>
  )
}

export default Heart
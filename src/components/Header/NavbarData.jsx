import React, { useState, useEffect } from 'react';

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'


export const SideBarData = [
  {
    title: 'Leagues',
    path: '/league-page',
    icon: <MdIcons.MdSportsFootball/>,
    className: 'nav-text'
  },
  {
    title: 'My Team',
    path: '/my-team',
    icon: <RiIcons.RiTeamFill/>,
    className: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/user-dashboard',
    icon: <AiIcons.AiFillDashboard/>,
    className: 'nav-text'
  },
  {
    title: 'New League Sync',
    path: 'sync-league',
    icon: <AiIcons.AiOutlineSync/>,
    className: 'nav-text'
  },
]

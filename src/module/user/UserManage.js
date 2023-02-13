import React, { useState } from 'react'
import { Button } from '../../components/button'
import { useAuth } from '../../context/auth-context'
import DashboardHeading from '../../drafts/DashboardHeading'
import { userRole } from '../../utils/constants'
import UserTable from './UserTable'
const UserManage = () => {
  
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage User"></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  )
}

export default UserManage

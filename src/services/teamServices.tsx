import axios from 'axios'
import { convertTeamToDB } from './converter'
import { getUserEmail } from './userServices'

//create team
async function createUserTeam(
  team: { name: string; member: [string] },
  user: string
) {
  try {
    //send request to create team
    const create_team = await axios.post('user/team/create', {
      params: {
        name: team.name,
        owner: user,
        team_id: 0,
      },
    })
    for (const memberEmail of team.member) {
      //send request to invite member
      const invite_member = await axios.post('user/team/inviteUser', {
        email: memberEmail,
        team_id: create_team.data.team_id,
      })
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

//check pending team of user
async function checkTeamStatus(team_id: number) {
  try {
    const team_info = await axios.get('user/getPendingTeam', {
      params: { email: getUserEmail() },
    })
    //TODO: return team in format for front-end
  } catch (error) {
    console.log(error)
    return false
  }
}

//get team info by id
async function getTeamInfo(id: number) {
  try {
    //get all team from database
    const team_info = await getAllTeam()
    if (Array.isArray(team_info)) {
      //find team by id
      const result = team_info.find(
        (team_data: any) => team_data.team_id === id
      )
      return result
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

//get all team of user
async function getAllTeamOfUser() {
  try {
    const user_email = getUserEmail()
    //get user email
    const team_info = await axios.get('http://ict11.ce.kmitl.ac.th:9080/user/getTeam', {
      params: { email: user_email },
    })
    // get member of each team
    for (let i = 0; i < team_info.data.length; i++) {
      const member_info = await axios.get('http://ict11.ce.kmitl.ac.th:9080/user/team/getTeamUsers', {
        params: { team_id: team_info.data[i].team_id },
      })
      // add attribute member to team_info
      team_info.data[i].members = member_info.data
      console.log(team_info.data)
    }
    return team_info.data
  } catch (error) {
    console.log(error)
    return false
  }
}

//get all team
async function getAllTeam() {
  try {
    const team_info = await axios.get('user/team/getAllTeams')
    if (Array.isArray(team_info.data)) {
      return team_info.data
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

//get team member by id
async function getTeamMember(id: number) {
  const team_info = getAllTeamOfUser()
  if (Array.isArray(team_info)) {
    const result = team_info.find((team_data) => team_data.id === id)
    return result?.members
  }
}

//add member to team
async function addMemberToTeam(team_id: number) {
  try {
    const invite_member = await axios.put('user/team/addUser', {
      params: { team_id: team_id, email: getUserEmail() },
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

//edit team  info by id
async function editTeamInfo(id: string, team: Team) {
  try {
    const team_info = convertTeamToDB(team)
    const respond = await axios.put('user/team/editName', team_info, {
      params: { team_id: id },
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

//delete team by id
async function deleteTeam(id: number) {
  try {
    const respond = await axios.delete('user/team/delete', {
      params: { team_id: id },
    })
    if (respond.status === 204) {
      return true
    }
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}
export {
  createUserTeam,
  getTeamInfo,
  getAllTeam,
  getTeamMember,
  addMemberToTeam,
  getAllTeamOfUser,
  editTeamInfo,
  deleteTeam,
}

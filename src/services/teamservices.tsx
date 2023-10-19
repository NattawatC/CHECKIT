import axios from 'axios';
import userservices from './userservices';
class teamServices {
  services = new userservices()
  //create team
  async createTeam(team: { name: string; member: [string] }) {
    try {
      //send request to create team
      const create_team = await axios.post(
        'http://ict11.ce.kmitl.ac.th:9080/user/team/create',
        {
          params: {
            name: team.name,
            owner: this.services.user.email,
            team_id: 0,
          },
        }
      )
      for (const memberEmail of team.member) {
        //send request to invite member
        const invite_member = await axios.post(
          'http://ict11.ce.kmitl.ac.th:9080/user/team/inviteUser',
          {
            email: memberEmail,
            team_id: create_team.data.team_id,
          }
        )
      }
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //checkTeamUserStatus
  //TODO: get data from database
  checkTeamUserStatus(team_id: number) {
    try {
        const team_info = await axios.get('')
    }
  }


  //get team info by id
  async getTeamInfo(id: string) {
    try {
      //get all team from database
      const team_info = await this.getAllTeam()
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
  async getAllTeamOfUser() {
    try {
      //get user email
      const task_info = await axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/task/getTasks',
        { params: { email: this.services.user.email } }
      )
      return task_info
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //get all team
  async getAllTeam() {
    try {
      const team_info = await axios.get(
        'http://ict11.ce.kmitl.ac.th:9080/user/team/getAllTeams'
      )
      if (Array.isArray(team_info.data)) {
        return team_info.data
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //get team member by id
  getTeamMember(id: string) {
    const team_info = this.getAllTeam()
    if (Array.isArray(team_info)) {
      const result = team_info.find((team_data) => team_data.id === id)
      return result?.members
    }
  }

  //add member to team
  //TODO: post data to database
  addMemberToTeam(team_id: number) {
    return true
  }

  //edit team  info by id
  //TODO: post data to database
  editTeamInfo(
    id: string,
    team: { name: string; member: [{ name: string; status: string }] }
  ) {
    return true
  }

  //delete team by id
  //TODO: delete team request to database
  deleteTeam(id: string) {
    return true
  }
}
export default teamServices

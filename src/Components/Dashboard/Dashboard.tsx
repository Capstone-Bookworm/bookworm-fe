import MyBooks from '../MyBooks/MyBooks'
import { Location, User } from '../../Interfaces'

const Dashboard = ({ currentUser }: { currentUser: User } ) => {
  return (
    <div>
      <MyBooks currentUser={currentUser}/>
    </div>
  )
}


export default Dashboard
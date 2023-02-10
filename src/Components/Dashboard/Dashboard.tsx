import MyBooks from '../MyBooks/MyBooks'

interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

const Dashboard = () => {
  return (
    <div>
      <MyBooks />
    </div>
  )
}


export default Dashboard
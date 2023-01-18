import { Button } from '@mui/material'
import { useSelector } from 'react-redux'


function DashboardComponent() {
  const token = useSelector(state => state.auth.token)
  return (
    <div>
        {console.log('Token', token)}
        Dashboard Page
        <Button>Log Out</Button>
        <Button>Log Out</Button>
    </div>
  );
}

export default DashboardComponent;

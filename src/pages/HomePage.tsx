import { Flex, Loader, Text } from '@fluentui/react-northstar'
import React, { useContext } from 'react'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useGetUsers } from '../api/authQueries'
import { AuthUserContext } from '../components/app/App'
import { LOGIN_PATH, REGISTER_PATH } from '../routes/Paths'
import CenteredPage from './templates/CenteredPage'

interface Props {

}

export const HomePage: React.FC<Props> = ({ children }) => {
    // const cache = useQueryClient();
    const { status, data, error, isFetching } = useGetUsers();
    const authcontext = useContext(AuthUserContext)


    return (
        <CenteredPage>
            {/* {onlyLoggedIn(<Temp />, <h1>Welcome to Greenstar Aviation</h1>)} */}
            <Flex styles={{ width: "100%", justifyContent: "space-evenly", margin: '2rem 10rem' }}>
                {!authcontext?.selfState?.auth ?
                    <>
                        <Link to={LOGIN_PATH}>Login</Link>
                        <Link to={REGISTER_PATH}>Register</Link>
                    </> :
                    <>
                        <Link to='/video'>Video</Link>
                        <Link to='/profile'>Profile</Link>
                    </>}
            </Flex>
            <Text content="Users:" size="largest" weight="bold" />
            {
                isFetching ?
                    (<Loader />) :
                    (error ? (<Text content="Error retrieving users" error />) : (
                        data.map((user: any) => (<Text content={user.first_name} key={user.user_id} />))
                    ))
            }


        </CenteredPage>
    )
}
import { Flex, Loader, Text, Button, Animation } from '@fluentui/react-northstar'
import React, { useContext } from 'react'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useGetUsers } from '../api/authQueries'
import { AuthUserContext } from '../components/app/App'
import { LOGIN_PATH, REGISTER_PATH } from '../routes/Paths'
import CenteredPage from './templates/CenteredPage'
import { colors } from '../style/colors'
// import svgBackground from '../../public/bubbles.svg'
interface Props {

}

export const HomePage: React.FC<Props> = ({ children }) => {
    // const cache = useQueryClient();
    // const { data, error, isFetching } = useGetUsers();
    const authcontext = useContext(AuthUserContext)
    // { height: '100vh', overflowY: 'scroll', width: '100%', justifyContent: 'center', backgroundColor: gsaTheme.siteVariables.colors.grey[200] }

    return (
        <Animation name="bobbing" direction="alternate">
            <Flex styles={{ height: '100vh', width: "100vw", justifyContent: "center", padding: '2rem 10rem', backgroundImage: `url(/bubbles.svg)`, backgroundColor: colors.grey["50"] }} >
                <Flex styles={{ flexDirection: "column", backgroundColor: colors.grey["0"], padding: "2rem 6rem", width: '100%', textAlign: "center", alignContent: "center" }}>
                    <h1 style={{ fontSize: "10vw", textAlign: "center" }}>Drop-In</h1>
                    <h2>{authcontext?.selfState?.auth ? "Welcome back, " + authcontext?.selfState?.user?.first_name : "Peer-To-Peer remote working"}</h2>
                    {!authcontext?.selfState?.auth ?
                        <>
                            <Button primary as={Link} to={LOGIN_PATH} style={{ marginBottom: "0.5rem" }}>Login</Button>
                            <Button secondary as={Link} to={REGISTER_PATH}>Register</Button>
                        </> :
                        <>
                            <Button primary as={Link} to='/video' style={{ marginBottom: "0.5rem" }}>Enter</Button>
                            <Button secondary as={Link} to='/profile' >Profile</Button>

                        </>}
                </Flex>
            </Flex >
        </Animation>

    )
}


// // <CenteredPage>
// {/* {onlyLoggedIn(<Temp />, <h1>Welcome to Greenstar Aviation</h1>)} */ }

// {/* <Text content="Users:" size="largest" weight="bold" /> */ }
// {/* {
//                 isFetching ?
//                     (<Loader />) :
//                     (error ? (<Text content="Error retrieving users" error />) : (
//                         data.map((user: any) => (<Text content={user.first_name} key={user.user_id} />))
//                     ))
//             } */}


//         // </CenteredPage>
import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Home from './Home'
import Splash from './Splash'
import Details from './Details'
import Category from './Category'
import Info from './Info'


const App = ()=> {
    return(
            <Router>
                <Stack key = 'root'>
                    <Scene key = 'splash' component = { Splash } hideNavBar initial/>
                    <Scene key = 'home' component = { Home } hideNavBar/>
                    <Scene key = 'details' component = { Details } hideNavBar/>
                    <Scene key = 'category' component = { Category } hideNavBar/>
                    <Scene key = 'info' component = { Info } hideNavBar/>
                </Stack>
            </Router>
    )
}

export default App
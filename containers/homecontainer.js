import Home from '../screens/DangNhap'
import {connect} from 'react-redux'
import { alert } from 'react-native'

const mapStateToProps = state =>{
    alert(`dat=${JSON.stringify(state)}`)
    return{

    }
}
const HomoContainer = connect(mapStateToProps)(Home)
export default HomoContainer;
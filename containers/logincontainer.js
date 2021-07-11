import DangNhap from '../screens/DangNhap'
import {addlogin} from '../actions'
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onClickLogin:(matho)=>{
            dispatch(addlogin(matho));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DangNhap);
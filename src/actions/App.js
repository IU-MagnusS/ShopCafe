import { connect } from "react-redux";
import App from "../components/App";

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

export default connect(mapStateToProps)(App)


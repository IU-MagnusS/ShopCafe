import { connect } from 'react-redux';
import Login from '../components/Login';
import { login } from '../reducers/auth';

const mapActionsToProps = { login };

export default connect(null, mapActionsToProps)(Login);

export { login };
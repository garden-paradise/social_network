import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Login from './Login';
import { login } from '../../redux/auth-reducer';
import { getCaptchaImg, getIsAuth } from '../../selectors/auth-selectors';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  isAuth: boolean;
  captcha: string | null;
};

type MapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: getIsAuth(state),
    captcha: getCaptchaImg(state),
  };
};

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, void, AppStateType>(
    mapStateToProps,
    {
      login,
    }
  ),
  reduxForm({ form: 'loginForm' })
)(Login);

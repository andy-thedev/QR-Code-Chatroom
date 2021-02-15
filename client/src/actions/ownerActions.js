import axios from 'axios';

const register = (name, email, password, history) => {
    axios.post("http://localhost:8000/owner/register", {
        name,
        email,
        password,
    })
    .then((res) => {
        console.log(res.data.message);
        localStorage.setItem("User_Token", res.data.token);
        localStorage.setItem("UserInfo", JSON.stringify(res.data.userInfo));
        history.push('/registerroom');
    })
    .catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    });
}

const login = (email, password, history, props) => {
    axios.post("http://localhost:8000/owner/login", {
        email,
        password
    })
    .then((res) => {
        console.log(res.data.message);
        localStorage.setItem("User_Token", res.data.token);
        localStorage.setItem("UserInfo", JSON.stringify(res.data.userInfo));
        props.setupSocket();
        history.push('/');
    })
    .catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    });
}

export { register, login };
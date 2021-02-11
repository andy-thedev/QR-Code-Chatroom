import axios from "axios";

const register = (name, email, password, room) => {
    console.log(name, email, password, room);
    axios.post("http://localhost:8000/owner/register", {
        name,
        email,
        password,
        room,
    })
    .then((res) => {
        console.log(res.data.message);
    })
    .catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    })
}

export {register};
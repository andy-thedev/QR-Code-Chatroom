import axios from "axios";

const register = (room, ownerEmail, history) => {
    axios.post("http://localhost:8000/chatroom/", { room, ownerEmail }, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("User_Token"),
        },
    }).then((res) => {
        console.log(res.data.message);
        history.push('/');
    }).catch((err) => {
        if (err && err.res && err.res.message) {
            console.log(err.message);
        }
    });
}

export {register};
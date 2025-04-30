const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// Swap prompt based on admin status
const AdminPrompt = (props) => {
    const [admin, setAdmin] = useState(props.admin);
    useEffect(() => {
        const loadPerms = async () => {
            const response = await fetch('/getAdmin');
            const data = await response.json();
            setAdmin(data.isAdmin);
        }
        loadPerms();
    }, [props.reload]);

    if(admin){
        return(
            <h3>You are an admin. You have permission to approve records and add list entries.</h3>
        );
    }else{
        return(
            <h3>You are not an admin. To become an admin, press the button below.</h3>
        );
    }
}

const AdminPage = (props) => {
    const [reload, setReload] = useState(false);
    return(<AdminPrompt admin={false} reload={reload} />);
}

// Send request to toggle admin perms
const toggleAdmin = (e) => {
    e.preventDefault();
    helper.sendPost('/admin', {});
    return false;
}

const init = () => {
    const adminBtn = document.getElementById('adminBtn');
    adminBtn.addEventListener('click', toggleAdmin);

    const root = createRoot(document.getElementById('content'));
    root.render(<AdminPage />);
}

window.onload = init;
const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleBoss = (e, onBossAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#bossName').value;
    const mod = e.target.querySelector('#bossMod').value;
    const difficulty = e.target.querySelector('#bossDiff').value;
    const maxHP = e.target.querySelector('#maxHP').value;
    const globalPlacement = e.target.querySelector('bossPlace').value;
    const video = e.target.querySelector('#videoID').value;

    if(!name || !mod || !difficulty || !maxHP || !globalPlacement || !video){
        helper.handleError("Please enter all parameters.");
        return false;
    }

    helper.sendPost(e.target.action, {name, mod, difficulty, maxHP, globalPlacement, video}, onBossAdded);
    return false;
}

const QuizForm = (props) => {
    return (
        <form id="quizForm"
                onSubmit={(e) => handleQuiz(e, props.triggerReload)}
                name="quizForm"
                action="/myquizzes"
                method="POST"
                className="quizForm"
        >
            <label htmlFor='name'>Quiz Name: </label>
            <input id='quizName' type="text" name="name" placeholder='New Quiz Name' />
            <input className="quizSubmit" type="submit" value="Make Quiz" />
        </form>
    );
}

const QuizList = (props) => {
    const [quizzes, setQuizzes] = useState(props.quizzes);

    // TODO
}

const MyQuizzes = () => {
    const [reload, setReload] = useState(false);

    return (
        <div>
            <div id="makeQuiz">
                <QuizForm triggerReload={() => setReload(!reload)} />
            </div>
            <div id="quizList">
                <QuizList quizzes={[]} reload={reload} />
            </div>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('quizzes'));
    root.render(<MyQuizzes />);
}

window.onload = init;
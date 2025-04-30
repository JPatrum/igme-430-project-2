const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// Send request to add entry - admin only
const handleBoss = (e, onBossAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#bossName').value;
    const mod = e.target.querySelector('#bossMod').value;
    const difficulty = e.target.querySelector('#bossDiff').value;
    const maxHP = e.target.querySelector('#maxHP').value;
    const globalPlacement = e.target.querySelector('#bossPlace').value;
    const video = e.target.querySelector('#videoID').value;
    const isLegacy = e.target.querySelector('#isLegacy').checked;

    if (!name || !mod || !difficulty || !maxHP || !globalPlacement || !video || !isLegacy) {
        helper.handleError("Please enter all parameters.");
        return false;
    }

    helper.sendPost(e.target.action, { name, mod, difficulty, maxHP, globalPlacement, video, isLegacy }, onBossAdded);
    return false;
};

// Entry creation form
const BossForm = (props) => {
    return (
        <form id="bossForm"
            onSubmit={(e) => handleBoss(e, props.triggerReload)}
            name="bossForm"
            action="/list"
            method="POST"
            className="bossForm"
        >
            <label htmlFor='name'>Boss Name: </label>
            <input id='bossName' type='text' name='name' />
            <label htmlFor='mod'>Mod Name: </label>
            <input id='bossMod' type='text' name='mod' />
            <label htmlFor='difficulty'>Difficulty Name: </label>
            <input id='bossDiff' type='text' name='difficulty' />
            <label htmlFor='maxHP'>Max HP: </label>
            <input id='maxHP' type='number' min='0' value='0' name='maxHP' />
            <label htmlFor='placement'>Global Placement: </label>
            <input id='bossPlace' type='number' min='1' value='1' name='placement' />
            <label htmlFor='video'>Video link: youtube.com/watch?v=</label>
            <input id='videoID' type='text' name='video' placeholder='video ID here' />
            <label htmlFor='isLegacy'>Legacy List </label>
            <input id='isLegacy' type='checkbox' name='isLegacy' />
            <input className="bossSubmit" type="submit" value="Add Entry" />
        </form>
    );
};

// Singular list entry
const ListEntry = (props) => {
    const boss = props.boss;
    // Concept for embeding a video, unfortunately did not get to test
    const videoURL = `https://www.youtube.com/embed/${boss.video}`;
    return(
        <div className='entry'>
            <h2 className='placement'>{props.place}</h2>
            <h2 className='entryName'>{boss.name}</h2>
            <h3 className='entryMod'>{boss.mod}</h3>
            <h3 className='entryDiff'>{boss.difficulty}</h3>
            <p className='entryHP'>Max HP: {boss.maxHP}</p>
            <iframe className='entryVideo' src={videoURL} />
        </div>
    );
}

// https://www.geeksforgeeks.org/how-to-sort-an-array-of-objects-by-property-values/
// Sorts entries based on global placement value
const sortEntries = (a,b) => {
    if(a.globalPlacement < b.globalPlacement){
        return -1;
    }
    if(a.globalPlacement > b.globalPlacement){
        return 1;
    }
    helper.handleError("Repeated placements detected!");
    return 0;
}

// List of entries - can be main or legacy
const BossList = (props) => {
    const [bosses, setBosses] = useState(props.bosses);
    useEffect(() => {
        const loadEntries = async () => {
            const response = await fetch(props.URL);
            const data = await response.json();
            setBosses(data.bosses);
        };
        loadEntries();
    }, [props.reload]);

    if(bosses.length === 0) {
        return (
            <div className="list">
                <h3 className="emptyList">No entires yet!</h3>
            </div>
        );
    }

    // We use the index of the sorted list to get the "final" placement of an entry
    const sorted = bosses.sort(sortEntries);
    const entryNodes = sorted.map(entry => {
        return <ListEntry boss={entry} place={sorted.indexOf(entry) + 1} />
    });

    return(
        <div className='bossList'>
            {entryNodes}
        </div>
    );
};

// Main list - legacy filtered out
const MainListPage = (props) => {
    <div>
        <div id="addEntry">
            <BossForm triggerReload={() => setReload(!reload)} />
        </div>
        <div id="entries">
            <BossList bosses={[]} reload={reload} URL='/getMain' />
        </div>
    </div>
};

// Legacy list - no filter
const LegacyListPage = (props) => {
    <div>
        <div id="addEntry">
            <BossForm triggerReload={() => setReload(!reload)} />
        </div>
        <div id="entries">
            <BossList bosses={[]} reload={reload} URL='/getLegacy' />
        </div>
    </div>
};

// Reactive page that changes between the two lists
const init = () => {
    const mainBtn = document.getElementById('mainBtn');
    const legacyBtn = document.getElementById('legacyBtn');

    const root = createRoot(document.getElementById('list'));

    mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <MainListPage /> );
        return false;
    });

    legacyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <LegacyListPage /> );
        return false;
    });

    root.render(<MainListPage />);
};

window.onload = init;
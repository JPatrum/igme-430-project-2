const React = require('react');
const { createRoot } = require('react-dom/client');

// About page that gives site info
// Does not appear due to unknown issue
const AboutInfo = (props) => {
    return(
        <div id='about'>
            <h2>About</h2>
            <p>
                The Boss List hosts a ranked list of the hardest boss fights created for the game Terraria. 
                The main list holds bosses possible to fight using the current version of tModLoader and/or Terraria. 
                The legacy list holds all bosses, regardless of version or mod loader.
            </p>
            <h3>Rules for record submissions</h3>
            <p>You can submit a record for a boss on your profile page. If it follows the rules, it will be accepted and made public.</p>
            <ol>
                <li>Bosses must be defeated only with gear acquirable at the stage of game progression in which the player is expected to defeat it.</li>
                <li>Players may not use mods that give them advantages in combat compared to vanilla or the mod the boss if from.</li>
                <li>Players MAY use cheat sheet or heros mod to spawn in equipment for the fight, but godmode is prohibited.</li>
                <li>If the record submitted is a no-hit record, the player must show themselves dying from taking damage after completion.</li>
            </ol>
        </div>
    );
}

const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render(<AboutInfo />);
}

window.onload = init;
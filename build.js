// Builds the static site into ./dist by rendering every page into template.html.
const fs = require('fs');
const path = require('path');
const defaults = {
    appearance: 'bright',
    engine: 'google',
};
const routes = [
    [ 'gs', 'gs', 'gs.html', str => str.replace('$gs', buildGames(require('./gs.json'))) ],
    [ 'privacy', 'privacy', 'privacy.html' ],
    [ 'settings', 'settings', 'settings.html' ],
    [ 'support', 'faq', 'support.html' ],
    [ '', 'home', 'index.html' ],
];
const dist = path.join(__dirname, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, 'static'), dist, { recursive: true });

routes.forEach(([route, id, file, fn]) => {
    const page = fs.readFileSync(path.join(__dirname, 'pages', file), 'utf-8');
    const out = path.join(dist, route);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, 'index.html'), render({
        main: fn ? fn(page) : page,
        theme: defaults.appearance,
        engine: defaults.engine,
        id,
    }));
});

console.log(`Built ${routes.length} pages into ${dist}`);

function render(data = {}) {
    return fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8').replace(/\$(theme|engine|main|head|bottom|id)/g, str => 
        data[str.slice(1)] || ''
    );
};

function buildGames(json = []) {
    let html = '';
    for ( let i = 0; i < json.length; i ++ ) {
        let { image, location, title } = json[i];
        // Make local game paths absolute so they resolve from /gs/.
        if (location.startsWith('./src/')) location = location.slice(1);
        html += `<a class="thumbnail" href="${location}"><img src="/src/gs/thumbnails/${image}"><div class="title">${title}</div></a>`;
    };  
    return html
};

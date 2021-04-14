const conn = require('./Configuration').db;

/**
 *
 * @param json {{
 *     str : string
 * }}
 */

async function search(json)
{
    const promise = new Promise((resolve, reject) => {
        conn.fetch(`SELECT * FROM rapcity.artist WHERE name LIKE '${json.str}%'`,(res,err)=>{
            resolve(res);
        });
    });
    const pr1 = await promise;
    const pr2 = await otherSearch(json);
    const artists = [];
    for(const elem of pr1)
        artists.push({
            ...elem,
            songs : pr2.get(elem.name)
        });
    return new Promise(resolve => resolve(artists));
}

/**
 *
 * @param json
 * @returns {Promise<Map<string,Array<string>>>}
 */

async function otherSearch(json)
{
    return new Promise((resolve, reject) => {
        conn.fetch(`SELECT s.name as song_name,a.name as artist_name FROM rapcity.artist a INNER JOIN rapcity.songs s ON (a.id = s.idArtist) WHERE a.name LIKE '${json.str}%'`,(res,err)=>{
            const map = new Map();
            /**
             * @param elem {{artist_name : string,song_name : string}}
             */
            for(const elem of res)
            {
                if(map.has(elem.artist_name))
                    map.get(elem.artist_name).push(elem.song_name);
                else
                    map.set(elem.artist_name,[elem.song_name]);

            }
            resolve(map);
        });
    });
}

exports.tasks = {
    search : search,
    otherSearch : otherSearch,
};
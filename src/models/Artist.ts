export default class Artist {

    private readonly name : string;
    private readonly verified : boolean;
    private readonly songs : Array<string>;

    public constructor(json : {name : string,verified : number,songs : Array<string>}) {
        this.name = json.name;
        if(json.songs !== undefined)
            this.songs = json.songs;
        else this.songs = new Array<string>();
        this.verified = !!json.verified;
    }

    public getName() : string
    {
        return this.name;
    }

    public getSongs() : Array<string>
    {
        return this.songs;
    }

    public getPhotoRessource() : string
    {
        return `${window.location.origin}/images/${this.name}.png`;
    }

    public isVerified() : boolean
    {
        return this.verified;
    }

}
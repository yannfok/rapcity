export default class APICaller{

    private static xhr : XMLHttpRequest = new XMLHttpRequest();
    private static API_URL : string = "http://localhost:3001/";

    public static call(task : string,callback : CallableFunction, args : any) : void
    {
        APICaller.xhr.onreadystatechange = function ()
        {
            if(this.readyState === 4 && this.status === 200)
                callback(JSON.parse(this.responseText));
        };

        APICaller.xhr.open('POST',APICaller.API_URL);

        APICaller.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let str = "";
        for(const [key,value] of Object.entries(args))
            str += `&${key}=${value}`;

        APICaller.xhr.send(`task=${task}${str}`);

    }

}
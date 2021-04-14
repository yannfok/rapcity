import {Component} from "react";
import styled from "@emotion/styled";
import {Avatar, Grid, TextField, withStyles} from "@material-ui/core";
import Artist from "../models/Artist";
import APICaller from "../request/APICaller";
import {CheckCircle} from "@material-ui/icons";
import App from "../App";
import ArtistView from "./ArtistView";

const SearchBar = withStyles({
    root: {
        color : "white",
        "& input": {
            borderColor: "white",
            color: "white"
        },
        "& label.MuiFormLabel-root" : {
            color : "white",
        },
        "& label.Mui-focused": {
            color: "white"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white"
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "white"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "white"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white"
            },
            "&:hover fieldset": {
                borderColor: "white"
            },
            "&.Mui-focused fieldset": {
                borderColor: "white"
            }
        }
    }
})(TextField);

interface SideMenuProps {
    app : App;
}

interface SideMenuState {
    searchArtists : Array<Artist>,
}

const Container = styled.div<{ width: number }>`
  height: 100%;
  width: ${(p) => `${p.width}%`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #121213;
`

function searchResult(props: { artist: Artist, key: number, viewManager: ArtistView | null | undefined }) {
    return (
        <Grid key={props.key} container={true} spacing={5} alignItems="center">
            <Grid item>
                <Avatar className="iconSearch" onClick={()=>{
                    console.log(props.viewManager);
                    props.viewManager?.setState({
                        artist : props.artist,
                    });
                }} src={props.artist.getPhotoRessource()}>A</Avatar>
            </Grid>
            <Grid item>
                <span style={{color : "white"}}>
                    {props.artist.getName()}
                </span>
                {
                    props.artist.isVerified() &&
                    <CheckCircle style={{width: "10px", height: "10px", color : "white",marginBottom : "5px",marginLeft : "5px"}}/>
                }
            </Grid>
        </Grid>
    );
}

export default class SideMenu extends Component<SideMenuProps, SideMenuState> {

    public constructor(props: SideMenuProps) {
        super(props);

        this.state = {
            searchArtists : new Array<Artist>(),
        }
    }

    updateSearch(val : string) : void
    {
        APICaller.call("search", (res : any) =>{
            const artists : Array<Artist> = new Array<Artist>();
            for (const val of res)
                artists.push(new Artist(val));
            this.setState({
                searchArtists : artists
            });
        },{str : val});
    }

    public render() {
        return (
            <Container width={15}>
                <Grid container={true} justify="center" spacing={3} direction="column" alignItems="center" style={{
                    marginTop: "15px",
                }}>
                    <Grid item>
                        <SearchBar onChange={event => {
                            this.updateSearch(event.target.value);
                        }} color="secondary" label="Search"/>
                    </Grid>
                    <Grid item>
                        <div>
                            {
                                this.state.searchArtists.map((item,i) => searchResult({artist : item, key : i, viewManager : this.props.app.getViewManager()?.getArtistView()}))
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}
import Artist from "../models/Artist";
import {Component, SyntheticEvent} from "react";
import styled from "@emotion/styled";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import App from "../App";
import {Avatar, Grid} from "@material-ui/core";
import {CheckCircle} from "@material-ui/icons";

interface ArtistProps {
    app: App;
    artist: Artist;
}

interface ArtistState {
    artist: Artist;
    currentSongPause: string | null;
    audio: HTMLAudioElement | null;
    currentSong: string | null;
}

const ArtistName = styled.h1`
  font-size: 68px;
  font-weight: 1000;
`;

const Container = styled.div`
  text-align: center;
`


const Song = styled.div`
  padding-bottom: 0.5%;
  padding-top: 0.5%;
  border-top: 1px solid #ffffff26;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  grid-gap: 10px;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  justify-items: center;
`

const ArtistSongs = styled.div`
  height: 60%;
  width: 100%;
  position: absolute;
  overflow: scroll;
  vertical-align: middle;
  align-items: center;
  text-align: center;
`

export default class ArtistView extends Component<ArtistProps, ArtistState> {

    public constructor(props: ArtistProps) {
        super(props);
        this.state = {
            artist : this.props.artist,
            currentSongPause: null,
            audio: null,
            currentSong: null,
        }
        this.onPlayClicked = this.onPlayClicked.bind(this);

    }

    public render() {
        return (
            <Container>
                <Grid style={{width: "100%"}} justify="center" container={true} alignItems="center" spacing={4}>
                    <Grid item>
                        <Avatar style={{
                            width: "75px",
                            height: "75px",
                        }} src={this.state.artist.getPhotoRessource()}/>
                    </Grid>
                    <Grid item>
                        <div style={{display : "flex"}}>
                            <ArtistName>{this.state.artist.getName()}</ArtistName>
                            {
                                this.state.artist.isVerified() &&
                                <CheckCircle style={{width: "20px", height: "20px",marginTop : "66px"}}/>
                            }
                        </div>
                    </Grid>
                </Grid>
                <ArtistSongs className="containerSongs">
                    {
                        this.state.artist.getSongs().map((item, i) =>
                            <Song className="song" key={i}>
                                {
                                    (this.state.currentSongPause === null || this.state.currentSongPause !== item) &&
                                    <PlayCircleOutlineIcon onClick={this.onPlayClicked} style={{
                                        width: "1.4em",
                                        height: "1.4em",
                                        color: "white",
                                        borderBottom: "none",
                                        gridRow: 1,
                                        gridColumn: 1,
                                    }}/>
                                }
                                {
                                    this.state.currentSongPause === item &&
                                    <PauseCircleOutlineIcon onClick={this.onPauseClicked} style={{
                                        width: "1.4em",
                                        height: "1.4em",
                                        color: "white",
                                        borderBottom: "none",
                                        gridRow: 1,
                                        gridColumn: 1,
                                    }}>
                                    </PauseCircleOutlineIcon>
                                }
                                <span style={{
                                    borderBottom: "none",
                                    gridRow: 1,
                                    gridColumn: 2,
                                    fontSize : "18px",
                                    fontWeight : 700,
                                }}>{item}</span>
                            </Song>
                        )
                    }
                </ArtistSongs>
            </Container>
        );
    }

    private readonly onPlayClicked: any = async (event: SyntheticEvent) => {
        const parent = (event.nativeEvent.composedPath()[1] as HTMLDivElement);
        const span = parent.childNodes.item(1);
        if (span !== null) {
            await this.setState({
                currentSongPause: span.textContent,
            });
            if (this.state.currentSongPause !== null) {
                this.playSong(this.state.currentSongPause);
            }
        }
    }

    private readonly onPauseClicked: any = async () => {
        this.state.audio?.pause();
        await this.setState({
            currentSongPause: null,
        });
        await this.props.app.getPlayBar()?.setState({
            currentSong : null,
        });
    }

    public playSong(item: string | null): void {
        const url: string = `${window.location.origin}/musics/${item}_${this.state.artist.getName()}.mp3`;
        if (this.state.audio?.paused && this.state.currentSong === item)
            this.state.audio.play().then(() => {
                this.setState({
                    currentSong: this.state.currentSongPause
                });
                this.props.app.getPlayBar()?.setState({
                    currentSong: this.state.currentSongPause,
                });
            });
        else {
            if (this.state.audio === null) {
                const audio: HTMLAudioElement = new Audio(url);
                this.setState({
                    audio: audio,
                });
            } else
                this.state.audio.setAttribute('src', url);
            this.state.audio?.load();
            this.state.audio?.play().then(() => {
                this.setState({
                    currentSong: this.state.currentSongPause
                });
                this.props.app.getPlayBar()?.setState({
                    currentSong: this.state.currentSongPause,
                });
            });
        }

    }

}
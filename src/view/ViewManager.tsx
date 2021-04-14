import React, {Component} from "react";
import styled from "@emotion/styled";
import ArtistView from "./ArtistView";
import Artist from "../models/Artist";
import App from "../App";

interface ViewManagerProps{
    app : App;
}

interface ViewManagerState{

}

const Container = styled.div`
  top: 0;
  left: 15%;
  position: absolute;
  width: 85%;
  height: 88%;
  color: white;
  background-image: linear-gradient(#3b3b3e,#121213);
`

export default class ViewManager extends Component<ViewManagerProps, ViewManagerState> {

    private readonly refToArtistView: React.RefObject<ArtistView>;

    public constructor(props: ViewManagerProps) {
        super(props);
        this.refToArtistView = React.createRef();
    }

    public getArtistView(): ArtistView | null {
        return this.refToArtistView.current;
    }

    public render() {
        return (
            <Container>
                <ArtistView ref={this.refToArtistView} artist={new Artist({
                    name: "Gazo",
                    verified : 1,
                    songs: [
                        "TCHIN 2X",
                        "GO",
                        "EUPHON"
                    ]
                })} app={this.props.app}/>
            </Container>
        );
    }

}
import {Component} from "react";
import styled from "@emotion/styled";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {PauseCircleFilled} from "@material-ui/icons";

const Container = styled.div<{ height: number }>`
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-template-rows: repeat(1, 1fr);
  align-items: center;
  text-align: center;
  position: fixed;
  right: 0;
  height: ${props => `${props.height}%`};
  width: 100%;
  background-color: #3b3b3e;
`;

interface PlayBarProps {

}

interface PlayBarState {
    currentSong: string | null;
    paused : boolean;
}

export default class PlayBar extends Component<PlayBarProps, PlayBarState> {

    public constructor(props: PlayBarProps) {
        super(props);
        this.state = {
            currentSong: null,
            paused : false,
        }
    }

    public render() {
        return (
            <Container height={12}>
                <div style={{
                    gridColumn: 1,
                    gridRow: 1
                }}>
                    <span style={{
                        color: "white"
                    }}>
                        {
                            this.state.currentSong
                        }
                    </span>
                </div>
                <div style={{
                    gridColumn: 2,
                    gridRow: 1,
                }}>
                    {
                        this.state.paused &&
                        <PauseCircleFilled
                            style={{
                                width: "1.6em",
                                height: "1.6em",
                                color: "white"
                            }}
                        />
                    }
                    {
                        !this.state.paused &&
                        <PlayCircleFilledIcon style={{
                            width: "1.6em",
                            height: "1.6em",
                            color: "white"
                        }}/>
                    }
                </div>
            </Container>
        );
    }

}

import React, {Component} from 'react';
import PlayBar from "./view/PlayBar";
import SideMenu from "./view/SideMenu";
import ViewManager from "./view/ViewManager";

interface AppProps {

}

interface AppState {

}

class App extends Component<AppProps, AppState> {

    private readonly refToPlayBar : React.RefObject<PlayBar>;
    private readonly refToViewManager : React.RefObject<ViewManager>;

    public constructor(props : AppProps) {
        super(props);

        this.refToViewManager = React.createRef();
        this.refToPlayBar = React.createRef();
    }

    public getPlayBar() : PlayBar | null
    {
        return this.refToPlayBar.current;
    }

    public getViewManager() : ViewManager | null
    {
        return this.refToViewManager.current;
    }

    public render() {
        return (
            <div>
                <SideMenu app={this}/>
                <ViewManager ref={this.refToViewManager} app={this}/>
                <PlayBar ref={this.refToPlayBar} />
            </div>
        );
    }

}

export default App;

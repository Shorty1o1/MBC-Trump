import {Component, ViewChild, ElementRef} from "@angular/core";
import {AppComponent} from "../app.component";
import {Client} from "../player/Client";
import {and} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-slave',
    templateUrl: 'app/slave/slave.html'
})

export class SlaveComponent {

    private static PLAY_BUTTON_CLASS: string = "glyphicon glyphicon-play";
    private static PAUSE_BUTTON_CLASS: string = "glyphicon glyphicon-pause";

    private client: Client;
    private albumCoverLink: string = "../trumpCover.png"

    @ViewChild('toggleButton')
    private toggleButton: ElementRef;
    private isPlaying: Boolean = false;

    constructor(private app: AppComponent) {

    };

    private ngAfterViewInit(): void {
        this.client = this.app.getClient();
        this.client.addStateChangeHandler(this.handleStateChangedEvent);
    }

    private handleStateChangedEvent = () => {
        if (this.client.isPlaying() && !this.client.isMuted()) {
            this.isPlaying = true;
        } else {
            this.isPlaying = false;
        }
        this.updateToggleButton();
    }

    private toggle(): void {
        this.client.toggleMute();
        this.isPlaying = !this.isPlaying;
        this.updateToggleButton();
    }

    private updateToggleButton(): void {
        let state = SlaveComponent.PLAY_BUTTON_CLASS;
        if (this.isPlaying) {
            state = SlaveComponent.PAUSE_BUTTON_CLASS;
        }
        this.toggleButton.nativeElement.className = state;
    }
}

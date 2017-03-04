import {Component, ViewChild, ElementRef} from "@angular/core";
import {AppComponent} from "../app.component";
import {Client} from "../player/Client";

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
        this.client = app.getClient();
    };

    private ngAfterViewInit(): void {
        this.isPlaying = this.client.isPlaying();
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

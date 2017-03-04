import {Component, ViewChild, ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {MasterService} from "../service/masterService";

@Component({
    selector: 'app-home',
    templateUrl: 'app/home/home.html'
})

export class HomeComponent {

    private static PLAY_BUTTON_CLASS: string = "glyphicon glyphicon-play";
    private static PAUSE_BUTTON_CLASS: string = "glyphicon glyphicon-pause";

    private albumCoverLink: string = "../trumpCover.png";


    @ViewChild('toggleButton')
    private toggleButton: ElementRef;
    private isPlaying: Boolean = false;

    constructor(private http: Http, private masterService: MasterService) {

    };

    ngAfterViewInit(): void {
        this.isPlaying = this.masterService.getPlayerState() === "play";
        this.updateToggleButton();
    }

    private skip(): void {
        this.masterService.sendSkip();
    }

    private backwardSkip(): void {
        this.masterService.sendBackwardSkip();
    }

    private toggle(): void {
        if (this.isPlaying) {
            this.masterService.sendPause();
        } else {
            this.masterService.sendPlay();
        }
        this.isPlaying = !this.isPlaying;
        this.updateToggleButton();
    }

    private updateToggleButton(): void {
        let state = HomeComponent.PLAY_BUTTON_CLASS;
        if (this.isPlaying) {
            state = HomeComponent.PAUSE_BUTTON_CLASS;
        }
        this.toggleButton.nativeElement.className = state;
    }


}